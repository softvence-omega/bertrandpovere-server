import { Schema, model } from "mongoose";
import { TSite } from "./site.interface";


const SiteSchema = new Schema<TSite>(
    {
        ownerId: { type: Schema.Types.ObjectId, ref: "account", required: true },
        siteName: { type: String, required: true },
        siteAvatar: { type: String },
        joinedUsers: [{ type: Schema.Types.ObjectId, ref: "user" }],
        inspections: [{ type: Schema.Types.ObjectId, ref: "inspection" }],
        actions: [{ type: Schema.Types.ObjectId, ref: "action" }],
    },
    { timestamps: true, versionKey: false }
);

export const SiteModel = model<TSite>("site", SiteSchema);
