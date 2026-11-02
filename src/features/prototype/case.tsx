import { PageTitle } from "./shell";
export function CasePage() {
  return (
    <>
      <PageTitle>Materiały case study</PageTitle>
      <section className="prototype-panel prototype-form">
        <h2>Etap początkowy</h2>
        <p>
          Zespół chce zwiększyć liczbę ukończonych aplikacji. Sprawdź, gdzie użytkownicy rezygnują i
          co dzieje się po wysłaniu zgłoszenia.
        </p>
        <p>
          Dane historyczne są osobnym materiałem dydaktycznym. Twoje działania w prototypie nie
          zmieniają tych wyników.
        </p>
        <a
          className="text-[var(--gui-link)] underline"
          href={`${import.meta.env.BASE_URL}case/baseline.csv`}
          download
        >
          Pobierz dane etapu początkowego
        </a>
      </section>
    </>
  );
}
