import { z } from "zod";

const create = z.object({
    email: z.string().email(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    password: z.string().min(6).default("123456"),
    userType: z.enum(["GUEST", "LITE SEATS", "FULL ACCESS"]),
});



export const user_validation = {
    create
}