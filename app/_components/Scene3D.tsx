"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  useGLTF,
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
const DUCK_URL =
  "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb";
const AVOCADO_URL =
  "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF-Binary/Avocado.glb";

useGLTF.preload(HELMET_URL);
useGLTF.preload(DUCK_URL);
useGLTF.preload(AVOCADO_URL);

function Loader() {
  return (
    <Html center>
      <div className="rounded-full border border-[var(--border-strong)] bg-[var(--surface)]/80 px-3 py-1 text-xs text-foreground/70 backdrop-blur">
        Loading 3D…
      </div>
    </Html>
  );
}

/* ---------- Helmet (hero, scroll-driven rotation + zoom) ---------- */

function HelmetModel({ progress }: { progress: MotionValue<number> }) {
  const ref = useRef<Group>(null);
  const { scene } = useGLTF(HELMET_URL);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const p = progress.get();
    ref.current.rotation.y += delta * 0.25;
    ref.current.rotation.x = -0.25 + p * 1.4;
    ref.current.position.y = -p * 0.8;
    const s = 1.6 + p * 0.4;
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

  return (
    <div
      className="pointer-events-none relative h-[480px] w-full sm:h-[600px]"
      style={{ overflow: "visible" }}
    >
      {/* Oversized canvas that bleeds beyond the layout box so the helmet
          appears to float above the page rather than sit inside a frame. */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "170%",
          height: "170%",
          pointerEvents: "auto",
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
            <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.7}>
              <HelmetModel progress={smooth} />
            </Float>
            <Sparkles count={40} scale={6} size={2} speed={0.4} color="#a78bfa" />
            <ContactShadows position={[0, -1.6, 0]} opacity={0.45} scale={8} blur={2.6} far={3} />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>
      <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/30 px-3 py-1 text-[10px] uppercase tracking-wider text-white/60 backdrop-blur-sm">
        scroll to interact
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

/* ---------- Trio of GLB models orbiting (section showcase) ---------- */

function OrbitingModel({
  url,
  radius,
  speed,
  yOffset = 0,
  scale = 1,
}: {
  url: string;
  radius: number;
  speed: number;
  yOffset?: number;
  scale?: number;
}) {
  const ref = useRef<Group>(null);
  const { scene } = useGLTF(url);
  // clone for safety when reused
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = yOffset + Math.sin(t * 1.6) * 0.15;
    ref.current.rotation.y = t * 0.8;
  });
  return (
    <group ref={ref} scale={scale}>
      <primitive object={scene.clone()} />
    </group>
  );
}

export function ShowcaseScene() {
  return (
    <div className="relative h-[440px] w-full">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 1.5, 5], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 6, 5]} intensity={1.1} color="#ffffff" />
        <directionalLight position={[-5, 3, -3]} intensity={0.6} color="#60a5fa" />
        <Suspense fallback={<Loader />}>
          {/* Center helmet */}
          <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
            <group scale={0.9}>
              <CenterHelmet />
            </group>
          </Float>
          {/* Orbiters */}
          <OrbitingModel url={DUCK_URL} radius={2.2} speed={0.6} yOffset={0.2} scale={0.012} />
          <OrbitingModel url={AVOCADO_URL} radius={2.6} speed={-0.45} yOffset={-0.3} scale={28} />
          <Sparkles count={70} scale={7} size={2} speed={0.35} color="#a78bfa" />
          <ContactShadows position={[0, -1.4, 0]} opacity={0.4} scale={10} blur={3} far={4} />
          <Environment preset="warehouse" />
        </Suspense>
      </Canvas>
    </div>
  );
}

function CenterHelmet() {
  const ref = useRef<Group>(null);
  const { scene } = useGLTF(HELMET_URL);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.4;
  });
  return (
    <group ref={ref}>
      <primitive object={scene.clone()} />
    </group>
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
