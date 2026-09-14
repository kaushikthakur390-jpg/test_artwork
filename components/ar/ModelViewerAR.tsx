"use client";

import { useEffect, useState, useRef } from "react";
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

  const viewerRef = useRef<any>(null);

  const handleARClick = () => {
    if (viewerRef.current && viewerRef.current.activateAR) {
      viewerRef.current.activateAR();
    }
  };

  return (
    <div className={cn("absolute inset-0 pointer-events-none flex items-end justify-center pb-6 md:pb-12 z-20", className)}>
      <ModelViewer
        ref={viewerRef}
        src={modelUrl}
        ar="true"
        ar-modes="webxr scene-viewer quick-look"
        style={{ position: 'absolute', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none' }}
      />
      <button
        onClick={handleARClick}
        className="pointer-events-auto bg-charcoal text-offwhite px-8 py-4 uppercase tracking-[0.2em] text-xs hover:bg-charcoal/90 transition-colors flex items-center space-x-3 shadow-lg"
      >
        <Box size={16} strokeWidth={1.5} />
        <span>View in my space</span>
      </button>
    </div>
  );
}
