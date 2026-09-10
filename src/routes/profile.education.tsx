import { createFileRoute } from "@tanstack/react-router";

import { SectionHeading } from "@/components/ProfileNav";
import { EDUCATION } from "@/lib/profile";

export const Route = createFileRoute("/profile/education")({
  head: () => ({
    meta: [
      { title: "Education — Nomvuselelo Queen Thwala" },
      {
        name: "description",
        content:
          "Education of Nomvuselelo Queen Thwala: Diploma in Operations Management at CPUT (2024–present) and National Senior Certificate from Vukuzenzele Combined School.",
      },
      { property: "og:title", content: "Education — Nomvuselelo Queen Thwala" },
      {
        property: "og:description",
        content:
          "Diploma in Operations Management at CPUT and National Senior Certificate, with relevant modules listed.",
      },
    ],
  }),
  component: EducationSection,
});

function EducationSection() {
  return (
    <div className="space-y-6">
      <section className="glass-card p-6 sm:p-8">
        <SectionHeading
          eyebrow="Education"
          title="My academic journey"
          lead="Studying operations management, with a focus on making systems and processes work better."
        />

        <div className="space-y-5">
          {EDUCATION.map((item) => (
            <article
              key={item.qualification}
              className="rounded-3xl bg-glass/70 p-5 ring-1 ring-ink/5 sm:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl font-semibold">{item.qualification}</h2>
                  <p className="mt-1 text-sm text-ink/65">{item.institution}</p>
                </div>
                <div className="text-right">
                  <span className="rounded-full bg-ink/5 px-3 py-1 text-xs font-semibold text-ink/70">
                    {item.status}
                  </span>
                  <p className="mt-2 text-xs font-medium text-ink/50">{item.period}</p>
                </div>
              </div>

              {item.modules.length > 0 && (
                <div className="mt-5">
                  <p className="text-[10px] font-bold tracking-[0.18em] text-ink/40 uppercase">
                    Relevant modules
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.modules.map((module) => (
                      <span
                        key={module}
                        className="rounded-2xl bg-background px-3 py-1.5 text-xs font-medium text-ink/70 ring-1 ring-ink/5"
                      >
                        {module}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
