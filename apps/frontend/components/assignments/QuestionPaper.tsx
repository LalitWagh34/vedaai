import { useRef } from "react";

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
  schoolName: string;
  subject: string;
  className: string;
  timeAllowed: string;
  maximumMarks: number;
  sections: Section[];
}

const difficultyStyle = {
  easy: "bg-green-100 text-green-700",
  moderate: "bg-yellow-100 text-yellow-700",
  hard: "bg-red-100 text-red-700",
};

export default function QuestionPaper({ paper }: { paper: Paper }) {
  return (
    <div id="question-paper" className="bg-white rounded-xl border border-gray-200 p-8 print:shadow-none">
      {/* Header */}
      <div className="text-center mb-6 border-b border-gray-200 pb-6">
        <h1 className="text-xl font-bold text-gray-900">{paper.schoolName}</h1>
        <p className="text-gray-700 font-medium mt-1">Subject: {paper.subject}</p>
        <p className="text-gray-600">Class: {paper.className}</p>
      </div>

      {/* Meta */}
      <div className="flex justify-between text-sm text-gray-700 mb-4">
        <p>Time Allowed: {paper.timeAllowed}</p>
        <p>Maximum Marks: {paper.maximumMarks}</p>
      </div>

      <p className="text-sm text-gray-600 mb-6 italic">
        All questions are compulsory unless stated otherwise.
      </p>

      {/* Student Info */}
      <div className="flex gap-8 mb-8 text-sm text-gray-700">
        <p>
          Name:{" "}
          <span className="inline-block border-b border-gray-400 w-32">&nbsp;</span>
        </p>
        <p>
          Roll Number:{" "}
          <span className="inline-block border-b border-gray-400 w-24">&nbsp;</span>
        </p>
        <p>
          Section:{" "}
          <span className="inline-block border-b border-gray-400 w-16">&nbsp;</span>
        </p>
      </div>

      {/* Sections */}
      {paper.sections.map((section, si) => (
        <div key={si} className="mb-8">
          <h2 className="text-center font-bold text-gray-900 mb-1">
            {section.label}
          </h2>
          <p className="text-center text-sm text-gray-500 italic mb-4">
            {section.instruction}
          </p>

          <div className="space-y-4">
            {section.questions.map((q, qi) => (
              <div key={qi} className="flex gap-3">
                <span className="text-sm text-gray-700 font-medium min-w-[20px]">
                  {qi + 1}.
                </span>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm text-gray-800">{q.text}</p>
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`no-print text-xs px-2 py-0.5 rounded-full font-medium ${
                          difficultyStyle[q.difficulty]
                        }`}
                      >
                        {q.difficulty.charAt(0).toUpperCase() +
                          q.difficulty.slice(1)}
                      </span>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        [{q.marks} marks]
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Answer Key */}
      {paper.sections.some((s) => s.questions.some((q) => q.answerKey)) && (
        <div className="mt-8 border-t border-gray-200 pt-6">
          <h2 className="font-bold text-gray-900 mb-4">Answer Key</h2>
          {paper.sections.map((section, si) =>
            section.questions.map(
              (q, qi) =>
                q.answerKey && (
                  <div key={`${si}-${qi}`} className="mb-3 text-sm">
                    <span className="font-medium text-gray-700">
                      {qi + 1}.{" "}
                    </span>
                    <span className="text-gray-600">{q.answerKey}</span>
                  </div>
                )
            )
          )}
        </div>
      )}
    </div>
  );
}