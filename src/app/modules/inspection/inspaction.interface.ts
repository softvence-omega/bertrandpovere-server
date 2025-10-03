import { Types } from "mongoose";


export type TInspection = {
    organization: Types.ObjectId;
    template: Types.ObjectId;
    inspector: Types.ObjectId;
    questionAdnAnswer: {
        question: string;
        answer: string | number | boolean | Date | string[];
        note?: string;
        mediaFiles?: string[]
    }[],
    status:'IN_PROGRESS' | 'COMPLETED' | 'DRAFT',
};
