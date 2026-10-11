"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { browserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export function PublicSessionNav({ role }: { role: "candidate" | "employer" | "operator" }) {
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const candidate = role === "candidate";

  async function signOut() {
    setBusy(true);
    const { error } = await browserClient().auth.signOut();
    if (error) {
      setBusy(false);
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex items-center gap-[var(--gui-space-xs)] sm:gap-[var(--gui-space-m)]">
      {candidate && (
        <>
          <Link
            className="hidden text-sm font-medium text-muted-foreground sm:inline"
            href="/app/aplikacje"
          >
            Aplikacje
          </Link>
          <Link
            className="hidden text-sm font-medium text-muted-foreground sm:inline"
            href="/app/profil"
          >
            Profil
          </Link>
        </>
      )}
      <Link
        href="/app"
        className={cn(buttonVariants({ variant: "outline", size: "lg" }), "text-sm font-medium")}
      >
        Moje konto
      </Link>
      <Button
        className="hidden sm:inline-flex"
        variant="ghost"
        size="icon"
        aria-label="Wyloguj się"
        title="Wyloguj się"
        disabled={busy}
        onClick={signOut}
      >
        <LogOut aria-hidden="true" />
      </Button>
    </div>
  );
}
