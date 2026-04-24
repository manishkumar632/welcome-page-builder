"use client";

import { useEffect, useRef, useState } from "react";

const SCENE_URL =
  "https://my.spline.design/hands3duicopy-HzxtWHXRUJkz5I0zdPeOJg0y/";

export default function SplineCharacters() {
  const [loaded, setLoaded] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // Block wheel-zoom over the iframe so the page scrolls instead of the model zooming.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      // Let the page scroll; don't let Spline capture the wheel.
      e.stopPropagation();
    };
    el.addEventListener("wheel", onWheel, { passive: true, capture: true });
    return () => el.removeEventListener("wheel", onWheel, { capture: true } as EventListenerOptions);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto h-[440px] w-full max-w-5xl sm:h-[560px] lg:h-[640px]"
      style={{ background: "transparent" }}
    >
      {!loaded && (
        <div className="absolute inset-0 grid place-items-center">
          <div className="rounded-full border border-[var(--border-strong)] bg-[var(--surface)]/80 px-3 py-1 text-xs text-foreground/70 backdrop-blur">
            Loading characters…
          </div>
        </div>
      )}

      {/* Wheel-blocking shield: lets pointer events through for drag, but
          intercepts wheel so scroll-to-zoom is disabled. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
      />

      <iframe
        src={SCENE_URL}
        title="Spline 3D characters"
        loading="lazy"
        onLoad={() => setLoaded(true)}
        allow="autoplay; fullscreen; xr-spatial-tracking"
        className="absolute inset-0 h-full w-full border-0"
        style={{ background: "transparent" }}
      />

      {/* mask the Spline watermark */}
      <div className="pointer-events-none absolute bottom-0 right-0 h-14 w-44 bg-gradient-to-tl from-background via-background/90 to-transparent" />
    </div>
  );
}
