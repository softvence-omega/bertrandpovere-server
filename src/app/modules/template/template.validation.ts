import { z } from "zod";

import { Types } from "mongoose";

// Question schemas
const BaseQuestionSchema = z.object({
    index: z.number(),
    question: z.string(),
    isRequired: z.boolean(),
});

// Input Question
const InputQuestionSchema = BaseQuestionSchema.extend({
    answerType: z.literal("input"),
    valueType: z.enum(["text", "number", "date", "email", "password"]),
});

// Select Question
const SelectQuestionSchema = BaseQuestionSchema.extend({
    answerType: z.literal("select"),
    options: z.array(z.string()).min(1),
});

// Multi-select Question
const MultiSelectQuestionSchema = BaseQuestionSchema.extend({
    answerType: z.literal("multiselect"),
    options: z.array(z.string()).min(1),
});

const LocationQuestionSchema = BaseQuestionSchema.extend({
    answerType: z.literal("location"),
    coordinates: z
        .object({
            lat: z.number(),
            lng: z.number(),
        })
        .optional(),
});
// Union
const QuestionSchema = z.union([
    InputQuestionSchema,
    SelectQuestionSchema,
    MultiSelectQuestionSchema,
    LocationQuestionSchema,
]);

// Page schema
const PageSchema = z.object({
    pageIndex: z.number(),
    title: z.string(),
    questions: z.array(QuestionSchema).optional(),
});

// Approval schema
const ApprovalSchema = z.object({
    approvedBy: z.string(),
    questions: z.array(QuestionSchema).optional(),
});

// Report schema
const ReportSchema = z.object({
    style: z
        .object({
            coverPageImage: z.string().optional(),
            logo: z.string().optional(),
            pageSize: z.enum(["A4", "LETTER"]).optional(),
            thumbnailGrid: z.number().optional(),
            resolution: z.enum(["HIGH", "LOW"]).optional(),
        })
        .optional(),
    content: z
        .object({
            footer: z.boolean().optional(),
            pageBreak: z.boolean().optional(),
            tableOfContent: z.boolean().optional(),
        })
        .optional(),
});

// Access schema
const AccessSchema = z.object({
    userId: z.instanceof(Types.ObjectId), // ✅ requires Mongoose ObjectId
    role: z.enum(["viewer", "editor", "owner"]),
});

// Final Template schema

const create = z.object({
    templateLogo: z.string().optional(),
    templateName: z.string().optional(),
    templateDisc: z.string().optional(),
    pages: z.array(PageSchema).optional(),
    approval: z.array(ApprovalSchema).optional(),
    report: ReportSchema.optional(),
    access: z.array(AccessSchema).optional(),
});



export const template_validation = {
    create
}