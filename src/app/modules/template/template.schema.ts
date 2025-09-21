import { Schema, model } from "mongoose";

const AnswerTypeSchema = new Schema(
  {
    answerType: {
      type: String,
      enum: [
        "input",
        "multipleSelect",
        "date",
        "media",
        "signature",
        "location",
        "checkbox",
        "slider",
        "annotation",
        "instruction",
      ],
      required: true,
    },
    value: Schema.Types.Mixed, 
  },
  { _id: false }
);

const QuestionSchema = new Schema(
  {
    index: { type: Number, required: true },
    question: { type: String, required: true },
    isRequired: { type: Boolean, required: true },
    answerType: { type: AnswerTypeSchema, required: true },
  },
  { _id: false }
);

const PageSchema = new Schema(
  {
    pageIndex: { type: Number, required: true },
    title: { type: String, required: true },
    questions: [QuestionSchema],
  },
  { _id: false }
);

const TemplateSchema = new Schema(
  {
    organization: { type: Schema.Types.ObjectId, ref: "User", required: true },
    templateLogo: { type: String },
    templateName: { type: String, required: true },
    templateDisc: { type: String },
    pages: { type: [PageSchema], required: true },
    approval: [
      {
        approvedBy: { type: String, required: false ,ref:"account"},
      },
    ],
    report: {
      style: {
        coverPageImage: String,
        logo: String,
        pageSize: { type: String, enum: ["A4", "LETTER"] },
        thumbnailGrid: Number,
        resolution: { type: String, enum: ["HIGH", "LOW"] },
      },
      content: {
        footer: Boolean,
        pageBreak: Boolean,
        tableOfContent: Boolean,
      },
    },
    access: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        role: { type: String, enum: ["viewer", "editor", "owner"], required: true },
      },
    ],
  },
  { timestamps: true ,versionKey: false}
);

export const TemplateModel = model("template", TemplateSchema);
