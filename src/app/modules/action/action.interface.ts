import { Types } from "mongoose";

export type TAction = {
    _id: Types.ObjectId;
    author: Types.ObjectId;
    actionTitle: string;
    actionDisc?: string;
    priority: "Low" | "Medium" | "High";
    dueDate: string;
    assignBy?: Types.ObjectId[];
    state: "To do" | "In Progress" | "Complete" | "can’t do";
}