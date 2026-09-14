"use client";

import { useEffect, useState } from "react";
import { Box } from "lucide-react";
import { cn } from "@/lib/utils";


interface ModelViewerARProps {
  modelUrl: string;
  className?: string;
}

export function ModelViewerAR({ modelUrl, className }: ModelViewerARProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Dynamically import model-viewer only on client side
    import("@google/model-viewer").then(() => {
      setIsMounted(true);
    });
  }, []);

  if (!isMounted) return null;

  const ModelViewer = 'model-viewer' as any;

  return (
    <div className={cn("relative w-full", className)}>
      <ModelViewer
        src={modelUrl}
        ar="true"
        ar-modes="webxr scene-viewer quick-look"
        camera-controls="true"
        disable-zoom="true"
        auto-rotate="true"
        shadow-intensity="1"
        style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
        alt="A 3D model of an artwork"
      >
        <button
          slot="ar-button"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-charcoal text-offwhite px-8 py-4 uppercase tracking-[0.2em] text-xs hover:bg-charcoal/90 transition-colors flex items-center space-x-3 shadow-lg"
        >
          <Box size={16} strokeWidth={1.5} />
          <span>View in my space</span>
        </button>
      </ModelViewer>
    </div>
  );
}
