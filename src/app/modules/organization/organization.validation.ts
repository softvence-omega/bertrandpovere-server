import { z } from "zod";

const update = z.object({
    organizationName: z.string().optional(),
    owner: z.string().optional(), // ObjectId as string
    phoneNumber: z.string().optional(),
    websiteURL: z.string().optional(),
    organizationLogo: z.string().optional(),
    language: z.string().optional(), // default: "english"
    dateFormat: z.enum(["dd/mm/yyyy", "mm/dd/yyyy", "yyyy/mm/dd"]).optional(),
    timeFormat: z.enum(["12h", "24h"]).optional(),
    temperatureUnit: z.enum(["C", "F"]).optional(),
    distanceUnit: z.enum(["km", "mile", "meter", "feet"]).optional(),
});

export const organization_validation = {
    update,
};