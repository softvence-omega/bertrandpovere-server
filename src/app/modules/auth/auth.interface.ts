import { Types } from "mongoose";

export type TAccount = {
    email: string;
    password: string;
    lastPasswordChange?: Date;
    isDeleted?: boolean;
    accountStatus?: "ACTIVE" | "INACTIVE" | "SUSPENDED";
    role?: "USER" | "ADMIN",
    fullName: string;
    mobileNo?: string;
    profilePhoto?: string;
    organization: Types.ObjectId;
};


export type TLoginPayload = {
    email: string;
    password: string
}

export type TJwtUser = {
    email: string,
    role?: "USER" | "ADMIN",
}