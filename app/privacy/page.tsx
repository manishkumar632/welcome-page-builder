import Link from "next/link";
import type { Metadata } from "next";
import SiteFooter from "../_components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Notice — Protobloc",
  description:
    "How Protobloc collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="mx-auto w-full max-w-3xl px-6 pb-20 pt-12">
        <Link href="/" className="text-sm text-brand-blue hover:underline">
          ← Back to home
        </Link>

        <h1 className="mt-8 text-4xl font-semibold tracking-tight sm:text-5xl">
          Privacy Notice
        </h1>
        <p className="mt-3 text-sm text-muted">Last updated: April 24, 2026</p>

        <div className="mt-12 space-y-10 text-[15px] leading-relaxed text-ink/85">
          <section>
            <h2 className="text-2xl font-semibold text-ink">Who we are</h2>
            <p className="mt-3">
              Protobloc Inc. (&quot;Protobloc&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates this website.
              This privacy notice explains how we collect, use, and protect your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-ink">What we collect</h2>
            <p className="mt-3">We collect the following information when you interact with our website:</p>
            <h3 className="mt-5 text-lg font-semibold text-ink">Information you provide</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li><strong>Email address</strong> — when you join our waitlist or request our whitepaper</li>
              <li><strong>Name</strong> — optionally provided when requesting our whitepaper</li>
            </ul>
            <h3 className="mt-5 text-lg font-semibold text-ink">Information collected automatically</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <strong>Analytics data</strong> — we use PostHog to understand how visitors use our site.
                This includes pages visited, time on site, browser type, and approximate location
                (country/city level). PostHog may set cookies on your device.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-ink">How we use your information</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>To send you the whitepaper you requested</li>
              <li>To notify you when Protobloc launches</li>
              <li>To send occasional updates about our progress (you can unsubscribe anytime)</li>
              <li>To understand how visitors use our website and improve it</li>
            </ul>
            <p className="mt-4">
              <strong>Legal basis:</strong> We process your data based on your consent when you submit
              the waitlist form or whitepaper request.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-ink">Third parties</h2>
            <p className="mt-3">We share your information with the following service providers who help us operate:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li><strong>Formspree</strong> — processes form submissions (waitlist and whitepaper requests)</li>
              <li><strong>PostHog</strong> — provides website analytics</li>
            </ul>
            <p className="mt-3">
              These providers process data on our behalf and are contractually bound to protect your
              information. We do not sell your data or share it with third parties for their own
              marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-ink">Data retention</h2>
            <p className="mt-3">
              We keep your waitlist and contact information until you unsubscribe or request deletion.
              Analytics data is retained according to PostHog&apos;s data retention policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-ink">Cookies</h2>
            <p className="mt-3">
              We use cookies for analytics purposes. PostHog sets cookies to identify unique visitors
              and understand how you interact with our site. These cookies do not contain personal
              information and are not used for advertising.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-ink">Your rights</h2>
            <p className="mt-3">Depending on your location, you may have the following rights:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li><strong>Access</strong> — request a copy of the data we hold about you</li>
              <li><strong>Correction</strong> — request we correct inaccurate data</li>
              <li><strong>Deletion</strong> — request we delete your data</li>
              <li><strong>Withdraw consent</strong> — unsubscribe from communications at any time</li>
              <li><strong>Portability</strong> — request your data in a portable format</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{" "}
              <a className="text-brand-blue hover:underline" href="mailto:privacy@protobloc.com">
                privacy@protobloc.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-ink">International transfers</h2>
            <p className="mt-3">
              Your data may be processed in the United States where our service providers operate.
              By using our website, you consent to this transfer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-ink">Changes to this notice</h2>
            <p className="mt-3">
              We may update this privacy notice from time to time. We will notify you of significant
              changes by posting a notice on our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-ink">Contact us</h2>
            <p className="mt-3">
              If you have questions about this privacy notice or how we handle your data, contact us at{" "}
              <a className="text-brand-blue hover:underline" href="mailto:privacy@protobloc.com">
                privacy@protobloc.com
              </a>.
            </p>
          </section>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
