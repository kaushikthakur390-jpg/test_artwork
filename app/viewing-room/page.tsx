import Link from "next/link";
import { getFeaturedArtworks } from "@/lib/data";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { Navigation } from "@/components/ui/Navigation";

export default function ViewingRoom() {
  const artworks = getFeaturedArtworks();

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24">
        
        {/* Header */}
        <header className="max-w-4xl mb-32">
          <AnimatedReveal delay={0.1} direction="none">
            <h1 className="font-serif text-4xl md:text-6xl mb-6">Selected Works</h1>
          </AnimatedReveal>
          <AnimatedReveal delay={0.2} direction="none">
            <p className="text-sm opacity-70 mb-12">A collection curated for your consideration.</p>
          </AnimatedReveal>
          <AnimatedReveal delay={0.3} direction="none">
            <div className="border-t border-charcoal/10 pt-6">
              <p className="text-[10px] tracking-[0.2em] uppercase opacity-50 mb-1">Prepared exclusively for</p>
              <p className="font-serif text-xl">Eleanor Vance</p>
            </div>
          </AnimatedReveal>
        </header>

        {/* Artworks List */}
        <div className="flex flex-col space-y-32 md:space-y-48">
          {artworks.map((artwork, index) => {
            const isSculpture = artwork.type === 'sculpture';
            const route = isSculpture ? '/artwork/sculpture' : '/artwork/painting';
            // Alternating layout for editorial feel
            const isEven = index % 2 === 0;

            return (
              <AnimatedReveal key={artwork.id} delay={0.2} duration={1} direction="up" className="group">
                <Link href={route} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 lg:gap-24`}>
                  
                  {/* Image/Model Placeholder area */}
                  <div className="w-full md:w-3/5 aspect-[4/3] bg-charcoal/5 relative overflow-hidden flex items-center justify-center group-hover:bg-charcoal/10 transition-colors duration-700">
                    <p className="text-xs uppercase tracking-widest opacity-30 font-sans">
                      {isSculpture ? "View 3D Object" : "View Artwork"}
                    </p>
                    {/* If we had thumbnails, we'd render next/image here */}
                  </div>

                  {/* Metadata */}
                  <div className="w-full md:w-2/5 flex flex-col">
                    <div className="text-[10px] tracking-[0.2em] mb-4 opacity-50 font-medium">
                      0{index + 1}
                    </div>
                    <h2 className="font-serif text-3xl mb-2">{artwork.title}</h2>
                    <p className="text-sm opacity-80 mb-6">{artwork.artist}, {artwork.year}</p>
                    <span className="text-xs tracking-[0.15em] uppercase border-b border-charcoal/30 pb-1 self-start group-hover:border-charcoal transition-colors">
                      Explore Work
                    </span>
                  </div>

                </Link>
              </AnimatedReveal>
            );
          })}
        </div>
      </main>
    </>
  );
}
