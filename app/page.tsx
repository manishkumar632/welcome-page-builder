"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type Variants,
} from "framer-motion";
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

/* Dynamic imports — keep three.js out of SSR */
const HelmetScene = dynamic(
  () => import("./_components/Scene3D").then((m) => m.HelmetScene),
  {
    ssr: false,
    loading: () => <SceneSkeleton h="h-[480px] sm:h-[600px]" />,
  }
);
const OrbScene = dynamic(
  () => import("./_components/Scene3D").then((m) => m.OrbScene),
  { ssr: false, loading: () => <SceneSkeleton h="h-[420px]" /> }
);
const ShowcaseScene = dynamic(
  () => import("./_components/Scene3D").then((m) => m.ShowcaseScene),
  { ssr: false, loading: () => <SceneSkeleton h="h-[440px]" /> }
);
const ScrollTrackedHelmet = dynamic(
  () => import("./_components/Scene3D").then((m) => m.ScrollTrackedHelmet),
  { ssr: false, loading: () => <SceneSkeleton h="h-full" /> }
);
const ScrollPath = dynamic(() => import("./_components/ScrollPath"), {
  ssr: false,
  loading: () => <div className="h-[1600px] w-[140px]" />,
});

function SceneSkeleton({ h }: { h: string }) {
  return (
    <div className={`w-full ${h} animate-pulse rounded-2xl bg-[var(--surface-2)]`} />
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: i * 0.07 },
  }),
};

