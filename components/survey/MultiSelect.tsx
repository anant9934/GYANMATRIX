import { QuestionOption } from "../../types/survey";

interface MultiSelectProps {
  options: QuestionOption[];
  value: string[];
  onChange: (value: string[]) => void;
  maxSelections?: number;
}

export function MultiSelect({ options, value = [], onChange, maxSelections }: MultiSelectProps) {
  const toggleOption = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      if (maxSelections && value.length >= maxSelections) return;
      onChange([...value, id]);
    }
  };

  return (
    <div className="w-full">
      {maxSelections && (
        <div className="text-right text-xs font-medium text-neutral-400 mb-3 animate-in fade-in duration-300">
          {value.length} / {maxSelections} selected
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {options.map((opt) => {
          const isSelected = value.includes(opt.id);
          const maxReached = maxSelections !== undefined && value.length >= maxSelections;
          const isMuted = !isSelected && maxReached;

          return (
            <button
              key={opt.id}
              onClick={() => toggleOption(opt.id)}
              disabled={isMuted}
              className={`group text-left px-5 py-4 rounded-xl border transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 flex flex-col justify-between min-h-[5.5rem] ${
                isSelected
                  ? "bg-neutral-900 border-neutral-900 shadow-md ring-2 ring-neutral-200 ring-offset-2 ring-offset-[#faf9f8]"
                  : isMuted
                  ? "bg-neutral-50/30 border-neutral-100 opacity-60 cursor-not-allowed"
                  : "bg-white border-neutral-200 hover:border-neutral-300 hover:shadow-sm hover:-translate-y-0.5"
              }`}
            >
              <div className={`w-5 h-5 rounded border mb-3 flex items-center justify-center transition-all duration-300 ${
                isSelected ? "bg-transparent border-transparent" : "border-neutral-300 group-hover:border-neutral-400 bg-white"
              }`}>
                {isSelected && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className={`text-sm font-medium transition-colors duration-300 ${isSelected ? "text-white" : "text-neutral-700 group-hover:text-neutral-900"}`}>
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
