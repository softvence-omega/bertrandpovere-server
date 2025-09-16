import { z } from "zod";

const create = z.object({
    author: z.string(),
    templateLogo: z.string().optional(),
    templateName: z.string().min(1),
    templateDisc: z.string().optional(),

    pages: z.array(
        z.object({
            pageIndex: z.number(),
            title: z.string(),
            questions: z.array(
                z.object({
                    index: z.number(),
                    question: z.string(),
                    answer: z.union([z.string(), z.array(z.string())]),
                    correctAnswer: z.union([z.string(), z.array(z.string())]),
                    isRequired: z.boolean(),
                })
            ).optional(),
        })
    ).default([]),

    approval: z.array(
        z.object({
            approvedBy: z.string(),
            questions: z.array(
                z.object({
                    index: z.number(),
                    question: z.string(),
                    answer: z.union([z.string(), z.array(z.string())]),
                    correctAnswer: z.union([z.string(), z.array(z.string())]),
                    isRequired: z.boolean(),
                })
            ).optional(),
        })
    ).optional(),

    report: z.object({
        style: z.object({
            coverPageImage: z.string().optional(),
            logo: z.string().optional(),
            pageSize: z.enum(["A4", "LETTER"]).optional(),
            thumbnailGrid: z.number().optional(),
            resolution: z.enum(["HIGH", "LOW"]).optional(),
        }).optional(),
        content: z.object({
            footer: z.boolean().optional(),
            pageBreak: z.boolean().optional(),
            tableOfContent: z.boolean().optional(),
        }).optional(),
    }).optional(),

    access: z.array(
        z.object({
            userId: z.string(),
            role: z.enum(["viewer", "editor", "owner"]),
        })
    ).optional(),
});


export const template_validation = {
    create
}