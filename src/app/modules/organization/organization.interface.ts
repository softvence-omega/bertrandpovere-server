import { Types } from "mongoose";

export type TOrganization = {
    organizationName: string;
    owner: Types.ObjectId;
    phoneNumber?: string;
    websiteURL?: string;
    organizationLogo?: string;
    language: string; // default is english
    dateFormat: "dd/mm/yyyy" | "mm/dd/yyyy" | "yyyy/mm/dd"; // default dd/mm/yyyy
    timeFormat: "12h" | "24h";
    temperatureUnit: "C" | "F";
    distanceUnit: "km" | "mile" | "meter" | "feet"; // default meeter
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
}