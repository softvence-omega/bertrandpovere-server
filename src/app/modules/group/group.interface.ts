import { Types } from "mongoose"

export type TGroup = {
    owner: Types.ObjectId;
    groupName: string;
    groupAvatar?: string;
    joinedUser?: Types.ObjectId[];
}