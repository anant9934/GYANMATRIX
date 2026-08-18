import { QuestionConfig } from "../../types/survey";
import { SingleSelect } from "./SingleSelect";
import { MultiSelect } from "./MultiSelect";
import { DualSelect } from "./DualSelect";
import { SkillMatrix } from "./SkillMatrix";
import { ScaleQuestion } from "./ScaleQuestion";
import { ShortTextQuestion } from "./ShortTextQuestion";

interface QuestionRendererProps {
  config: QuestionConfig;
  value: unknown;
  onChange: (value: unknown) => void;
}

export function QuestionRenderer({ config, value, onChange }: QuestionRendererProps) {
  switch (config.type) {
    case "single-select":
      return (
        <SingleSelect
          options={config.options || []}
          value={value as string | undefined}
          onChange={onChange}
        />
      );
    case "multi-select":
      return (
        <MultiSelect
          options={config.options || []}
          value={(value as string[]) || []}
          onChange={onChange}
          maxSelections={config.maxSelections}
        />
      );
    case "dual-select":
      return (
        <DualSelect
          config={config}
          value={(value as { partA?: string; partB?: string }) || {}}
          onChange={onChange}
        />
      );
    case "matrix":
      return (
        <SkillMatrix
          config={config}
          value={(value as Record<string, number>) || {}}
          onChange={onChange}
        />
      );
    case "scale":
      return (
        <ScaleQuestion
          config={config}
          value={value as number | undefined}
          onChange={onChange}
        />
      );
    case "short-text":
      return (
        <ShortTextQuestion
          value={(value as string) || ""}
          onChange={onChange}
          maxLength={config.maxLength}
          placeholder={config.placeholder}
        />
      );
    default:
      return <div className="text-red-500">Unsupported question type</div>;
  }
}
