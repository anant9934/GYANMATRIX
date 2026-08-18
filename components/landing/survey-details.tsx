import Link from "next/link";
import { FadeIn } from "../ui/fade-in";

export function SurveyDetails() {
  return (
    <section className="py-24 md:py-32 px-6 bg-[#faf9f8] text-center w-full relative">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Horizontal Information Strip */}
        <FadeIn delay={100} className="w-full mb-32">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 group cursor-default">
            <div className="flex flex-col items-center transition-colors duration-300">
              <span className="text-2xl font-light text-neutral-400 group-hover:text-neutral-900 transition-colors duration-300 tracking-tight">5–7</span>
              <span className="text-[10px] font-medium tracking-widest uppercase text-neutral-400 mt-2">MINUTES</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-neutral-200" />
            <div className="flex flex-col items-center transition-colors duration-300">
              <span className="text-2xl font-light text-neutral-400 group-hover:text-neutral-900 transition-colors duration-300 tracking-tight">22</span>
              <span className="text-[10px] font-medium tracking-widest uppercase text-neutral-400 mt-2">QUESTIONS</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-neutral-200" />
            <div className="flex flex-col items-center transition-colors duration-300">
              <span className="text-2xl font-light text-neutral-400 group-hover:text-neutral-900 transition-colors duration-300 tracking-tight">1</span>
              <span className="text-[10px] font-medium tracking-widest uppercase text-neutral-400 mt-2">CLICK MOSTLY</span>
            </div>
          </div>
        </FadeIn>

        {/* Final CTA Section */}
        <div className="flex flex-col items-center text-center">
          <FadeIn delay={200} className="mb-6">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-neutral-900 leading-[1.1] max-w-lg mx-auto">
              Your journey could make someone else&apos;s clearer.
            </h2>
          </FadeIn>

          <FadeIn delay={300} className="mb-16">
            <p className="text-base md:text-lg text-neutral-500 max-w-md mx-auto">
              Share what actually happened — not just what looks good on paper.
            </p>
          </FadeIn>

          <FadeIn delay={400}>
            <Link 
              href="/survey" 
              className="group relative inline-flex flex-col items-center justify-center py-2 outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-8 focus-visible:ring-offset-[#faf9f8] rounded-sm"
            >
              <div className="flex items-center text-xs md:text-sm font-medium tracking-widest uppercase text-neutral-900">
                START THE JOURNEY
                <span className="ml-3 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5">→</span>
              </div>
              <div className="w-0 h-px bg-neutral-900 mt-2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
            </Link>
          </FadeIn>
        </div>

      </div>
    </section>
  );
}
