"use client";

import { getArtworkById } from "@/lib/data";
import { SculptureViewer } from "@/components/3d/SculptureViewer";
import { ModelViewerAR } from "@/components/ar/ModelViewerAR";
import { Navigation } from "@/components/ui/Navigation";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { EnquiryModal } from "@/components/ui/EnquiryModal";

export default function SculpturePage() {
  const artwork = getArtworkById("sculpture-01");

  if (!artwork) return null;

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen flex flex-col md:flex-row relative">
        {/* Mobile metadata header */}
        <div className="md:hidden pt-24 px-6 pb-6">
          <div className="text-[10px] tracking-[0.2em] mb-2 opacity-50 font-medium">01</div>
          <h1 className="font-serif text-3xl mb-1">{artwork.title}</h1>
          <p className="text-sm opacity-80">{artwork.artist}, {artwork.year}</p>
        </div>

        {/* Left/Top Area - 3D Viewer (Dominant) */}
        <div className="w-full md:w-2/3 h-[60vh] md:h-screen relative border-r border-charcoal/10">
          <SculptureViewer modelUrl={artwork.modelUrl!} />
          {/* AR Button - positioned at bottom center, does NOT overlay the canvas */}
          <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 z-10">
            <ModelViewerAR modelUrl={artwork.modelUrl!} />
          </div>
        </div>

        {/* Right/Bottom Area - Metadata */}
        <div className="w-full md:w-1/3 p-6 md:p-12 lg:p-20 flex flex-col justify-between overflow-y-auto">
          
          <div className="hidden md:block">
            <AnimatedReveal delay={0.2} direction="down">
              <div className="text-[10px] tracking-[0.2em] mb-4 opacity-50 font-medium">01</div>
              <h1 className="font-serif text-4xl mb-2">{artwork.title}</h1>
              <p className="text-sm opacity-80 mb-12">{artwork.artist}, {artwork.year}</p>
            </AnimatedReveal>
          </div>

          <AnimatedReveal delay={0.4} direction="up" className="flex-grow">
            <div className="space-y-4 text-sm opacity-80 max-w-sm mb-12">
              <p>{artwork.medium}</p>
              <p>{artwork.dimensions}</p>
              <p className="pt-6 leading-relaxed">{artwork.description}</p>
            </div>
          </AnimatedReveal>

          <AnimatedReveal delay={0.6} direction="up">
            <div className="flex flex-col space-y-4 pt-8 border-t border-charcoal/10">
              <button 
                onClick={() => window.dispatchEvent(new Event("open-enquiry"))}
                className="w-full bg-charcoal text-offwhite py-4 text-xs tracking-[0.2em] uppercase hover:bg-charcoal/90 transition-colors"
              >
                Enquire
              </button>
            </div>
          </AnimatedReveal>
        </div>
      </main>

      <EnquiryModal />
    </>
  );
}
