import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "../_components/SiteHeader";
import SiteFooter from "../_components/SiteFooter";

export const metadata: Metadata = {
  title: "Careers — Protobloc",
  description:
    "Build the trust layer for hiring. We're a small team moving fast — every engineer ships real product.",
};

const roles = [
  {
    slug: "software-engineering-intern-summer-2026",
    title: "Software Engineering Intern",
    tags: ["Summer 2026", "Fall 2026", "San Francisco", "Flexible", "$1,000/mo", "10+ hrs/week"],
  },
];

export default function CareersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative isolate bg-white pt-32">
        <SiteHeader variant="light" />
        <div className="absolute inset-0 -z-10 bg-grid-light opacity-60" />

        <section className="mx-auto max-w-4xl px-6 pb-20 pt-12 sm:pt-20">
          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">Careers</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Build the trust layer for hiring. We&apos;re a small team moving fast — every
            engineer ships real product.
          </p>

          <div className="mt-16">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-blue">
              Open roles
            </h2>
            <ul className="mt-6 divide-y divide-black/5 rounded-3xl bg-surface ring-1 ring-black/5">
              {roles.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/careers/${r.slug}`}
                    className="group flex flex-col gap-3 p-7 transition hover:bg-white"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-2xl font-semibold">{r.title}</h3>
                      <svg width="22" height="22" viewBox="0 0 14 14" className="mt-2 text-ink transition group-hover:translate-x-1">
                        <path d="M3 7h8m0 0L7 3m4 4L7 11" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {r.tags.map((t) => (
                        <span key={t} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-ink ring-1 ring-black/5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <SiteFooter />
    </div>
  );
}
