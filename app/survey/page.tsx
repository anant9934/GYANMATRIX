"use client";

import { useEffect, useState, useTransition } from "react";
import { useSurveyState } from "@/lib/useSurveyState";
import { SURVEY_QUESTIONS } from "@/data/questions";
import { ConsentScreen } from "@/components/survey/ConsentScreen";
import { CompletionScreen } from "@/components/survey/CompletionScreen";
import { SurveyShell } from "@/components/survey/SurveyShell";
import { SectionTransition } from "@/components/survey/SectionTransition";
import { submitSurveyAction } from "@/app/actions/submit-survey";
import Link from "next/link";

export default function SurveyPage() {
  const {
    state,
    isLoaded,
    setAnswer,
    nextQuestion,
    prevQuestion,
    completeSurvey,
    consent,
  } = useSurveyState();

  const [showingTransition, setShowingTransition] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [prevIndex, setPrevIndex] = useState(0);

  useEffect(() => {
    if (state.currentQuestionIndex > prevIndex) {
      const currentQ = SURVEY_QUESTIONS[state.currentQuestionIndex];
      const prevQ = SURVEY_QUESTIONS[prevIndex];
      if (
        currentQ.section !== prevQ.section || 
        currentQ.id === "Q21_RESTART" || 
        currentQ.id === "Q22_ADVICE"
      ) {
        // eslint-disable-next-line
        setShowingTransition(true);
      }
    }
    // eslint-disable-next-line
    setPrevIndex(state.currentQuestionIndex);
  }, [state.currentQuestionIndex, prevIndex]);

  if (!isLoaded) {
    return <div className="min-h-screen bg-[#faf9f8]" />;
  }

  if (state.isComplete) {
    return (
      <div className="flex flex-col min-h-screen bg-[#faf9f8] p-6 font-sans">
        <nav className="w-full max-w-7xl mx-auto flex justify-between items-center py-6 px-6">
          <Link href="/" className="text-sm font-medium tracking-widest uppercase text-neutral-900 hover:opacity-70 transition-opacity">
            GyanMatrix
          </Link>
        </nav>
        <CompletionScreen />
      </div>
    );
  }

  if (!state.hasConsented) {
    return (
      <div className="flex flex-col min-h-screen bg-[#faf9f8] p-6 font-sans">
        <nav className="w-full max-w-7xl mx-auto flex justify-between items-center py-6 px-6">
          <Link href="/" className="text-sm font-medium tracking-widest uppercase text-neutral-900 hover:opacity-70 transition-opacity">
            GyanMatrix
          </Link>
        </nav>
        <ConsentScreen onConsent={consent} />
      </div>
    );
  }

  const currentQuestion = SURVEY_QUESTIONS[state.currentQuestionIndex];

  if (showingTransition) {
    let title = "MOVING ON";
    let subtitle = `NOW LET'S LOOK AT ${currentQuestion.section.toUpperCase()}.`;

    if (currentQuestion.id === "Q21_RESTART") {
      title = "REFLECTING";
      subtitle = "Let's look back.";
    } else if (currentQuestion.id === "Q22_ADVICE") {
      title = "ALMOST DONE";
      subtitle = "One last thing.";
    }

    return (
      <div className="flex flex-col min-h-screen bg-[#faf9f8] p-6 font-sans">
        <nav className="w-full max-w-7xl mx-auto flex justify-between items-center py-6 px-6">
          <Link href="/" className="text-sm font-medium tracking-widest uppercase text-neutral-900 hover:opacity-70 transition-opacity">
            GyanMatrix
          </Link>
        </nav>
        <SectionTransition 
          title={title} 
          subtitle={subtitle}
          onContinue={() => setShowingTransition(false)} 
        />
      </div>
    );
  }

  const handleNext = () => {
    if (state.currentQuestionIndex === SURVEY_QUESTIONS.length - 1) {
      setSubmitError(null);
      startTransition(async () => {
        const payload = {
          surveyVersion: "v1",
          consentGiven: state.hasConsented,
          startedAt: state.startedAt || new Date().toISOString(),
          respondentId: state.respondentId,
          answers: state.answers,
        };

        const result = await submitSurveyAction(payload);
        if (result.success) {
          completeSurvey();
        } else {
          setSubmitError(result.error || "An unknown error occurred.");
        }
      });
    } else {
      nextQuestion();
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f8] font-sans selection:bg-neutral-200 selection:text-neutral-900">
      <main>
        <SurveyShell
          question={currentQuestion}
          currentIndex={state.currentQuestionIndex}
          totalQuestions={SURVEY_QUESTIONS.length}
          value={state.answers[currentQuestion.id]}
          onAnswer={(val) => setAnswer(currentQuestion.id, val)}
          onNext={handleNext}
          onPrev={prevQuestion}
          isPending={isPending}
          submitError={submitError}
        />
      </main>
    </div>
  );
}
