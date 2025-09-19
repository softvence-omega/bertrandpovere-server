import { z } from "zod";

const create = z.object({
    siteName: z.string().min(1),
});
const addMember = z.object({
    joinedUsers: z.array(z.string({ message: "User Id is required" }))
});


export const site_validation = {
    create,
    addMember
}