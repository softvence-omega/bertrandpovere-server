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
        author: isOrgExist?.organization,
        templateName: "Untitled Template",
        pages: [
            {
                pageIndex: 0,
                title: "Untitled Page",
                questions: [
                    {
                        index: 0,
                        question: "Site conducted",
                        answerType: "input",
                        valueType: "text",
                        isRequired: true,
                    },
                    {
                        index: 1,
                        question: "Conducted on",
                        answerType: "input",
                        valueType: "date",
                        isRequired: false,
                    },
                    {
                        index: 2,
                        question: "Prepared by",
                        answerType: "input",
                        valueType: "text",
                        isRequired: false,
                    },
                    {
                        index: 3,
                        question: "Where is your current office located?",
                        answerType: "location",
                        isRequired: true,
                        coordinates: { lat: 23.8103, lng: 90.4125 }
                    }

                ],
            },
            {
                pageIndex: 1,
                title: "Untitled Page",
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
