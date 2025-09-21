import { Types } from "mongoose";

export type TUser = {
    owner: Types.ObjectId;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    userType: "GUEST" | "LITE SEATS" | "FULL ACCESS";
    accountStatus: "ACTIVE" | "INACTIVE" | "SUSPENDED";
    isDeleted: boolean;
    role: "USER"
    joinedGroups: Types.ObjectId[];
    joinedSites: Types.ObjectId[];
    organization: Types.ObjectId;
}