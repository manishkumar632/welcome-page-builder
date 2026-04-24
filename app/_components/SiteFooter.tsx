import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Image src="/protobloc-logo.svg" alt="Protobloc" width={120} height={24} className="opacity-80" />
        </div>
        <p className="text-sm text-muted">© 2026 Protobloc. All rights reserved.</p>
        <nav className="flex items-center gap-6 text-sm text-ink">
          <Link href="/careers" className="hover:opacity-70">Careers</Link>
          <Link href="/privacy" className="hover:opacity-70">Privacy Notice</Link>
        </nav>
      </div>
    </footer>
  );
}
