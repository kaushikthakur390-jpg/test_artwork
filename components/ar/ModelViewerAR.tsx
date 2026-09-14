"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Box } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModelViewerARProps {
  modelUrl: string;
  className?: string;
}

export function ModelViewerAR({ modelUrl, className }: ModelViewerARProps) {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("@google/model-viewer").then(() => {
      setIsMounted(true);
    });
  }, []);

  const handleViewInSpace = useCallback(() => {
    // Find the model-viewer element inside our hidden container and call activateAR
    if (containerRef.current) {
      const mv = containerRef.current.querySelector("model-viewer") as any;
      if (mv && mv.activateAR) {
        mv.activateAR();
      }
    }
  }, []);

  if (!isMounted) return null;

  const ModelViewer = "model-viewer" as any;

  return (
    <div className={cn("relative", className)}>
      {/* Hidden model-viewer: 1x1 pixel, off-screen, no WebGL rendering thanks to reveal=manual */}
      <div
        ref={containerRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          overflow: "hidden",
          top: "-9999px",
          left: "-9999px",
        }}
      >
        <ModelViewer
          src={modelUrl}
          ar="true"
          ar-modes="webxr scene-viewer quick-look"
          reveal="manual"
          loading="lazy"
          style={{ width: "1px", height: "1px" }}
        />
      </div>

      {/* Visible AR button */}
      <button
        onClick={handleViewInSpace}
        className="bg-charcoal text-offwhite px-8 py-4 uppercase tracking-[0.2em] text-xs hover:bg-charcoal/90 transition-colors flex items-center space-x-3 shadow-lg cursor-pointer"
      >
        <Box size={16} strokeWidth={1.5} />
        <span>View in my space</span>
      </button>
    </div>
  );
}
