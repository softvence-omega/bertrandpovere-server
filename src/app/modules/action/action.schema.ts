import { Schema, model } from "mongoose";
import { TAction } from "./action.interface";

const ActionSchema = new Schema<TAction>(
    {
        author: { type: Schema.Types.ObjectId, ref: "Account", required: true },
        actionTitle: { type: String, required: true },
        actionDisc: { type: String },
        priority: { type: String, enum: ["Low", "Medium", "High"], required: true },
        dueDate: { type: String, required: true }, // keep as string like your type
        assignBy: { type: [Schema.Types.ObjectId], ref: "user" },
        state: { type: String, enum: ["To do", "In Progress", "Complete", "can’t do"], default: "To do" },
        templateInfo: {
            tempId: { type: String, required: false },
            questionIndex: { type: Number, required: false },
            required: false
        },
        inspectionId: { type: String, required: false },
    },
    { timestamps: true, versionKey: false }
);

export const ActionModel = model<TAction>("action", ActionSchema);
