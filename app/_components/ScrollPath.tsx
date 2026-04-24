"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";

function Milestone({
  physics,
  cx,
  cy,
  threshold,
}: {
  physics: MotionValue<number>;
  cx: number;
  cy: number;
  threshold: number;
}) {
  const reach = useTransform(physics, [threshold, threshold + 0.05], [0, 1]);
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={6}
      fill="#0f0f14"
      stroke="url(#pathGrad)"
      strokeWidth={2}
      style={{ scale: reach, opacity: reach, transformOrigin: `${cx}px ${cy}px` }}
    />
  );
}

/**
 * A long, decorative SVG path that draws itself as the user scrolls
 * past the section. Uses a spring on scrollYProgress so the stroke
 * has subtle physics (overshoot, momentum on fast scroll).
 */
export default function ScrollPath() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const physics = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 18,
    mass: 0.6,
  });

  const draw = useTransform(physics, [0, 1], [0, 1]);
  const dashOffset = useTransform(draw, (v) => 1 - v);
  const dotY = useTransform(physics, [0, 1], [0, 1600]);
  const glowOpacity = useTransform(physics, [0, 0.1, 0.9, 1], [0.2, 1, 1, 0.2]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[140px]">
      <svg
        viewBox="0 0 140 1600"
        width="140"
        height="1600"
        fill="none"
        className="h-full w-full overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="pathGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
          <filter id="pathGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* faint static guide */}
        <path
          d="M70 0 C 20 200, 120 400, 70 600 S 20 1000, 70 1200 S 120 1450, 70 1600"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="2"
        />

        {/* animated draw path */}
        <motion.path
          d="M70 0 C 20 200, 120 400, 70 600 S 20 1000, 70 1200 S 120 1450, 70 1600"
          stroke="url(#pathGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          pathLength={1}
          style={{
            pathLength: draw,
            strokeDashoffset: dashOffset,
            filter: "url(#pathGlow)",
          }}
        />

        {/* milestone nodes */}
        <Milestone physics={physics} cx={95} cy={200} threshold={0.1} />
        <Milestone physics={physics} cx={45} cy={600} threshold={0.35} />
        <Milestone physics={physics} cx={95} cy={1000} threshold={0.6} />
        <Milestone physics={physics} cx={45} cy={1400} threshold={0.85} />

        {/* travelling dot */}
        <motion.circle
          cx={70}
          r={5}
          fill="#a78bfa"
          style={{ cy: dotY, opacity: glowOpacity, filter: "url(#pathGlow)" }}
        />
      </svg>
    </div>
  );
}
