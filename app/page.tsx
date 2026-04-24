import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Product", hasMenu: true },
  { label: "Use Cases", hasMenu: true },
  { label: "Resources", hasMenu: true },
  { label: "Pricing", hasMenu: false },
];

const features = [
  {
    badge: "Award Winning",
    title: "4× No-Code Site of the Month",
    body: "Recognized across top design directories — going head-to-head with Wix, Webflow and WordPress.",
  },
  {
    badge: "Trend Setting",
    title: "Top Web Design Trend 2025",
    body: "Interactive 3D elements are reshaping how brands tell their story online.",
  },
  {
    badge: "Trusted by the Best",
    title: "Built with leading studios",
    body: "Designers and agencies behind globally loved shows and protocols ship on our platform.",
  },
];

const useCases = [
  {
    tag: "Use case · Ecommerce",
    title: "Product pages that actually convert.",
    body: "Launch high-performance interactive 3D product landing pages that boost engagement and conversions — no code required.",
    img: "/usecase-ecommerce.jpg",
  },
  {
    tag: "Use case · Tech",
    title: "Sites that feel like the future.",
    body: "Leverage WebGL visuals and best-in-class 3D scenes to elevate your online presence.",
    img: "/usecase-tech.jpg",
  },
  {
    tag: "Use case · Creative",
    title: "Wow every visitor.",
    body: "Craft creative, captivating 3D websites with drag-and-drop tools and keyframe animations.",
    img: "/usecase-creative.jpg",
  },
  {
    tag: "Use case · Storytelling",
    title: "Scroll-driven worlds.",
    body: "Bring your vision to life with scroll-triggered 3D scenes and interactive animations that keep users engaged.",
    img: "/usecase-storytelling.jpg",
  },
];

const steps = [
  { n: "Step 1", title: "Tell us about yourself", body: "Share your goals, brand and audience in a quick 2-minute brief." },
  { n: "Step 2", title: "Pick your theme", body: "Choose a 3D theme from our award-winning template gallery." },
  { n: "Step 3", title: "Edit & launch", body: "Tweak with no-code tools, then publish on a blazing-fast CDN." },
];

