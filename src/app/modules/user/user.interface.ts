import { Types } from "mongoose"

export type TUser = {
    owner: Types.ObjectId;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    userType: "GUEST" | "LITE SEATS" | "FULL ACCESS";
    joinedGroups: Types.ObjectId[];
    joinedSites: Types.ObjectId[];
    organization: Types.ObjectId;
}