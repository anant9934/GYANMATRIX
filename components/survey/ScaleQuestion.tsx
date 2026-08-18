import { QuestionConfig } from "../../types/survey";

interface ScaleQuestionProps {
  config: QuestionConfig;
  value: number | undefined;
  onChange: (value: number) => void;
}

export function ScaleQuestion({ config, value, onChange }: ScaleQuestionProps) {
  const min = config.scale?.min || 1;
  const max = config.scale?.max || 5;
  const range = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  // Calculate percentage for the active track
  const activePercentage = value !== undefined 
    ? ((value - min) / (max - min)) * 100 
    : 0;

  return (
    <div className="w-full flex flex-col items-center pt-8 pb-12">
      <div className="flex items-center justify-between w-full max-w-xl mb-12 text-[10px] md:text-xs font-medium tracking-widest uppercase text-neutral-400 px-4">
        <span>{config.scale?.minLabel}</span>
        <span>{config.scale?.maxLabel}</span>
      </div>

      <div className="flex items-center justify-between w-full max-w-xl relative px-4">
        {/* Background Track */}
        <div className="absolute left-4 right-4 h-1 bg-neutral-200/60 top-1/2 -translate-y-1/2 rounded-full z-0" />
        
        {/* Active Track */}
        <div 
          className="absolute left-4 h-1 bg-neutral-900 top-1/2 -translate-y-1/2 rounded-full z-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ width: `calc(${activePercentage}% - ${activePercentage === 0 ? 0 : 32}px)` }} 
        />
        
        {range.map((num) => {
          const isSelected = value === num;
          const isPassed = value !== undefined && num <= value;

          return (
            <button
              key={num}
              onClick={() => onChange(num)}
              className={`relative z-10 w-14 h-14 md:w-20 md:h-20 rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 ${
                isSelected
                  ? "bg-neutral-900 text-white shadow-xl scale-110 ring-4 ring-neutral-100 ring-offset-4 ring-offset-[#faf9f8]"
                  : isPassed
                  ? "bg-neutral-900 text-white hover:scale-105"
                  : "bg-white text-neutral-500 border-2 border-neutral-200 hover:border-neutral-300 hover:scale-105 shadow-sm"
              }`}
            >
              <span className={`text-xl md:text-2xl ${isSelected ? "font-semibold" : "font-medium"}`}>
                {num}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
