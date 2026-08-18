import { FadeIn } from "../ui/fade-in";
import { useState } from "react";

export function ConsentScreen({ onConsent }: { onConsent: () => void }) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col justify-center min-h-[60vh]">
      <FadeIn>
        <h2 className="text-3xl font-medium tracking-tight text-neutral-900 mb-8">Before we begin</h2>
        
        <div className="space-y-6 text-neutral-600 leading-relaxed mb-12 bg-white p-8 rounded-xl border border-neutral-200 shadow-sm">
          <p>
            Responses are collected for research and product development around CS career trajectories.
          </p>
          <ul className="list-disc pl-5 space-y-3">
            <li>Responses may be aggregated and analyzed.</li>
            <li>Do not enter personal identifying information in open-text answers.</li>
            <li>Participation is completely voluntary.</li>
            <li>You can stop at any time before submission.</li>
          </ul>
        </div>

        <label className="flex items-start gap-4 p-4 rounded-lg hover:bg-neutral-100 cursor-pointer transition-colors mb-10 border border-transparent hover:border-neutral-200">
          <div className="pt-1">
            <input 
              type="checkbox" 
              className="w-5 h-5 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 transition-all cursor-pointer"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
          </div>
          <span className="text-neutral-900 font-medium select-none">
            I understand and agree to participate.
          </span>
        </label>

        <button
          onClick={onConsent}
          disabled={!agreed}
          className={`px-8 py-4 text-sm font-medium rounded-full transition-all duration-300 outline-none w-full sm:w-auto ${
            agreed
              ? "bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm hover:-translate-y-0.5 active:translate-y-0"
              : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
          }`}
        >
          Start Survey
        </button>
      </FadeIn>
    </div>
  );
}
