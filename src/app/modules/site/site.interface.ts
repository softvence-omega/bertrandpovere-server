import { Types } from "mongoose"

export type TSite = {
    ownerId: Types.ObjectId;
    siteName: string;
    siteAvatar?: string;
    joinedUsers?: Types.ObjectId[];
    inspections?: Types.ObjectId[];
    actions?: Types.ObjectId[];

}