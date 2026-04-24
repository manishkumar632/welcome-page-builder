"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  useGLTF,
  useAnimations,
  ContactShadows,
  Html,
  MeshDistortMaterial,
  Sparkles,
} from "@react-three/drei";
import type { Group, Mesh } from "three";
import { useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";

// Free public glTF samples from KhronosGroup (CC-BY / public domain).
const HELMET_URL =
  "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb";
// Animated character GLBs (rigged + baked animations, Khronos sample assets).
const FOX_URL =
  "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Fox/glTF-Binary/Fox.glb";
const BRAINSTEM_URL =
  "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BrainStem/glTF-Binary/BrainStem.glb";
const CESIUM_MAN_URL =
  "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMan/glTF-Binary/CesiumMan.glb";

useGLTF.preload(HELMET_URL);
useGLTF.preload(FOX_URL);
useGLTF.preload(BRAINSTEM_URL);
useGLTF.preload(CESIUM_MAN_URL);

function Loader() {
  return (
    <Html center>
      <div className="rounded-full border border-[var(--border-strong)] bg-[var(--surface)]/80 px-3 py-1 text-xs text-foreground/70 backdrop-blur">
        Loading 3D…
      </div>
    </Html>
  );
}

/* ---------- Helmet (hero, scroll + mouse driven) ---------- */

function HelmetModel({
  progress,
  mouse,
}: {
  progress: MotionValue<number>;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const ref = useRef<Group>(null);
  const { scene } = useGLTF(HELMET_URL);
  // Smoothed mouse values that the model actually follows.
  const smoothed = useRef({ x: 0, y: 0 });
  // Continuous idle spin angle (so we don't read+write rotation.y).
  const spin = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current) return;

    // Lerp smoothed mouse toward the raw target. Lower = smoother/slower.
    const ease = 1 - Math.pow(0.001, delta); // framerate-independent ~6%/frame at 60fps
    smoothed.current.x += (mouse.current.x - smoothed.current.x) * ease;
    smoothed.current.y += (mouse.current.y - smoothed.current.y) * ease;

    // Idle spin
    spin.current += delta * 0.18;

    const p = progress.get();
    const mx = smoothed.current.x;
    const my = smoothed.current.y;

    // Absolute target rotations — written once per frame, no accumulation feedback.
    const targetY = spin.current + mx * 0.7;
    const targetX = -0.1 + p * 1.1 - my * 0.45;

    // Lerp the actual rotation toward the target for buttery motion.
    ref.current.rotation.y += (targetY - ref.current.rotation.y) * ease;
    ref.current.rotation.x += (targetX - ref.current.rotation.x) * ease;

    // Gentle parallax in position
    const targetPx = mx * 0.2;
    const targetPy = -p * 0.5 + my * 0.12;
    ref.current.position.x += (targetPx - ref.current.position.x) * ease;
    ref.current.position.y += (targetPy - ref.current.position.y) * ease;

    const s = 1.0 + p * 0.2;
    ref.current.scale.set(s, s, s);
  });

  return (
    <group ref={ref}>
      <primitive object={scene} />
    </group>
  );
}

export function HelmetScene() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 20, mass: 0.4 });
  const mouse = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Listen on the window so the helmet reacts to cursor anywhere on the
  // page — feels much more "alive" than a small hit-area on the canvas only.
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // Normalize relative to viewport size so movement feels consistent.
      const x = (e.clientX - cx) / (window.innerWidth / 2);
      const y = (e.clientY - cy) / (window.innerHeight / 2);
      mouse.current.x = Math.max(-1, Math.min(1, x));
      mouse.current.y = Math.max(-1, Math.min(1, y));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[480px] w-full sm:h-[600px]"
      style={{ overflow: "visible" }}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "120%",
          height: "120%",
        }}
      >
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0.2, 4.4], fov: 40 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent", overflow: "visible" }}
        >
          <ambientLight intensity={0.35} />
          <directionalLight position={[5, 5, 5]} intensity={1.3} color="#a78bfa" />
          <directionalLight position={[-5, -2, -3]} intensity={0.7} color="#60a5fa" />
          <Suspense fallback={<Loader />}>
            <HelmetModel progress={smooth} mouse={mouse} />
            <Sparkles count={40} scale={6} size={2} speed={0.4} color="#a78bfa" />
            <ContactShadows position={[0, -1.6, 0]} opacity={0.45} scale={8} blur={2.6} far={3} />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>
      <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/30 px-3 py-1 text-[10px] uppercase tracking-wider text-white/60 backdrop-blur-sm">
        move cursor to interact
      </div>
    </div>
  );
}

/* ---------- Distorted orb (CSS-tracked scroll → distortion) ---------- */

function Orb({ progress }: { progress: MotionValue<number> }) {
  const mesh = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * 0.2;
    mesh.current.rotation.y += delta * 0.3;
    const p = progress.get();
    const s = 1 + p * 0.3;
    mesh.current.scale.set(s, s, s);
  });
  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.2, 16]} />
      <MeshDistortMaterial
        color="#7c3aed"
        roughness={0.15}
        metalness={0.6}
        distort={0.45}
        speed={2}
        emissive="#3b82f6"
        emissiveIntensity={0.25}
      />
    </mesh>
  );
}

