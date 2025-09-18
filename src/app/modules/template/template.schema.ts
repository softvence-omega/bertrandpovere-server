import mongoose, { Schema } from "mongoose";

// ------------------ Base Question ------------------
const BaseQuestionSchema = new Schema(
    {
        index: { type: Number, required: true },
        question: { type: String, required: true },
        isRequired: { type: Boolean, required: true },
    },
    { _id: false }
);

// ------------------ Specialized Questions ------------------
const InputQuestionSchema = new Schema(
    {
        valueType: {
            type: String,
            enum: ["text", "number", "date", "email", "password"],
            required: true,
        },
    },
    { _id: false }
);

const LocationQuestionSchema = new Schema(
    {
        coordinates: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true },
        },
    },
    { _id: false }
);

const SelectQuestionSchema = new Schema(
    {
        options: { type: [String], required: true },
    },
    { _id: false }
);

const MultiSelectQuestionSchema = new Schema(
    {
        options: { type: [String], required: true },
    },
    { _id: false }
);

// ------------------ Union Question ------------------
const QuestionSchema = new Schema({}, { discriminatorKey: "answerType", _id: false });
QuestionSchema.add(BaseQuestionSchema);

// Attach discriminators
QuestionSchema.discriminator("input", InputQuestionSchema);
QuestionSchema.discriminator("location", LocationQuestionSchema);
QuestionSchema.discriminator("select", SelectQuestionSchema);
QuestionSchema.discriminator("multiselect", MultiSelectQuestionSchema);

// ------------------ Page Schema ------------------
const PageSchema = new Schema(
    {
        pageIndex: { type: Number, required: true },
        title: { type: String, required: true },
        questions: { type: [QuestionSchema], default: [] },
    },
    { _id: false }
);

// ------------------ Approval Schema ------------------
const ApprovalSchema = new Schema(
    {
        approvedBy: { type: String, required: true },
        questions: { type: [QuestionSchema], default: [] },
    },
    { _id: false }
);

// ------------------ Report Schema ------------------
const ReportSchema = new Schema(
    {
        style: {
            coverPageImage: String,
            logo: String,
            pageSize: { type: String, enum: ["A4", "LETTER"] },
            thumbnailGrid: Number,
            resolution: { type: String, enum: ["HIGH", "LOW"] },
        },
        content: {
            footer: Boolean,
            pageBreak: Boolean,
            tableOfContent: Boolean,
        },
    },
    { _id: false }
);

// ------------------ Access Schema ------------------
const AccessSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        role: { type: String, enum: ["viewer", "editor", "owner"], required: true },
    },
    { _id: false }
);

// ------------------ Template Schema ------------------
const TemplateSchema = new Schema(
    {
        author: { type: Schema.Types.ObjectId, ref: "organization", required: true },
        templateLogo: String,
        templateName: { type: String, required: true },
        templateDisc: String,
        pages: { type: [PageSchema], default: [] },
        approval: { type: [ApprovalSchema], default: [] },
        report: ReportSchema,
        access: { type: [AccessSchema], default: [] },
    },
    { timestamps: true, versionKey: false }
);

// ------------------ Model ------------------
export const TemplateModel = mongoose.model("template", TemplateSchema);
