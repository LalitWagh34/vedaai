import mongoose, { Schema, Document } from "mongoose";

export interface IGeneratedPaper extends Document {
  assignmentId: mongoose.Types.ObjectId;
  schoolName: string;
  subject: string;
  className: string;
  timeAllowed: string;
  maximumMarks: number;
  sections: {
    label: string;
    instruction: string;
    questions: {
      text: string;
      difficulty: "easy" | "moderate" | "hard";
      marks: number;
      type: string;
      answerKey?: string;
    }[];
  }[];
  createdAt: Date;
}

const GeneratedPaperSchema = new Schema<IGeneratedPaper>(
  {
    assignmentId: {
      type: Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },
    schoolName: { type: String, default: "Delhi Public School" },
    subject: { type: String, required: true },
    className: { type: String, required: true },
    timeAllowed: { type: String, required: true },
    maximumMarks: { type: Number, required: true },
    sections: [
      {
        label: { type: String, required: true },
        instruction: { type: String, required: true },
        questions: [
          {
            text: { type: String, required: true },
            difficulty: {
              type: String,
              enum: ["easy", "moderate", "hard"],
              required: true,
            },
            marks: { type: Number, required: true },
            type: { type: String, required: true },
            answerKey: { type: String },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IGeneratedPaper>(
  "GeneratedPaper",
  GeneratedPaperSchema
);
