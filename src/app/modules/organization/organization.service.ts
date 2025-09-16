import { Request } from "express";
import uploadCloud from "../../utils/cloudinary";
import { isAccountExist } from "../../utils/isAccountExist";
import { TOrganization } from "./organization.interface";
import { OrganizationModel } from "./organization.schema";

const update_organization_into_db = async (req: Request) => {
    const email = req?.user?.email;
    const isOrgExist = await isAccountExist(email as string);
    const payload: Partial<TOrganization> = req?.body;
    if (req?.file) {
        const uploadedFile = await uploadCloud(req?.file);
        payload.organizationLogo = uploadedFile?.secure_url
    }
    const result = await OrganizationModel.findOneAndUpdate({ _id: isOrgExist?.organization, owner: isOrgExist?._id }, payload, { new: true });
    return result;
}


export const organization_services = {
    update_organization_into_db
}