export type QuestionType =
  | "MCQ"
  | "Short Answer"
  | "Long Answer"
  | "Diagram/Graph"
  | "Numerical";

export type Difficulty = "easy" | "moderate" | "hard";

export interface QuestionTypeConfig {
  type: QuestionType;
  numberOfQuestions: number;
  marks: number;
}

export interface Assignment {
  _id?: string;
  title: string;
  subject: string;
  className: string;
  dueDate: string;
  questionTypes: QuestionTypeConfig[];
  additionalInstructions?: string;
  fileUrl?: string;
  status: "pending" | "processing" | "completed" | "failed";
  createdAt?: string;
}

export interface Question {
  text: string;
  difficulty: Difficulty;
  marks: number;
  type: QuestionType;
  answerKey?: string;
}

export interface Section {
  label: string;
  instruction: string;
  questions: Question[];
}

export interface GeneratedPaper {
  _id?: string;
  assignmentId: string;
  schoolName: string;
  subject: string;
  className: string;
  timeAllowed: string;
  maximumMarks: number;
  sections: Section[];
  createdAt?: string;
}

export interface JobStatus {
  jobId: string;
  status: "waiting" | "active" | "completed" | "failed";
  paperId?: string;
  error?: string;
}