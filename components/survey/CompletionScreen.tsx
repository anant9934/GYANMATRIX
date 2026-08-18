import Link from "next/link";
import { FadeIn } from "../ui/fade-in";

export function CompletionScreen() {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col justify-center min-h-[60vh] text-center">
      <FadeIn>
        <h2 className="text-3xl font-medium tracking-tight text-neutral-900 mb-6">
          Your journey has been recorded.
        </h2>
        <p className="text-lg text-neutral-500 mb-16 max-w-md mx-auto">
          Thank you for sharing what actually happened — not just what looks good on paper.
        </p>

        <div className="flex flex-col items-center mb-16 text-xs font-medium tracking-widest text-neutral-400 uppercase relative w-full h-[320px]">
          {/* Animated background line */}
          <svg className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-1 h-full z-0" viewBox="0 0 4 320" preserveAspectRatio="none">
            <line x1="2" y1="0" x2="2" y2="320" stroke="#e5e5e5" strokeWidth="2" strokeDasharray="4 4" className="animate-draw-path" />
          </svg>

          <FadeIn delay={200} className="relative z-10 bg-[#faf9f8] py-2 mt-4">
            <span className="text-neutral-900 px-4">YOUR EXPERIENCE</span>
          </FadeIn>
          
          <div className="flex-1" />

          <FadeIn delay={600} className="relative z-10 bg-[#faf9f8] py-2">
            <span className="px-4">GYANMATRIX</span>
          </FadeIn>
          
          <div className="flex-1" />

          <FadeIn delay={1000} className="relative z-10 bg-[#faf9f8] py-2">
            <span className="px-4">BETTER CAREER GUIDANCE</span>
          </FadeIn>
          
          <div className="flex-1" />

          <FadeIn delay={1400} className="relative z-10 bg-[#faf9f8] py-2 mb-4">
            <span className="text-neutral-900 px-4">AI + HUMAN MENTORSHIP</span>
          </FadeIn>
        </div>

        <p className="text-sm text-neutral-500 mb-12 max-w-sm mx-auto leading-relaxed">
          Every response helps us understand the paths people actually take through Computer Science.
        </p>

        <Link 
          href="/"
          className="group inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-white bg-neutral-900 rounded-full hover:bg-neutral-800 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow-md"
        >
          Explore GyanMatrix
          <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
        </Link>
      </FadeIn>
    </div>
  );
}
