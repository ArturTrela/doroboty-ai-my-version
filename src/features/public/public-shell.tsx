import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/features/public/brand-mark";
import { PublicSessionNav } from "@/features/public/public-session-nav";
import { getSupabaseConfig } from "@/lib/env";
import { serverClient } from "@/lib/supabase/server";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/oferty", label: "Oferty" },
  { href: "/metodologia", label: "Metodologia" },
  { href: "/auth/sign-in?audience=employer&next=/app/oferty", label: "Dla firm" },
];

export async function PublicShell({ children }: { children: React.ReactNode }) {
  let role: "candidate" | "employer" | "operator" | null = null;
  if (getSupabaseConfig().configured) {
    const client = await serverClient();
    const {
      data: { user },
    } = await client.auth.getUser();
    if (user) {
      const { data } = await client.from("profiles").select("role").eq("id", user.id).maybeSingle();
      role = (data?.role as typeof role) ?? null;
    }
  }
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <a
        className="fixed top-3 left-3 z-50 -translate-y-40 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--gui-shadow-m)] focus:translate-y-0"
        href="#main"
      >
        Przejdź do treści
      </a>
      <header className="bg-background/95 shadow-[var(--gui-divider-bottom-shadow)] backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between gap-4 px-5 lg:px-8">
          <Link
            className="flex items-center gap-2.5 text-base font-semibold tracking-[var(--gui-tracking-s)]"
            href="/"
            aria-label="DoRoboty.ai — strona główna"
          >
            <BrandMark />
            <span>DoRoboty.ai</span>
          </Link>
          <nav aria-label="Główna nawigacja" className="flex items-center gap-2 sm:gap-5">
            {navigation.map((item) => (
              <Link
                key={item.href}
                className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
            {role ? (
              <PublicSessionNav role={role} />
            ) : (
              <>
                <Link
                  href="/auth/sign-up?audience=candidate&next=/app/onboarding"
                  className="hidden text-sm font-medium text-[var(--gui-link)] sm:inline"
                >
                  Załóż konto
                </Link>
                <Link
                  href="/auth/sign-in?audience=candidate"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "text-sm font-medium",
                  )}
                >
                  Zaloguj się
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main id="main">{children}</main>
      <footer className="bg-muted/40 text-foreground shadow-[var(--gui-divider-top-shadow)]">
        <div className="mx-auto grid max-w-[1360px] gap-10 px-5 py-12 sm:grid-cols-2 lg:px-8">
          <div>
            <p className="text-base font-semibold">DoRoboty.ai</p>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Praca dla ludzi, którzy potrafią z AI zbudować coś wartościowego — nie tylko wpisać je
              do CV.
            </p>
          </div>
          <nav
            aria-label="Stopka"
            className="flex flex-wrap content-start gap-x-6 gap-y-3 text-sm text-muted-foreground sm:justify-end"
          >
            <Link href="/oferty">Oferty</Link>
            <Link href="/metodologia">Metodologia</Link>
            <Link href="/polityka-prywatnosci">Prywatność</Link>
            <Link className="inline-flex items-center gap-1" href="/auth/sign-in">
              Strefa case <ArrowUpRight className="size-4" />
            </Link>
          </nav>
        </div>
        <div className="px-5 py-4 text-xs text-muted-foreground shadow-[var(--gui-divider-top-shadow)] lg:px-8">
          <div className="mx-auto max-w-[1360px]">
            © {new Date().getFullYear()} DoRoboty.ai — od Superhero.tech
          </div>
        </div>
      </footer>
    </div>
  );
}
