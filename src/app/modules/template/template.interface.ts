import { Types } from "mongoose";

export type TTemplate = {
    author: Types.ObjectId;
    templateLogo?: string;
    templateName: string;
    templateDisc?: string;
    pages: {
        pageIndex: number;
        title: string;
        questions?: {
            index: number;
            question: string;
            answer: string | string[];
            correctAnswer: string | string[];
            isRequired: boolean;
        }[];
    }[];
    approval?: {
        approvedBy: string;
        questions?: {
            index: number;
            question: string;
            answer: string | string[];
             correctAnswer: string | string[];
            isRequired: boolean;
        }[];
    }[];
    report?: {
        style?: {
            coverPageImage?: string;
            logo?: string;
            pageSize?: "A4" | "LETTER";
            thumbnailGrid?: number;
            resolution?: "HIGH" | "LOW"
        };
        content?: {
            footer?: boolean;
            pageBreak?: boolean;
            tableOfContent?: boolean;
        }
    };
    access?: {
        userId: Types.ObjectId;
        role: "viewer" | "editor" | "owner";
    }[];
};
