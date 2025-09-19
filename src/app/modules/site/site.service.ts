import { Request } from "express";
import { AppError } from "../../utils/app_error";
import uploadCloud from "../../utils/cloudinary";
import { isAccountExist } from "../../utils/isAccountExist";
import { UserModel } from "../user/user.schema";
import { TSite } from "./site.interface";
import { SiteModel } from "./site.schema";

const create_new_site_in_db = async (req: Request) => {
    const payload = req?.body;
    const isSiteExist = await SiteModel.findOne({ siteName: payload?.siteName }).lean();
    if (isSiteExist) {
        throw new AppError('Site already exist', 400);
    }

    const email = req?.user?.email;
    const isOrgExist = await isAccountExist(email as string);

    const sitePayload: Partial<TSite> = {
        ...payload,
        owner: isOrgExist?._id,
        organization: isOrgExist?.organization

    }
    const result = await SiteModel.create(sitePayload);
    return result;;
};

const get_all_sites_from_db = async (req: Request) => {
    const email = req?.user?.email;
    const isOrgExist = await isAccountExist(email as string);
    // Pagination params
    const page = parseInt((req.query.page as string) || "1", 10);
    const limit = parseInt((req.query.limit as string) || "10", 10);
    const skip = (page - 1) * limit;

    // Search filter
    const searchTerm = (req.query.searchTerm as string) || "";
    const filter: any = { owner: isOrgExist?._id };

    if (searchTerm) {
        filter.siteName = { $regex: searchTerm, $options: "i" };
    }

    const total = await SiteModel.countDocuments(filter);

    const data = await SiteModel.find(filter)
        .skip(skip)
        .limit(limit)
        .lean();

    return {
        data,
        meta: {
            page,
            limit,
            skip,
            total,
        },
    };
};
const get_single_site_from_db = async (req: Request) => {
    const siteId = req?.params?.siteId;
    const data = await SiteModel.findById(siteId)
        // .populate(["joinedUsers","inspections","actions"])
        .lean();
    if (!data) {
        throw new AppError('Site not found', 400);
    }

    return data
};


const update_site_information_into_db = async (req: Request) => {
    const email = req?.user?.email;
    const siteId = req?.params?.siteId;
    const isOrgExist = await isAccountExist(email as string);
    const payload: Partial<TSite> = {
        siteName: req?.body?.siteName
    }
    if (req?.file) {
        const uploadedFile = await uploadCloud(req?.file);
        payload.siteAvatar = uploadedFile?.secure_url
    }
    const result = await SiteModel.findOneAndUpdate({ _id: siteId, owner: isOrgExist?._id }, payload, { new: true });
    return result;
};


const delete_site_information_into_db = async (req: Request) => {
    const email = req?.user?.email;
    const siteId = req?.params?.siteId;
    const isOrgExist = await isAccountExist(email as string);
    await SiteModel.findOneAndDelete({ _id: siteId, owner: isOrgExist?._id });
    return null;
};

const add_member_into_site_in_db = async (req: Request) => {
    const email = req?.user?.email;
    const siteId = req?.params?.siteId;
    const isOrgExist = await isAccountExist(email as string);
    const joinedUsers = req?.body?.joinedUsers as string[];

    // Add members into the group
    const isSiteExist = await SiteModel.findById(siteId).lean();
    if (!isSiteExist) {
        throw new AppError('Site not found', 400);
    }
    const result = await SiteModel.findOneAndUpdate(
        { _id: siteId, owner: isOrgExist?._id },
        { $addToSet: { joinedUsers: { $each: joinedUsers } } },
        { new: true }
    );

    // Update each user’s joinedGroups
    await UserModel.updateMany(
        { _id: { $in: joinedUsers } },
        { $addToSet: { joinedSites: siteId } }
    );
    return result;
}

const remove_member_from_site_db = async (req: Request) => {
    const email = req?.user?.email;
    const siteId = req?.params?.siteId;
    const isOrgExist = await isAccountExist(email as string);
    const joinedUsers = req?.body?.joinedUsers as string[];

    // Remove members from group
    const result = await SiteModel.findOneAndUpdate(
        { _id: siteId, owner: isOrgExist?._id },
        { $pull: { joinedUsers: { $in: joinedUsers } } },
        { new: true }
    );

    await UserModel.updateMany(
        { _id: { $in: joinedUsers } },
        { $pull: { joinedSites: siteId } }
    );

    return result;
};


export const site_services = {
    create_new_site_in_db,
    get_all_sites_from_db,
    get_single_site_from_db,
    update_site_information_into_db,
    delete_site_information_into_db,
    add_member_into_site_in_db,
    remove_member_from_site_db
}