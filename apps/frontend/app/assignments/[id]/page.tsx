"use client";
import { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import QuestionPaper from "@/components/assignments/QuestionPaper";
import { Download, RefreshCw } from "lucide-react";
import { io } from "socket.io-client";


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
const handleDownload = async () => {
  const element = document.getElementById("question-paper");
  if (!element) return;

  const html2pdf = (await import("html2pdf.js")).default;

  const opt = {
    margin: 10,
    filename: `${paper?.subject}-${paper?.className}.pdf`,
    image: { type: "jpeg" as const, quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
    jsPDF: { unit: "mm" as const, format: "a4", orientation: "portrait" as const },
  };

  html2pdf().set(opt).from(element).save();
};
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    const start = async () => {
      const done = await fetchPaper();
      if (done) return;

      setStatus("processing");

      const socket = io(
        process.env.NEXT_PUBLIC_WS_URL || "http://localhost:4000"
      );

      socket.on("connect", () => {
        const jobId = new URLSearchParams(window.location.search).get("jobId");
        if (jobId) socket.emit("join:job", jobId);
      });

      socket.on("job:complete", async () => {
        clearInterval(interval);
        clearTimeout(timeout);
        await fetchPaper();
        socket.disconnect();
      });

      socket.on("job:status", (data) => {
        if (data.status === "failed") {
          clearInterval(interval);
          clearTimeout(timeout);
          setStatus("failed");
          setError(data.error);
          socket.disconnect();
        }
      });

      interval = setInterval(async () => {
        const done = await fetchPaper();
        if (done) {
          clearInterval(interval);
          clearTimeout(timeout);
          socket.disconnect();
        }
      }, 3000);

      timeout = setTimeout(() => {
        clearInterval(interval);
        setStatus("failed");
        setError("Generation timed out. Please try again.");
        socket.disconnect();
      }, 120000);
    };

    start();

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
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
    <div className="p-4 md:p-6 max-w-4xl mx-auto overflow-x-hidden w-full">
      {/* AI Message */}
      <div className="bg-gray-900 text-white rounded-xl p-4 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <p className="text-sm">
          Here is your customized Question Paper for{" "}
          <span className="font-semibold">{paper.subject}</span> — Class{" "}
          {paper.className}
        </p>
        <button
            onClick={handleDownload}
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
      <div id="question-paper-wrapper">
        <QuestionPaper paper={paper} />
      </div>
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