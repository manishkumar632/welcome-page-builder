"use client";

import { Suspense, lazy, useEffect, useState } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

// ⚠️ Replace this with the .splinecode URL Spline gives you after
// File → Export → Code Export → React.
// The editor URL (app.spline.design/file/...) is private and CANNOT be
// loaded directly — it returns 403 until you publish/export the scene.
const SCENE_URL =
  "https://prod.spline.design/fcb3d45a-1ffd-474a-afbf-9643cc3a0d40/scene.splinecode";

export default function SplineCharacters() {
  const [status, setStatus] = useState<"checking" | "ok" | "error">("checking");

  useEffect(() => {
    let cancelled = false;
    // Pre-flight HEAD so a 403/404 doesn't blow up the React tree mid-render
    // with the cryptic "end of buffer not reached" parse error.
    fetch(SCENE_URL, { method: "GET" })
      .then((r) => {
        if (cancelled) return;
        if (!r.ok) return setStatus("error");
        const ct = r.headers.get("content-type") || "";
        // .splinecode is a binary blob; HTML/XML means it's not a real scene.
        if (ct.includes("text/html") || ct.includes("xml")) {
          setStatus("error");
        } else {
          setStatus("ok");
        }
      })
      .catch(() => !cancelled && setStatus("error"));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative h-[440px] w-full sm:h-[520px]">
      {status === "checking" && <Skeleton label="Loading characters…" />}

      {status === "ok" && (
        <Suspense fallback={<Skeleton label="Loading characters…" />}>
          <div className="absolute inset-0">
            <Spline
              scene={SCENE_URL}
              onError={() => setStatus("error")}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </Suspense>
      )}

      {status === "error" && <FallbackNotice />}

      {/* mask Spline watermark */}
      {status === "ok" && (
        <div className="pointer-events-none absolute bottom-0 right-0 h-14 w-44 bg-gradient-to-tl from-background via-background/80 to-transparent" />
      )}

      {status === "ok" && (
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/30 px-3 py-1 text-[10px] uppercase tracking-wider text-white/70 backdrop-blur-sm">
          live spline scene · drag to interact
        </div>
      )}
    </div>
  );
}

function Skeleton({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="rounded-full border border-[var(--border-strong)] bg-[var(--surface)]/80 px-3 py-1 text-xs text-foreground/70 backdrop-blur">
        {label}
      </div>
    </div>
  );
}

function FallbackNotice() {
  return (
    <div className="absolute inset-0 grid place-items-center rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface-2)]/40 p-6 text-center">
      <div className="max-w-md">
        <div className="text-sm font-semibold text-foreground">
          This Spline scene isn’t public yet
        </div>
        <p className="mt-2 text-xs leading-relaxed text-foreground/70">
          Open the file in Spline →{" "}
          <span className="font-mono text-violet-glow">File → Export → Code Export → React</span>
          . Spline will give you a{" "}
          <span className="font-mono">prod.spline.design/…/scene.splinecode</span> URL.
          Paste that URL into{" "}
          <span className="font-mono">app/_components/SplineCharacters.tsx</span> and it will
          render here live.
        </p>
        <p className="mt-3 text-[11px] text-foreground/50">
          (The editor link <span className="font-mono">app.spline.design/file/…</span> is
          private — only you can see it; it can’t be embedded directly.)
        </p>
      </div>
    </div>
  );
}
