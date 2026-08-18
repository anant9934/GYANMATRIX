"use client";

import { useEffect, useRef, useState } from "react";
import { FadeIn } from "../ui/fade-in";

export function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 md:py-32 px-6 w-full bg-white border-y border-neutral-200/60" ref={sectionRef}>
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-neutral-900 mb-20">
            Your experience becomes useful knowledge.
          </h2>
        </FadeIn>

        <div className="relative flex flex-col items-center w-full max-w-sm mx-auto min-h-[400px]">
          {/* Animated Line */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-1 z-0 overflow-hidden">
            <svg viewBox="0 0 4 400" preserveAspectRatio="none" className="w-full h-full">
              <line 
                x1="2" y1="0" x2="2" y2="400" 
                stroke="#e5e5e5" 
                strokeWidth="2" 
                strokeDasharray="400" 
                strokeDashoffset={isVisible ? 0 : 400} 
                className="transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              />
            </svg>
          </div>

          {/* Node 1 */}
          <div className={`relative z-10 flex flex-col items-center bg-white py-4 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0ms' }}>
            <h3 className="text-xs md:text-sm font-medium tracking-widest text-neutral-900 uppercase mb-3">YOU SHARE</h3>
            <p className="text-neutral-500 text-sm md:text-base leading-relaxed bg-white px-2">Your skills, projects and career journey.</p>
          </div>

          <div className="flex-1" />

          {/* Node 2 */}
          <div className={`relative z-10 flex flex-col items-center bg-white py-4 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '500ms' }}>
            <h3 className="text-xs md:text-sm font-medium tracking-widest text-neutral-900 uppercase mb-3">GYANMATRIX LEARNS</h3>
            <p className="text-neutral-500 text-sm md:text-base leading-relaxed bg-white px-2">We identify patterns across real CS career trajectories.</p>
          </div>

          <div className="flex-1" />

          {/* Node 3 */}
          <div className={`relative z-10 flex flex-col items-center bg-white py-4 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '1000ms' }}>
            <h3 className="text-xs md:text-sm font-medium tracking-widest text-neutral-900 uppercase mb-3">FUTURE LEARNERS BENEFIT</h3>
            <p className="text-neutral-500 text-sm md:text-base leading-relaxed bg-white px-2">Those insights can help create better personalized guidance.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
