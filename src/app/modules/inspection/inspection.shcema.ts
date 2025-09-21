import { model, Schema } from "mongoose";

const QuestionAndAnswerSchema = new Schema(
    {
        question: { type: String, required: true },
        answer: { type: Schema.Types.Mixed, required: true },
        note: { type: String, required: false },
        mediaFiles: { type: [String], required: false },
    },
    { _id: false }
);

const InspectionSchema = new Schema(
    {
        organization: { type: Schema.Types.ObjectId, ref: "organization", required: true },
        template: { type: Schema.Types.ObjectId, ref: "template", required: true },
        inspector: { type: Schema.Types.ObjectId, ref: "user", required: true },
        questionAdnAnswer: { type: [QuestionAndAnswerSchema], required: true },
    },
    { timestamps: true, versionKey: false }
);

export const InspectionModel = model("inspection", InspectionSchema);
