"use client";

import { useState } from "react";

// Public Spline viewer URL (my.spline.design/...).
// This is an HTML viewer page — embed it via <iframe>, NOT via @splinetool/react-spline
// (which expects a binary .splinecode file from prod.spline.design).
const SCENE_URL =
  "https://my.spline.design/hands3duicopy-HzxtWHXRUJkz5I0zdPeOJg0y/";

export default function SplineCharacters() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative h-[440px] w-full overflow-hidden rounded-2xl sm:h-[520px]">
      {!loaded && (
        <div className="absolute inset-0 grid place-items-center">
          <div className="rounded-full border border-[var(--border-strong)] bg-[var(--surface)]/80 px-3 py-1 text-xs text-foreground/70 backdrop-blur">
            Loading characters…
          </div>
        </div>
      )}

      <iframe
        src={SCENE_URL}
        title="Spline 3D characters"
        loading="lazy"
        onLoad={() => setLoaded(true)}
        allow="autoplay; fullscreen; xr-spatial-tracking"
        className="absolute inset-0 h-full w-full border-0"
        style={{ background: "transparent" }}
      />

      {/* mask the Spline watermark in the bottom-right */}
      <div className="pointer-events-none absolute bottom-0 right-0 h-14 w-44 bg-gradient-to-tl from-background via-background/85 to-transparent" />

      <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-[10px] uppercase tracking-wider text-white/70 backdrop-blur-sm">
        live spline scene · drag to interact
      </div>
    </div>
  );
}
