import { Request } from "express";
import httpStatus from 'http-status';
import { FilterQuery } from "mongoose";
import { AppError } from "../../utils/app_error";
import uploadCloud from "../../utils/cloudinary";
import { isAccountExist } from "../../utils/isAccountExist";
import { TGroup } from "./group.interface";
import { GroupModel } from "./group.schema";

const create_new_group_into_db = async (req: Request) => {
    const email = req?.user?.email;
    const isOrgExist = await isAccountExist(email as string);
    const payload = {
        ...req?.body,
        owner: isOrgExist?._id
    }
    const result = await GroupModel.create(payload);
    return result;
}

const get_all_groups_from_db = async (
    email: string,
    page: number = 1,
    limit: number = 10,
    search?: string
) => {
    const user = await isAccountExist(email);
    if (!user) {
        throw new Error("Account not found");
    }

    // pagination skip/limit
    const skip = (page - 1) * limit;

    // build query
    const query: FilterQuery<typeof GroupModel> = { owner: user._id };
    if (search) {
        query.groupName = { $regex: search, $options: "i" };
    }
    // fetch data
    const result = await GroupModel.find(query)
        // .populate("joinedUser", "firstName lastName email") 
        .skip(skip)
        .limit(limit)
        .lean();

    // count total docs for pagination meta
    const total = await GroupModel.countDocuments(query);

    return {
        data: result,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
};

const get_single_group_by_id = async (groupId: string) => {
    const result = await GroupModel.findById(groupId).lean();
    if (!result) {
        throw new AppError("Group not found!!", httpStatus.NOT_FOUND)
    }
    return result;
}

const update_group_information_into_db = async (req: Request) => {
    const email = req?.user?.email;
    const groupId = req?.params?.groupId;
    const isOrgExist = await isAccountExist(email as string);
    const payload: Partial<TGroup> = {
        groupName: req?.body?.groupName
    }
    if (req?.file) {
        const uploadedFile = await uploadCloud(req?.file);
        payload.groupAvatar = uploadedFile?.secure_url
    }
    const result = await GroupModel.findOneAndUpdate({ _id: groupId, owner: isOrgExist?._id }, payload, { new: true });
    return result;
}
const add_member_into_group_db = async (req: Request) => {
    const email = req?.user?.email;
    const groupId = req?.params?.groupId;
    const isOrgExist = await isAccountExist(email as string);
    const joinedUser = req?.body?.joinedUser;
    const result = await GroupModel.findOneAndUpdate({ _id: groupId, owner: isOrgExist?._id }, { $addToSet: { joinedUser } }, { new: true });
    return result;
}
const remove_member_from_group_db = async (req: Request) => {
    const email = req?.user?.email;
    const groupId = req?.params?.groupId;
    const isOrgExist = await isAccountExist(email as string);
    const joinedUser = req?.body?.joinedUser;
    const result = await GroupModel.findOneAndUpdate(
        { _id: groupId, owner: isOrgExist?._id },
        { $pull: { joinedUser: { $in: joinedUser } } },
        { new: true }
    );

    return result;
}

const delete_group_from_db = async (req: Request) => {
    const email = req?.user?.email;
    const groupId = req?.params?.groupId;
    const isOrgExist = await isAccountExist(email as string);
    await GroupModel.findOneAndDelete({ _id: groupId, owner: isOrgExist?._id });
    return null;
}

const get_all_joined_groups_from_db = async (userId: string) => {
    const result = await GroupModel.find({ joinedUser: { $in: [userId] } }).lean();
    return result;
};


export const group_services = {
    create_new_group_into_db,
    get_all_groups_from_db,
    get_single_group_by_id,
    update_group_information_into_db,
    add_member_into_group_db,
    remove_member_from_group_db,
    delete_group_from_db,
    get_all_joined_groups_from_db
}