export default function LandingPage() {
  /* Page-level scroll for hero parallax */
  const { scrollY } = useScroll();
  const heroBgY = useTransform(scrollY, [0, 800], [0, 200]);
  const heroBgYSpring = useSpring(heroBgY, { stiffness: 60, damping: 20 });
  const heroTextY = useTransform(scrollY, [0, 800], [0, -120]);
  const heroTextOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const gridY = useTransform(scrollY, [0, 1000], [0, -150]);

  /* Section refs for tracked scenes */
  const trackRef = useRef<HTMLElement | null>(null);

  return (
    <div className="relative min-h-screen overflow-x-hidden text-foreground">
      {/* ===== Nav ===== */}
      <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between border-b border-[var(--border)]/40 px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <LogoMark />
            <span className="text-[15px] font-semibold tracking-tight">Protobloc</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-foreground/70 md:flex">
            <a href="#problem" className="hover:text-foreground transition">Problem</a>
            <a href="#showcase" className="hover:text-foreground transition">Showcase</a>
            <a href="#solution" className="hover:text-foreground transition">Solution</a>
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

      {/* ===== HERO with parallax + 3D helmet ===== */}
      <section className="relative isolate overflow-hidden pb-24 pt-32 sm:pt-40">
        {/* Parallax background layers */}
        <motion.div
          aria-hidden
          style={{ y: heroBgYSpring }}
          className="absolute left-1/2 top-0 -z-10 h-[640px] w-[900px] -translate-x-1/2 glow-violet animate-pulse-glow"
        />
        <motion.div
          aria-hidden
          style={{ y: gridY }}
          className="absolute inset-0 -z-10 bg-grid bg-grid-fade"
        />
        <div aria-hidden className="noise -z-10" />

        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <motion.div
            style={{ y: heroTextY, opacity: heroTextOpacity }}
            className="text-center lg:text-left"
          >
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white/[0.03] px-4 py-1.5 text-xs text-foreground/80 backdrop-blur"
            >
              <Sparkles className="h-3.5 w-3.5 text-violet-glow" />
              <span>Verified hiring · built in 3D</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate="show"
              className="mt-7 text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl xl:text-7xl"
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
              className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-foreground/70 lg:mx-0"
            >
              Resumes are easy to fake. Protobloc replaces them with a verified
              professional identity — peer attestations, cryptographic provenance,
              and a transparent trust score recruiters can rely on.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate="show"
              className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
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
          </motion.div>

          {/* 3D helmet — floats above the layout, not confined to a box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            className="relative z-10"
            style={{ overflow: "visible" }}
          >
            <div aria-hidden className="pointer-events-none absolute -inset-16 -z-10 glow-blue opacity-40 blur-3xl" />
            <HelmetScene />
          </motion.div>
        </div>

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
            <div key={m.v} className="bg-[var(--surface)] px-6 py-5 text-center">
              <div className="text-2xl font-semibold text-gradient-accent">{m.k}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted">{m.v}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ===== Problem ===== */}
      <Section id="problem" eyebrow="The problem" title="Hiring trust is collapsing.">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Sparkles, title: "AI-generated resumes", body: "LLMs produce flawless, tailored resumes in seconds. Recruiters can no longer tell the polished from the fabricated." },
            { icon: Lock, title: "Unverifiable claims", body: "Roles, dates, and impact stories live in PDFs nobody can prove. Background checks are slow, expensive, and shallow." },
            { icon: Zap, title: "Low hiring confidence", body: "Teams interview more, hire slower, and still mis-hire. Talented candidates get lost in the noise." },
          ].map((p, i) => (
            <ParallaxCard key={p.title} index={i}>
              <p.icon className="h-5 w-5 text-violet-glow" />
              <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">{p.body}</p>
            </ParallaxCard>
          ))}
        </div>
      </Section>

      {/* ===== Showcase: orbiting 3D models ===== */}
      <section id="showcase" className="relative isolate overflow-hidden py-28">
        <div aria-hidden className="absolute -left-40 top-1/3 -z-10 h-[400px] w-[400px] glow-violet opacity-50" />
        <div aria-hidden className="absolute -right-40 bottom-0 -z-10 h-[400px] w-[400px] glow-blue opacity-40" />
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <span className="inline-block rounded-full border border-[var(--border-strong)] bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.18em] text-violet-glow">
              Live ecosystem
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl text-gradient">
              Identity, attestations, and signals — orbiting one truth.
            </h2>
          </div>
          <div className="rounded-3xl border border-[var(--border-strong)] bg-[var(--surface)]/60 p-2 shadow-[0_60px_120px_-40px_rgba(124,58,237,0.4)] backdrop-blur">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-[var(--surface-2)] to-[var(--surface-3)]">
              <ShowcaseScene />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Solution: SVG scroll-path with milestones ===== */}
      <Section id="solution" eyebrow="The solution" title="A verified identity layer for work.">
        <div className="grid gap-10 lg:grid-cols-[120px_1fr]">
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <ScrollPath />
            </div>
          </div>
          <div className="space-y-20">
            {[
              { n: "01", t: "Upload your resume", d: "We parse experience, education, and skills with AI to build a draft profile in seconds." },
              { n: "02", t: "Request peer attestations", d: "Share a unique verification link with former managers. They confirm role, dates, and impact." },
              { n: "03", t: "Build your trust score", d: "Our engine weighs verifier seniority, company-domain emails, and timeline overlap to compute a score out of 100." },
              { n: "04", t: "Get discovered", d: "Recruiters search and shortlist by trust percentile, verified skills, and real work history — not keywords." },
            ].map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/60 p-8 backdrop-blur"
              >
                <div className="font-mono text-xs text-violet-glow">{s.n}</div>
                <div className="mt-3 text-2xl font-semibold tracking-tight">{s.t}</div>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground/70">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ===== Sticky scroll-tracked helmet ===== */}
      <section
        ref={trackRef}
        className="relative isolate min-h-[200vh] py-24"
      >
        <div className="sticky top-0 flex h-screen items-center">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-block rounded-full border border-[var(--border-strong)] bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.18em] text-violet-glow">
                Scroll to interact
              </span>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl text-gradient">
                Every rotation,<br />a new attestation.
              </h2>
              <p className="mt-5 max-w-md text-foreground/70">
                Your identity is a living object — recomputed in real time as
                peers, companies, and verified credentials add to it. Scroll to
                see it spin.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {["GitHub", ".edu", "Slack", "Domain email", "Manager"].map((c) => (
                  <span key={c} className="rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1 text-xs text-foreground/80">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative h-[480px] w-full">
              <div aria-hidden className="absolute inset-0 -z-10 glow-violet opacity-40 blur-2xl" />
              <ScrollTrackedHelmet targetRef={trackRef} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Distorted orb section ===== */}
      <section className="relative isolate overflow-hidden py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <div className="rounded-3xl border border-[var(--border-strong)] bg-[var(--surface)]/60 p-2 backdrop-blur">
              <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-[var(--surface-2)] to-[var(--surface-3)]">
                <OrbScene />
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="inline-block rounded-full border border-[var(--border-strong)] bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.18em] text-violet-glow">
              Trust engine
            </span>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl text-gradient">
              A score that breathes with the network.
            </h2>
            <p className="mt-5 text-foreground/70">
              The trust engine continuously weighs verifier independence,
              tenure overlap, and signal quality. As you scroll, it warps —
              just like a real reputation under new evidence.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { k: "Independence", v: 88 },
                { k: "Recency", v: 92 },
                { k: "Verifier quality", v: 95 },
                { k: "Coverage", v: 84 },
              ].map((r) => (
                <div key={r.k} className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/70 p-4">
                  <div className="text-xs text-foreground/60">{r.k}</div>
                  <div className="mt-1 text-2xl font-semibold text-gradient-accent">{r.v}</div>
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5">
                    <div className="h-full rounded-full bg-gradient-to-r from-violet to-blue" style={{ width: `${r.v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Candidates / Recruiters ===== */}
      <Section id="candidates" eyebrow="For candidates" title="Own your professional truth.">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { icon: ShieldCheck, t: "Provable work history", d: "Every role independently attested by people you actually worked with." },
            { icon: Star, t: "Stand out, instantly", d: "A high trust percentile is a credible signal recruiters can act on." },
            { icon: Users, t: "Portable network proof", d: "Your verifications travel with you across companies and platforms." },
            { icon: Briefcase, t: "Get matched with real roles", d: "Recruiters reach out with relevant opportunities, not spam." },
          ].map((f, i) => (
            <ParallaxCard key={f.t} index={i}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet/20 to-blue/20 ring-1 ring-[var(--border-strong)]">
                <f.icon className="h-5 w-5 text-violet-glow" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{f.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/65">{f.d}</p>
            </ParallaxCard>
          ))}
        </div>
      </Section>

      <Section id="recruiters" eyebrow="For recruiters" title="Hire with confidence, faster.">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, t: "Verified-only search", d: "Filter by trust percentile, verified employers, and attested skills." },
            { icon: Users, t: "Pipeline & ATS", d: "Drag-and-drop kanban from Applied to Hired." },
            { icon: Activity, t: "Trust analytics", d: "See verified-applicant ratios and avg. score per role." },
            { icon: Zap, t: "10x signal density", d: "Stop screening AI fluff. Start interviewing pre-vetted humans." },
          ].map((f, i) => (
            <ParallaxCard key={f.t} index={i}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet/20 to-blue/20 ring-1 ring-[var(--border-strong)]">
                <f.icon className="h-5 w-5 text-violet-glow" />
              </div>
              <h3 className="mt-5 text-base font-semibold">{f.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/65">{f.d}</p>
            </ParallaxCard>
          ))}
        </div>
      </Section>

      {/* ===== Testimonials ===== */}
      <Section eyebrow="What people say" title="Built for the next decade of hiring.">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { q: "Protobloc cut our screening time in half. Verified candidates means I can trust the resume in front of me.", a: "Maya L.", r: "Head of Talent, Series B fintech" },
            { q: "I rebuilt my entire career history in 20 minutes. Within a week I had 23 attestations from former teammates.", a: "Jordan P.", r: "Staff Engineer" },
            { q: "The trust score actually correlates with our successful hires. It's the first hiring signal I've genuinely trusted.", a: "Sasha K.", r: "VP Engineering" },
          ].map((t, i) => (
            <ParallaxCard key={t.a} index={i}>
              <CircleCheck className="h-5 w-5 text-violet-glow" />
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">&ldquo;{t.q}&rdquo;</p>
              <div className="mt-6 text-sm">
                <div className="font-semibold">{t.a}</div>
                <div className="text-muted">{t.r}</div>
              </div>
            </ParallaxCard>
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
    <section id={id} className="mx-auto max-w-6xl px-6 py-28">
      <div className="mb-12 max-w-2xl">
        <span className="text-xs uppercase tracking-[0.18em] text-violet-glow">{eyebrow}</span>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl text-gradient">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function ParallaxCard({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yInverse = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const ySpring = useSpring(index % 2 === 0 ? y : yInverse, { stiffness: 60, damping: 18 });

  return (
    <motion.div
      ref={ref}
      style={{ y: ySpring }}
      className="rounded-2xl glass p-6 md:p-8"
    >
      {children}
    </motion.div>
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
