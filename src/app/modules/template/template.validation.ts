import { Types } from "mongoose";
import { z } from "zod";


const AnswerTypeSchema = z.discriminatedUnion("answerType", [
    z.object({ answerType: z.literal("input"), value: z.enum(["text", "email", "number"]) }),
    z.object({
        answerType: z.literal("multipleSelect"), value: z.array(z.enum([
            "yes", "no", "n/a", "good", "fair", "poor",
            "safe", "at risk", "pass", "fail",
            "compliant", "not-compliant"
        ]))
    }),
    z.object({ answerType: z.literal("date"), value: z.string() }),
    z.object({ answerType: z.literal("media"), value: z.any() }), // File validation can be custom
    z.object({ answerType: z.literal("signature"), value: z.any() }),
    z.object({ answerType: z.literal("location"), value: z.string() }),
    z.object({ answerType: z.literal("checkbox"), value: z.boolean() }),
    z.object({ answerType: z.literal("slider"), value: z.number() }),
    z.object({ answerType: z.literal("annotation"), value: z.string() }),
    z.object({ answerType: z.literal("instruction"), value: z.string().optional() }),
]);

const QuestionSchema = z.object({
    index: z.number(),
    question: z.string(),
    isRequired: z.boolean(),
    answerType: AnswerTypeSchema,
});

const PageSchema = z.object({
    pageIndex: z.number(),
    title: z.string(),
    questions: z.array(QuestionSchema).optional(),
});

const create = z.object({
    templateLogo: z.string().optional(),
    templateName: z.string().optional(),
    templateDisc: z.string().optional(),
    pages: z.array(PageSchema).optional(),
    approval: z
        .array(z.object({ approvedBy: z.string() }))
        .optional(),
    report: z
        .object({
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
        })
        .optional(),
    access: z
        .array(
            z.object({
                userId: z.string(),
                role: z.enum(["viewer", "editor", "owner"]),
            })
        )
        .optional(),
});


export const template_validation = {
    create
}