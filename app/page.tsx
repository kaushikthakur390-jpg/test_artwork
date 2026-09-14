import Link from "next/link";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";

export default function PrivateInvitation() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-charcoal text-offwhite">
      {/* Very subtle background texture/gradient or large blurred image could go here */}
      <div className="absolute inset-0 opacity-20 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full bg-white/5 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <AnimatedReveal delay={0.5} duration={1.2} className="mb-8">
          <p className="text-[10px] tracking-[0.4em] uppercase opacity-70">
            Private Viewing
          </p>
        </AnimatedReveal>

        <AnimatedReveal delay={0.9} duration={1.5} direction="up">
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl max-w-2xl leading-tight opacity-90 mb-12 text-balance">
            A curated selection of works<br/>presented exclusively for you.
          </h1>
        </AnimatedReveal>

        <AnimatedReveal delay={1.4} duration={1} direction="none">
          <Link 
            href="/viewing-room"
            className="group relative inline-flex items-center justify-center overflow-hidden border border-offwhite/30 px-12 py-4 text-xs uppercase tracking-[0.2em] transition-all hover:bg-offwhite hover:text-charcoal"
          >
            <span className="relative z-10">Enter Viewing Room</span>
          </Link>
        </AnimatedReveal>
      </div>

      <div className="absolute bottom-12 w-full text-center pointer-events-none">
        <AnimatedReveal delay={2} duration={1} direction="none">
          <p className="text-[9px] tracking-[0.3em] uppercase opacity-40">
            Private Collection <br/> 2026
          </p>
        </AnimatedReveal>
      </div>
    </main>
  );
}
