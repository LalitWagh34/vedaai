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
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
      <h2 className="font-semibold text-gray-900 mb-1">Assignment Details</h2>
      <p className="text-sm text-gray-500 mb-5">
        Basic information about your assignment
      </p>

      {/* File Upload */}
      <div
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors mb-2"
      >
        <Upload size={22} className="text-gray-400 mb-2" />
        <p className="text-sm font-medium text-gray-700 text-center">
          Choose a file or drag & drop it here
        </p>
        <p className="text-xs text-gray-400 mb-3">JPEG, PNG, upto 10MB</p>
        <button
          type="button"
          className="px-4 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-100"
          onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}
        >
          Browse Files
        </button>
        <input ref={fileRef} type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
      </div>
      <p className="text-xs text-gray-400 text-center mb-5">
        Upload images of your preferred document/image
      </p>

      {/* Due Date */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Due Date
        </label>
        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm({ dueDate: e.target.value })}
          placeholder="DD-MM-YYYY"
          className="w-full px-3 py-2.5 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>

      {/* Question Types */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Question Type
        </label>

        <div className="space-y-3">
          {form.questionTypes.map((qt) => (
            <div
              key={qt.id}
              className="border border-gray-200 rounded-xl p-3"
            >
              {/* Dropdown row with X */}
              <div className="flex items-center gap-2 mb-3">
                <select
                  value={qt.type}
                  onChange={(e) =>
                    updateQuestionType(qt.id, { type: e.target.value })
                  }
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-900"
                >
                  {QUESTION_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => removeQuestionType(qt.id)}
                  className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 shrink-0"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Steppers row */}
              <div className="flex items-center gap-4">
                {/* No. of Questions */}
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1.5">No. of Questions</p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuestionType(qt.id, {
                          numberOfQuestions: Math.max(1, qt.numberOfQuestions - 1),
                        })
                      }
                      className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 shrink-0"
                    >
                      −
                    </button>
                    <span className="text-sm font-medium text-gray-900 w-5 text-center">
                      {qt.numberOfQuestions}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuestionType(qt.id, {
                          numberOfQuestions: qt.numberOfQuestions + 1,
                        })
                      }
                      className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 shrink-0"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Marks */}
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1.5">Marks</p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuestionType(qt.id, {
                          marks: Math.max(1, qt.marks - 1),
                        })
                      }
                      className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 shrink-0"
                    >
                      −
                    </button>
                    <span className="text-sm font-medium text-gray-900 w-5 text-center">
                      {qt.marks}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuestionType(qt.id, { marks: qt.marks + 1 })
                      }
                      className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 shrink-0"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Question Type */}
        <button
          type="button"
          onClick={addQuestionType}
          className="flex items-center gap-2 mt-3 text-sm text-gray-600 hover:text-gray-900"
        >
          <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center">
            <Plus size={13} className="text-white" />
          </div>
          Add Question Type
        </button>

        {/* Totals */}
        <div className="mt-4 text-right text-sm text-gray-600 space-y-0.5">
          <p>
            Total Questions :{" "}
            <span className="font-medium text-gray-900">{totalQuestions}</span>
          </p>
          <p>
            Total Marks :{" "}
            <span className="font-medium text-gray-900">{totalMarks}</span>
          </p>
        </div>
      </div>

      {/* Additional Instructions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Additional Information{" "}
          <span className="text-gray-400 font-normal">(For better output)</span>
        </label>
        <div className="relative">
          <textarea
            placeholder="e.g. Generate a question paper for 3 hour exam duration..."
            value={form.additionalInstructions}
            onChange={(e) =>
              setForm({ additionalInstructions: e.target.value })
            }
            rows={3}
            className="w-full px-3 py-2.5 pr-9 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none"
          />
          <button
            type="button"
            className="absolute bottom-3 right-3 text-gray-400 hover:text-gray-600"
          >
            <Mic size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}