"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Filter, Search, MoreVertical, Trash2, Eye } from "lucide-react";
import api from "@/lib/api";

interface Assignment {
  _id: string;
  title: string;
  subject: string;
  className: string;
  dueDate: string;
  createdAt: string;
  status: string;
}

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const fetchAssignments = async () => {
    try {
      const res = await api.get("/api/assignments");
      setAssignments(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/api/assignments/${id}`);
      setAssignments((prev) => prev.filter((a) => a._id !== id));
      setOpenMenu(null);
    } catch (error) {
      console.error(error);
    }
  };

  const filtered = assignments.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB").replace(/\//g, "-");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (assignments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
        <div className="relative w-48 h-48">
          <div className="absolute inset-0 bg-gray-100 rounded-full" />
          <div className="absolute inset-4 bg-white rounded-xl shadow-sm flex items-center justify-center">
            <div className="relative">
              <div className="w-16 h-20 bg-gray-100 rounded-lg border border-gray-200 flex flex-col gap-1.5 p-2">
                <div className="h-1.5 bg-gray-300 rounded w-full" />
                <div className="h-1.5 bg-gray-300 rounded w-3/4" />
                <div className="h-1.5 bg-gray-300 rounded w-full" />
                <div className="h-1.5 bg-gray-300 rounded w-1/2" />
              </div>
              <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-white rounded-full border-2 border-gray-100 flex items-center justify-center shadow">
                <span className="text-red-500 text-lg font-bold">✕</span>
              </div>
            </div>
          </div>
          <div className="absolute top-2 right-6 w-3 h-3 bg-pink-400 rotate-45" />
          <div className="absolute bottom-6 left-2 w-2 h-2 bg-blue-400 rounded-full" />
          <div className="absolute top-8 left-4 w-1.5 h-1.5 bg-yellow-400 rounded-full" />
        </div>
        <h2 className="text-lg font-semibold text-gray-800">No assignments yet</h2>
        <p className="text-gray-500 text-sm text-center max-w-sm">
          Create your first assignment to start collecting and grading student
          submissions. You can set up rubrics, define marking criteria, and let
          AI assist with grading.
        </p>
        <Link
          href="/assignments/create"
          className="flex items-center gap-2 bg-gray-900 text-white rounded-full px-5 py-2.5 text-sm hover:bg-gray-700 transition-colors"
        >
          <Plus size={14} />
          Create Your First Assignment
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Assignments</h1>
        <p className="text-sm text-gray-500">
          Manage and create assignments for your classes.
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-3 mb-6">
        <button className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
          <Filter size={14} />
          Filter By
        </button>
        <div className="flex-1 relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search Assignment"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((assignment) => (
          <div
            key={assignment._id}
            className="bg-white rounded-xl border border-gray-200 p-4 relative"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {assignment.subject} • Class {assignment.className}
                </p>
              </div>
              <div className="relative">
                <button
                  onClick={() =>
                    setOpenMenu(
                      openMenu === assignment._id ? null : assignment._id
                    )
                  }
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <MoreVertical size={16} className="text-gray-500" />
                </button>
                {openMenu === assignment._id && (
                  <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[150px]">
                    <Link
                      href={`/assignments/${assignment._id}`}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Eye size={14} />
                      View Assignment
                    </Link>
                    <button
                      onClick={() => handleDelete(assignment._id)}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
              <span>
                <span className="font-medium">Assigned on:</span>{" "}
                {formatDate(assignment.createdAt)}
              </span>
              <span>
                <span className="font-medium">Due:</span>{" "}
                {assignment.dueDate}
              </span>
            </div>
            <div className="mt-2">
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  assignment.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : assignment.status === "processing"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {assignment.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Floating create button */}
{/* Floating create button */}
 <div className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
    <Link
      href="/assignments/create"
      className="flex items-center gap-2 bg-gray-900 text-white rounded-full px-5 py-2.5 text-sm shadow-lg hover:bg-gray-700 transition-colors"
    >
      <Plus size={14} />
      Create Assignment
    </Link>
  </div>
    </div>
  );
}