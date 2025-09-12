import { Types } from "mongoose"

export type TAction = {
    _id: Types.ObjectId;
    index: string;
    author: Types.ObjectId;
    actionTitle: string;
    actionDisc?: string;
    priority: "LOW" | "MEDIUM" | "HIGH";
    dueDate: string;
    assignBy?: Types.ObjectId;
}