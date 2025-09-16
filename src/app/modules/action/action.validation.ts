import { z } from "zod";

const create = z.object({
    actionTitle: z.string().min(1),
    actionDisc: z.string().optional(),
    priority: z.enum(["Low", "Medium", "High"]),
    dueDate: z.string(),
    assignBy: z.array(z.string()).optional(),
    state: z.enum(["To do", "In Progress", "Complete", "can’t do"]).default("To do"),
});

export const action_validation = {
    create
}