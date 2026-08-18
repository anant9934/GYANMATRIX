import { useEffect, useState } from "react";
import { QuestionConfig } from "../../types/survey";
import { SurveyProgress } from "./SurveyProgress";
import { SurveyNavigation } from "./SurveyNavigation";
import { QuestionRenderer } from "./QuestionRenderer";
import { validateAnswer } from "../../lib/survey-validation";

interface SurveyShellProps {
  question: QuestionConfig;
  currentIndex: number;
  totalQuestions: number;
  value: unknown;
  onAnswer: (value: unknown) => void;
  onNext: () => void;
  onPrev: () => void;
  isPending?: boolean;
  submitError?: string | null;
}

export function SurveyShell({
  question,
  currentIndex,
  totalQuestions,
  value,
  onAnswer,
  onNext,
  onPrev,
  isPending,
  submitError,
}: SurveyShellProps) {
  const [error, setError] = useState<string | null>(null);
  const [prevIndex, setPrevIndex] = useState(currentIndex);
  const [direction, setDirection] = useState<"fwd" | "bck">("fwd");

  useEffect(() => {
    if (currentIndex !== prevIndex) {
      // eslint-disable-next-line
      setDirection(currentIndex > prevIndex ? "fwd" : "bck");
      // eslint-disable-next-line
      setPrevIndex(currentIndex);
    }
  }, [currentIndex, prevIndex]);

  // Clear error when value changes to something valid
  useEffect(() => {
    if (error) {
      const validation = validateAnswer(question, value);
      if (validation.isValid) {
        // eslint-disable-next-line
        setError(null);
      }
    }
  }, [value, question, error]);

  const handleContinue = () => {
    const validation = validateAnswer(question, value);
    if (!validation.isValid) {
      setError(validation.error || "Please answer the question.");
      return;
    }
    setError(null);
    onNext();
  };

  const isLast = currentIndex === totalQuestions - 1;

  return (
    <div className="w-full flex flex-col min-h-screen relative">
      <SurveyProgress current={currentIndex + 1} total={totalQuestions} />

      <div className={`w-full max-w-3xl mx-auto px-6 flex flex-col flex-grow pb-32 transition-opacity duration-300 ${isPending ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        <div key={question.id} className={`flex-grow flex flex-col justify-center ${direction === "fwd" ? "animate-slide-in-fwd" : "animate-slide-in-bck"}`}>
          <div className="mb-10">
            <h2 className="text-xs font-medium tracking-widest text-neutral-400 uppercase mb-4">
              {question.section}
            </h2>
            <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-neutral-900 mb-3">
              {question.title}
              {!question.required && (
                <span className="ml-3 text-sm font-normal text-neutral-400 tracking-normal">(Optional)</span>
              )}
            </h1>
            {question.description && (
              <p className="text-base text-neutral-500">{question.description}</p>
            )}
          </div>

          <div className="w-full min-h-[200px]">
            <QuestionRenderer
              config={question}
              value={value}
              onChange={onAnswer}
            />
          </div>

          {error && (
            <div className="mt-6 p-4 rounded-lg bg-red-50 text-red-600 text-sm font-medium animate-in fade-in slide-in-from-top-2">
              {error}
            </div>
          )}
          {submitError && (
            <div className="mt-6 p-4 rounded-lg bg-red-50 text-red-600 text-sm font-medium animate-in fade-in slide-in-from-top-2">
              <p className="font-semibold mb-1">We couldn&apos;t save your response.</p>
              <p>{submitError}</p>
              <p className="mt-2 text-xs opacity-80">Your answers are still here. Please try again.</p>
            </div>
          )}
        </div>

        <SurveyNavigation
          onBack={onPrev}
          onContinue={handleContinue}
          canContinue={!isPending}
          canGoBack={currentIndex > 0 && !isPending}
          isLast={isLast}
          isPending={isPending}
        />
      </div>
    </div>
  );
}
