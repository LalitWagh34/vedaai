import { create } from "zustand";

export interface QuestionTypeConfig {
  id: string;
  type: string;
  numberOfQuestions: number;
  marks: number;
}

export interface AssignmentForm {
  title: string;
  subject: string;
  className: string;
  dueDate: string;
  questionTypes: QuestionTypeConfig[];
  additionalInstructions: string;
}

interface AssignmentStore {
  // Form state
  form: AssignmentForm;
  currentStep: number;
  isSubmitting: boolean;
  jobId: string | null;
  paperId: string | null;
  jobStatus: "idle" | "waiting" | "processing" | "completed" | "failed";

  // Actions
  setForm: (data: Partial<AssignmentForm>) => void;
  setStep: (step: number) => void;
  addQuestionType: () => void;
  removeQuestionType: (id: string) => void;
  updateQuestionType: (id: string, data: Partial<QuestionTypeConfig>) => void;
  setJobId: (jobId: string) => void;
  setPaperId: (paperId: string) => void;
  setJobStatus: (status: AssignmentStore["jobStatus"]) => void;
  setIsSubmitting: (val: boolean) => void;
  resetForm: () => void;
}

const defaultForm: AssignmentForm = {
  title: "",
  subject: "",
  className: "",
  dueDate: "",
  questionTypes: [
    {
      id: "1",
      type: "Multiple Choice Questions",
      numberOfQuestions: 4,
      marks: 1,
    },
  ],
  additionalInstructions: "",
};

export const useAssignmentStore = create<AssignmentStore>((set) => ({
  form: defaultForm,
  currentStep: 1,
  isSubmitting: false,
  jobId: null,
  paperId: null,
  jobStatus: "idle",

  setForm: (data) =>
    set((state) => ({ form: { ...state.form, ...data } })),

  setStep: (step) => set({ currentStep: step }),

  addQuestionType: () =>
    set((state) => ({
      form: {
        ...state.form,
        questionTypes: [
          ...state.form.questionTypes,
          {
            id: Date.now().toString(),
            type: "Short Questions",
            numberOfQuestions: 3,
            marks: 2,
          },
        ],
      },
    })),

  removeQuestionType: (id) =>
    set((state) => ({
      form: {
        ...state.form,
        questionTypes: state.form.questionTypes.filter((qt) => qt.id !== id),
      },
    })),

  updateQuestionType: (id, data) =>
    set((state) => ({
      form: {
        ...state.form,
        questionTypes: state.form.questionTypes.map((qt) =>
          qt.id === id ? { ...qt, ...data } : qt
        ),
      },
    })),

  setJobId: (jobId) => set({ jobId }),
  setPaperId: (paperId) => set({ paperId }),
  setJobStatus: (jobStatus) => set({ jobStatus }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),

  resetForm: () =>
    set({
      form: defaultForm,
      currentStep: 1,
      jobId: null,
      paperId: null,
      jobStatus: "idle",
    }),
}));