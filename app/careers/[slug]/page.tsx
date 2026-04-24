import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteHeader from "../../_components/SiteHeader";
import SiteFooter from "../../_components/SiteFooter";

type Role = {
  slug: string;
  title: string;
  meta: string[];
  intro: string;
  sections: { heading: string; paragraphs?: string[]; bullets?: string[] }[];
};

const ROLES: Record<string, Role> = {
  "software-engineering-intern-summer-2026": {
    slug: "software-engineering-intern-summer-2026",
    title: "Software Engineering Intern",
    meta: [
      "San Francisco · Hybrid (3 days/week)",
      "Summer/Fall 2026 · 10–12 weeks",
      "$1,000/month",
      "10+ hrs/week minimum",
    ],
    intro:
      "Work alongside the founding team on real product — not slide decks, not mock projects. Full-stack exposure, weekly shipping.",
    sections: [
      {
        heading: "About Protobloc",
        paragraphs: [
          "AI hasn't just changed things, it's broken things. Hiring especially.",
          "Fake resumes are generated in seconds. Portfolios are completely fabricated.",
          "Employers can't tell what's real.",
          "Protobloc fixes the signal. We let candidates prove what's actually true — identity, education, work history — verified by the people who were there.",
          "Employers get relief from the hordes of fake applicants. Candidates own their data and control what gets shared.",
          "We're pre-seed with a lean team and moving fast.",
        ],
      },
      {
        heading: "The role",
        paragraphs: [
          "This is an early-stage role. We're not maintaining a codebase — we're building the foundation.",
          "You'll work alongside the founding team on our first verification products, with direct exposure to the full stack and the decisions that shape how the product gets built.",
          "If you're thinking about starting a company someday, there's no better training ground than being in the room where the early calls get made.",
          "We ask for a minimum of 10 hours per week. If you're hungry for more, we'll match your pace.",
          "The role comes with a $1,000/month stipend.",
        ],
      },
      {
        heading: "The project",
        paragraphs: [
          "Your primary deliverable is building Protobloc's \"Projects\" feature. Right now, candidates can verify identity, education, and work history — but there's no way to surface the things they've actually built. Projects closes that gap: a structured way to add real work to your profile, verified by people who were involved.",
          "You'll own it end-to-end — UI, data model, verification flow. You'll be the first person ever to have a verified project on Protobloc, powered by the feature you shipped.",
        ],
      },
      {
        heading: "What you'll learn and work on",
        bullets: [
          "How a verification flow is built end-to-end — the checklist-based system candidates use to prove their claims (enrollment, identity, LinkedIn, transcripts)",
          "Employer-facing views and self-serve tooling",
          "Integration architecture (OAuth-based account linking, credential verification pipelines)",
          "Data modeling and API design for verification and trust infrastructure",
          "What it takes to survive and thrive at an early-stage company",
          "How to use AI effectively — and where it leads you astray",
        ],
      },
      {
        heading: "What we're looking for",
        bullets: [
          "Pursuing a BS/MS in CS, EE, or related field (rising junior/senior or MS student preferred)",
          "Strong fundamentals: data structures, systems thinking, ability to read and reason about unfamiliar code quickly",
          "Experience with TypeScript/JavaScript and modern web frameworks (React, Next.js) — or demonstrable ability to ramp fast",
          "Comfort with ambiguity. We'll give you real problems, not pre-scoped tickets. You'll need to ask good questions and make judgment calls",
          "Bonus: experience with PostgreSQL, OAuth/identity protocols, or any verification/credentialing systems",
        ],
      },
      {
        heading: "What you won't do",
        bullets: [
          "Sit in meetings all day",
          "Work on throwaway intern projects",
          "Wait for someone to tell you what to do next",
          "Stay up all night working on the wrong thing — we focus on what matters. Endless grind usually means the strategy's bad",
        ],
      },
      {
        heading: "Why Protobloc",
        bullets: [
          "Early-stage scrappiness — you'll see architecture decisions get made in real time, not maintain legacy code",
          "Small team, high leverage — your work goes to production, your ideas get heard same-day",
          "Interesting problem space — identity, trust, graph theory. It's meaty",
          "Built for future founders — see how a real company gets built from the early days",
          "Do well, and we'll put our names behind you: letters of recommendation from operators with proven track records",
        ],
      },
      {
        heading: "Who you'll work with",
        paragraphs: [
          "Matt Connors — Founder & day-to-day mentor. Employee #8 at Human Interest (YC-backed, now valued at billions). 15+ years full-stack engineering across fintech and healthtech — shipped Credit Karma Savings (130M+ members), scaled Truepill's fulfillment infrastructure, built platform infra at LiveRamp.",
          "The founding team: operators from Google, LinkedIn, Criteo, and Beamery. Collectively built products for tens of millions of users and contributed to billions in exits.",
        ],
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(ROLES).map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const role = ROLES[slug];
  if (!role) return { title: "Role not found — Protobloc" };
  return {
    title: `${role.title} — Protobloc Careers`,
    description: role.intro,
  };
}

export default async function RolePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const role = ROLES[slug];
  if (!role) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative isolate bg-white pt-32">
        <SiteHeader variant="light" />

        <section className="mx-auto max-w-3xl px-6 pb-16 pt-8">
          <Link href="/careers" className="text-sm text-brand-blue hover:underline">
            ← Careers
          </Link>

          <div className="mt-8 flex flex-wrap gap-2">
            {role.meta.map((m) => (
              <span key={m} className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-ink ring-1 ring-black/5">
                {m}
              </span>
            ))}
          </div>

          <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {role.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{role.intro}</p>

          <a
            href="mailto:careers@protobloc.com"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-ink/90"
          >
            Apply now
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
              <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <div className="mt-14 space-y-12">
            {role.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-2xl font-semibold tracking-tight">{s.heading}</h2>
                {s.paragraphs?.map((p, i) => (
                  <p key={i} className="mt-4 text-[15px] leading-relaxed text-ink/80">
                    {p}
                  </p>
                ))}
                {s.bullets && (
                  <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-ink/80">
                    {s.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-brand-blue" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </section>
      </div>

      <SiteFooter />
    </div>
  );
}
