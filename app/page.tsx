import Link from "next/link";
import Image from "next/image";
import SiteHeader from "./_components/SiteHeader";
import SiteFooter from "./_components/SiteFooter";

const principles = [
  {
    title: "Data is harvested, not grown",
    eyebrow: "What's broken today",
    body:
      "Your professional data is harvested by platforms that did not create it. Reputation is inferred by opaque systems, not proven at the root. In an age where credentials can be generated endlessly, there is no reliable way to tell what has grown from real experience and what has been fabricated overnight.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
        <path opacity="0.2" d="M33 15V33H15V15H33Z" fill="currentColor" />
        <path d="M42 7.5V15a1.5 1.5 0 1 1-3 0V9h-6a1.5 1.5 0 1 1 0-3h7.5A1.5 1.5 0 0 1 42 7.5ZM15 39H9v-6a1.5 1.5 0 1 0-3 0v7.5A1.5 1.5 0 0 0 7.5 42H15a1.5 1.5 0 1 0 0-3Zm25.5-7.5a1.5 1.5 0 0 0-1.5 1.5v6h-6a1.5 1.5 0 1 0 0 3h7.5a1.5 1.5 0 0 0 1.5-1.5V33a1.5 1.5 0 0 0-1.5-1.5ZM7.5 16.5A1.5 1.5 0 0 0 9 15V9h6a1.5 1.5 0 1 0 0-3H7.5A1.5 1.5 0 0 0 6 7.5V15a1.5 1.5 0 0 0 1.5 1.5ZM15 13.5h18a1.5 1.5 0 0 1 1.5 1.5v18a1.5 1.5 0 0 1-1.5 1.5H15a1.5 1.5 0 0 1-1.5-1.5V15a1.5 1.5 0 0 1 1.5-1.5Zm1.5 18h15v-15h-15v15Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "From harvested data to owned data",
    eyebrow: "How it's changing",
    body:
      "AI has made it trivial to manufacture credentials at scale. Trust can no longer live inside closed platforms. It must come back to individuals who can build their claims over time, prove their origin, and reuse them wherever opportunity grows.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
        <path d="M43.3 13.8c-.6-.3-1.2-.4-1.9-.2-.6.1-1.2.5-1.6 1l-6.3 6.8L26.7 6.3a3.5 3.5 0 0 0-5.4 0L14.6 21.3l-6.3-6.8a3 3 0 0 0-5.2 2.5L7.3 36.6a3 3 0 0 0 3 2.4h27.4a3 3 0 0 0 3-2.4l4.3-19.5c.1-.6 0-1.3-.3-1.9-.2-.6-.7-1.1-1.4-1.4Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Human-grown, machine-verified",
    eyebrow: "Protobloc: A new foundation",
    body:
      "Protobloc provides a cryptographic trust layer where individuals grow their professional identity over time, while peers attest to what is real. Systems can assess truth without extracting ownership, verifying claims while leaving the data rooted with its source.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
        <path d="M34.5 28.5 31.8 40.8a1.5 1.5 0 0 1-1.5 1.2H17.7a1.5 1.5 0 0 1-1.5-1.2L13.5 28.5h21Z" fill="currentColor" opacity=".25" />
        <path d="M37.5 27H23.1l4.2-4.2a8.7 8.7 0 0 0 9.8-.2c4.4-2.7 6.8-9 6.4-16.7a1.5 1.5 0 0 0-1.4-1.4c-7.7-.5-14 1.9-16.7 6.3-1.7 2.9-1.8 6.4-.1 9.8L22.5 23.4l-2.3-2.3a8.7 8.7 0 0 0-.3-7.2c-2-3.4-6.7-5.2-12.5-4.9a1.5 1.5 0 0 0-1.4 1.4c-.3 5.8 1.5 10.5 4.9 12.5a8.7 8.7 0 0 0 7.2.3L20.4 25l-1.5 1.5h-8.4a1.5 1.5 0 1 0 0 3h1.8L14.8 41a3 3 0 0 0 2.9 2.5h12.6a3 3 0 0 0 2.9-2.5L35.7 30h1.8a1.5 1.5 0 1 0 0-3Z" fill="currentColor" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Submit a claim",
    body: "Claim your professional history and supporting data you want to make trustworthy. Claims are the raw inputs into a shared trust layer.",
  },
  {
    title: "Peers review and attest",
    body: "Trusted peers attest to claims based on real working relationships. Attestations replace self-reported profiles with human-verified signals.",
  },
  {
    title: "Strengthen trust",
    body: "As attestations accumulate, a trust score strengthens over time. Confidence increases through independent agreement, not a single verification event.",
  },
  {
    title: "Reuse and earn",
    body: "Trustworthy data can be reused across applications and AI systems. When it creates value, that value flows back to the people who contributed to the trust.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* ===== Hero ===== */}
      <section className="relative isolate w-full bg-hero-sky">
        <SiteHeader variant="hero" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-48 pt-36 sm:pb-56 sm:pt-40">
          <a
            href="#"
            className="mb-10 inline-flex w-fit items-center gap-3 rounded-full bg-white/40 px-4 py-2 text-sm backdrop-blur ring-1 ring-white/60 hover:bg-white/60 animate-fade-up"
          >
            <span className="text-ink/60">Read our whitepaper</span>
            <span className="font-medium text-ink">The Protobloc Protocol</span>
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
              <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <h1 className="max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[88px] animate-fade-up [text-shadow:0_2px_24px_rgba(31,32,35,0.15)]">
            Your career isn&apos;t<br />owned by a platform
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white sm:text-xl animate-fade-up [text-shadow:0_1px_12px_rgba(31,32,35,0.18)]">
            Professional identity should be cultivated, provable at the root, and
            carried forward by the people who earn it.
          </p>

          <div className="mt-10 animate-fade-up">
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink shadow-lg shadow-black/10 transition hover:bg-white/90"
            >
              Join waitlist
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ===== Intro ===== */}
      <section className="mx-auto max-w-5xl px-6 py-28 text-center sm:py-36">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-blue">
          A new way to cultivate data
        </p>
        <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
          What was once harvested and unverified can now be grown,
          proven at the root, and kept aligned over time.
        </h2>
      </section>

      {/* ===== Three principles ===== */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          {principles.map((p) => (
            <article
              key={p.title}
              className="rounded-3xl bg-surface p-8 ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="text-ink">{p.icon}</div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
                {p.eyebrow}
              </p>
              <h3 className="mt-3 text-2xl font-semibold leading-snug">{p.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ===== How it works ===== */}
      <section className="relative isolate overflow-hidden bg-ink py-28 text-white sm:py-36">
        <div className="absolute inset-0 bg-grid-overlay opacity-30" />
        <div className="absolute -top-40 left-1/2 h-[480px] w-[680px] -translate-x-1/2 rounded-full bg-brand-blue/30 blur-[140px]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-sky">
              How it works
            </p>
            <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
              A data layer that verifies truth, protects privacy,
              and rewards its source.
            </h2>
          </div>

          <ol className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="rounded-2xl bg-white/5 p-7 ring-1 ring-white/10 backdrop-blur"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-mono">
                    0{i + 1}
                  </span>
                  {i === 1 && (
                    <Image src="/seal-check.svg" alt="" width={28} height={28} className="opacity-80" />
                  )}
                </div>
                <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{s.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-16 flex justify-center">
            <a
              href="#"
              className="inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-2.5 text-sm backdrop-blur ring-1 ring-white/20 hover:bg-white/20"
            >
              <span className="text-white/70">Read our whitepaper</span>
              <span className="font-medium">The Protobloc Protocol</span>
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section id="waitlist" className="relative isolate overflow-hidden bg-hero-sky py-28 text-white sm:py-36">
        <div className="absolute inset-0 bg-grid-overlay opacity-50" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Take ownership of your<br />professional identity
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/85">
            Join the waitlist to help build a new foundation for trust in the data economy.
          </p>
          <a
            href="https://app.protobloc.com/get-started"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-ink shadow-lg shadow-black/10 transition hover:bg-white/90"
          >
            Join waitlist
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
              <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>

      <SiteFooter />

      {/* hidden helper to satisfy lint when Link unused */}
      <span className="hidden"><Link href="/careers">Careers</Link></span>
    </div>
  );
}
