import bcrypt from 'bcrypt';
import { Request } from "express";
import { AppError } from '../../utils/app_error';
import { isAccountExist } from "../../utils/isAccountExist";
import sendMail from '../../utils/mail_sender';
import { GroupModel } from '../group/group.schema';
import { UserModel } from './user.schema';

const add_new_user_in_organization_db = async (req: Request) => {
    // check already exist
    const userExist = await UserModel.findOne({ email: req?.body?.email });
    if (userExist) {
        throw new AppError('User already exist', 400);
    }
    const email = req?.user?.email;
    const isOrgExist = await isAccountExist(email as string);
    const password = bcrypt.hashSync(req?.body?.password as string, 10)
    const payload = {
        ...req?.body,
        organization: isOrgExist?.organization,
        password,
        owner: isOrgExist?._id
    }
    const result = await UserModel.create(payload);
    await sendMail({
        to: req?.body?.email,
        subject: "Welcome to the organization",
        name: `${payload?.firstName} ${payload?.lastName}`,
        textBody: "You have been invited to join the organization",
        htmlBody: `
        You have been invited to join the organization. Your login details are: Email: ${req?.body?.email} , Password: <span style="color:skyblue"> ${req?.body?.password} </span>
        `});
    return result;
}

const get_all_users_in_organization_db = async (req: Request) => {
    const email = req?.user?.email;
    const isOrgExist = await isAccountExist(email as string);
    const result = await UserModel.find({ $or: [{ organization: isOrgExist?.organization }, { owner: isOrgExist?._id }] }).lean().select('-password');
    return result;
}

const get_single_users_in_organization_db = async (req: Request) => {
    const email = req?.user?.email;
    const userId = req?.params?.userId;
    const isOrgExist = await isAccountExist(email as string);
    const result = await UserModel.findOne({ organization: isOrgExist?.organization, _id: userId })
        .populate(["joinedGroups"]) //"joinedSites" coming soon
        .select('-password')
        .lean()
    if (!result) {
        throw new AppError('User not found', 400);
    }
    return result;
}

const delete_user_in_organization_db = async (req: Request) => {
    const email = req?.user?.email;
    const userId = req?.params?.userId;
    const isOrgExist = await isAccountExist(email as string);
    const result = await UserModel.findOneAndDelete({ organization: isOrgExist?.organization, _id: userId })
    await GroupModel.findOneAndUpdate({ owner: isOrgExist?._id }, { $pull: { joinedUser: userId } });
    return result;
}

export const user_services = {
    add_new_user_in_organization_db,
    get_all_users_in_organization_db,
    get_single_users_in_organization_db,
    delete_user_in_organization_db
}