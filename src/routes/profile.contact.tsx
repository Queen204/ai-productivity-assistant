import { createFileRoute } from "@tanstack/react-router";

import { SectionHeading } from "@/components/ProfileNav";
import { PROFILE } from "@/lib/profile";

export const Route = createFileRoute("/profile/contact")({
  head: () => ({
    meta: [
      { title: "Contact Nomvuselelo Queen Thwala" },
      {
        name: "description",
        content:
          "Contact Nomvuselelo Queen Thwala by email at queennomvuselelo670@gmail.com or phone 071 532 3649. Based in Belhar, Cape Town, South Africa.",
      },
      { property: "og:title", content: "Contact Nomvuselelo Queen Thwala" },
      {
        property: "og:description",
        content: "Email, phone and location details for Nomvuselelo Queen Thwala in Cape Town.",
      },
    ],
  }),
  component: ContactSection,
});

function ContactSection() {
  return (
    <section className="glass-card p-6 sm:p-8">
      <SectionHeading
        eyebrow="Contact"
        title="Let's get in touch"
        lead="I am open to learnerships, internships and opportunities in operations and administration."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <a
          href={`mailto:${PROFILE.email}`}
          className="rounded-3xl bg-glass/70 p-6 ring-1 ring-ink/5 transition hover:shadow-lg hover:shadow-ink/10"
        >
          <p className="text-[10px] font-bold tracking-[0.18em] text-ink/40 uppercase">Email</p>
          <p className="mt-2 text-sm font-semibold break-words text-ink">{PROFILE.email}</p>
        </a>
        <a
          href={PROFILE.phoneHref}
          className="rounded-3xl bg-glass/70 p-6 ring-1 ring-ink/5 transition hover:shadow-lg hover:shadow-ink/10"
        >
          <p className="text-[10px] font-bold tracking-[0.18em] text-ink/40 uppercase">Phone</p>
          <p className="mt-2 text-sm font-semibold text-ink">{PROFILE.phone}</p>
        </a>
        <div className="rounded-3xl bg-glass/70 p-6 ring-1 ring-ink/5 sm:col-span-2">
          <p className="text-[10px] font-bold tracking-[0.18em] text-ink/40 uppercase">Location</p>
          <p className="mt-2 text-sm font-semibold text-ink">{PROFILE.location}</p>
        </div>
      </div>

      <a
        href={`mailto:${PROFILE.email}`}
        className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-ink px-6 py-3 text-sm font-semibold text-background shadow-lg shadow-ink/20 transition hover:opacity-90"
      >
        Contact Me
      </a>
    </section>
  );
}
