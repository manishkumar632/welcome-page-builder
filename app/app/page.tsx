"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Pencil, Plus, Github, Linkedin, Globe, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";

export default function ProfilePage() {
  const { user } = useAuth();
  const fullName =
    (user?.user_metadata?.full_name as string | undefined) ??
    user?.email?.split("@")[0] ??
    "Your name";

  return (
    <div className="space-y-8">
      {/* Header card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-8"
      >
        <div aria-hidden className="absolute -right-20 -top-20 h-64 w-64 glow-violet opacity-60" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet to-blue text-2xl font-semibold">
            {fullName[0]?.toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight">{fullName}</h1>
              <span className="inline-flex items-center gap-1 rounded-full border border-[var(--border-strong)] bg-white/5 px-2 py-0.5 text-xs text-violet-glow">
                <ShieldCheck className="h-3 w-3" /> Verified email
              </span>
            </div>
            <p className="mt-1 text-sm text-foreground/70">
              Add a title and bio so recruiters know who you are.
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-sm text-muted">
              <a className="inline-flex items-center gap-1 hover:text-foreground"><Github className="h-3.5 w-3.5" /> Add GitHub</a>
              <span>·</span>
              <a className="inline-flex items-center gap-1 hover:text-foreground"><Linkedin className="h-3.5 w-3.5" /> Add LinkedIn</a>
              <span>·</span>
              <a className="inline-flex items-center gap-1 hover:text-foreground"><Globe className="h-3.5 w-3.5" /> Add website</a>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <TrustRing score={42} />
            <div className="text-xs text-muted">profile · 42% complete</div>
          </div>
        </div>
      </motion.div>

      {/* Two-column body */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <SectionCard title="Work experience" cta="Add role">
            <EmptyState
              icon={Plus}
              title="Add your first role"
              body="We'll help you collect peer attestations once you have at least one role on your profile."
              actionLabel="Add experience"
            />
          </SectionCard>

          <SectionCard title="Education" cta="Add school">
            <EmptyState
              icon={Plus}
              title="Add your education"
              body="Verified .edu emails count toward your trust score."
              actionLabel="Add education"
            />
          </SectionCard>

          <SectionCard title="Skills" cta="Add skill">
            <div className="flex flex-wrap gap-2">
              {["TypeScript", "React", "Postgres", "System design"].map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1 text-xs text-foreground/85"
                >
                  {s}
                </span>
              ))}
              <button className="rounded-full border border-dashed border-[var(--border-strong)] px-3 py-1 text-xs text-muted hover:text-foreground">
                + Add skill
              </button>
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Award className="h-4 w-4 text-violet-glow" /> Trust breakdown
            </div>
            <div className="mt-4 space-y-3">
              {[
                { k: "Profile completion", v: 42 },
                { k: "Verified email", v: 100 },
                { k: "Verified education", v: 0 },
                { k: "Peer attestations", v: 0 },
                { k: "Verifier quality", v: 0 },
              ].map((r) => (
                <div key={r.k}>
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground/70">{r.k}</span>
                    <span className="font-mono text-foreground/90">{r.v}</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet to-blue"
                      style={{ width: `${r.v}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <div className="text-sm font-medium">Next steps</div>
            <ul className="mt-3 space-y-2 text-sm text-foreground/80">
              <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-glow" /> Add at least one work experience</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-glow" /> Send 3 verification requests</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-glow" /> Connect GitHub or LinkedIn</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionCard({
  title,
  cta,
  children,
}: {
  title: string;
  cta?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold">{title}</h2>
        {cta && (
          <Button variant="ghost" size="sm">
            <Pencil className="h-3.5 w-3.5" />
            {cta}
          </Button>
        )}
      </div>
      {children}
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  body,
  actionLabel,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
  actionLabel: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--surface-2)] p-8 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
        <Icon className="h-4 w-4 text-violet-glow" />
      </div>
      <div className="mt-4 text-sm font-medium">{title}</div>
      <p className="mt-1 max-w-sm text-xs text-foreground/65">{body}</p>
      <Button variant="ghost" size="sm" className="mt-4">{actionLabel}</Button>
    </div>
  );
}

function TrustRing({ score }: { score: number }) {
  const size = 80;
  const stroke = 7;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="rotate-[-90deg]">
        <defs>
          <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#ring)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold">
        {score}
      </div>
    </div>
  );
}
