import { z } from "zod";

const create = z.object({
    index: z.string(),
    author: z.string(),
    actionTitle: z.string().min(1),
    actionDisc: z.string().optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
    dueDate: z.string(),
    assignBy: z.string().optional(),
});

export const action_validation = {
    create
}