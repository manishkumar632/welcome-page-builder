"use client";

import { Suspense, lazy, useState } from "react";

// Lazy-load Spline so it never runs at SSR time and never breaks the build
// if the runtime fetch fails.
const Spline = lazy(() => import("@splinetool/react-spline"));

// Spline file the user picked. Spline's <Spline /> accepts either a
// `.splinecode` runtime URL or a public `app.spline.design/file/...` URL —
// it normalizes both internally. We pass the file URL straight through.
const SCENE_URL =
  "https://prod.spline.design/fcb3d45a-1ffd-474a-afbf-9643cc3a0d40/scene.splinecode";

export default function SplineCharacters() {
  const [errored, setErrored] = useState(false);

  return (
    <div className="relative h-[440px] w-full sm:h-[520px]">
      {!errored ? (
        <Suspense fallback={<Skeleton />}>
          <div className="absolute inset-0">
            <Spline
              scene={SCENE_URL}
              onError={() => setErrored(true)}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </Suspense>
      ) : (
        <FallbackNotice />
      )}

      {/* Hide Spline's default watermark logo cleanly */}
      <div className="pointer-events-none absolute bottom-0 right-0 h-14 w-44 bg-gradient-to-tl from-background via-background/80 to-transparent" />

      <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/30 px-3 py-1 text-[10px] uppercase tracking-wider text-white/70 backdrop-blur-sm">
        live spline scene · drag to interact
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="rounded-full border border-[var(--border-strong)] bg-[var(--surface)]/80 px-3 py-1 text-xs text-foreground/70 backdrop-blur">
        Loading characters…
      </div>
    </div>
  );
}

function FallbackNotice() {
  return (
    <div className="absolute inset-0 grid place-items-center rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface-2)]/40 p-6 text-center">
      <div>
        <div className="text-sm font-medium text-foreground">
          Couldn’t load the Spline scene
        </div>
        <p className="mt-1 max-w-sm text-xs text-foreground/65">
          Make sure the Spline file is set to <span className="font-mono">Public</span> and
          re-export it. Then this section will render the live characters.
        </p>
      </div>
    </div>
  );
}
