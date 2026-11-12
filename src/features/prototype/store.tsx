import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import posthog from "posthog-js";
import {
  currentPerson,
  initialState,
  transition,
  type Action,
  type Person,
  type State,
} from "./model";
import { parseState, readState, saveState, STORAGE_KEY, type StoragePort } from "./storage";

export const posthogConfigured = Boolean(
  import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN && import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
);

function identifyPerson(person: Person) {
  if (!posthogConfigured) return;

  posthog.identify(person.id, {
    name: person.name,
    role: person.role,
    ...(person.companyId ? { company_id: person.companyId } : {}),
  });
}
function browserStorage(): StoragePort | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}
function useStore() {
  const [loaded] = useState(() => readState(browserStorage()));
  const [state, setState] = useState(loaded.state);
  const [issue, setIssue] = useState(loaded.issue);
  const [error, setError] = useState("");
  const [blocked, setBlocked] = useState(loaded.blocked);
  const latest = useRef(state);
  const saved = useRef(loaded.raw);
  const protectedSave = useRef(loaded.blocked);
  const initialPerson = useRef(currentPerson(loaded.state));

  async function update(makeNext: () => State, replace = false) {
    function apply() {
      const storage = browserStorage();
      const locks = navigator.locks;
      if (storage && locks && readState(storage).raw !== saved.current) {
        throw new Error(
          "Zapis zmienił się w innej karcie. Skopiuj niezapisane zmiany lub wyeksportuj dane, odśwież stronę i spróbuj ponownie.",
        );
      }
      const next = makeNext();
      latest.current = next;
      setState(next);
      setError("");
      if (protectedSave.current && !replace) return true;
      try {
        if (!locks)
          throw new Error(
            "Przeglądarka nie obsługuje bezpiecznego zapisu. Wyeksportuj zmiany przed zamknięciem strony.",
          );
        saved.current = saveState(storage, next);
        setIssue("");
        if (replace) {
          protectedSave.current = false;
          setBlocked(false);
        }
      } catch (e) {
        setIssue((e as Error).message);
      }
      return true;
    }

    try {
      const locks = navigator.locks;
      return locks ? await locks.request(STORAGE_KEY, apply) : apply();
    } catch (e) {
      setError(
        e instanceof Error && e.name !== "ZodError"
          ? e.message
          : "Sprawdź poprawność i długość wprowadzonych danych.",
      );
      return false;
    }
  }

  async function updateWithIdentity(makeNext: () => State, replace = false) {
    const previousPerson = currentPerson(latest.current);
    const updated = await update(makeNext, replace);
    const nextPerson = currentPerson(latest.current);

    if (updated && previousPerson?.id !== nextPerson?.id) {
      if (previousPerson && posthogConfigured) posthog.reset();
      if (nextPerson) identifyPerson(nextPerson);
    }

    return updated;
  }

  function run(action: Action) {
    return updateWithIdentity(() => transition(latest.current, action));
  }

  function importState(raw: string) {
    return updateWithIdentity(() => parseState(raw), true);
  }
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    if (initialPerson.current) identifyPerson(initialPerson.current);
  }, []);
  return {
    state,
    issue,
    error,
    blocked,
    original: loaded.original,
    run,
    importState,
    clearError: () => setError(""),
    reset: () => updateWithIdentity(initialState, true),
  };
}
type Store = ReturnType<typeof useStore>;
const Context = createContext<Store | null>(null);
export function PrototypeProvider({ children }: { children: ReactNode }) {
  const store = useStore();
  return <Context.Provider value={store}>{children}</Context.Provider>;
}
export function usePrototype() {
  const store = useContext(Context);
  if (!store) throw new Error("PrototypeProvider is required");
  return store;
}
