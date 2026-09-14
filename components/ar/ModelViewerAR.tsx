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
  const [arSupported, setArSupported] = useState(false);

  useEffect(() => {
    import("@google/model-viewer").then(() => {
      setIsMounted(true);
    });
  }, []);

  useEffect(() => {
    // Check if AR is supported on this device
    if (typeof navigator !== "undefined" && "xr" in navigator) {
      (navigator as any).xr
        ?.isSessionSupported?.("immersive-ar")
        .then((supported: boolean) => setArSupported(supported))
        .catch(() => setArSupported(false));
    }

    // iOS Quick Look is always available on Safari iOS
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isIOS) {
      setArSupported(true);
    }

    // Android Scene Viewer support
    const isAndroid = /Android/i.test(navigator.userAgent);
    if (isAndroid) {
      setArSupported(true);
    }
  }, []);

  const handleViewInSpace = () => {
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);

    if (isIOS) {
      // iOS Quick Look - uses USDZ or falls back to GLB
      const link = document.createElement("a");
      link.setAttribute("rel", "ar");
      link.setAttribute("href", modelUrl);
      const img = document.createElement("img");
      link.appendChild(img);
      link.click();
    } else if (isAndroid) {
      // Android Scene Viewer
      const intentUrl = `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(window.location.origin + modelUrl)}&mode=ar_preferred#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(window.location.href)};end;`;
      window.location.href = intentUrl;
    } else {
      // Desktop fallback - just alert
      alert("AR is available on mobile devices. Open this page on your phone to view in your space.");
    }
  };

  return (
    <div className={cn("relative z-10", className)}>
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