const marqueeWords = [
  "Wow Factor", "Stand Out", "Captivate", "Innovative",
  "Best Visuals", "Engaging", "Interactive", "WebGL",
  "Cinematic", "Storytelling",
];

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#fdf6f1] text-[color:var(--brand-ink)] overflow-x-hidden">
      {/* ===== Header ===== */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto mt-4 flex max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/peach-logo.png" alt="PeachWeb logo" width={36} height={36} priority />
            <span className="text-xl font-semibold tracking-tight">peachweb</span>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full bg-white/70 px-2 py-1.5 backdrop-blur-md ring-1 ring-black/5 md:flex">
            {navItems.map((item) => (
              <button
                key={item.label}
                className="flex items-center gap-1 rounded-full px-4 py-1.5 text-sm font-medium text-[color:var(--brand-ink)] hover:bg-white"
              >
                {item.label}
                {item.hasMenu && (
                  <svg width="10" height="10" viewBox="0 0 10 10" className="opacity-60">
                    <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button className="hidden rounded-full px-4 py-2 text-sm font-medium hover:bg-white/60 sm:inline-flex">Login</button>
            <button className="hidden rounded-full border border-[color:var(--brand-ink)]/20 px-4 py-2 text-sm font-medium hover:bg-white sm:inline-flex">
              Talk to Us
            </button>
            <button className="rounded-full bg-[color:var(--brand-purple)] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-900/20 hover:opacity-90">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="relative h-[100svh] min-h-[640px] w-full">
        <Image
          src="/hero-scene.jpg"
          alt="Dreamy 3D pastel landscape with a floating clownfish and bubbles"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-[#fdf6f1]" />

        {/* Floating side label */}
        <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 rounded-l-2xl bg-white px-3 py-4 shadow-md md:block">
          <div className="flex flex-col items-center gap-2">
            <span className="text-base font-bold">W.</span>
            <span className="rotate-180 text-[10px] tracking-widest text-neutral-500 [writing-mode:vertical-rl]">
              HONORS
            </span>
          </div>
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-end px-4 pb-16 text-center sm:px-6 sm:pb-24">
          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-[color:var(--brand-ink)] sm:text-6xl md:text-7xl">
            3D Websites <span className="text-gradient-brand">in Minutes</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-[color:var(--brand-ink)]/70 sm:text-lg">
            No-Code Builder for WebGL 3D Websites
          </p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row">
            <button className="rounded-full bg-[color:var(--brand-purple)] px-7 py-3 text-sm font-semibold text-white shadow-xl shadow-purple-900/20 hover:opacity-90">
              Get started — it&apos;s free
            </button>
            <button className="rounded-full border border-[color:var(--brand-ink)]/20 bg-white/70 px-7 py-3 text-sm font-semibold backdrop-blur hover:bg-white">
              Talk to Us
            </button>
          </div>

          <div className="mt-10 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[color:var(--brand-ink)]/60">
            <span>Scroll down &amp; dive in</span>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </div>
      </section>

      {/* ===== Features strip ===== */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-3xl bg-white p-7 ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="inline-flex rounded-full bg-[color:var(--brand-purple)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[color:var(--brand-purple)]">
                {f.badge}
              </span>
              <h3 className="mt-4 text-2xl font-semibold leading-snug">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--brand-ink)]/70">{f.body}</p>
              <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br from-pink-200/60 to-purple-200/60 blur-2xl" />
            </div>
          ))}
        </div>
      </section>

      {/* ===== Big CTA card ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#ffd6c0] via-[#ffb6dd] to-[#c89bff] px-6 py-16 text-center sm:px-12 sm:py-24">
          <div className="absolute -top-10 -left-10 h-48 w-48 rounded-full bg-white/30 blur-3xl animate-float-slow" />
          <div className="absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-white/30 blur-3xl animate-float-slower" />
          <h2 className="relative mx-auto max-w-3xl text-3xl font-semibold leading-tight text-[color:var(--brand-ink)] sm:text-5xl">
            Launch your visually stunning interactive 3D website.
          </h2>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button className="rounded-full bg-[color:var(--brand-ink)] px-7 py-3 text-sm font-semibold text-white hover:opacity-90">
              Get Started
            </button>
            <button className="rounded-full bg-white/90 px-7 py-3 text-sm font-semibold backdrop-blur hover:bg-white">
              Explore Now
            </button>
          </div>
        </div>
      </section>

      {/* ===== Use Cases ===== */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--brand-purple)]">Use Cases</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
            Built for every kind of story.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {useCases.map((uc) => (
            <article
              key={uc.title}
              className="group relative overflow-hidden rounded-3xl bg-white ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={uc.img}
                  alt={uc.title}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div className="p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-purple)]">
                  {uc.tag}
                </p>
                <h3 className="mt-3 text-2xl font-semibold leading-snug">{uc.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--brand-ink)]/70">{uc.body}</p>
                <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-[color:var(--brand-ink)] px-5 py-2 text-sm font-semibold text-white hover:opacity-90">
                  Explore Now
                  <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== Steps ===== */}
      <section className="bg-[color:var(--brand-ink)] py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-14 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pink-300">How it works</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
              Get your 3D website with our experts.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.n}
                className="rounded-3xl bg-white/5 p-7 ring-1 ring-white/10 backdrop-blur"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pink-300">{s.n}</p>
                <h3 className="mt-3 text-2xl font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <button className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-[color:var(--brand-ink)] hover:opacity-90">
              Book a Call
            </button>
            <button className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold hover:bg-white/10">
              See Pricing
            </button>
          </div>
        </div>
      </section>

      {/* ===== Marquee ===== */}
      <section className="border-y border-black/5 bg-white py-8 overflow-hidden">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
          {[...marqueeWords, ...marqueeWords, ...marqueeWords].map((w, i) => (
            <span
              key={i}
              className="text-3xl font-semibold tracking-tight text-[color:var(--brand-ink)]/80 sm:text-5xl"
            >
              {w}
              <span className="ml-12 inline-block text-pink-400">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-[color:var(--brand-ink)] px-6 py-20 text-center text-white sm:px-12 sm:py-28">
          <div className="absolute inset-0 opacity-60">
            <div className="absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-pink-400/40 blur-3xl animate-float-slow" />
            <div className="absolute -bottom-20 right-1/4 h-80 w-80 rounded-full bg-purple-400/40 blur-3xl animate-float-slower" />
          </div>
          <h2 className="relative mx-auto max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">
            Start building <span className="text-gradient-brand">magic</span> today.
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-white/70">
            Join the designers and studios already shipping award-winning 3D experiences.
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-[color:var(--brand-ink)] hover:opacity-90">
              Get Started
            </button>
            <button className="rounded-full border border-white/30 px-7 py-3 text-sm font-semibold hover:bg-white/10">
              Talk to Us
            </button>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="grid gap-10 md:grid-cols-5">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/peach-logo.png" alt="PeachWeb logo" width={32} height={32} />
                <span className="text-lg font-semibold">peachweb</span>
              </Link>
              <p className="mt-4 max-w-sm text-sm text-[color:var(--brand-ink)]/60">
                The no-code builder for WebGL 3D websites. Stunning, interactive, scalable.
              </p>
            </div>

            {[
              { h: "Product", items: ["Home", "Features", "Marketplace"] },
              { h: "Resources", items: ["Tutorials", "Blog", "Discord", "Contact Sales"] },
              { h: "Use Cases", items: ["Ecommerce", "Storytelling", "Creative & Tech", "Portfolio"] },
            ].map((col) => (
              <div key={col.h}>
                <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--brand-ink)]/60">
                  {col.h}
                </h4>
                <ul className="mt-4 space-y-2 text-sm">
                  {col.items.map((it) => (
                    <li key={it}>
                      <a className="hover:text-[color:var(--brand-purple)]" href="#">{it}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-black/5 pt-6 text-xs text-[color:var(--brand-ink)]/50 sm:flex-row sm:items-center">
            <p>Peach Worlds Ltd © 2025</p>
            <p>Crafted with WebGL ✦ pastel dreams</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
