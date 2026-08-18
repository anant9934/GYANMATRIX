export type QuestionType =
  | "single-select"
  | "multi-select"
  | "dual-select"
  | "matrix"
  | "scale"
  | "short-text";

export interface QuestionOption {
  id: string;
  label: string;
}

export interface QuestionConfig {
  id: string;
  type: QuestionType;
  section: string;
  title: string;
  description?: string;
  required: boolean;
  options?: QuestionOption[]; // For single/multi
  partA?: { label: string; options: QuestionOption[] }; // For dual
  partB?: { label: string; options: QuestionOption[] }; // For dual
  rows?: QuestionOption[]; // For matrix
  scale?: { min: number; max: number; minLabel?: string; maxLabel?: string }; // For scale
  maxLength?: number; // For short text
  maxSelections?: number; // For multi-select
  placeholder?: string;
}

export interface SurveyState {
  hasConsented: boolean;
  isComplete: boolean;
  currentQuestionIndex: number;
  answers: Record<string, unknown>;
  startedAt: string | null;
  respondentId: string | null;
}
