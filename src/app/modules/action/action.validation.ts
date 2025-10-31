import { z } from "zod";

const create = z.object({
    actionTitle: z.string().min(1),
    actionDisc: z.string().optional(),
    priority: z.enum(["Low", "Medium", "High"]),
    dueDate: z.string(),
    assignBy: z.array(z.string()).optional(),
    state: z.enum(["To do", "In Progress", "Complete", "can’t do"]).default("To do"),
    templateInfo:z.object({
        tempId:z.string(),
        questionIndex:z.number()
    }).optional(),
    inspectionId:z.string().optional()
});
const update = z.object({
    actionTitle: z.string().optional(),
    actionDisc: z.string().optional(),
    priority: z.enum(["Low", "Medium", "High"]).optional(),
    dueDate: z.string().optional(),
    assignBy: z.array(z.string()).optional(),
    state: z.enum(["To do", "In Progress", "Complete", "can’t do"]).optional(),
     templateInfo:z.object({
        tempId:z.string(),
        questionIndex:z.number()
    }).optional(),
    inspectionId:z.string().optional(),
    mediaFiles: z.array(z.string()).optional(),
    messages:z.array(z.object({message:z.string(),sender:z.string()})).optional(),
});

export const action_validation = {
    create,
    update
}