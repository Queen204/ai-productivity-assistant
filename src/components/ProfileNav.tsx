import { Link } from "@tanstack/react-router";

import { PROFILE_NAV } from "@/lib/profile";

export function ProfileNav() {
  return (
    <nav className="glass-card mb-6 flex flex-wrap gap-1.5 p-2">
      {PROFILE_NAV.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          activeOptions={{ exact: item.to === "/profile" }}
          className="rounded-2xl px-4 py-2 text-sm font-medium text-ink/60 transition hover:bg-glass/70 hover:text-ink"
          activeProps={{
            className:
              "rounded-2xl px-4 py-2 text-sm font-semibold bg-ink/90 text-background shadow-sm",
          }}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <header className="mb-6">
      <p className="text-[11px] font-bold tracking-[0.2em] text-ink/40 uppercase">{eyebrow}</p>
      <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{title}</h1>
      {lead && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/65">{lead}</p>}
    </header>
  );
}
