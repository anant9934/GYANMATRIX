import { QuestionOption } from "../../types/survey";

interface SingleSelectProps {
  options: QuestionOption[];
  value: string | undefined;
  onChange: (value: string) => void;
}

export function SingleSelect({ options, value, onChange }: SingleSelectProps) {
  return (
    <div className="flex flex-col space-y-3 w-full">
      {options.map((opt) => {
        const isSelected = value === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`group w-full text-left px-6 py-4 rounded-xl border transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 flex items-center justify-between ${
              isSelected
                ? "bg-neutral-900 border-neutral-900 shadow-md ring-2 ring-neutral-200 ring-offset-2 ring-offset-[#faf9f8]"
                : "bg-white border-neutral-200 hover:border-neutral-300 hover:shadow-sm hover:-translate-y-0.5"
            }`}
          >
            <span className={`text-base font-medium transition-colors duration-300 ${isSelected ? "text-white" : "text-neutral-700 group-hover:text-neutral-900"}`}>
              {opt.label}
            </span>
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 ${
              isSelected ? "border-transparent bg-transparent" : "border-neutral-300 group-hover:border-neutral-400 bg-white"
            }`}>
              {isSelected && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
