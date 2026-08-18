import { SURVEY_QUESTIONS } from "../data/questions";
import { QuestionOption } from "../types/survey";

export const NORMALIZATION_VERSION = "v1";

function findOptionLabel(options: QuestionOption[] | undefined, id: string): string {
  if (!options) return id;
  const option = options.find((o) => o.id === id);
  return option ? option.label : id;
}

export function normalizeAnswer(questionId: string, rawAnswer: unknown): unknown {
  const question = SURVEY_QUESTIONS.find((q) => q.id === questionId);
  if (!question) return null;

  switch (question.type) {
    case "single-select": {
      if (typeof rawAnswer !== "string") return null;
      return {
        code: rawAnswer,
        label: findOptionLabel(question.options, rawAnswer)
      };
    }
    case "multi-select": {
      if (!Array.isArray(rawAnswer)) return null;
      return rawAnswer.map((val) => {
        if (typeof val === "string") {
          return {
            code: val,
            label: findOptionLabel(question.options, val)
          };
        }
        return null;
      }).filter(Boolean);
    }
    case "dual-select": {
      if (typeof rawAnswer !== "object" || !rawAnswer) return null;
      const dual = rawAnswer as { partA?: string; partB?: string };
      return {
        partA: dual.partA ? { code: dual.partA, label: findOptionLabel(question.partA?.options, dual.partA) } : null,
        partB: dual.partB ? { code: dual.partB, label: findOptionLabel(question.partB?.options, dual.partB) } : null,
      };
    }
    case "matrix": {
      // Matrix values are numbers, no labels to map except maybe the scale text, but numbers are self-evident
      // Let's normalize it to an array of objects
      if (typeof rawAnswer !== "object" || !rawAnswer) return null;
      const matrix = rawAnswer as Record<string, number>;
      const normalized: Array<{ rowId: string; rowLabel: string; rating: number }> = [];
      
      for (const row of question.rows || []) {
        if (matrix[row.id] !== undefined) {
          normalized.push({
            rowId: row.id,
            rowLabel: row.label,
            rating: matrix[row.id]
          });
        }
      }
      return normalized;
    }
    case "scale": {
      if (typeof rawAnswer !== "number") return null;
      return { rating: rawAnswer };
    }
    case "short-text": {
      if (typeof rawAnswer !== "string") return null;
      return { text: rawAnswer.trim() };
    }
    default:
      return null;
  }
}
