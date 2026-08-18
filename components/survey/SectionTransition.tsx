"use client";

import { useEffect } from "react";
import { FadeIn } from "../ui/fade-in";

export function SectionTransition({ title, subtitle, onContinue }: { title: string; subtitle: string; onContinue: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onContinue();
    }, 1500);
    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col justify-center items-center min-h-[60vh] text-center px-6">
      <FadeIn className="flex flex-col items-center duration-500">
        <h2 className="text-[10px] md:text-xs font-medium tracking-widest text-neutral-400 uppercase mb-6">{title}</h2>
        <p className="text-3xl md:text-4xl font-medium tracking-tight text-neutral-900 leading-tight max-w-lg">{subtitle}</p>
      </FadeIn>
    </div>
  );
}
