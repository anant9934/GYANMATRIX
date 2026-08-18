"use client";

import Link from "next/link";
import { FadeIn } from "../ui/fade-in";
import { useEffect, useState, useRef } from "react";

export function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(1);
  const [translateY, setTranslateY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const height = heroRef.current.offsetHeight;
      const progress = Math.min(scrollY / (height * 0.8), 1);
      
      setOpacity(1 - progress);
      setTranslateY(progress * 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section 
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] flex flex-col justify-center pt-24 pb-16 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
        
        {/* LEFT COLUMN: Editorial */}
        <div className="flex flex-col items-start text-left z-10">
          <FadeIn delay={200} direction="up">
            <span className="inline-block text-xs font-medium tracking-widest text-neutral-400 uppercase mb-6">
              AI + HUMAN MENTORSHIP
            </span>
          </FadeIn>

          <FadeIn delay={350} direction="up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-neutral-900 leading-[1.1] mb-6 max-w-lg">
              Help us decode<br />real CS career journeys.
            </h1>
          </FadeIn>

          <FadeIn delay={500} direction="up">
            <p className="text-lg md:text-xl text-neutral-500 leading-relaxed max-w-md mb-10">
              We&apos;re learning from people who have built careers in Technology — what they learned, what they built, and what they would do differently.
            </p>
          </FadeIn>

          <FadeIn delay={650} direction="up">
            <Link 
              href="/survey" 
              className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-white bg-neutral-900 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-neutral-800 active:scale-[0.98] active:translate-y-0 shadow-sm hover:shadow-md outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf9f8]"
            >
              Start the Journey 
              <span className="ml-2 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">→</span>
            </Link>
          </FadeIn>
        </div>

        {/* RIGHT COLUMN: Interactive Career Journey Map */}
        <div 
          className="relative w-full h-[500px] hidden lg:block z-0"
          style={{
            opacity,
            transform: `translateY(${translateY}px) translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`,
            transition: 'opacity 0.2s ease-out, transform 0.4s cubic-bezier(0.22,1,0.36,1)'
          }}
        >
          <svg viewBox="0 0 600 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="fadeBottom" x1="0" y1="0" x2="0" y2="1">
                <stop offset="60%" stopColor="#e5e5e5" stopOpacity="1" />
                <stop offset="100%" stopColor="#e5e5e5" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Path 1: Internship */}
            <g className="group cursor-pointer">
              <path d="M 50,50 C 50,150 250,200 300,350" stroke="#e5e5e5" strokeWidth="1" className="animate-draw-path" style={{ animationDelay: '500ms' }} />
              <circle cx="50" cy="50" r="3" fill="#a3a3a3" className="animate-in fade-in zoom-in duration-500 fill-mode-both" style={{ animationDelay: '500ms' }} />
              <circle cx="150" cy="175" r="4" fill="#d4d4d4" className="animate-in fade-in zoom-in duration-500 fill-mode-both group-hover:fill-neutral-900 transition-colors" style={{ animationDelay: '900ms' }} />
              <text x="135" y="170" className="text-[10px] font-medium fill-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" textAnchor="end">Real experience</text>
              <text x="165" y="179" className="text-xs font-medium fill-neutral-400 group-hover:fill-neutral-900 transition-colors">INTERNSHIP</text>
            </g>

            {/* Path 2: Projects (Center) */}
            <g className="group cursor-pointer">
              <path d="M 300,20 C 300,100 300,250 300,350" stroke="#d4d4d4" strokeWidth="1.5" className="animate-draw-path" style={{ animationDelay: '600ms' }} />
              <circle cx="300" cy="20" r="3" fill="#a3a3a3" className="animate-in fade-in zoom-in duration-500 fill-mode-both" style={{ animationDelay: '600ms' }} />
              <circle cx="300" cy="150" r="4" fill="#a3a3a3" className="animate-in fade-in zoom-in duration-500 fill-mode-both group-hover:fill-neutral-900 transition-colors" style={{ animationDelay: '1000ms' }} />
              <text x="315" y="145" className="text-[10px] font-medium fill-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">Proof of ability</text>
              <text x="315" y="154" className="text-xs font-medium fill-neutral-400 group-hover:fill-neutral-900 transition-colors">PROJECTS</text>
            </g>

            {/* Path 3: DSA */}
            <g className="group cursor-pointer">
              <path d="M 550,50 C 550,150 350,200 300,350" stroke="#e5e5e5" strokeWidth="1" className="animate-draw-path" style={{ animationDelay: '700ms' }} />
              <circle cx="550" cy="50" r="3" fill="#a3a3a3" className="animate-in fade-in zoom-in duration-500 fill-mode-both" style={{ animationDelay: '700ms' }} />
              <circle cx="450" cy="175" r="4" fill="#d4d4d4" className="animate-in fade-in zoom-in duration-500 fill-mode-both group-hover:fill-neutral-900 transition-colors" style={{ animationDelay: '1100ms' }} />
              <text x="465" y="170" className="text-[10px] font-medium fill-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">Problem solving</text>
              <text x="435" y="179" className="text-xs font-medium fill-neutral-400 group-hover:fill-neutral-900 transition-colors" textAnchor="end">DSA</text>
            </g>

            {/* Path 4: Research */}
            <g className="group cursor-pointer">
              <path d="M 450,20 C 450,120 400,180 300,350" stroke="#e5e5e5" strokeWidth="1" strokeDasharray="4 4" className="animate-draw-path" style={{ animationDelay: '800ms' }} />
              <circle cx="450" cy="20" r="3" fill="#a3a3a3" className="animate-in fade-in zoom-in duration-500 fill-mode-both" style={{ animationDelay: '800ms' }} />
              <circle cx="390" cy="140" r="4" fill="#d4d4d4" className="animate-in fade-in zoom-in duration-500 fill-mode-both group-hover:fill-neutral-900 transition-colors" style={{ animationDelay: '1200ms' }} />
              <text x="405" y="135" className="text-[10px] font-medium fill-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">Depth</text>
              <text x="375" y="144" className="text-xs font-medium fill-neutral-400 group-hover:fill-neutral-900 transition-colors" textAnchor="end">RESEARCH</text>
            </g>

            {/* Convergence Node: Career */}
            <g>
              <circle cx="300" cy="350" r="5" fill="#737373" className="animate-in fade-in zoom-in duration-500 fill-mode-both" style={{ animationDelay: '1500ms' }} />
              <text x="315" y="354" className="text-xs font-medium fill-neutral-500 animate-in fade-in duration-500 fill-mode-both" style={{ animationDelay: '1500ms' }}>CAREER</text>
            </g>

            {/* Final Segment: Career to GyanMatrix */}
            <g>
              <path d="M 300,350 L 300,430" stroke="url(#fadeBottom)" strokeWidth="2" className="animate-draw-path" style={{ animationDelay: '1700ms' }} />
              <circle cx="300" cy="430" r="6" fill="#171717" className="animate-in fade-in zoom-in duration-500 fill-mode-both" style={{ animationDelay: '2000ms' }} />
              <text x="300" y="455" className="text-sm font-medium fill-neutral-900 animate-in fade-in duration-500 fill-mode-both" textAnchor="middle" style={{ animationDelay: '2100ms' }}>GYANMATRIX</text>
              <text x="300" y="475" className="text-[10px] font-medium tracking-widest fill-neutral-400 animate-in fade-in duration-500 fill-mode-both" textAnchor="middle" style={{ animationDelay: '2300ms' }}>AI + HUMAN MENTORSHIP</text>
            </g>
          </svg>
        </div>

      </div>
    </section>
  );
}
