"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import StepOne from "@/components/assignments/StepOne";
import StepTwo from "@/components/assignments/StepTwo";
import { useAssignmentStore } from "@/store/assignmentStore";
import api from "@/lib/api";

export default function CreateAssignmentPage() {
  const router = useRouter();
  const { form, currentStep, setStep, setJobId, setJobStatus, setIsSubmitting, isSubmitting } =
    useAssignmentStore();

const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNext = () => {
    const newErrors: Record<string, string> = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.className.trim()) newErrors.className = "Class is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setStep(2);
  };
  const handlePrev = () => setStep(1);

  const handleSubmit = async () => {
    if (form.questionTypes.length === 0) {
    alert("Please add at least one question type");
    return;
  }
  if (!form.dueDate) {
    alert("Please select a due date");
    return;
  }
  const hasInvalid = form.questionTypes.some(
    (qt) => qt.numberOfQuestions < 1 || qt.marks < 1
  );
  if (hasInvalid) {
    alert("Questions and marks must be greater than 0");
    return;
  }
    try {
    
      setIsSubmitting(true);
      const payload = {
        title: form.title,
        subject: form.subject,
        className: form.className,
        dueDate: form.dueDate,
        questionTypes: form.questionTypes.map((qt) => ({
          type: qt.type,
          numberOfQuestions: qt.numberOfQuestions,
          marks: qt.marks,
        })),
        additionalInstructions: form.additionalInstructions,
      };

      const res = await api.post("/api/assignments", payload);
      const { assignmentId, jobId } = res.data;

      setJobId(jobId);
      setJobStatus("waiting");

      router.push(`/assignments/${assignmentId}?jobId=${jobId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <h1 className="text-lg font-semibold text-gray-900">
            Create Assignment
          </h1>
        </div>
        <p className="text-sm text-gray-500">
          Set up a new assignment for your students
        </p>
      </div>

      {/* Stepper */}
      <div className="mb-6">
        <div className="flex gap-1">
          <div className="h-1 flex-1 rounded-full bg-gray-900" />
          <div
            className={`h-1 flex-1 rounded-full ${
              currentStep === 2 ? "bg-gray-900" : "bg-gray-200"
            }`}
          />
        </div>
      </div>

      {/* Steps */}
      {currentStep === 1 ? <StepOne errors={errors} /> : <StepTwo />} {currentStep === 1 ? <StepOne errors={errors} /> : <StepTwo />}{currentStep === 1 ? <StepOne errors={errors} /> : <StepTwo />}

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        {currentStep === 2 ? (
          <button
            onClick={handlePrev}
            className="flex items-center gap-2 px-5 py-2.5 text-sm border border-gray-200 rounded-full hover:bg-gray-50"
          >
            <ArrowLeft size={14} />
            Previous
          </button>
        ) : (
          <div />
        )}

        {currentStep === 1 ? (
          <button
            onClick={handleNext}
            disabled={!form.title || !form.subject || !form.className}
            className="flex items-center gap-2 px-5 py-2.5 text-sm bg-gray-900 text-white rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ArrowRight size={14} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || form.questionTypes.length === 0}
            className="flex items-center gap-2 px-5 py-2.5 text-sm bg-gray-900 text-white rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Generating..." : "Generate"}
            <ArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}