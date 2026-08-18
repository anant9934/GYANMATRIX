import { QuestionConfig } from "../../types/survey";

interface DualSelectProps {
  config: QuestionConfig;
  value: { partA?: string; partB?: string };
  onChange: (value: { partA?: string; partB?: string }) => void;
}

export function DualSelect({ config, value, onChange }: DualSelectProps) {
  const partAOptions = config.partA?.options || [];
  const partBOptions = config.partB?.options || [];

  return (
    <div className="flex flex-col space-y-10 w-full">
      <div className="w-full">
        <h3 className="text-sm font-medium text-neutral-900 mb-4 tracking-tight uppercase">
          {config.partA?.label}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {partAOptions.map((opt) => {
            const isSelected = value?.partA === opt.id;
            return (
              <button
                key={`partA-${opt.id}`}
                onClick={() => onChange({ ...value, partA: opt.id })}
                className={`group text-left px-5 py-3 rounded-xl border transition-all duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 flex items-center justify-between ${
                  isSelected
                    ? "bg-slate-50 border-neutral-900 shadow-sm text-neutral-900"
                    : "bg-white border-neutral-200 hover:border-neutral-400 hover:-translate-y-[1px] hover:shadow-sm text-neutral-700"
                }`}
              >
                <span className="text-sm font-medium transition-colors duration-300">{opt.label}</span>
                {isSelected && (
                  <svg className="w-4 h-4 text-neutral-900 animate-in zoom-in-50 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-full h-px bg-neutral-100" />

      <div className="w-full">
        <h3 className="text-sm font-medium text-neutral-900 mb-4 tracking-tight uppercase">
          {config.partB?.label}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {partBOptions.map((opt) => {
            const isSelected = value?.partB === opt.id;
            return (
              <button
                key={`partB-${opt.id}`}
                onClick={() => onChange({ ...value, partB: opt.id })}
                className={`group text-left px-5 py-3 rounded-xl border transition-all duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 flex items-center justify-between ${
                  isSelected
                    ? "bg-slate-50 border-neutral-900 shadow-sm text-neutral-900"
                    : "bg-white border-neutral-200 hover:border-neutral-400 hover:-translate-y-[1px] hover:shadow-sm text-neutral-700"
                }`}
              >
                <span className="text-sm font-medium transition-colors duration-300">{opt.label}</span>
                {isSelected && (
                  <svg className="w-4 h-4 text-neutral-900 animate-in zoom-in-50 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
