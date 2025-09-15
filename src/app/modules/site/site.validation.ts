import { z } from "zod";

const create = z.object({
    siteName: z.string().min(1),
});


export const site_validation = {
    create
}