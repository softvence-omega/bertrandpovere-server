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
    templateInfo?: {
        tempId?: string;
        questionIndex?: number;
    };
    inspectionId?: string;
    mediaFiles?: string[];
    messages?:{
        message:string,
        sender:Types.ObjectId
    }[]
}