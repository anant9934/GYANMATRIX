interface ShortTextQuestionProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  placeholder?: string;
}

export function ShortTextQuestion({ value = "", onChange, maxLength, placeholder }: ShortTextQuestionProps) {
  return (
    <div className="w-full flex flex-col">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full min-h-[160px] p-5 text-base text-neutral-900 bg-white border border-neutral-200 rounded-xl transition-all duration-300 ease-out focus:border-neutral-800 focus:ring-1 focus:ring-neutral-800 outline-none resize-y placeholder:text-neutral-400 hover:border-neutral-300 shadow-sm focus:shadow-md"
      />
      {maxLength && (
        <div className="flex justify-end mt-3">
          <span className={`text-xs font-medium tracking-widest uppercase transition-colors duration-300 ${
            value.length >= maxLength ? "text-red-500" : "text-neutral-400"
          }`}>
            {value.length} / {maxLength}
          </span>
        </div>
      )}
    </div>
  );
}
