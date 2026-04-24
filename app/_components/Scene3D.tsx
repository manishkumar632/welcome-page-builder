"use client";

import { Component, Suspense, useEffect, useRef, type ReactNode } from "react";
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

/* -------------------------------------------------------------------------- */
/*  Model URLs                                                                */
/* -------------------------------------------------------------------------- */
/*  We use jsDelivr as the primary CDN — it is far more reliable than         */
/*  raw.githubusercontent.com for browser fetches (proper CORS, edge cache,   */
/*  no rate-limit on cold loads). raw.githubusercontent.com is kept as a      */
/*  documented fallback if you ever need to swap.                             */

const HELMET_URL =
  "https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb";
const FOX_URL =
  "https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/Fox/glTF-Binary/Fox.glb";
const BRAINSTEM_URL =
  "https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/BrainStem/glTF-Binary/BrainStem.glb";
const CESIUM_MAN_URL =
  "https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/CesiumMan/glTF-Binary/CesiumMan.glb";

/* Preload only on the client, after hydration — never at module-evaluation
   time (which would also run during SSR import-graph analysis and trigger
   the failing fetch you saw on reload). */
let preloaded = false;
function clientPreload() {
  if (preloaded || typeof window === "undefined") return;
  preloaded = true;
  // Fire-and-forget. useGLTF.preload internally uses GLTFLoader.load which
  // caches under the URL key, so later useGLTF(url) calls are instant.
  try {
    useGLTF.preload(HELMET_URL);
    useGLTF.preload(FOX_URL);
    useGLTF.preload(BRAINSTEM_URL);
    useGLTF.preload(CESIUM_MAN_URL);
  } catch {
    /* ignore — actual loading is retried inside each scene */
  }
}

/* -------------------------------------------------------------------------- */
/*  Generic helpers                                                           */
/* -------------------------------------------------------------------------- */

function Loader({ label = "Loading 3D…" }: { label?: string }) {
  return (
    <Html center>
      <div className="rounded-full border border-[var(--border-strong)] bg-[var(--surface)]/80 px-3 py-1 text-xs text-foreground/70 backdrop-blur">
        {label}
      </div>
    </Html>
  );
}

function SceneFallback({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-violet-glow/30 border-t-violet-glow" />
        <div className="text-xs uppercase tracking-wider text-foreground/60">{label}</div>
      </div>
    </div>
  );
}

function SceneError({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="max-w-xs rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)]/80 px-4 py-3 text-center text-xs text-foreground/70 backdrop-blur">
        {label}
      </div>
    </div>
  );
}

/* React error boundary — catches the synchronous throws from useGLTF when a
   model fails to fetch (network error, CORS, etc.) so the rest of the page
   keeps rendering instead of showing the Next.js red error overlay. */
class SceneBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err: unknown) {
    // eslint-disable-next-line no-console
    console.warn("[Scene3D] failed to render scene:", err);
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

/* -------------------------------------------------------------------------- */
/*  Helmet (hero, scroll + mouse driven)                                      */
/* -------------------------------------------------------------------------- */

function HelmetModel({
  progress,
  mouse,
}: {
  progress: MotionValue<number>;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const ref = useRef<Group>(null);
  const { scene } = useGLTF(HELMET_URL);
  const smoothed = useRef({ x: 0, y: 0 });
  const spin = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const ease = 1 - Math.pow(0.001, delta);
    smoothed.current.x += (mouse.current.x - smoothed.current.x) * ease;
    smoothed.current.y += (mouse.current.y - smoothed.current.y) * ease;
    spin.current += delta * 0.18;

    const p = progress.get();
    const mx = smoothed.current.x;
    const my = smoothed.current.y;

    const targetY = spin.current + mx * 0.7;
    const targetX = -0.1 + p * 1.1 - my * 0.45;

    ref.current.rotation.y += (targetY - ref.current.rotation.y) * ease;
    ref.current.rotation.x += (targetX - ref.current.rotation.x) * ease;

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

  useEffect(() => {
    clientPreload();
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
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
      <SceneBoundary fallback={<SceneError label="3D scene unavailable. Please refresh." />}>
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: "120%", height: "120%" }}
        >
          <Suspense fallback={<SceneFallback label="Loading hero scene" />}>
            <Canvas
              dpr={[1, 2]}
              camera={{ position: [0, 0.2, 4.4], fov: 40 }}
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
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
          </Suspense>
        </div>
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/30 px-3 py-1 text-[10px] uppercase tracking-wider text-white/60 backdrop-blur-sm">
          move cursor to interact
        </div>
      </SceneBoundary>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Distorted orb                                                             */
/* -------------------------------------------------------------------------- */

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
      <SceneBoundary fallback={<SceneError label="Orb scene unavailable." />}>
        <Suspense fallback={<SceneFallback label="Loading orb" />}>
          <Canvas
            dpr={[1, 2]}
            camera={{ position: [0, 0, 4], fov: 45 }}
            gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          >
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
        </Suspense>
      </SceneBoundary>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Animated character showcase                                               */
/* -------------------------------------------------------------------------- */

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
    <group ref={group} position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

export function ShowcaseScene() {
  useEffect(() => {
    clientPreload();
  }, []);
  return (
    <div className="relative h-[440px] w-full">
      <SceneBoundary fallback={<SceneError label="Character showcase unavailable." />}>
        <Suspense fallback={<SceneFallback label="Loading characters" />}>
          <Canvas
            dpr={[1, 2]}
            camera={{ position: [0, 1.4, 6], fov: 42 }}
            gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 6, 5]} intensity={1.2} color="#ffffff" castShadow />
            <directionalLight position={[-5, 3, -3]} intensity={0.7} color="#a78bfa" />
            <directionalLight position={[0, 2, -6]} intensity={0.5} color="#60a5fa" />
            <Suspense fallback={<Loader />}>
              <AnimatedCharacter url={BRAINSTEM_URL} position={[0, -1.1, 0]} scale={1.05} bob={0.05} bobSpeed={1.2} />
              <AnimatedCharacter
                url={CESIUM_MAN_URL}
                position={[-2.4, -1.1, 0.4]}
                rotationY={0.5}
                scale={1.25}
                bob={0.04}
                bobSpeed={1.6}
              />
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
        </Suspense>
      </SceneBoundary>
      <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/30 px-3 py-1 text-[10px] uppercase tracking-wider text-white/60 backdrop-blur-sm">
        live animated characters
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sticky scroll-tracked helmet                                              */
/* -------------------------------------------------------------------------- */

export function ScrollTrackedHelmet({ targetRef }: { targetRef: React.RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 18 });

  useEffect(() => {
    clientPreload();
  }, []);

  return (
    <div className="relative h-full w-full">
      <SceneBoundary fallback={<SceneError label="Scene unavailable." />}>
        <Suspense fallback={<SceneFallback label="Loading scene" />}>
          <Canvas
            dpr={[1, 2]}
            camera={{ position: [0, 0, 4.2], fov: 40 }}
            gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          >
            <ambientLight intensity={0.3} />
            <directionalLight position={[4, 5, 5]} intensity={1.2} color="#a78bfa" />
            <directionalLight position={[-4, -2, -3]} intensity={0.7} color="#60a5fa" />
            <Suspense fallback={<Loader />}>
              <TrackedHelmet progress={smooth} />
              <Sparkles count={50} scale={6} size={2} speed={0.4} color="#60a5fa" />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </Suspense>
      </SceneBoundary>
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
