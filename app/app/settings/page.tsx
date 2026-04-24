"use client";

import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  return (
    <div className="max-w-2xl space-y-6">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="text-base font-semibold">Account</div>
        <div className="mt-4 grid gap-3 text-sm">
          <Row label="Email" value={user?.email ?? ""} />
          <Row
            label="User ID"
            value={user?.id ?? ""}
            mono
          />
        </div>
      </div>
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="text-base font-semibold">Session</div>
        <p className="mt-1 text-sm text-foreground/65">Sign out of this device.</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => signOut().then(() => router.replace("/"))}
        >
          Sign out
        </Button>
      </div>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] py-2 last:border-0">
      <span className="text-foreground/70">{label}</span>
      <span className={mono ? "font-mono text-xs text-foreground/85" : "text-foreground"}>
        {value}
      </span>
    </div>
  );
}
