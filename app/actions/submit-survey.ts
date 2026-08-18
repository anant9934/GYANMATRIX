"use server";

import { db } from "@/db";
import { surveyRespondents, surveyResponses } from "@/db/schema";
import { SURVEY_QUESTIONS } from "@/data/questions";
import { validateAnswer } from "@/lib/survey-validation";
import { normalizeAnswer, NORMALIZATION_VERSION } from "@/lib/survey-normalization";

interface SubmitSurveyPayload {
  surveyVersion: string;
  consentGiven: boolean;
  startedAt: string;
  respondentId?: string | null;
  answers: Record<string, unknown>;
}

export async function submitSurveyAction(payload: SubmitSurveyPayload) {
  try {
    if (!payload.consentGiven) {
      return { success: false, error: "Consent is required to submit the survey." };
    }

    if (!payload.surveyVersion || !payload.startedAt || !payload.answers) {
      return { success: false, error: "Malformed payload." };
    }

    // Pre-validate all required questions
    for (const q of SURVEY_QUESTIONS) {
      const val = payload.answers[q.id];
      const validation = validateAnswer(q, val);
      if (!validation.isValid) {
        return { success: false, error: `Validation failed for ${q.id}: ${validation.error}` };
      }
    }

    // Pre-validate unexpected fields (optional but strict)
    for (const key of Object.keys(payload.answers)) {
      if (!SURVEY_QUESTIONS.find((q) => q.id === key)) {
        return { success: false, error: `Unknown question ID: ${key}` };
      }
    }

    const respondentId = payload.respondentId || crypto.randomUUID();
    const startedAt = new Date(payload.startedAt);
    if (isNaN(startedAt.getTime())) {
      return { success: false, error: "Invalid startedAt date." };
    }

    // 1. Prepare Respondent
    const respondentInsert = db.insert(surveyRespondents).values({
      id: respondentId,
      surveyVersion: payload.surveyVersion,
      consentGiven: payload.consentGiven,
      startedAt,
      completedAt: new Date(),
    });

    // 2. Prepare Responses
    const responsesToInsert = Object.entries(payload.answers).map(([questionId, rawAnswer]) => {
      const normalizedAnswer = normalizeAnswer(questionId, rawAnswer);
      return {
        respondentId,
        questionId,
        rawAnswer,
        normalizedAnswer: { version: NORMALIZATION_VERSION, data: normalizedAnswer }
      };
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const queries: any[] = [respondentInsert];
    if (responsesToInsert.length > 0) {
      queries.push(db.insert(surveyResponses).values(responsesToInsert));
    }

    // neon-http driver doesn't support interactive transactions, but supports db.batch
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await db.batch(queries as any);

    return { success: true, respondentId };
  } catch (error: unknown) {
    console.error("Survey submission failed:", error);
    // Handle idempotency (duplicate submission)
    if (error && typeof error === 'object' && 'code' in error && (error as { code: string }).code === '23505') { // PostgreSQL unique constraint violation code
       return { success: true, respondentId: payload.respondentId, message: "Already submitted." };
    }
    // Return a generic error to the client, logging the real error internally
    return { success: false, error: "We couldn't save your response. Your answers are still here. Please try again." };
  }
}
