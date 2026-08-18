import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { WhyItMatters } from "@/components/landing/why-it-matters";
import { HowItWorks } from "@/components/landing/how-it-works";
import { SurveyDetails } from "@/components/landing/survey-details";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f8] selection:bg-neutral-200 selection:text-neutral-900 font-sans">
      <Navbar />
      <main className="flex-grow flex flex-col items-center w-full">
        <Hero />
        <WhyItMatters />
        <HowItWorks />
        <SurveyDetails />
      </main>
    </div>
  );
}
