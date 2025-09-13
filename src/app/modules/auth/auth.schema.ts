import { model, Schema } from "mongoose";
import { TAccount } from "./auth.interface";


const authSchema = new Schema<TAccount>({
    email: { type: String, required: true },
    password: { type: String, required: true },
    lastPasswordChange: { type: String },
    isDeleted: { type: Boolean, default: false },
    accountStatus: { type: String, default: "ACTIVE" },
    role: { type: String, default: "USER" },
    fullName: { type: String, required: true },
    mobileNo: { type: String, required: false },
    profilePhoto: { type: String, required: false },
    organization: { type: Schema.ObjectId, required: false ,ref:"organization"},
}, {
    versionKey: false,
    timestamps: true
});


export const Account_Model = model("account", authSchema)