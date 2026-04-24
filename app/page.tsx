"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Sparkles,
  CircleCheck,
  Users,
  Briefcase,
  ArrowRight,
  Activity,
  Zap,
  Lock,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1], delay: i * 0.06 },
  }),
};

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* ===== Nav ===== */}
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-2">
            <LogoMark />
            <span className="text-[15px] font-semibold tracking-tight">Protobloc</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-foreground/70 md:flex">
            <a href="#problem" className="hover:text-foreground transition">Problem</a>
            <a href="#solution" className="hover:text-foreground transition">Solution</a>
            <a href="#candidates" className="hover:text-foreground transition">Candidates</a>
            <a href="#recruiters" className="hover:text-foreground transition">Recruiters</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/signup">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="relative isolate overflow-hidden pb-32 pt-40 sm:pt-48">
        {/* Glow blobs */}
        <div aria-hidden className="absolute left-1/2 top-0 -z-10 h-[520px] w-[820px] -translate-x-1/2 glow-violet animate-pulse-glow" />
        <div aria-hidden className="absolute -bottom-40 right-[-10%] -z-10 h-[420px] w-[620px] glow-blue animate-pulse-glow" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid bg-grid-fade" />
        <div aria-hidden className="noise -z-10" />

        <div className="mx-auto max-w-6xl px-6 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white/[0.03] px-4 py-1.5 text-xs text-foreground/80 backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-violet-glow" />
            <span>Now in private beta — verified hiring for the AI era</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="show"
            className="mx-auto mt-8 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          >
            <span className="text-gradient">Trust is the</span>
            <br />
            <span className="text-gradient-accent">new resume.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="show"
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground/70"
          >
            Resumes are easy to fake. Protobloc replaces them with a verified professional identity —
            peer attestations, cryptographic provenance, and a transparent trust score that
            recruiters can actually rely on.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button asChild size="lg">
              <Link href="/signup">
                Claim your identity
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="#solution">See how it works</Link>
            </Button>
          </motion.div>

          {/* Trust metrics strip */}
          <motion.div
            variants={fadeUp}
            custom={4}
            initial="hidden"
            animate="show"
            className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
          >
            {[
              { k: "12,400+", v: "verified profiles" },
              { k: "94%", v: "verifier accuracy" },
              { k: "<48h", v: "avg. time to verify" },
            ].map((m) => (
              <div key={m.v} className="bg-[var(--surface)] px-6 py-5">
                <div className="text-2xl font-semibold text-gradient-accent">{m.k}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted">{m.v}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero product mock card */}
        <div className="mx-auto mt-20 max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-2 shadow-[0_60px_120px_-40px_rgba(124,58,237,0.35)]"
          >
            <div className="rounded-xl bg-[var(--surface-2)] p-6 sm:p-10">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet to-blue text-lg font-semibold">
                  AR
                </div>
                <div className="flex-1">
                  <div className="text-lg font-semibold">Ava Reyes</div>
                  <div className="text-sm text-muted">Staff Engineer · ex-Stripe, ex-Linear</div>
                </div>
                <TrustRing score={94} />
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: ShieldCheck, label: "Verified work history", value: "5 of 5 roles" },
                  { icon: Users, label: "Peer attestations", value: "23 from 4 companies" },
                  { icon: Activity, label: "Trust percentile", value: "Top 4% globally" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-[var(--border)] bg-[var(--surface-3)] p-4">
                    <s.icon className="h-4 w-4 text-violet-glow" />
                    <div className="mt-3 text-xs uppercase tracking-wider text-muted">{s.label}</div>
                    <div className="mt-1 text-sm font-medium">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== Problem ===== */}
      <Section id="problem" eyebrow="The problem" title="Hiring trust is collapsing.">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Sparkles,
              title: "AI-generated resumes",
              body: "LLMs produce flawless, tailored resumes in seconds. Recruiters can no longer tell the polished from the fabricated.",
            },
            {
              icon: Lock,
              title: "Unverifiable claims",
              body: "Roles, dates, and impact stories live in PDFs nobody can prove. Background checks are slow, expensive, and shallow.",
            },
            {
              icon: Zap,
              title: "Low hiring confidence",
              body: "Teams interview more, hire slower, and still mis-hire. Talented candidates get lost in the noise.",
            },
          ].map((p) => (
            <div key={p.title} className="rounded-2xl glass p-6">
              <p.icon className="h-5 w-5 text-violet-glow" />
              <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== Solution ===== */}
      <Section id="solution" eyebrow="The solution" title="A verified identity layer for work.">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            {[
              { n: "01", t: "Upload your resume", d: "We parse experience, education, and skills with AI to build a draft profile in seconds." },
              { n: "02", t: "Request peer attestations", d: "Share a unique verification link with former managers and teammates. They confirm your role, dates, and impact." },
              { n: "03", t: "Build your trust score", d: "Our engine weighs verifier seniority, company-domain emails, timeline overlap, and independence to compute a score out of 100." },
              { n: "04", t: "Get discovered", d: "Recruiters search and shortlist by trust percentile, verified skills, and real work history — not keywords." },
            ].map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface-2)] font-mono text-xs text-violet-glow">
                  {s.n}
                </div>
                <div>
                  <div className="text-base font-semibold">{s.t}</div>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/65">{s.d}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-6 -z-10 glow-violet opacity-60 blur-2xl" />
            <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-6">
              <div className="text-xs uppercase tracking-wider text-muted">Trust score breakdown</div>
              <div className="mt-4 flex items-center gap-6">
                <TrustRing score={91} large />
                <div className="flex-1 space-y-3">
                  {[
                    { k: "Profile completion", v: 100 },
                    { k: "Verified email & education", v: 100 },
                    { k: "Peer attestations (23)", v: 92 },
                    { k: "Verifier quality", v: 88 },
                    { k: "Consistency", v: 95 },
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
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ===== Candidates ===== */}
      <Section id="candidates" eyebrow="For candidates" title="Own your professional truth.">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { icon: ShieldCheck, t: "Provable work history", d: "Every role independently attested by people you actually worked with — never deepfakeable." },
            { icon: Star, t: "Stand out, instantly", d: "A high trust percentile is a credible signal recruiters can act on without a 5-round process." },
            { icon: Users, t: "Portable network proof", d: "Your verifications travel with you across companies, jobs, and platforms — you keep ownership." },
            { icon: Briefcase, t: "Get matched with real roles", d: "Recruiters see verified skills and reach out with relevant opportunities, not spam." },
          ].map((f) => (
            <FeatureCard key={f.t} {...f} />
          ))}
        </div>
      </Section>

      {/* ===== Recruiters ===== */}
      <Section id="recruiters" eyebrow="For recruiters" title="Hire with confidence, faster.">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, t: "Verified-only search", d: "Filter by trust percentile, verified employers, and attested skills." },
            { icon: Users, t: "Pipeline & ATS", d: "Drag-and-drop kanban from Applied to Hired, with team notes." },
            { icon: Activity, t: "Trust analytics", d: "See verified-applicant ratios and avg. score per role in real time." },
            { icon: Zap, t: "10x signal density", d: "Stop screening AI fluff. Start interviewing pre-vetted humans." },
          ].map((f) => (
            <FeatureCard key={f.t} {...f} compact />
          ))}
        </div>
      </Section>

      {/* ===== Logos / social proof ===== */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-6 py-14 text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">
            Trusted by talent from
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-foreground/40">
            {["Stripe", "Linear", "Vercel", "Figma", "Anthropic", "Ramp", "Notion"].map((n) => (
              <span key={n} className="text-lg font-semibold tracking-tight">{n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <Section eyebrow="What people say" title="Built for the next decade of hiring.">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { q: "Protobloc cut our screening time in half. Verified candidates means I can trust the resume in front of me.", a: "Maya L.", r: "Head of Talent, Series B fintech" },
            { q: "I rebuilt my entire career history in 20 minutes. Within a week I had 23 attestations from former teammates.", a: "Jordan P.", r: "Staff Engineer" },
            { q: "The trust score actually correlates with our successful hires. It's the first hiring signal I've genuinely trusted.", a: "Sasha K.", r: "VP Engineering" },
          ].map((t) => (
            <div key={t.a} className="rounded-2xl glass p-6">
              <CircleCheck className="h-5 w-5 text-violet-glow" />
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">
                &ldquo;{t.q}&rdquo;
              </p>
              <div className="mt-6 text-sm">
                <div className="font-semibold">{t.a}</div>
                <div className="text-muted">{t.r}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== CTA ===== */}
      <section className="relative isolate overflow-hidden py-32">
        <div aria-hidden className="absolute left-1/2 top-1/2 -z-10 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 glow-violet" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid bg-grid-fade opacity-50" />
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl text-gradient">
            Your career deserves<br />proof, not promises.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-foreground/70">
            Join the verified professional network being built for the AI era.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/signup">Claim your identity <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/login">I already have an account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-muted sm:flex-row">
          <div className="flex items-center gap-2">
            <LogoMark small />
            <span>© {new Date().getFullYear()} Protobloc Labs. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link href="/careers" className="hover:text-foreground">Careers</Link>
            <a href="mailto:hello@protobloc.com" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* -------- helpers -------- */

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-6 py-28">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-glow">
          {eyebrow}
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl text-gradient">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  t,
  d,
  compact,
}: {
  icon: React.ComponentType<{ className?: string }>;
  t: string;
  d: string;
  compact?: boolean;
}) {
  return (
    <div className={`rounded-2xl glass p-6 ${compact ? "" : "md:p-8"}`}>
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet/20 to-blue/20 ring-1 ring-[var(--border-strong)]">
        <Icon className="h-5 w-5 text-violet-glow" />
      </div>
      <h3 className={`mt-5 font-semibold ${compact ? "text-base" : "text-lg"}`}>{t}</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground/65">{d}</p>
    </div>
  );
}

function TrustRing({ score, large = false }: { score: number; large?: boolean }) {
  const size = large ? 96 : 64;
  const stroke = large ? 8 : 6;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="rotate-[-90deg]">
        <defs>
          <linearGradient id="tg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#tg)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div className={`absolute inset-0 flex flex-col items-center justify-center ${large ? "text-2xl" : "text-base"} font-semibold`}>
        <span>{score}</span>
        {large && <span className="text-[10px] font-normal uppercase tracking-wider text-muted">trust</span>}
      </div>
    </div>
  );
}

function LogoMark({ small = false }: { small?: boolean }) {
  const s = small ? 18 : 22;
  return (
    <div
      className="relative flex items-center justify-center rounded-lg"
      style={{ width: s + 6, height: s + 6 }}
    >
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet to-blue opacity-90" />
      <div className="absolute inset-[2px] rounded-md bg-background" />
      <div
        className="relative rounded-sm bg-gradient-to-br from-violet-glow to-blue-glow"
        style={{ width: s - 8, height: s - 8 }}
      />
    </div>
  );
}
