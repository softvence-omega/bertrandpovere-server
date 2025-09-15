import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";

const UserSchema = new Schema<TUser>(
    {
        owner: { type: Schema.Types.ObjectId, ref: "account", required: true },
        email: { type: String, required: true, unique: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        password: { type: String, required: true },
        userType: {
            type: String,
            enum: ["GUEST", "LITE SEATS", "FULL ACCESS"],
            required: true,
        },
        joinedGroups: [{ type: Schema.Types.ObjectId, ref: "group" }],
        joinedSites: [{ type: Schema.Types.ObjectId, ref: "site" }],
        organization: { type: Schema.Types.ObjectId, ref: "organization" },
    },
    { timestamps: true, versionKey: false }
);

export const UserModel = model<TUser>("user", UserSchema);
