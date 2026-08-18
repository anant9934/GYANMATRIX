import { useEffect } from "react";

interface SurveyNavigationProps {
  onBack: () => void;
  onContinue: () => void;
  canContinue: boolean;
  canGoBack: boolean;
  isLast: boolean;
  isPending?: boolean;
}

export function SurveyNavigation({
  onBack,
  onContinue,
  canContinue,
  canGoBack,
  isLast,
  isPending,
}: SurveyNavigationProps) {
  // Global Keyboard Navigation for Continue
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in a textarea or input
      if (
        document.activeElement?.tagName === "TEXTAREA" ||
        document.activeElement?.tagName === "INPUT"
      ) {
        // Allow Cmd+Enter to submit even inside textarea
        if (e.key === "Enter" && e.metaKey && canContinue) {
          onContinue();
        }
        return;
      }

      if (e.key === "Enter" && canContinue) {
        onContinue();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canContinue, onContinue]);

  return (
    <div className="w-full flex items-center justify-between mt-12 pt-8 border-t border-neutral-100">
      <button
        onClick={onBack}
        disabled={!canGoBack}
        className={`px-6 py-3 text-sm font-medium rounded-full transition-colors ${
          canGoBack
            ? "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
            : "text-transparent cursor-default pointer-events-none"
        }`}
      >
        Back
      </button>

      <div className="flex items-center gap-4">
        {!isPending && <span className="hidden sm:inline text-xs text-neutral-400 mr-2">Press Enter ↵</span>}
        <button
          onClick={onContinue}
          disabled={!canContinue}
          className={`px-8 py-3 text-sm font-medium rounded-full transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 flex items-center justify-center min-w-[140px] ${
            canContinue
              ? "bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98]"
              : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
          }`}
        >
          {isPending ? (
            <span className="flex items-center gap-2 animate-pulse">
              <svg className="w-4 h-4 animate-spin text-neutral-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              Saving...
            </span>
          ) : isLast ? (
            "Submit Journey"
          ) : (
            "Continue"
          )}
        </button>
      </div>
    </div>
  );
}
