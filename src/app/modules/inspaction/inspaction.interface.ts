import { Types } from "mongoose";


export type TTemplate = {
    organization: Types.ObjectId;
    templateLogo?: string;
    templateName: string;
    templateDisc?: string;
    pages: {
        pageIndex: number;
        title: string;
        questions?: {
            index: number;
            question: string;
            isRequired: boolean;
            answer: string | boolean | number | string[];
        }[];
    }[];
    approval?: {
        approvedBy: Types.ObjectId;
    }[];
    report?: {
        style?: {
            coverPageImage?: string;
            logo?: string;
            pageSize?: "A4" | "LETTER";
            thumbnailGrid?: number;
            resolution?: "HIGH" | "LOW";
        };
        content?: {
            footer?: boolean;
            pageBreak?: boolean;
            tableOfContent?: boolean;
        };
    };

};
