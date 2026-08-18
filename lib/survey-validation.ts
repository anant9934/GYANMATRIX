import { QuestionConfig } from "../types/survey";

export function validateAnswer(question: QuestionConfig, answer: unknown): { isValid: boolean; error?: string } {
  if (question.required && (answer === undefined || answer === null || answer === "")) {
    if (question.type === "matrix" && typeof answer === "object") {
      // Matrices are object maps, an empty object will be caught below
    } else {
      return { isValid: false, error: "This question is required." };
    }
  }

  if (!question.required && (answer === undefined || answer === null || answer === "")) {
    return { isValid: true };
  }

  switch (question.type) {
    case "single-select":
      if (typeof answer !== "string" || !question.options?.find(o => o.id === answer)) {
        return { isValid: false, error: "Invalid selection." };
      }
      break;

    case "multi-select": {
      const multiAnswer = answer as string[];
      if (!Array.isArray(multiAnswer)) return { isValid: false, error: "Must be an array of selections." };
      if (question.required && multiAnswer.length === 0) return { isValid: false, error: "Please select at least one option." };
      if (question.maxSelections && multiAnswer.length > question.maxSelections) {
        return { isValid: false, error: `Maximum ${question.maxSelections} selections allowed.` };
      }
      for (const val of multiAnswer) {
        if (!question.options?.find(o => o.id === val)) return { isValid: false, error: "Invalid selection." };
      }
      break;
    }

    case "dual-select": {
      const dualAnswer = answer as { partA?: string; partB?: string };
      if (typeof dualAnswer !== "object" || !dualAnswer) return { isValid: false, error: "Invalid selection." };
      if (question.required && (!dualAnswer.partA || !dualAnswer.partB)) {
        return { isValid: false, error: "Please select both options." };
      }
      if (dualAnswer.partA && !question.partA?.options.find(o => o.id === dualAnswer.partA)) return { isValid: false, error: "Invalid Part A selection." };
      if (dualAnswer.partB && !question.partB?.options.find(o => o.id === dualAnswer.partB)) return { isValid: false, error: "Invalid Part B selection." };
      break;
    }

    case "matrix": {
      const matrixAnswer = answer as Record<string, number>;
      if (typeof matrixAnswer !== "object" || !matrixAnswer) return { isValid: false, error: "Invalid matrix data." };
      if (question.required) {
        for (const row of question.rows || []) {
          if (matrixAnswer[row.id] === undefined) {
            return { isValid: false, error: "Please provide a rating for all items." };
          }
        }
      }
      for (const row of question.rows || []) {
        const val = matrixAnswer[row.id];
        if (val !== undefined) {
          if (typeof val !== "number" || val < (question.scale?.min || 1) || val > (question.scale?.max || 5)) {
            return { isValid: false, error: "Invalid rating value." };
          }
        }
      }
      break;
    }

    case "scale":
      if (typeof answer !== "number" || answer < (question.scale?.min || 1) || answer > (question.scale?.max || 5)) {
        return { isValid: false, error: "Invalid scale value." };
      }
      break;

    case "short-text": {
      const textAnswer = answer as string;
      if (typeof textAnswer !== "string") return { isValid: false, error: "Must be text." };
      if (question.maxLength && textAnswer.trim().length > question.maxLength) {
        return { isValid: false, error: `Maximum length is ${question.maxLength} characters.` };
      }
      break;
    }
  }

  return { isValid: true };
}
