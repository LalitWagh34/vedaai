import { Worker, Job } from "bullmq";
import Assignment from "../models/Assignment";
import GeneratedPaper from "../models/GeneratedPaper";
import Groq from "groq-sdk";
import { io } from "../socket/socket";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const buildPrompt = (data: any): string => {
  const sections = data.questionTypes
    .map(
      (qt: any) =>
        `- ${qt.type}: ${qt.numberOfQuestions} questions, ${qt.marks} marks each`
    )
    .join("\n");

  return `You are an expert teacher creating a question paper.
Create a structured question paper with the following requirements:

Subject: ${data.subject}
Class: ${data.className}
Question Types:
${sections}
Additional Instructions: ${data.additionalInstructions || "None"}

Respond ONLY with valid JSON in this exact format, no markdown, no explanation:
{
  "timeAllowed": "45 minutes",
  "maximumMarks": 20,
  "sections": [
    {
      "label": "Section A",
      "instruction": "Attempt all questions",
      "questions": [
        {
          "text": "Question text here",
          "difficulty": "easy",
          "marks": 2,
          "type": "Short Answer",
          "answerKey": "Answer here"
        }
      ]
    }
  ]
}`;
};

export const startWorker = () => {
  const worker = new Worker(
    "assignment-generation",
    async (job: Job) => {
      const { assignmentId } = job.data;

      await Assignment.findByIdAndUpdate(assignmentId, {
        status: "processing",
      });

      io.to(`job:${job.id}`).emit("job:status", {
        jobId: job.id,
        status: "processing",
      });

      const assignment = await Assignment.findById(assignmentId);
      if (!assignment) throw new Error("Assignment not found");

      const prompt = buildPrompt(assignment);

      const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      });

      const raw = response.choices[0].message.content || "";
      const parsed = JSON.parse(raw);

      const paper = await GeneratedPaper.create({
        assignmentId,
        subject: assignment.subject,
        className: assignment.className,
        schoolName: "Delhi Public School",
        timeAllowed: parsed.timeAllowed,
        maximumMarks: parsed.maximumMarks,
        sections: parsed.sections,
      });

      await Assignment.findByIdAndUpdate(assignmentId, {
        status: "completed",
      });

      io.to(`job:${job.id}`).emit("job:complete", {
        jobId: job.id,
        status: "completed",
        paperId: paper._id,
      });
    },
    {
      connection: {
        url: process.env.REDIS_URL,
        tls: {},
      },
    }
  );

  worker.on("failed", async (job, err) => {
    if (job) {
      await Assignment.findByIdAndUpdate(job.data.assignmentId, {
        status: "failed",
      });
      io.to(`job:${job.id}`).emit("job:status", {
        jobId: job.id,
        status: "failed",
        error: err.message,
      });
    }
  });

  console.log("Worker started");
};