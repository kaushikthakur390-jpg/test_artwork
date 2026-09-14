"use client";

import { useEffect, useRef, useState } from "react";
import OpenSeadragon from "openseadragon";
import { Maximize, ZoomIn, ZoomOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface DeepZoomViewerProps {
  imageUrl: string;
}

export function DeepZoomViewer({ imageUrl }: DeepZoomViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [viewer, setViewer] = useState<OpenSeadragon.Viewer | null>(null);
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    if (!viewerRef.current) return;

    // Use a simple image for POC.
    // In production with OSD, this would typically be a DZI (Deep Zoom Image) pyramid.
    const osdViewer = OpenSeadragon({
      element: viewerRef.current,
      prefixUrl: "//openseadragon.github.io/openseadragon/images/", // built-in OSD icons, though we hide them
      tileSources: {
        type: "image",
        url: imageUrl,
      },
      showNavigationControl: false,
      animationTime: 0.8,
      blendTime: 0.5,
      maxZoomPixelRatio: 2,
      minZoomImageRatio: 0.9,
      visibilityRatio: 1,
      zoomPerScroll: 1.2,
      gestureSettingsTouch: {
        flickEnabled: true,
        flickMinSpeed: 120,
        flickMomentum: 10,
        pinchToZoom: true,
      },
    });

    osdViewer.addHandler("canvas-click", () => setInteracted(true));
    osdViewer.addHandler("canvas-drag", () => setInteracted(true));
    osdViewer.addHandler("canvas-scroll", () => setInteracted(true));

    setViewer(osdViewer);

    return () => {
      osdViewer.destroy();
    };
  }, [imageUrl]);

  const handleZoomIn = () => viewer?.viewport.zoomBy(1.5);
  const handleZoomOut = () => viewer?.viewport.zoomBy(0.66);
  const handleReset = () => viewer?.viewport.goHome(true);

  return (
    <div className="relative w-full h-full bg-offwhite group">
      <div ref={viewerRef} className="w-full h-full cursor-crosshair" />

      {/* Custom Controls */}
      <div className="absolute bottom-6 right-6 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <button
          onClick={handleZoomIn}
          className="bg-offwhite/80 backdrop-blur-md text-charcoal p-3 rounded-full shadow-sm hover:bg-offwhite transition-colors border border-charcoal/5"
          aria-label="Zoom in"
        >
          <ZoomIn size={18} strokeWidth={1.5} />
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-offwhite/80 backdrop-blur-md text-charcoal p-3 rounded-full shadow-sm hover:bg-offwhite transition-colors border border-charcoal/5"
          aria-label="Zoom out"
        >
          <ZoomOut size={18} strokeWidth={1.5} />
        </button>
        <button
          onClick={handleReset}
          className="bg-offwhite/80 backdrop-blur-md text-charcoal p-3 rounded-full shadow-sm hover:bg-offwhite transition-colors border border-charcoal/5"
          aria-label="Reset zoom"
        >
          <Maximize size={18} strokeWidth={1.5} />
        </button>
      </div>

      <AnimatePresence>
        {!interacted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-none"
          >
            <p className="text-xs uppercase tracking-widest opacity-40 font-sans">
              Explore the surface
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
