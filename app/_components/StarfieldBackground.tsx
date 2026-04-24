"use client";

import { useEffect, useMemo, useState } from "react";

type Star = {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
};

type Meteor = {
  id: number;
  top: number;
  left: number;
  delay: number;
  duration: number;
  length: number;
  angle: number;
};

/**
 * Full-page animated starfield with periodic shooting meteors.
 * Pure CSS + React — no canvas, very cheap to render.
 * Sits behind everything (z-index 0 on a fixed full-viewport layer).
 */
export default function StarfieldBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Generate stars once. Use a fixed seed-ish pattern via Math.random
  // wrapped in useMemo so values stay stable for the life of the page.
  const stars = useMemo<Star[]>(() => {
    const arr: Star[] = [];
    for (let i = 0; i < 140; i++) {
      arr.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 1.8 + 0.4,
        delay: Math.random() * 6,
        duration: Math.random() * 4 + 2.5,
        opacity: Math.random() * 0.6 + 0.3,
      });
    }
    return arr;
  }, []);

  const bigStars = useMemo<Star[]>(() => {
    const arr: Star[] = [];
    for (let i = 0; i < 18; i++) {
      arr.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 1.5 + 1.8,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 3,
        opacity: Math.random() * 0.4 + 0.6,
      });
    }
    return arr;
  }, []);

  const meteors = useMemo<Meteor[]>(() => {
    const arr: Meteor[] = [];
    for (let i = 0; i < 8; i++) {
      arr.push({
        id: i,
        top: Math.random() * 60, // upper portion
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: Math.random() * 2.5 + 2.2,
        length: Math.random() * 120 + 120,
        angle: 215 + Math.random() * 25, // diagonal down-left to down-right-ish
      });
    }
    return arr;
  }, []);

  // Don't render on first SSR paint to avoid hydration noise from random values.
  if (!mounted) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{
        // Sit above the page background but below content.
        // page.tsx wrappers use bg-background which is opaque, so we make
        // them transparent in layout.tsx via a className.
      }}
    >
      {/* Subtle nebula tint */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 700px at 15% 10%, rgba(124,58,237,0.10), transparent 60%), radial-gradient(900px 600px at 85% 30%, rgba(59,130,246,0.08), transparent 60%), radial-gradient(800px 500px at 50% 90%, rgba(167,139,250,0.06), transparent 60%)",
        }}
      />

      {/* Tiny twinkling stars */}
      {stars.map((s) => (
        <span
          key={`s-${s.id}`}
          className="absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            boxShadow: `0 0 ${s.size * 2}px rgba(255,255,255,0.6)`,
            animation: `star-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}

      {/* Larger glowing stars with violet/blue tint */}
      {bigStars.map((s, i) => {
        const tint = i % 2 === 0 ? "167,139,250" : "96,165,250";
        return (
          <span
            key={`b-${s.id}`}
            className="absolute rounded-full"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              background: `rgb(${tint})`,
              opacity: s.opacity,
              boxShadow: `0 0 ${s.size * 4}px rgba(${tint},0.9), 0 0 ${s.size * 8}px rgba(${tint},0.4)`,
              animation: `star-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        );
      })}

      {/* Shooting meteors */}
      {meteors.map((m) => {
        // Convert angle to dx/dy travel
        const rad = (m.angle * Math.PI) / 180;
        const distance = 1400;
        const dx = Math.cos(rad) * distance;
        const dy = Math.sin(rad) * distance;
        return (
          <span
            key={`m-${m.id}`}
            className="absolute block"
            style={{
              top: `${m.top}%`,
              left: `${m.left}%`,
              opacity: 0,
              ["--mx" as string]: `${dx}px`,
              ["--my" as string]: `${dy}px`,
              animation: `meteor-travel ${m.duration}s linear ${m.delay}s infinite`,
            }}
          >
            <span
              className="block"
              style={{
                width: `${m.length}px`,
                height: "2px",
                transform: `rotate(${m.angle}deg)`,
                transformOrigin: "left center",
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(167,139,250,0.6) 40%, rgba(96,165,250,0) 100%)",
                borderRadius: "9999px",
                filter: "drop-shadow(0 0 6px rgba(167,139,250,0.7))",
              }}
            />
          </span>
        );
      })}

      <style jsx>{`
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes meteor-travel {
          0% { opacity: 0; transform: translate3d(0, 0, 0); }
          6% { opacity: 1; }
          70% { opacity: 1; }
          100% {
            opacity: 0;
            transform: translate3d(var(--mx), var(--my), 0);
          }
        }
      `}</style>
    </div>
  );
}
