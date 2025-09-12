import { Types } from "mongoose"

export type TGroup = {
    ownerId: Types.ObjectId;
    groupName: string;
    groupAvatar?: string;
    joinedUser?: Types.ObjectId[];
}