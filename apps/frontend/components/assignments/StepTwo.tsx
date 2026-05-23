"use client";
import { useRef } from "react";
import { Plus, X, Upload, Mic } from "lucide-react";
import { useAssignmentStore } from "@/store/assignmentStore";

const QUESTION_TYPES = [
  "Multiple Choice Questions",
  "Short Questions",
  "Long Questions",
  "Diagram/Graph-Based Questions",
  "Numerical Problems",
];

export default function StepTwo() {
  const {
    form,
    setForm,
    addQuestionType,
    removeQuestionType,
    updateQuestionType,
  } = useAssignmentStore();

  const fileRef = useRef<HTMLInputElement>(null);

  const totalQuestions = form.questionTypes.reduce(
    (sum, qt) => sum + qt.numberOfQuestions,
    0
  );
  const totalMarks = form.questionTypes.reduce(
    (sum, qt) => sum + qt.numberOfQuestions * qt.marks,
    0
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="font-semibold text-gray-900 mb-1">Assignment Details</h2>
      <p className="text-sm text-gray-500 mb-6">
        Basic information about your assignment
      </p>

      {/* File Upload */}
      <div
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors mb-6"
      >
        <Upload size={24} className="text-gray-400 mb-2" />
        <p className="text-sm font-medium text-gray-700">
          Choose a file or drag & drop it here
        </p>
        <p className="text-xs text-gray-400 mb-3">JPEG, PNG, upto 10MB</p>
        <button className="px-4 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-100">
          Browse Files
        </button>
        <input ref={fileRef} type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
      </div>
      <p className="text-xs text-gray-400 text-center mb-6">
        Upload images of your preferred document/image
      </p>

      {/* Due Date */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Due Date
        </label>
        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm({ dueDate: e.target.value })}
          className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>

      {/* Question Types */}
      <div className="mb-6">
        <div className="grid grid-cols-[1fr_auto_auto] gap-2 mb-2">
          <p className="text-sm font-medium text-gray-700">Question Type</p>
          <p className="text-sm font-medium text-gray-700 text-center w-28">
            No. of Questions
          </p>
          <p className="text-sm font-medium text-gray-700 text-center w-20">
            Marks
          </p>
        </div>

        <div className="space-y-3 text-gray-900">
          {form.questionTypes.map((qt) => (
            <div
              key={qt.id}
              className="grid grid-cols-[1fr_auto_auto] gap-2 items-center"
            >
              {/* Type dropdown */}
              <div className="flex items-center gap-1">
                <select
                  value={qt.type}
                  onChange={(e) =>
                    updateQuestionType(qt.id, { type: e.target.value })
                  }
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
                  {QUESTION_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => removeQuestionType(qt.id)}
                  className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500"
                >
                  <X size={14} />
                </button>
              </div>

              {/* No. of Questions stepper */}
              <div className="flex items-center gap-1 w-28 justify-center">
                <button
                  onClick={() =>
                    updateQuestionType(qt.id, {
                      numberOfQuestions: Math.max(1, qt.numberOfQuestions - 1),
                    })
                  }
                  className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="w-6 text-center text-sm">
                  {qt.numberOfQuestions}
                </span>
                <button
                  onClick={() =>
                    updateQuestionType(qt.id, {
                      numberOfQuestions: qt.numberOfQuestions + 1,
                    })
                  }
                  className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              {/* Marks stepper */}
              <div className="flex items-center gap-1 w-20 justify-center">
                <button
                  onClick={() =>
                    updateQuestionType(qt.id, {
                      marks: Math.max(1, qt.marks - 1),
                    })
                  }
                  className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="w-6 text-center text-sm">{qt.marks}</span>
                <button
                  onClick={() =>
                    updateQuestionType(qt.id, { marks: qt.marks + 1 })
                  }
                  className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Question Type */}
        <button
          onClick={addQuestionType}
          className="flex items-center gap-2 mt-4 text-sm text-gray-600 hover:text-gray-900"
        >
          <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
            <Plus size={12} />
          </div>
          Add Question Type
        </button>

        {/* Totals */}
        <div className="mt-4 text-right text-sm text-gray-600 space-y-1">
          <p>
            Total Questions :{" "}
            <span className="font-medium">{totalQuestions}</span>
          </p>
          <p>
            Total Marks : <span className="font-medium">{totalMarks}</span>
          </p>
        </div>
      </div>

      {/* Additional Instructions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Additional Information{" "}
          <span className="text-gray-400">(For better output)</span>
        </label>
        <div className="relative">
          <textarea
            placeholder="e.g. Generate a question paper for 3 hour exam duration..."
            value={form.additionalInstructions}
            onChange={(e) =>
              setForm({ additionalInstructions: e.target.value })
            }
            rows={3}
            className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none"
          />
          <button className="absolute bottom-3 right-3 text-gray-400 hover:text-gray-600">
            <Mic size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}