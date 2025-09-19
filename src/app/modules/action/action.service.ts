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

    // pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // search
    const searchTerm = (req.query.searchTerm as string) || "";

    const filter: any = { author: isOrgExist?._id };

    if (searchTerm) {
        filter.actionTitle = { $regex: searchTerm, $options: "i" }; // case-insensitive search
    }

    // total count
    const total = await ActionModel.countDocuments(filter);

    // paginated data
    const result = await ActionModel.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean();

    return {
        data: result,
        meta: {
            page,
            limit,
            skip,
            total,
        }
    };
};

const get_single_action_from_db = async (req: Request) => {
    const email = req?.user?.email;
    const actionId = req?.params?.actionId;
    const isOrgExist = await isAccountExist(email as string);
    const result = await ActionModel.findOne({ author: isOrgExist?._id, _id: actionId })
        .populate("assignBy")
        .lean();
    return result;
}

const update_action_and_save_into_db = async (req: Request) => {
    const email = req?.user?.email;
    const isOrgExist = await isAccountExist(email as string);
    const result = await ActionModel.findOneAndUpdate({ author: isOrgExist?._id, _id: req?.params?.actionId }, req?.body, { new: true });
    return result;
};
const delete_action_from_db = async (req: Request) => {
    const email = req?.user?.email;
    const isOrgExist = await isAccountExist(email as string);
    await ActionModel.findOneAndDelete({ author: isOrgExist?._id, _id: req?.params?.actionId });
    return null
};

export const action_services = {
    create_new_action_and_save_into_db,
    get_all_actions_from_db,
    get_single_action_from_db,
    update_action_and_save_into_db,
    delete_action_from_db
};