import { model, Schema } from "mongoose";
import { TAccount } from "./auth.interface";


const authSchema = new Schema<TAccount>({
    email: { type: String, required: true },
    password: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    accountStatus: { type: String, default: "ACTIVE" },
    role: { type: String, default: "USER" },
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    mobileNo: { type: String, required: false },
    profilePhoto: { type: String, required: false },
    organization: { type: Schema.ObjectId, required: false, ref: "organization" },
}, {
    versionKey: false,
    timestamps: true
});


export const Account_Model = model("account", authSchema)