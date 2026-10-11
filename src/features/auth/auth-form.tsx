"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { browserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrandMark } from "@/features/public/brand-mark";
import { captureBrowserAnalytics } from "@/features/analytics/client-event";
export type AuthMode = "sign-in" | "sign-up" | "forgot-password" | "update-password";

type AuthValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  privacyAccepted: boolean;
};
const copy = {
  "sign-in": {
    title: "Wracamy do roboty.",
    description: "Zaloguj się do swojej strefy.",
    action: "Zaloguj się",
  },
  "sign-up": {
    title: "Zacznij od konkretu.",
    description: "Załóż konto kandydata w DoRoboty.ai.",
    action: "Załóż konto",
  },
  "forgot-password": {
    title: "Odzyskaj dostęp.",
    description: "Wyślemy link do ustawienia nowego hasła.",
    action: "Wyślij link",
  },
  "update-password": {
    title: "Ustaw nowe hasło.",
    description: "Wybierz hasło z co najmniej 8 znakami.",
    action: "Zapisz hasło",
  },
};
export function AuthForm({
  mode,
  linkError = false,
  nextPath = "/app",
}: {
  mode: AuthMode;
  linkError?: boolean;
  nextPath?: string;
}) {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const schema = z
    .object({
      firstName: z.string().trim().max(80),
      lastName: z.string().trim().max(120),
      email: z.string(),
      password: z.string(),
      privacyAccepted: z.boolean(),
    })
    .superRefine((values, context) => {
      if (mode === "sign-up" && !values.firstName)
        context.addIssue({ code: "custom", path: ["firstName"], message: "Podaj imię." });
      if (mode === "sign-up" && !values.lastName)
        context.addIssue({ code: "custom", path: ["lastName"], message: "Podaj nazwisko." });
      if (mode !== "update-password" && !z.email().safeParse(values.email).success)
        context.addIssue({
          code: "custom",
          path: ["email"],
          message: "Podaj prawidłowy adres e-mail.",
        });
      if (mode !== "forgot-password" && values.password.length < (mode === "sign-in" ? 1 : 8))
        context.addIssue({
          code: "custom",
          path: ["password"],
          message: "Podaj hasło — dla nowego konta co najmniej 8 znaków.",
        });
      if (mode === "sign-up" && !values.privacyAccepted)
        context.addIssue({
          code: "custom",
          path: ["privacyAccepted"],
          message: "Zaakceptuj politykę prywatności.",
        });
    });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AuthValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      privacyAccepted: false,
    },
    mode: "onBlur",
  });
  async function submit(values: AuthValues) {
    setMessage("");
    try {
      const client = browserClient();
      const callback = `${window.location.origin}/auth/callback`;
      if (mode === "sign-in") {
        const { error } = await client.auth.signInWithPassword(values);
        if (error) throw error;
        router.push(nextPath);
        router.refresh();
      }
      if (mode === "sign-up") {
        const onboardingPath = `/app/onboarding?next=${encodeURIComponent(nextPath)}`;
        const { data, error } = await client.auth.signUp({
          email: values.email,
          password: values.password,
          options: {
            emailRedirectTo: `${callback}?next=${encodeURIComponent(onboardingPath)}`,
            data: {
              first_name: values.firstName.trim(),
              last_name: values.lastName.trim(),
              display_name: `${values.firstName.trim()} ${values.lastName.trim()}`,
              privacy_accepted_at: new Date().toISOString(),
            },
          },
        });
        if (error) throw error;
        if (data.session) {
          void captureBrowserAnalytics({ event: "registration_completed", properties: {} });
          router.push(onboardingPath);
          router.refresh();
          return;
        }
        setMessage(
          "Sprawdź skrzynkę. Jeśli konto wymaga potwierdzenia, znajdziesz tam link aktywacyjny.",
        );
      }
      if (mode === "forgot-password") {
        const { error } = await client.auth.resetPasswordForEmail(values.email, {
          redirectTo: `${callback}?next=/auth/update-password`,
        });
        if (error) throw error;
        setMessage(
          "Jeśli konto istnieje, wyślemy wiadomość z linkiem do zmiany hasła. Sprawdź też spam.",
        );
      }
      if (mode === "update-password") {
        const { error } = await client.auth.updateUser({ password: values.password });
        if (error) throw error;
        router.push(nextPath);
        router.refresh();
      }
    } catch {
      setError("root", {
        message:
          mode === "sign-in"
            ? "Nie udało się zalogować. Sprawdź e-mail, hasło i potwierdzenie konta."
            : "Nie udało się wykonać tej operacji. Spróbuj ponownie za chwilę.",
      });
    }
  }
  return (
    <main className="auth-layout">
      <div className="auth-aside">
        <Link href="/" className="brand">
          <BrandMark />
          DoRoboty.ai
        </Link>
        <div>
          <h2>
            Pokaż,
            <br />
            co dowozisz.
          </h2>
          <p>Liczy się doświadczenie, decyzja i wynik.</p>
        </div>
        <span>DoRoboty.ai</span>
      </div>
      <div className="auth-content">
        <Link href="/" className="text-link">
          <ArrowLeft size={16} />
          Wróć do ofert
        </Link>
        <div className="auth-form">
          <h1>{copy[mode].title}</h1>
          <p className="lede">{copy[mode].description}</p>
          {linkError && (
            <p role="alert" className="error-message mb-6">
              Ten link jest nieprawidłowy albo wygasł. Poproś o nowy lub zaloguj się.
            </p>
          )}
          {message ? (
            <div role="status" className="success-panel">
              <p>{message}</p>
              <Link className="text-link mt-5" href="/auth/sign-in">
                Przejdź do logowania <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <form className="form-stack" noValidate onSubmit={handleSubmit(submit)}>
              {mode === "sign-up" && (
                <div className="grid gap-[var(--gui-space-s)] sm:grid-cols-2">
                  <div className="field">
                    <Label htmlFor="firstName">Imię</Label>
                    <Input
                      id="firstName"
                      autoComplete="given-name"
                      aria-invalid={!!errors.firstName}
                      aria-describedby={errors.firstName ? "first-name-error" : undefined}
                      {...register("firstName")}
                    />
                    {errors.firstName && (
                      <p id="first-name-error" className="error-message">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="field">
                    <Label htmlFor="lastName">Nazwisko</Label>
                    <Input
                      id="lastName"
                      autoComplete="family-name"
                      aria-invalid={!!errors.lastName}
                      aria-describedby={errors.lastName ? "last-name-error" : undefined}
                      {...register("lastName")}
                    />
                    {errors.lastName && (
                      <p id="last-name-error" className="error-message">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
              {mode !== "update-password" && (
                <div className="field">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p id="email-error" className="error-message">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              )}
              {mode !== "forgot-password" && (
                <div className="field">
                  <Label htmlFor="password">Hasło</Label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? "password-error" : undefined}
                    {...register("password")}
                  />
                  {errors.password && (
                    <p id="password-error" className="error-message">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              )}
              {mode === "sign-up" && (
                <div className="field">
                  <label className="flex items-start gap-[var(--gui-space-xs)] text-sm">
                    <input
                      className="mt-0.5 size-4 accent-[var(--gui-color-1)]"
                      type="checkbox"
                      aria-invalid={!!errors.privacyAccepted}
                      aria-describedby={errors.privacyAccepted ? "privacy-error" : undefined}
                      {...register("privacyAccepted")}
                    />
                    <span>
                      Akceptuję{" "}
                      <Link className="text-link" href="/polityka-prywatnosci" target="_blank">
                        politykę prywatności
                      </Link>
                      .
                    </span>
                  </label>
                  {errors.privacyAccepted && (
                    <p id="privacy-error" className="error-message">
                      {errors.privacyAccepted.message}
                    </p>
                  )}
                </div>
              )}
              {errors.root && (
                <p role="alert" className="error-message">
                  {errors.root.message}
                </p>
              )}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Chwila…" : copy[mode].action}
                <ArrowRight size={16} />
              </Button>
            </form>
          )}
          <div className="auth-links">
            {mode === "sign-in" ? (
              <>
                <Link href="/auth/forgot-password">Nie pamiętam hasła</Link>
                <Link href={`/auth/sign-up?next=${encodeURIComponent(nextPath)}`}>
                  Załóż konto kandydata
                </Link>
              </>
            ) : (
              <Link href={`/auth/sign-in?next=${encodeURIComponent(nextPath)}`}>Mam już konto</Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
