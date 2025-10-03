import { z } from "zod";


const QuestionAndAnswerSchema = z.object({
    question: z.string(),
    answer: z.union([
        z.string(),
        z.number(),
        z.boolean(),
        z.date(),
        z.array(z.string())
    ]),
    note: z.string().optional(),
    mediaFiles: z.array(z.string()).optional(),
});

export const create = z.object({
    template: z.string({ message: "Template is required" }),
    questionAdnAnswer: z.array(QuestionAndAnswerSchema),
    status: z.enum(["IN_PROGRESS", "COMPLETED", "DRAFT"]).default("IN_PROGRESS"),
});

export const update = z.object({
    questionAdnAnswer: z.array(QuestionAndAnswerSchema).optional(),
    status: z.enum(["IN_PROGRESS", "COMPLETED", "DRAFT"]).optional(),
});

export const inspection_validation = {
    create,
    update
}
