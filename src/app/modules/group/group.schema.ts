import { Schema, model } from "mongoose";
import { TGroup } from "./group.interface";

const GroupSchema = new Schema<TGroup>(
    {
        ownerId: { type: Schema.Types.ObjectId, ref: "account", required: true },
        groupName: { type: String, required: true },
        groupAvatar: { type: String },
        joinedUser: [{ type: Schema.Types.ObjectId, ref: "user" }],
    },
    { timestamps: true, versionKey: false }
);

export const GroupModel = model<TGroup>("group", GroupSchema);
