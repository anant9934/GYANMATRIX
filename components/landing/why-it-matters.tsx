import { FadeIn } from "../ui/fade-in";

export function WhyItMatters() {
  const points = [
    {
      num: "01",
      title: "REAL EXPERIENCES",
      desc: "Learn from people who have actually built careers in Computer Science."
    },
    {
      num: "02",
      title: "BETTER GUIDANCE",
      desc: "Understand which skills, projects and experiences mattered along the way."
    },
    {
      num: "03",
      title: "FUTURE MENTORSHIP",
      desc: "Help us build a smarter AI + human mentorship experience for the next generation."
    }
  ];

  return (
    <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
        {points.map((point, i) => (
          <FadeIn key={point.num} delay={100 + i * 150} className="group flex flex-col items-start text-left cursor-default">
            <span className="text-4xl md:text-5xl font-light text-neutral-300 mb-6 font-mono tracking-tighter transition-transform duration-300 ease-out group-hover:-translate-y-1">
              {point.num}
            </span>
            <div className="w-8 h-[1px] bg-neutral-200 mb-6 transition-all duration-300 ease-out group-hover:w-16 group-hover:bg-neutral-400" />
            <h3 className="text-xs md:text-sm font-medium tracking-widest text-neutral-900 uppercase mb-4">
              {point.title}
            </h3>
            <p className="text-neutral-500 leading-relaxed text-sm md:text-base max-w-[280px] md:max-w-none transition-colors duration-300 group-hover:text-neutral-700">
              {point.desc}
            </p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
