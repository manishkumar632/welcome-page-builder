"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  User as UserIcon,
  ShieldCheck,
  Briefcase,
  Newspaper,
  Network,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV = [
  { label: "Profile", href: "/app", icon: UserIcon },
  { label: "Verifications", href: "/app/verifications", icon: ShieldCheck },
  { label: "Jobs", href: "/app/jobs", icon: Briefcase },
  { label: "Feed", href: "/app/feed", icon: Newspaper },
  { label: "Network", href: "/app/network", icon: Network },
  { label: "Settings", href: "/app/settings", icon: Settings },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  React.useEffect(() => setMobileOpen(false), [pathname]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-glow border-t-transparent" />
      </div>
    );
  }

  const initial =
    (user.user_metadata?.full_name as string | undefined)?.[0] ??
    user.email?.[0]?.toUpperCase() ??
    "U";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-4 py-3 lg:hidden">
        <Link href="/app" className="flex items-center gap-2">
          <LogoMark />
          <span className="text-sm font-semibold">Protobloc</span>
        </Link>
        <button
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="rounded-lg border border-[var(--border)] p-2"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 shrink-0 border-r border-[var(--border)] bg-[var(--surface)] px-4 py-6 transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <Link href="/app" className="mb-8 hidden items-center gap-2 px-2 lg:flex">
            <LogoMark />
            <span className="text-[15px] font-semibold tracking-tight">Protobloc</span>
          </Link>

          <nav className="space-y-1">
            {NAV.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/app" && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-white/[0.06] text-foreground border border-[var(--border-strong)]"
                      : "text-foreground/70 hover:bg-white/[0.03] hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="absolute inset-x-4 bottom-6">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet to-blue text-sm font-semibold">
                  {initial}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">
                    {(user.user_metadata?.full_name as string) ?? "Your profile"}
                  </div>
                  <div className="truncate text-xs text-muted">{user.email}</div>
                </div>
                <button
                  aria-label="Sign out"
                  onClick={() => signOut().then(() => router.replace("/"))}
                  className="rounded-md p-1.5 text-muted hover:bg-white/5 hover:text-foreground"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </aside>

        {mobileOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/60 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Main */}
        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 hidden items-center justify-between border-b border-[var(--border)] bg-background/80 px-8 py-4 backdrop-blur lg:flex">
            <div className="relative w-full max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-2" />
              <input
                placeholder="Search profiles, jobs, posts…"
                className="h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--surface-2)] pl-10 pr-3 text-sm text-foreground placeholder:text-muted-2 focus:outline-none focus:ring-2 focus:ring-violet/40"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="h-4 w-4" />
              </Button>
              <Button asChild size="sm">
                <Link href="/app/verifications">Request verification</Link>
              </Button>
            </div>
          </header>
          <div className="px-6 py-8 lg:px-10 lg:py-10">{children}</div>
        </main>
      </div>
    </div>
  );
}

function LogoMark() {
  return (
    <div className="relative flex h-7 w-7 items-center justify-center rounded-md">
      <div className="absolute inset-0 rounded-md bg-gradient-to-br from-violet to-blue opacity-90" />
      <div className="absolute inset-[2px] rounded-[5px] bg-background" />
      <div className="relative h-3 w-3 rounded-sm bg-gradient-to-br from-violet-glow to-blue-glow" />
    </div>
  );
}
