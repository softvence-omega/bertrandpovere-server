import { Request } from "express";
import { AppError } from "../../utils/app_error";
import uploadCloud from "../../utils/cloudinary";
import { isAccountExist } from "../../utils/isAccountExist";
import { JwtPayloadType } from "../../utils/JWT";
import { UserModel } from "../user/user.schema";
import { TTemplate } from "./template.interface";
import { TemplateModel } from "./template.schema";

const create_new_template_into_db = async (req: Request) => {
    const email = req?.user?.email;
    const isOrgExist = await isAccountExist(email as string);
    const templateData: Partial<TTemplate> = {
        organization: isOrgExist.organization,
        templateName: "Untitled template",
        templateDisc: "Add a description",
        pages: [
            {
                pageIndex: 0,
                title: "Title Page",
                questions: [
                    {
                        index: 0,
                        question: "Site conducted",
                        isRequired: true,
                        answerType: {
                            answerType: "input",
                            value: "text",
                        },
                    },
                    {
                        index: 1,
                        question: "Conducted on",
                        isRequired: false,
                        answerType: {
                            answerType: "date",
                            value: "",
                        },
                    },
                    {
                        index: 2,
                        question: "Prepared by",
                        isRequired: true,
                        answerType: {
                            answerType: "input",
                            value: "text",
                        },
                    },
                ],
            },
            {
                pageIndex: 1,
                title: "Untitled Page",
            }
        ]
    };
    const result = await TemplateModel.create(templateData);
    return result;
}

const get_all_templates_from_db = async (req: Request) => {
    const { role, accountId, email } = req?.user as JwtPayloadType;

    let isOrgExist;
    if (role === "ADMIN") {
        isOrgExist = await isAccountExist(email);
    } else if (role === "USER") {
        isOrgExist = await UserModel.findById(accountId as string).lean();
    }
    const { searchTerm = "", page = 1, limit = 10 } = req.query;

    // Ensure page/limit are numbers
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    const query: any = { organization: isOrgExist?.organization };
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
    const templateId = req?.params?.templateId;
    const { role, accountId, email } = req?.user as JwtPayloadType;

    let isOrgExist;
    if (role === "ADMIN") {
        isOrgExist = await isAccountExist(email);
    } else if (role === "USER") {
        isOrgExist = await UserModel.findById(accountId as string).lean();
    }

    const result = await TemplateModel.findOne({ organization: isOrgExist?.organization, _id: templateId }).lean();
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
    const result = await TemplateModel.findOneAndUpdate({ organization: isOrgExist.organization, _id: templateId }, body, { new: true }).lean();

    return result;
}

const delete_template_from_db = async (req: Request) => {
    const email = req?.user?.email;
    const templateId = req?.params?.templateId;
    const isOrgExist = await isAccountExist(email as string);
    await TemplateModel.findOneAndDelete({ organization: isOrgExist.organization, _id: templateId });
    return null;
}

export const template_services = {
    create_new_template_into_db,
    get_all_templates_from_db,
    get_single_template_from_db,
    update_template_into_db,
    delete_template_from_db
}
