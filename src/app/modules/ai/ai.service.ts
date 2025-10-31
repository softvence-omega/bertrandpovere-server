import { Request } from "express";
import fs from "fs";
import { configs } from "../../configs";
import { AppError } from "../../utils/app_error";
import { isAccountExist } from "../../utils/isAccountExist";
import { TemplateModel } from "../template/template.schema";


const extract_text_from_ai = async (req: Request) => {
    const file = req?.file;
    if (!file) {
        throw new AppError("File is required", 400);
    }
    const fileBuffer = fs.readFileSync(file?.path as string);
    const blob = new Blob([fileBuffer], { type: file?.mimetype });
    const formData = new FormData();
    formData.append("file", blob, file?.originalname);
    const aiResponse = await fetch(`${configs.ai_end_point}/extract-text`, {
        method: "POST",
        body: formData,
    });
    const resultText = await aiResponse.text();
    try {
        return JSON.parse(resultText);
    } catch {
        return resultText;
    }
};

const generate_survey_by_ai = async (req: Request) => {
    const body = req?.body;
    const userExist = await isAccountExist(req?.user?.email as string)
    const aiRes = await fetch(`${configs.ai_end_point}/generate-survey`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        },
        signal: AbortSignal.timeout(25000)
    })

    const parse = await aiRes.json();
    const payload = {
        ...parse?.data,
        organization: userExist?.organization
    }
    const res = await TemplateModel.create(payload)
    return res
}
const generate_survey_from_pdf_by_ai = async (req: Request) => {
    const userExist = await isAccountExist(req?.user?.email as string)
    const file = req?.file;
    if (!file) {
        throw new AppError("File is required", 400);
    }
    const fileBuffer = fs.readFileSync(file?.path as string);
    const blob = new Blob([fileBuffer], { type: file?.mimetype });
    const formData = new FormData();
    formData.append("file", blob, file?.originalname);
    const aiResponse = await fetch(`${configs.ai_end_point}/generate-survey_from_pdf`, {
        method: "POST",
        body: formData,
    });
    const resultText = await aiResponse.text();
    try {
        const parse = JSON.parse(resultText);
        const payload = {
            ...parse?.data,
            organization: userExist?.organization
        }
        const res = await TemplateModel.create(payload)
        return res
    } catch {
        return resultText;
    }
};

const upload_pd_into_pinecone_for_ai_knowledge = async (req: Request) => {
    const file = req?.file;
    if (!file) {
        throw new AppError("File is required", 400);
    }
    const fileBuffer = fs.readFileSync(file?.path as string);
    const blob = new Blob([fileBuffer], { type: file?.mimetype });
    const formData = new FormData();
    formData.append("file", blob, file?.originalname);
    const aiResponse = await fetch(`${configs.ai_end_point}/upload-pdf-to-pinecone`, {
        method: "POST",
        body: formData,
    });
    const resultText = await aiResponse.text();
    try {
        return JSON.parse(resultText);
    } catch {
        return resultText;
    }
};

const delete_pdf_from_pinecone_by_ai = async (req: Request) => {
    const fileName = req?.query?.fileName as string;
    const aiResponse = await fetch(`${configs.ai_end_point}/delete-vectors-by-filename?file_name=${fileName}`, {
        method: "DELETE",
    });
    const resultText = await aiResponse.text();
    try {
        return JSON.parse(resultText);
    } catch {
        return resultText;
    }
}
export const ai_services = {
    extract_text_from_ai,
    generate_survey_by_ai,
    generate_survey_from_pdf_by_ai,
    upload_pd_into_pinecone_for_ai_knowledge,
    delete_pdf_from_pinecone_by_ai
}