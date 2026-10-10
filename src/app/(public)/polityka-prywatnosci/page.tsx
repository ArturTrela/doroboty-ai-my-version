import type { Metadata } from "next";

export const metadata: Metadata = { title: "Polityka prywatności" };

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-14 lg:px-8 lg:py-20">
      <p className="text-xs font-medium tracking-[var(--gui-tracking-xl)] text-muted-foreground">
        Informacja
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-[var(--gui-tracking-s)] sm:text-5xl">
        Prywatność
      </h1>
      <div className="mt-8 space-y-8 text-base leading-7 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground">Środowisko case study</h2>
          <p className="mt-3">
            Ta aplikacja służy do nauki w programie AI Product Heroes 3. Wspólne środowiska
            szkoleniowe korzystają wyłącznie z danych syntetycznych.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Konta uczestników</h2>
          <p className="mt-3">
            Dane logowania i treści w prywatnym wdrożeniu uczestnika są przetwarzane przez operatora
            tego wdrożenia. Nie wpisuj prawdziwych danych kandydatów do współdzielonych instancji
            kursowych.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">Analityka</h2>
          <p className="mt-3">
            Zdarzenia produktowe nie powinny zawierać CV, odpowiedzi aplikacyjnych, adresów e-mail
            ani innych danych osobowych. Operacyjne wyniki rekrutacji pozostają w bazie aplikacji.
          </p>
        </section>
      </div>
    </article>
  );
}
