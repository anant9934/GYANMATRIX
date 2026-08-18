import Link from "next/link";
import { FadeIn } from "../ui/fade-in";

export function Navbar() {
  return (
    <nav className="w-full flex flex-row items-start md:items-center justify-between py-8 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col">
        <FadeIn delay={100} direction="none">
          <Link href="/" className="text-xl md:text-2xl font-medium tracking-tight text-neutral-900 hover:opacity-80 transition-opacity">
            GYANMATRIX
          </Link>
        </FadeIn>
        <FadeIn delay={200} direction="none">
          <span className="text-[10px] md:text-xs font-medium tracking-widest text-neutral-500 uppercase mt-1 block">
            AI + Human Mentorship
          </span>
        </FadeIn>
      </div>
      
      <FadeIn delay={250} direction="none">
        <span className="text-xs font-medium tracking-widest text-neutral-400 uppercase mt-2 md:mt-0 block">
          5–7 MIN
        </span>
      </FadeIn>
    </nav>
  );
}
