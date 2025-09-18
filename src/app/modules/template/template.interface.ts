import { Types } from "mongoose";

type BaseQuestion = {
    index: number;
    question: string;
    isRequired: boolean;
};

type InputQuestion = BaseQuestion & {
    answerType: "input";
    valueType: "text" | "number" | "date" | "email" | "password";
};

type SelectQuestion = BaseQuestion & {
    answerType: "select";
    options: string[];
};


type MultiSelectQuestion = BaseQuestion & {
    answerType: "multiselect";
    options: string[];
};

type LocationQuestion = BaseQuestion & {
    answerType: "location";
    valueType?: "point"; // optional, can be extended in future
    coordinates?: { lat: number; lng: number };
};
export type Question = InputQuestion | SelectQuestion | MultiSelectQuestion | LocationQuestion;

export type TTemplate = {
    author: Types.ObjectId;
    templateLogo?: string;
    templateName: string;
    templateDisc?: string;
    pages: {
        pageIndex: number;
        title: string;
        questions?: Question[];
    }[];
    approval?: {
        approvedBy: string;
        questions?: Question[];
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
