import mongoose, { Schema, Document } from "mongoose";

export interface IAssignment extends Document {
  title: string;
  subject: string;
  className: string;
  dueDate: string;
  questionTypes: {
    type: string;
    numberOfQuestions: number;
    marks: number;
  }[];
  additionalInstructions?: string;
  fileUrl?: string;
  status: "pending" | "processing" | "completed" | "failed";
  createdAt: Date;
}

const AssignmentSchema = new Schema<IAssignment>(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    className: { type: String, required: true },
    dueDate: { type: String, required: true },
    questionTypes: [
      {
        type: { type: String, required: true },
        numberOfQuestions: { type: Number, required: true },
        marks: { type: Number, required: true },
      },
    ],
    additionalInstructions: { type: String },
    fileUrl: { type: String },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IAssignment>("Assignment", AssignmentSchema);
