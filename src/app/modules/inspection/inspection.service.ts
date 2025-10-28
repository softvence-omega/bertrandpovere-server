import { Request } from "express";
import { AppError } from "../../utils/app_error";
import { isAccountExist } from "../../utils/isAccountExist";
import { JwtPayloadType } from "../../utils/JWT";
import { UserModel } from "../user/user.schema";
import { TInspection } from "./inspaction.interface";
import { InspectionModel } from "./inspection.shcema";

const save_new_inspection_into_db = async (req: Request) => {
    const email = req?.user?.email;
    const isOrgExist = await isAccountExist(email as string);
    const payload: Partial<TInspection> = { ...req?.body, inspector: isOrgExist?._id, organization: isOrgExist?.organization };
    const result = await InspectionModel.create(payload);
    return result

};

const update_inspection_into_db = async (req: Request) => {
    const { status, ...payload } = req.body;
    const inspectionId = req.params.inspectionId;

    // Basic validation
    if (!payload?.question) {
        throw new Error("Question is required");
    }

    // 1️⃣ Check if inspection exists
    const inspection = await InspectionModel.findById(inspectionId);
    if (!inspection) {
        throw new Error("Inspection not found");
    }

    // 2️⃣ Find if question already exists
    const existingIndex = inspection.questionAdnAnswer.findIndex(
        (item) => item.question === payload.question
    );

    let updatedInspection;
if (existingIndex !== -1) {
        // 🟢 Update existing question’s answer/note/mediaFiles
        const updateQuery: Record<string, any> = {};
        if (payload.answer !== undefined) {
            updateQuery[`questionAdnAnswer.${existingIndex}.answer`] = payload.answer;
        }
        if (payload.note !== undefined) {
            updateQuery[`questionAdnAnswer.${existingIndex}.note`] = payload.note;
        }
        if (payload.media !== undefined) {
            updateQuery[`questionAdnAnswer.${existingIndex}.mediaFiles`] = payload.media;
        }

        updatedInspection = await InspectionModel.findByIdAndUpdate(
            inspectionId,
            {
                $set: {
                    ...updateQuery,
                    ...(status ? { status } : {}),
                },
            },
            { new: true }
        );
    } else {
        // 🔵 Push new question object if it doesn’t exist
        updatedInspection = await InspectionModel.findByIdAndUpdate(
            inspectionId,
            {
                $push: {
                    questionAdnAnswer: {
                        question: payload.question,
                        answer: payload.answer || "",
                        note: payload.note || "",
                        mediaFiles: payload.media || [],
                    },
                },
                ...(status ? { $set: { status } } : {}),
            },
            { new: true }
        );
    }

    return updatedInspection;
};




const delete_inspection_into_db = async (req: Request) => {
    const email = req?.user?.email;
    const isOrgExist = await isAccountExist(email as string);
    await InspectionModel.findOneAndDelete({ _id: req.params.inspectionId, inspector: isOrgExist?._id });
    return null;
};

const get_all_inspection_into_db = async (req: Request) => {
    const { role, accountId, email } = req?.user as JwtPayloadType;

    let isOrgExist;
    if (role === "ADMIN") {
        isOrgExist = await isAccountExist(email);
    } else if (role === "USER") {
        isOrgExist = await UserModel.findById(accountId as string).lean();
    }

    // Get pagination params (default: page=1, limit=10)
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Query with pagination
    const [inspections, total] = await Promise.all([
        InspectionModel.find({
            organization: isOrgExist?.organization
        })
            .sort({ createdAt: -1 }) // newest first
            .skip(skip)
            .limit(limit)
            .lean(),

        InspectionModel.countDocuments({
            organization: isOrgExist?.organization
        }),
    ]);

    return {
        data: inspections,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
};


const get_single_inspection_into_db = async (req: Request) => {
    const email = req?.user?.email;
    const isOrgExist = await isAccountExist(email as string);
    const result = await InspectionModel.findOne({ _id: req.params.inspectionId, inspector: isOrgExist?._id });
    if (!result) {
        throw new AppError('Inspection not found', 404);
    }
    return result;
};

export const inspection_services = {
    save_new_inspection_into_db,
    update_inspection_into_db,
    delete_inspection_into_db,
    get_all_inspection_into_db,
    get_single_inspection_into_db

}