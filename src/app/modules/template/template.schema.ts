import { Schema, model } from "mongoose";
import { TTemplate } from "./template.interface";


const TemplateSchema = new Schema<TTemplate>(
    {
        author: { type: Schema.Types.ObjectId, ref: "account", required: true },
        templateLogo: { type: String },
        templateName: { type: String, required: true },
        templateDisc: { type: String },
        pages: [
            {
                pageIndex: { type: Number, required: true },
                title: { type: String, required: true },
                questions: [
                    {
                        index: { type: Number, required: true },
                        question: { type: String, required: true },
                        answer: { type: Schema.Types.Mixed, required: true },
                        correctAnswer: { type: Schema.Types.Mixed, required: true },
                        isRequired: { type: Boolean, default: false },
                    },
                ],
            },
        ],
        approval: [
            {
                approvedBy: { type: String, required: true },
                questions: [
                    {
                        index: { type: Number, required: true },
                        question: { type: String, required: true },
                        answer: { type: Schema.Types.Mixed, required: true },
                        correctAnswer: { type: Schema.Types.Mixed, required: true },
                        isRequired: { type: Boolean, default: false },
                    },
                ],
            },
        ],
        report: {
            style: {
                coverPageImage: { type: String },
                logo: { type: String },
                pageSize: { type: String, enum: ["A4", "LETTER"] },
                thumbnailGrid: { type: Number },
                resolution: { type: String, enum: ["HIGH", "LOW"] },
            },
            content: {
                footer: { type: Boolean, default: false },
                pageBreak: { type: Boolean, default: false },
                tableOfContent: { type: Boolean, default: false },
            },
        },
        access: [
            {
                userId: { type: Schema.Types.ObjectId, ref: "Account", required: true },
                role: { type: String, enum: ["viewer", "editor", "owner"], required: true },
            },
        ],
    },
    { timestamps: true, versionKey: false }
);

export const TemplateModel = model<TTemplate>("template", TemplateSchema);
