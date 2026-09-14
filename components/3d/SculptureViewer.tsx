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

  const handleAR = () => {
    const ua = navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const isAndroid = /Android/i.test(ua);
    const fullModelUrl = new URL(modelUrl, window.location.origin).href;

    if (isIOS) {
      // iOS Quick Look: create a temporary <a rel="ar"> link with child <img>
      // This is the native Safari API for launching AR Quick Look
      const anchor = document.createElement("a");
      anchor.setAttribute("rel", "ar");
      anchor.setAttribute("href", fullModelUrl);
      anchor.style.display = "none";
      // Quick Look requires a child <img> element to trigger AR mode
      const img = document.createElement("img");
      img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
      anchor.appendChild(img);
      document.body.appendChild(anchor);
      anchor.click();
      // Clean up
      setTimeout(() => document.body.removeChild(anchor), 100);
    } else if (isAndroid) {
      // Android Scene Viewer intent
      const fallback = encodeURIComponent(window.location.href);
      const intentUrl = `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(fullModelUrl)}&mode=ar_preferred#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${fallback};end;`;
      window.location.href = intentUrl;
    } else {
      alert("AR viewing is available on mobile devices. Please open this page on your phone.");
    }
  };

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
      />

      {/* AR button — always visible, uses native platform AR APIs */}
      <button
        onClick={handleAR}
        className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 bg-charcoal text-offwhite px-8 py-4 uppercase tracking-[0.2em] text-xs hover:bg-charcoal/90 transition-colors flex items-center space-x-3 shadow-lg cursor-pointer z-10"
      >
        <Box size={16} strokeWidth={1.5} />
        <span>View in my space</span>
      </button>

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
