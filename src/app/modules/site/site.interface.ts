import { Types } from "mongoose";

export type TSite = {
    owner: Types.ObjectId;
    organization: Types.ObjectId;
    location?: string;
    siteName: string;
    siteAvatar?: string;
    joinedUsers?: Types.ObjectId[];
    inspections?: Types.ObjectId[];
    actions?: Types.ObjectId[];
}