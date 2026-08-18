export function SurveyProgress({ current, total }: { current: number; total: number }) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full sticky top-0 bg-[#faf9f8]/90 backdrop-blur-md z-10 pt-6 pb-6 mb-8 border-b border-neutral-100">
      <div className="flex justify-between items-center mb-4 max-w-3xl mx-auto px-6">
        <span className="text-sm font-medium tracking-tight text-neutral-900">GYANMATRIX</span>
        <span className="text-xs font-medium tracking-widest text-neutral-400 font-mono">
          {String(current).padStart(2, "0")} / {total}
        </span>
      </div>
      <div className="max-w-3xl mx-auto px-6">
        <div className="w-full h-0.5 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-neutral-900 transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
