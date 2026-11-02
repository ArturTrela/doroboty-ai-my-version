import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import {
  Menu,
  X,
  BriefcaseBusiness,
  UserRound,
  Bookmark,
  FileText,
  Users,
  Building2,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import { BrandMark } from "@/features/public/brand-mark";
import { Button, buttonVariants } from "@/components/ui/button";
import { currentPerson } from "./model";
import { usePrototype } from "./store";

export function Notice({ children }: { children: ReactNode }) {
  return (
    <div role="status" className="prototype-notice">
      {children}
    </div>
  );
}
export function PageTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="page-heading">
      <h1>{children}</h1>
      {action}
    </div>
  );
}
export function Empty({ children }: { children: ReactNode }) {
  return <div className="prototype-panel">{children}</div>;
}
export function NotFound() {
  return (
    <section className="prototype-section">
      <h1>Nie znaleziono strony</h1>
      <p className="my-5">Ten adres nie prowadzi do dostępnej oferty lub aplikacji.</p>
      <Link className={buttonVariants()} to="/oferty">
        Wróć do ofert
      </Link>
    </section>
  );
}
const candidateNav = [
  ["/app", "Przegląd", LayoutDashboard],
  ["/app/profil", "Profil", UserRound],
  ["/app/zapisane", "Zapisane oferty", Bookmark],
  ["/app/aplikacje", "Moje aplikacje", FileText],
] as const;
const employerNav = [
  ["/app", "Przegląd", LayoutDashboard],
  ["/app/oferty", "Moje oferty", BriefcaseBusiness],
  ["/app/kandydaci", "Kandydaci", Users],
  ["/app/organizacja", "Organizacja", Building2],
] as const;
export function Shell() {
  const { state, issue, error, clearError } = usePrototype();
  const person = currentPerson(state);
  const { pathname } = useLocation();
  const workspace = pathname.startsWith("/app") && person;
  const [menuAt, setMenuAt] = useState<string | null>(null);
  const main = useRef<HTMLElement>(null);
  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current !== pathname) {
      clearError();
      main.current?.focus();
      window.scrollTo(0, 0);
      lastPath.current = pathname;
    }
  }, [pathname, clearError]);
  const nav =
    person?.role === "employer"
      ? employerNav
      : person?.role === "operator"
        ? [["/app/case", "Materiały case study", FileText] as const]
        : candidateNav;
  const content = (
    <>
      <>
        {issue && (
          <Notice>
            {issue}{" "}
            <Link className="underline" to="/app/settings">
              Ustawienia danych
            </Link>
          </Notice>
        )}
      </>
      {error && (
        <p className="prototype-error" role="alert">
          {error}
        </p>
      )}
      <div key={`${state.activePersonId}:${pathname}`}>
        <Outlet />
      </div>
    </>
  );
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <a
        href="#main"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          main.current?.focus();
        }}
      >
        Przejdź do treści
      </a>
      {workspace ? (
        <div className="app-frame">
          <div className="mobile-header">
            <Link to="/" className="brand">
              <BrandMark />
              DoRoboty.ai
            </Link>
            <Button
              aria-label={menuAt === pathname ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={menuAt === pathname}
              aria-controls="workspace-nav"
              variant="ghost"
              size="icon"
              onClick={() => setMenuAt(menuAt === pathname ? null : pathname)}
            >
              {menuAt === pathname ? <X /> : <Menu />}
            </Button>
          </div>
          <aside
            className={`sidebar ${menuAt === pathname ? "sidebar-open" : ""}`}
            onKeyDown={(e) => {
              if (e.key === "Escape") setMenuAt(null);
            }}
          >
            <Link className="brand" to="/">
              <BrandMark />
              DoRoboty.ai
            </Link>
            <div className="workspace-label">
              <span className="workspace-avatar">{person.name[0]}</span>
              <div>
                <strong>{person.name}</strong>
                <span>{person.headline}</span>
              </div>
            </div>
            <nav id="workspace-nav" aria-label="Panel użytkownika">
              {nav.map(([to, label, Icon]) => (
                <NavLink
                  end={to === "/app"}
                  key={to}
                  to={to}
                  onClick={() => setMenuAt(null)}
                  className={({ isActive }) => `nav-link ${isActive ? "nav-active" : ""}`}
                >
                  <Icon className="size-4" />
                  {label}
                </NavLink>
              ))}
              <NavLink
                to="/app/settings"
                onClick={() => setMenuAt(null)}
                className={({ isActive }) => `nav-link ${isActive ? "nav-active" : ""}`}
              >
                <Settings className="size-4" />
                Ustawienia
              </NavLink>
              <Link className="nav-link" to="/oferty">
                Wszystkie oferty
              </Link>
              <Link className="nav-link" to="/auth/sign-in">
                Zmień osobę
              </Link>
            </nav>
          </aside>
          <div className="workspace">
            <div className="topbar">
              <span>
                {person.role === "candidate"
                  ? "Strefa kandydata"
                  : person.role === "employer"
                    ? "Strefa pracodawcy"
                    : "Case study"}
              </span>
              <Link to="/auth/sign-in">{person.name}</Link>
            </div>
            <main id="main" ref={main} tabIndex={-1} className="main-content outline-none">
              {content}
            </main>
          </div>
        </div>
      ) : (
        <>
          <header className="bg-background shadow-[var(--gui-divider-bottom-shadow)]">
            <div className="mx-auto flex min-h-16 max-w-[1360px] flex-wrap items-center justify-between gap-3 px-5 py-3 lg:px-8">
              <Link to="/" className="brand" aria-label="DoRoboty.ai — strona główna">
                <BrandMark />
                DoRoboty.ai
              </Link>
              <nav aria-label="Główna nawigacja" className="flex flex-wrap items-center gap-4">
                <Link to="/oferty">Oferty</Link>
                <Link className="hidden sm:inline" to="/metodologia">
                  Metodologia
                </Link>
                <Link to="/app" className={buttonVariants({ variant: "outline", size: "sm" })}>
                  {person ? "Moje konto" : "Wybierz osobę"}
                </Link>
              </nav>
            </div>
          </header>
          <main id="main" ref={main} tabIndex={-1} className="outline-none">
            {content}
          </main>
          <footer className="bg-muted/40 shadow-[var(--gui-divider-top-shadow)]">
            <div className="mx-auto flex max-w-[1360px] flex-wrap justify-between gap-5 px-5 py-10 lg:px-8">
              <span>DoRoboty.ai · Superhero.tech</span>
              <nav aria-label="Stopka" className="flex flex-wrap gap-5">
                <Link to="/metodologia">Metodologia</Link>
                <Link to="/polityka-prywatnosci">Prywatność</Link>
                <Link to="/app/settings">Ustawienia prototypu</Link>
              </nav>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
