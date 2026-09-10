import { createFileRoute } from "@tanstack/react-router";

import { SectionHeading } from "@/components/ProfileNav";
import { CERTIFICATES } from "@/lib/profile";

export const Route = createFileRoute("/profile/certificates")({
  head: () => ({
    meta: [
      { title: "Certificates — Nomvuselelo Queen Thwala" },
      {
        name: "description",
        content:
          "Certificates earned by Nomvuselelo Queen Thwala, including Google AI Essentials (Google/Coursera) and Introduction to Project Management (National School of Government).",
      },
      { property: "og:title", content: "Certificates — Nomvuselelo Queen Thwala" },
      {
        property: "og:description",
        content:
          "Google AI Essentials Specialisation and Introduction to Project Management, with the areas covered and downloadable certificates.",
      },
    ],
  }),
  component: CertificatesSection,
});

function CertificatesSection() {
  return (
    <div className="space-y-6">
      <section className="glass-card p-6 sm:p-8">
        <SectionHeading
          eyebrow="Certificates"
          title="Courses I have completed"
          lead="Each certificate can be opened and read in full."
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {CERTIFICATES.map((cert) => (
            <article
              key={cert.title}
              className="flex flex-col rounded-3xl bg-glass/70 p-5 ring-1 ring-ink/5 transition hover:shadow-lg hover:shadow-ink/10 sm:p-6"
            >
              <div className="grid size-12 place-items-center rounded-2xl bg-ink/90 text-xl text-background">
                ✦
              </div>
              <h2 className="mt-4 font-display text-xl leading-snug font-semibold">{cert.title}</h2>
              <p className="mt-1.5 text-sm text-ink/65">{cert.institution}</p>
              <p className="mt-1 text-xs font-semibold tracking-wide text-ink/45">{cert.date}</p>

              {cert.areas.length > 0 && (
                <div className="mt-5">
                  <p className="text-[10px] font-bold tracking-[0.18em] text-ink/40 uppercase">
                    Areas covered
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {cert.areas.map((area) => (
                      <li key={area} className="flex gap-2 text-sm text-ink/70">
                        <span className="text-ink/35">—</span>
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <a
                href={cert.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-2xl bg-ink px-5 py-2.5 text-sm font-semibold text-background transition hover:opacity-90"
              >
                View certificate
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
