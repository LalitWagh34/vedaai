import { Router, Request, Response } from "express";
import { z } from "zod";
import Assignment from "../models/Assignment";
import GeneratedPaper from "../models/GeneratedPaper";
import { assignmentQueue } from "../queues/assignmentQueue";

const router = Router();

const QuestionTypeSchema = z.object({
  type: z.string().min(1),
  numberOfQuestions: z.number().min(1),
  marks: z.number().min(1),
});

const AssignmentSchema = z.object({
  title: z.string().min(1),
  subject: z.string().min(1),
  className: z.string().min(1),
  dueDate: z.string().min(1),
  questionTypes: z.array(QuestionTypeSchema).min(1),
  additionalInstructions: z.string().optional(),
});

// Create assignment
router.post("/", async (req: Request, res: Response) => {
  try {
    const validated = AssignmentSchema.parse(req.body);

    const assignment = await Assignment.create(validated);

    const job = await assignmentQueue.add("generate", {
      assignmentId: assignment._id,
    });

    res.status(201).json({
      success: true,
      assignmentId: assignment._id,
      jobId: job.id,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Get all assignments
router.get("/", async (req: Request, res: Response) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    res.json({ success: true, data: assignments });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single assignment
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ success: false, error: "Not found" });
    }
    res.json({ success: true, data: assignment });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete assignment
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get generated paper by assignment id
router.get("/:id/paper", async (req: Request, res: Response) => {
  try {
    const paper = await GeneratedPaper.findOne({
      assignmentId: req.params.id,
    });
    if (!paper) {
      return res.status(404).json({ success: false, error: "Paper not found" });
    }
    res.json({ success: true, data: paper });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;