"use client";
import { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import QuestionPaper from "@/components/assignments/QuestionPaper";
import { Download, RefreshCw } from "lucide-react";

interface Question {
  text: string;
  difficulty: "easy" | "moderate" | "hard";
  marks: number;
  type: string;
  answerKey?: string;
}

interface Section {
  label: string;
  instruction: string;
  questions: Question[];
}

interface Paper {
  _id: string;
  assignmentId: string;
  schoolName: string;
  subject: string;
  className: string;
  timeAllowed: string;
  maximumMarks: number;
  sections: Section[];
  createdAt: string;
}

function AssignmentOutput() {
  const { id } = useParams();
  const [paper, setPaper] = useState<Paper | null>(null);
  const [status, setStatus] = useState<"loading" | "processing" | "completed" | "failed">("loading");
  const [error, setError] = useState<string | null>(null);

const fetchPaper = async () => {
    try {
      const res = await api.get(`/api/assignments/${id}/paper`);
      console.log("Paper response:", res.data);
      if (res.data.success) {
        setPaper(res.data.data);
        setStatus("completed");
        return true;
      }
    } catch (err) {
      console.error("Fetch paper error:", err);
      return false;
    }
    return false;
  };

  useEffect(() => {
    const start = async () => {
      const done = await fetchPaper();
      if (done) return;

      setStatus("processing");

      const interval = setInterval(async () => {
        const done = await fetchPaper();
        if (done) clearInterval(interval);
      }, 3000);

      setTimeout(() => {
        clearInterval(interval);
        setStatus("failed");
        setError("Generation timed out. Please try again.");
      }, 120000);
    };

    start();
  }, [id]);

  if (status === "loading" || status === "processing") {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" />
        <p className="text-gray-600 font-medium">
          {status === "loading"
            ? "Loading..."
            : "AI is generating your question paper..."}
        </p>
        <p className="text-gray-400 text-sm">This may take a few seconds</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-red-600 font-medium">Generation failed</p>
        <p className="text-gray-500 text-sm">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gray-900 text-white rounded-full text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!paper) return null;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* AI Message */}
      <div className="bg-gray-900 text-white rounded-xl p-4 mb-6 flex items-center justify-between">
        <p className="text-sm">
          Here is your customized Question Paper for{" "}
          <span className="font-semibold">{paper.subject}</span> — Class{" "}
          {paper.className}
        </p>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-white text-gray-900 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
        >
          <Download size={14} />
          Download as PDF
        </button>
      </div>

      {/* Regenerate */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-gray-50"
        >
          <RefreshCw size={14} />
          Regenerate
        </button>
      </div>

      {/* Question Paper */}
      <QuestionPaper paper={paper} />
    </div>
  );
}

export default function AssignmentOutputPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" /></div>}>
      <AssignmentOutput />
    </Suspense>
  );
}