import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import { NAV_ITEMS } from "@/lib/nav";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background font-sans text-ink">
      <div className="pointer-events-none absolute -top-32 -left-24 size-[420px] rounded-full bg-sky/40 blur-3xl floaty" />
      <div className="pointer-events-none absolute top-40 -right-28 size-[460px] rounded-full bg-pink/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-120px] left-1/3 size-[420px] rounded-full bg-mint/30 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-[1440px]">
        <aside className="hidden w-72 shrink-0 flex-col gap-5 p-5 lg:flex">
          <Link to="/" className="flex items-center gap-3 px-3 pt-1">
            <div className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-brand to-pink font-display text-xl font-semibold text-primary-foreground shadow-lg shadow-brand/30">
              A
            </div>
            <div>
              <p className="font-display text-lg leading-none font-semibold">Assistant</p>
              <p className="mt-1 text-[11px] tracking-wide text-ink/50">Small Business AI</p>
            </div>
          </Link>

          <nav className="flex-1">
            <p className="px-4 pb-2 text-[10px] font-bold tracking-[0.18em] text-ink/35 uppercase">
              Workspace
            </p>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 font-medium text-ink/70 transition hover:bg-glass/60"
                activeProps={{
                  className:
                    "flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold bg-brand/15 text-brand-deep ring-1 ring-brand/20",
                }}
              >
                <span className="text-lg">{item.icon}</span> {item.label}
              </Link>
            ))}
          </nav>

          <div className="glass-card p-4">
            <p className="text-sm font-bold">Keep it safe</p>
            <p className="mt-1 text-[11px] leading-relaxed text-ink/60">
              Please don't paste confidential or sensitive business information into these tools.
            </p>
          </div>
        </aside>

        <main className="min-w-0 flex-1 p-5 lg:p-8">
          <header className="mb-5 flex items-center justify-between lg:hidden">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-brand to-pink font-display font-semibold text-primary-foreground shadow-lg shadow-brand/30">
                A
              </div>
              <span className="font-display text-lg font-semibold">Assistant</span>
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="glass-card size-10 text-xl"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </header>

          {menuOpen && (
            <nav className="rise-in mb-5 grid grid-cols-2 gap-2 lg:hidden">
              {NAV_ITEMS.map((item, index) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className={`flex items-center gap-2 rounded-2xl bg-glass/60 px-4 py-3 font-medium text-ink/70 ${index === 0 ? "col-span-2" : ""}`}
                  activeProps={{
                    className: `flex items-center gap-2 rounded-2xl px-4 py-3 font-semibold bg-brand/15 text-brand-deep ring-1 ring-brand/20 ${index === 0 ? "col-span-2" : ""}`,
                  }}
                >
                  <span>{item.icon}</span> {item.shortLabel}
                </Link>
              ))}
            </nav>
          )}

          {children}
        </main>
      </div>
    </div>
  );
}
