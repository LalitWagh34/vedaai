"use client";
import { useAssignmentStore } from "@/store/assignmentStore";

export default function StepOne({ errors }: { errors: Record<string, string> }) {
  const { form, setForm } = useAssignmentStore();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="font-semibold text-gray-900 mb-1">Basic Information</h2>
      <p className="text-sm text-gray-500 mb-6">
        Basic information about your assignment
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assignment Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Quiz on Electricity"
            value={form.title}
            onChange={(e) => setForm({ title: e.target.value })}
            className={`w-full px-3 py-2 text-sm text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 ${
              errors.title ? "border-red-400" : "border-gray-200"
            }`}
          />
          {errors.title && (
            <p className="text-xs text-red-500 mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Science"
            value={form.subject}
            onChange={(e) => setForm({ subject: e.target.value })}
            className={`w-full px-3 py-2 text-sm text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 ${
              errors.subject ? "border-red-400" : "border-gray-200"
            }`}
          />
          {errors.subject && (
            <p className="text-xs text-red-500 mt-1">{errors.subject}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Class <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. 8th"
            value={form.className}
            onChange={(e) => setForm({ className: e.target.value })}
            className={`w-full px-3 py-2 text-sm text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 ${
              errors.className ? "border-red-400" : "border-gray-200"
            }`}
          />
          {errors.className && (
            <p className="text-xs text-red-500 mt-1">{errors.className}</p>
          )}
        </div>
      </div>
    </div>
  );
}