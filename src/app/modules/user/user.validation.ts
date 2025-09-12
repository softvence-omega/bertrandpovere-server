import { z } from "zod";

const create = z.object({
    ownerId: z.string(),
    email: z.string().email(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    password: z.string().min(6), // can adjust depending on policy
    userType: z.enum(["GUEST", "LITE SEATS", "FULL ACCESS"]),
    joinedGroups: z.array(z.string()).default([]),
    joinedSites: z.array(z.string()).default([]),
});



export const user_validation = {
    create
}