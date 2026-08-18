import { useState, useEffect } from "react";
import { SurveyState } from "../types/survey";

const STORAGE_KEY = "gyanmatrix_survey_state";

const DEFAULT_STATE: SurveyState = {
  hasConsented: false,
  isComplete: false,
  currentQuestionIndex: 0,
  answers: {},
  startedAt: null,
  respondentId: null,
};

export function useSurveyState() {
  const [state, setState] = useState<SurveyState>(DEFAULT_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // We restore if not completed. If completed, start fresh.
        if (!parsed.isComplete) {
          // eslint-disable-next-line
          setState(parsed);
        }
      }
    } catch (e) {
      console.warn("Failed to load survey state from local storage", e);
    }
    setIsLoaded(true);
  }, []);

  const updateState = (updater: (prev: SurveyState) => SurveyState) => {
    setState((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.warn("Failed to save survey state to local storage", e);
      }
      return next;
    });
  };

  const setAnswer = (questionId: string, answer: unknown) => {
    updateState((s) => ({
      ...s,
      answers: { ...s.answers, [questionId]: answer },
    }));
  };

  const nextQuestion = () => {
    updateState((s) => ({
      ...s,
      currentQuestionIndex: s.currentQuestionIndex + 1,
    }));
  };

  const prevQuestion = () => {
    updateState((s) => ({
      ...s,
      currentQuestionIndex: Math.max(0, s.currentQuestionIndex - 1),
    }));
  };

  const completeSurvey = () => {
    updateState((s) => ({ ...s, isComplete: true }));
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const consent = () => {
    const newId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);
    updateState((s) => ({ ...s, hasConsented: true, startedAt: new Date().toISOString(), respondentId: newId }));
  };

  return {
    state,
    isLoaded,
    setAnswer,
    nextQuestion,
    prevQuestion,
    completeSurvey,
    consent,
  };
}
