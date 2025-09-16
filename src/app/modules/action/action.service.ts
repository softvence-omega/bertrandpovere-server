import { Request } from "express";
import { isAccountExist } from "../../utils/isAccountExist";
import { TAction } from "./action.interface";
import { ActionModel } from "./action.schema";

const create_new_action_and_save_into_db = async (req: Request) => {
    const email = req?.user?.email;
    const isOrgExist = await isAccountExist(email as string);
    const payload: TAction = {
        ...req?.body,
        author: isOrgExist?._id
    }
    const result = await ActionModel.create(payload);
    return result;
};


const get_all_actions_from_db = async (req: Request) => {
    const email = req?.user?.email;
    const isOrgExist = await isAccountExist(email as string);
    const result = await ActionModel.find({ author: isOrgExist?._id }).lean();
    return result;
}
const get_single_action_from_db = async (req: Request) => {
    const email = req?.user?.email;
    const actionId = req?.params?.actionId;
    const isOrgExist = await isAccountExist(email as string);
    const result = await ActionModel.findOne({ author: isOrgExist?._id, _id: actionId })
        .populate("assignBy")
        .lean();
    return result;
}

export const action_services = {
    create_new_action_and_save_into_db,
    get_all_actions_from_db,
    get_single_action_from_db
};