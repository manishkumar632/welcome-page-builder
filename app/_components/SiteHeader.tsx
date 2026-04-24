import Image from "next/image";
import Link from "next/link";

type Variant = "hero" | "light";

export default function SiteHeader({ variant = "light" }: { variant?: Variant }) {
  const onHero = variant === "hero";
  return (
    <header
      className={`absolute top-0 left-0 right-0 z-50 ${
        onHero ? "text-white" : "text-ink"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/protobloc-logo.svg"
            alt="Protobloc"
            width={140}
            height={28}
            priority
            className={onHero ? "" : "[filter:invert(10%)_sepia(7%)_saturate(700%)_hue-rotate(190deg)_brightness(20%)]"}
          />
        </Link>

        <div className="flex items-center gap-2">
          <a
            href="https://app.protobloc.com/signin"
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              onHero
                ? "bg-white/15 text-white hover:bg-white/25 backdrop-blur"
                : "text-ink hover:bg-black/5"
            }`}
          >
            Sign in
          </a>
          <a
            href="https://app.protobloc.com/get-started"
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              onHero
                ? "bg-white text-ink hover:bg-white/90"
                : "bg-ink text-white hover:bg-ink/90"
            }`}
          >
            Sign up
          </a>
        </div>
      </div>
    </header>
  );
}
