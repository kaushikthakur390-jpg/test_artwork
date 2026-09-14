"use client";

import { useEffect, useState, useRef } from "react";
import { Box } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SculptureViewerProps {
  modelUrl: string;
}

export function SculptureViewer({ modelUrl }: SculptureViewerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("@google/model-viewer").then(() => {
      setIsMounted(true);
    });
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-offwhite">
        <p className="text-xs tracking-widest uppercase opacity-40 animate-pulse">
          Loading model…
        </p>
      </div>
    );
  }

  const ModelViewer = "model-viewer" as any;

  return (
    <div
      ref={viewerRef}
      className="relative w-full h-full bg-offwhite"
      onPointerDown={() => setInteracted(true)}
    >
      <ModelViewer
        src={modelUrl}
        ar="true"
        ar-modes="webxr scene-viewer quick-look"
        camera-controls="true"
        auto-rotate="true"
        auto-rotate-delay="0"
        rotation-per-second="8deg"
        shadow-intensity="0.6"
        shadow-softness="1"
        environment-image="neutral"
        exposure="1"
        interaction-prompt="none"
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "transparent",
          "--poster-color": "transparent",
        }}
        alt="A 3D model of an artwork"
      >
        {/* AR button — forced to always display using !flex to bypass model-viewer's aggressive hiding */}
        <button
          slot="ar-button"
          className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 bg-charcoal text-offwhite px-8 py-4 uppercase tracking-[0.2em] text-xs hover:bg-charcoal/90 transition-colors !flex items-center space-x-3 shadow-lg cursor-pointer z-10"
        >
          <Box size={16} strokeWidth={1.5} />
          <span>View in my space</span>
        </button>
      </ModelViewer>

      {/* Drag hint */}
      <AnimatePresence>
        {!interacted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 pointer-events-none z-20"
          >
            <p className="text-xs uppercase tracking-widest opacity-40 font-sans">
              Drag to rotate
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
