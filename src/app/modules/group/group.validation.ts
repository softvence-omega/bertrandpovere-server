import { z } from "zod";

// Zod schema
const create = z.object({
    groupName: z.string().min(1, "Group name is required"),
    joinedUser: z.array(z.string()).optional(),
});
const addMember = z.object({
    joinedUser: z.array(z.string())
});

export const group_validation = {
    create,
    addMember
}   