import { Types } from "mongoose";

type AnswerType =
    | { answerType: "input"; value: "text" | "email" | "number" }
    | { answerType: "multipleSelect"; value: string[] } // yes, no, n/a ,good, fair, poor,safe,at risk,pass,fail,compliant,not-compliant
    | { answerType: "date"; value: string }
    | { answerType: "media"; value: string }
    | { answerType: "signature"; value: string }
    | { answerType: "location"; value: string }
    | { answerType: "checkbox"; value: boolean }
    | { answerType: "slider"; value: number }
    | { answerType: "annotation"; value: string }
    | { answerType: "instruction"; value: string };

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
            answerType: AnswerType;
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
    access?: {
        userId: Types.ObjectId;
        role: "viewer" | "editor" | "owner";
    }[];
};