export function OrbScene() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  return (
    <div className="relative h-[420px] w-full">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 4, 4]} intensity={50} color="#a78bfa" />
        <pointLight position={[-4, -2, 3]} intensity={30} color="#60a5fa" />
        <Suspense fallback={<Loader />}>
          <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1}>
            <Orb progress={smooth} />
          </Float>
          <Sparkles count={60} scale={5} size={2.5} speed={0.5} color="#60a5fa" />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
}

/* ---------- Animated character showcase ---------- */

function AnimatedCharacter({
  url,
  position,
  rotationY = 0,
  scale = 1,
  bob = 0.08,
  bobSpeed = 1.4,
  preferredClip,
}: {
  url: string;
  position: [number, number, number];
  rotationY?: number;
  scale?: number;
  bob?: number;
  bobSpeed?: number;
  preferredClip?: string;
}) {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF(url);
  // Clone scene so each instance is independent (skinned meshes need SkeletonUtils for true independence,
  // but for a single-instance-per-URL showcase, the source scene is fine and keeps animations bound).
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    if (!names.length) return;
    const pick =
      (preferredClip && names.find((n) => n.toLowerCase().includes(preferredClip.toLowerCase()))) ||
      names[0];
    const action = actions[pick];
    action?.reset().fadeIn(0.4).play();
    return () => {
      action?.fadeOut(0.3);
    };
  }, [actions, names, preferredClip]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.position.y = position[1] + Math.sin(t * bobSpeed) * bob;
    group.current.rotation.y = rotationY + Math.sin(t * 0.4) * 0.15;
  });

  return (
    <group
      ref={group}
      position={position}
      rotation={[0, rotationY, 0]}
      scale={scale}
    >
      <primitive object={scene} />
    </group>
  );
}

export function ShowcaseScene() {
  return (
    <div className="relative h-[440px] w-full">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 1.4, 6], fov: 42 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 6, 5]} intensity={1.2} color="#ffffff" castShadow />
        <directionalLight position={[-5, 3, -3]} intensity={0.7} color="#a78bfa" />
        <directionalLight position={[0, 2, -6]} intensity={0.5} color="#60a5fa" />
        <Suspense fallback={<Loader />}>
          {/* Center: BrainStem — idle dance loop */}
          <AnimatedCharacter
            url={BRAINSTEM_URL}
            position={[0, -1.1, 0]}
            scale={1.05}
            bob={0.05}
            bobSpeed={1.2}
          />
          {/* Left: CesiumMan — walking */}
          <AnimatedCharacter
            url={CESIUM_MAN_URL}
            position={[-2.4, -1.1, 0.4]}
            rotationY={0.5}
            scale={1.25}
            bob={0.04}
            bobSpeed={1.6}
          />
          {/* Right: Fox — survey/run animation, scaled down (Fox model is huge) */}
          <AnimatedCharacter
            url={FOX_URL}
            position={[2.4, -1.1, 0.4]}
            rotationY={-0.5}
            scale={0.022}
            bob={0.02}
            bobSpeed={1.0}
            preferredClip="Survey"
          />
          <Sparkles count={80} scale={8} size={2} speed={0.35} color="#a78bfa" />
          <ContactShadows position={[0, -1.12, 0]} opacity={0.5} scale={12} blur={3} far={4} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/30 px-3 py-1 text-[10px] uppercase tracking-wider text-white/60 backdrop-blur-sm">
        live animated characters
      </div>
    </div>
  );
}


/* ---------- Sticky scroll-track section: model rotates as user scrolls past ---------- */

export function ScrollTrackedHelmet({ targetRef }: { targetRef: React.RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 18 });
  return (
    <div className="h-full w-full">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4.2], fov: 40 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[4, 5, 5]} intensity={1.2} color="#a78bfa" />
        <directionalLight position={[-4, -2, -3]} intensity={0.7} color="#60a5fa" />
        <Suspense fallback={<Loader />}>
          <TrackedHelmet progress={smooth} />
          <Sparkles count={50} scale={6} size={2} speed={0.4} color="#60a5fa" />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

function TrackedHelmet({ progress }: { progress: MotionValue<number> }) {
  const ref = useRef<Group>(null);
  const { scene } = useGLTF(HELMET_URL);
  useFrame(() => {
    if (!ref.current) return;
    const p = progress.get();
    ref.current.rotation.y = p * Math.PI * 4;
    ref.current.rotation.x = Math.sin(p * Math.PI * 2) * 0.4;
    ref.current.position.x = (p - 0.5) * 1.6;
    const s = 1.4 + Math.sin(p * Math.PI) * 0.4;
    ref.current.scale.set(s, s, s);
  });
  return (
    <group ref={ref}>
      <primitive object={scene.clone()} />
    </group>
  );
}

// Keep useTransform imported for tree-shake friendliness (used by sibling files)
export const _kt = useTransform;
