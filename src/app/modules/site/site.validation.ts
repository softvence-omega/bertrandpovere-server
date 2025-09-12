import { z } from "zod";

const create = z.object({
    ownerId: z.string(),
    siteName: z.string().min(1),
    siteAvatar: z.string().optional(),
    joinedUsers: z.array(z.string()).optional(),
    inspections: z.array(z.string()).optional(),
    actions: z.array(z.string()).optional(),
});


export const site_validation = {
    create
}