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

  const viewerRef = useRef<any>(null);

  useEffect(() => {
    // Dynamically import model-viewer only on client side
    import("@google/model-viewer").then(() => {
      setIsMounted(true);
    });
  }, []);

  if (!isMounted) return null;

  const ModelViewer = 'model-viewer' as any;

  return (
    <div className={cn("absolute inset-0 pointer-events-none flex items-end justify-center pb-6 md:pb-12 z-20", className)}>
      <ModelViewer
        src={modelUrl}
        ar="true"
        ar-modes="webxr scene-viewer quick-look"
        reveal="manual"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', backgroundColor: 'transparent' }}
      >
        <button
          slot="ar-button"
          className="pointer-events-auto bg-charcoal text-offwhite px-8 py-4 uppercase tracking-[0.2em] text-xs hover:bg-charcoal/90 transition-colors flex items-center space-x-3 shadow-lg cursor-pointer"
        >
          <Box size={16} strokeWidth={1.5} />
          <span>View in my space</span>
        </button>
      </ModelViewer>
    </div>
  );
}
