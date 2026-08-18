import { QuestionConfig } from "../../types/survey";

interface SkillMatrixProps {
  config: QuestionConfig;
  value: Record<string, number>;
  onChange: (value: Record<string, number>) => void;
}

export function SkillMatrix({ config, value = {}, onChange }: SkillMatrixProps) {
  const rows = config.rows || [];
  const min = config.scale?.min || 1;
  const max = config.scale?.max || 5;
  const range = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <div className="w-full flex flex-col space-y-4 md:space-y-6">
      <div className="hidden md:flex justify-end w-full mb-2">
        <div className="flex w-1/2 justify-between px-4 text-[10px] font-medium tracking-widest uppercase text-neutral-400">
          <span>{config.scale?.minLabel}</span>
          <span>{config.scale?.maxLabel}</span>
        </div>
      </div>

      {rows.map((row) => (
        <div key={row.id} className="group flex flex-col md:flex-row md:items-center justify-between p-5 md:p-4 bg-white border border-neutral-200 rounded-xl md:bg-transparent md:border-transparent md:border-b md:border-neutral-200/60 md:rounded-none md:last:border-transparent gap-6 md:gap-0 transition-colors duration-300 md:hover:bg-white/50">
          <span className="text-sm font-medium text-neutral-900 md:w-1/2 group-hover:text-black transition-colors duration-300">{row.label}</span>
          
          <div className="flex items-center justify-between md:justify-around w-full md:w-1/2">
            {range.map((num) => {
              const isSelected = value[row.id] === num;
              return (
                <button
                  key={`${row.id}-${num}`}
                  onClick={() => onChange({ ...value, [row.id]: num })}
                  className={`relative w-10 h-10 md:w-11 md:h-11 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center justify-center text-sm outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 overflow-hidden ${
                    isSelected
                      ? "bg-neutral-900 border-2 border-neutral-900 text-white font-medium shadow-md scale-110 ring-2 ring-neutral-200 ring-offset-2 ring-offset-[#faf9f8]"
                      : "bg-white border-2 border-neutral-200 text-neutral-500 hover:border-neutral-300 hover:scale-105 shadow-sm"
                  }`}
                >
                  <span className="relative z-10">{num}</span>
                  {isSelected && (
                    <div className="absolute inset-0 bg-neutral-900 animate-in zoom-in duration-300 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Mobile Labels */}
          <div className="flex justify-between w-full md:hidden text-[10px] font-medium tracking-widest uppercase text-neutral-400 mt-2">
            <span>{config.scale?.minLabel}</span>
            <span>{config.scale?.maxLabel}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
