import { Request } from "express";
import { AppError } from "../../utils/app_error";
import uploadCloud from "../../utils/cloudinary";
import { isAccountExist } from "../../utils/isAccountExist";
import { TTemplate } from "./template.interface";
import { TemplateModel } from "./template.schema";

const create_new_template_into_db = async (req: Request) => {
    const email = req?.user?.email;
    const isOrgExist = await isAccountExist(email as string);
    const templateData: Partial<TTemplate> = {
        organization: isOrgExist.organization,
        templateName: "Safety Inspection Checklist",
        templateDisc: "A standard checklist template for workplace safety audits.",
        pages: [
            {
                pageIndex: 1,
                title: "General Safety",
                questions: [
                    {
                        index: 1,
                        question: "Is the fire extinguisher accessible?",
                        isRequired: true,
                        answerType: {
                            answerType: "multipleSelect",
                            value: ["yes", "no", "n/a"],
                        },
                    },
                    {
                        index: 2,
                        question: "Provide details about any hazards observed.",
                        isRequired: false,
                        answerType: {
                            answerType: "annotation",
                            value: "Observed some blocked exits near warehouse.",
                        },
                    },
                    {
                        index: 3,
                        question: "Date of inspection",
                        isRequired: true,
                        answerType: {
                            answerType: "date",
                            value: "2025-09-21",
                        },
                    },
                ],
            },
            {
                pageIndex: 2,
                title: "Compliance",
                questions: [
                    {
                        index: 1,
                        question: "Are workers wearing helmets?",
                        isRequired: true,
                        answerType: {
                            answerType: "multipleSelect",
                            value: ["compliant", "not-compliant"],
                        },
                    },
                    {
                        index: 2,
                        question: "Upload a photo of safety equipment.",
                        isRequired: false,
                        answerType: {
                            answerType: "media",
                            value: "image", // File object in real use
                        },
                    },
                ],
            },
        ],

    };
    const result = await TemplateModel.create(templateData);
    return result;
}

const get_all_templates_from_db = async (req: Request) => {
    const email = req?.user?.email;
    const { searchTerm = "", page = 1, limit = 10 } = req.query;

    // Ensure page/limit are numbers
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    // Verify account
    const isOrgExist = await isAccountExist(email as string);
    // Build query
    const query: any = { author: isOrgExist.organization };
    if (searchTerm) {
        query.templateName = { $regex: searchTerm, $options: "i" };
    }

    // Fetch data with pagination
    const [data, total] = await Promise.all([
        TemplateModel.find(query)
            .skip(skip)
            .limit(limitNum)
            .sort({ createdAt: -1 })
            .lean(),
        TemplateModel.countDocuments(query),
    ]);

    return {
        data,
        meta: {
            total,
            page: pageNum,
            limit: limitNum,
            totalPages: Math.ceil(total / limitNum),
        },
    };
}
const get_single_template_from_db = async (req: Request) => {
    const email = req?.user?.email;
    const templateId = req?.params?.templateId;
    const isOrgExist = await isAccountExist(email as string);

    const result = await TemplateModel.findOne({ author: isOrgExist.organization, _id: templateId }).lean();
    if (!result) {
        throw new AppError('Template not found', 404);
    }

    return result;
}
const update_template_into_db = async (req: Request) => {
    const email = req?.user?.email;
    const templateId = req?.params?.templateId;
    const body: Partial<TTemplate> = req?.body;
    if (req?.file) {
        const uploadedFile = await uploadCloud(req?.file);
        body.templateLogo = uploadedFile?.secure_url
    }

    const isOrgExist = await isAccountExist(email as string);
    const result = await TemplateModel.findOneAndUpdate({ author: isOrgExist.organization, _id: templateId }, body, { new: true }).lean();

    return result;
}

const delete_template_from_db = async (req: Request) => {
    const email = req?.user?.email;
    const templateId = req?.params?.templateId;
    const isOrgExist = await isAccountExist(email as string);
    await TemplateModel.findOneAndDelete({ author: isOrgExist.organization, _id: templateId });
    return null;
}

export const template_services = {
    create_new_template_into_db,
    get_all_templates_from_db,
    get_single_template_from_db,
    update_template_into_db,
    delete_template_from_db
}
