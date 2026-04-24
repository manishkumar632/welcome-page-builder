"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  OrbitControls,
  useGLTF,
  ContactShadows,
  Html,
} from "@react-three/drei";
import type { Group } from "three";

// Free glTF sample model from KhronosGroup (CDN, no API key, public domain / CC-BY).
// DamagedHelmet by theblueturtle_ — widely used PBR sample.
const HELMET_URL =
  "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb";

function Helmet() {
  const ref = useRef<Group>(null);
  const { scene } = useGLTF(HELMET_URL);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.35;
  });

  return (
    <group ref={ref} scale={1.6} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(HELMET_URL);

function Loader() {
  return (
    <Html center>
      <div className="rounded-full border border-[var(--border-strong)] bg-[var(--surface)]/80 px-3 py-1 text-xs text-foreground/70 backdrop-blur">
        Loading 3D…
      </div>
    </Html>
  );
}

export default function Hero3D() {
  return (
    <div className="relative h-[460px] w-full sm:h-[560px]">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.2, 4.2], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#a78bfa" />
        <directionalLight position={[-5, -2, -3]} intensity={0.6} color="#60a5fa" />

        <Suspense fallback={<Loader />}>
          <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
            <Helmet />
          </Float>
          <ContactShadows
            position={[0, -1.6, 0]}
            opacity={0.55}
            scale={8}
            blur={2.5}
            far={3}
            color="#000000"
          />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 2.8}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>

      {/* Hint chip */}
      <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-[var(--border)] bg-[var(--surface)]/60 px-3 py-1 text-[10px] uppercase tracking-wider text-muted backdrop-blur">
        drag to rotate
      </div>
    </div>
  );
}
