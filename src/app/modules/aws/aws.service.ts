import { Request } from "express";
import uploadCloud from "../../utils/cloudinary";

const upload_file_into_aws = async (req: Request) => {
    if (req?.file) {
        const uploadedFile = await uploadCloud(req?.file);
        return uploadedFile?.secure_url
    } else {
        return "File not found"
    }
}

export const aws_services = {
    upload_file_into_aws
}