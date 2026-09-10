import { Link, createFileRoute } from "@tanstack/react-router";

import { PROFILE, TRAITS } from "@/lib/profile";

export const Route = createFileRoute("/profile/")({
  head: () => ({
    meta: [
      { title: "Nomvuselelo Queen Thwala — Operations Management Student" },
      {
        name: "description",
        content:
          "Personal profile of Nomvuselelo Queen Thwala: Operations Management student at CPUT, based in Cape Town. Education, certificates, skills and contact details.",
      },
      { property: "og:title", content: "Nomvuselelo Queen Thwala — Personal Profile" },
      {
        property: "og:description",
        content:
          "Operations Management student at CPUT. Organised, analytical and committed to continuous learning.",
      },
    ],
  }),
  component: ProfileHome,
});

function ProfileHome() {
  return (
    <div className="space-y-6">
      <section className="glass-card grid gap-8 p-6 sm:p-9 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <p className="text-[11px] font-bold tracking-[0.2em] text-ink/40 uppercase">
            Personal Profile
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight font-semibold sm:text-5xl">
            {PROFILE.name}
          </h1>
          <p className="mt-3 text-base font-medium text-ink/70">{PROFILE.headline}</p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink/65">{PROFILE.intro}</p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            <Link
              to="/profile/contact"
              className="rounded-2xl bg-ink px-6 py-3 text-sm font-semibold text-background shadow-lg shadow-ink/20 transition hover:opacity-90"
            >
              Contact Me
            </Link>
            <Link
              to="/profile/certificates"
              className="rounded-2xl bg-glass/80 px-6 py-3 text-sm font-semibold text-ink ring-1 ring-ink/10 transition hover:bg-glass"
            >
              View Certificates
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {TRAITS.map((trait) => (
              <span
                key={trait}
                className="rounded-full bg-ink/5 px-3 py-1.5 text-xs font-medium text-ink/70"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xs">
          <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-amber/40 to-pink/30 blur-2xl" />
          <img
            src={PROFILE.photo}
            alt={`Portrait of ${PROFILE.name}`}
            className="relative aspect-[3/4] w-full rounded-[2rem] object-cover shadow-xl shadow-ink/20"
            loading="lazy"
          />
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
          { label: "Phone", value: PROFILE.phone, href: PROFILE.phoneHref },
          { label: "Location", value: PROFILE.location },
        ].map((item) => (
          <div key={item.label} className="glass-card p-5">
            <p className="text-[10px] font-bold tracking-[0.18em] text-ink/40 uppercase">
              {item.label}
            </p>
            {item.href ? (
              <a
                href={item.href}
                className="mt-2 block text-sm font-semibold break-words text-ink hover:underline"
              >
                {item.value}
              </a>
            ) : (
              <p className="mt-2 text-sm font-semibold text-ink">{item.value}</p>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
