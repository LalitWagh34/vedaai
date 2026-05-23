"use client";
import { useAssignmentStore } from "@/store/assignmentStore";

export default function StepOne() {
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
            className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
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
            className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
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
            className="w-full px-3 py-2 text-gray-900 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>
      </div>
    </div>
  );
}