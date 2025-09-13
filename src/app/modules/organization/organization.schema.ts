import { model, Schema } from "mongoose";
import { TOrganization } from "./organization.interface";

const organizationSchema = new Schema<TOrganization>(
    {
        organizationName: { type: String, required: true },
        owner: { type: Schema.Types.ObjectId, required: true, ref: "account" },
        phoneNumber: { type: String },
        websiteURL: { type: String },
        organizationLogo: { type: String },
        language: { type: String, default: "english" },
        dateFormat: {
            type: String,
            enum: ["dd/mm/yyyy", "mm/dd/yyyy", "yyyy/mm/dd"],
            default: "dd/mm/yyyy",
        },
        timeFormat: { type: String, enum: ["12h", "24h"], default: "12h" },
        temperatureUnit: { type: String, enum: ["C", "F"], default: "C" },
        distanceUnit: {
            type: String,
            enum: ["km", "mile", "meter", "feet"],
            default: "meter",
        },
    },
    { timestamps: true, versionKey: false }
);

export const OrganizationModel = model<TOrganization>(
    "organization",
    organizationSchema
);