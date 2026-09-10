import { createFileRoute } from "@tanstack/react-router";

import { SectionHeading } from "@/components/ProfileNav";
import { SKILLS } from "@/lib/profile";

export const Route = createFileRoute("/profile/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Nomvuselelo Queen Thwala" },
      {
        name: "description",
        content:
          "Skills of Nomvuselelo Queen Thwala: analytical thinking, organisation and time management, Microsoft Excel and Office, communication, teamwork and responsible AI use.",
      },
      { property: "og:title", content: "Skills — Nomvuselelo Queen Thwala" },
      {
        property: "og:description",
        content:
          "Analytical thinking, organisation, Microsoft Office, communication, teamwork and responsible use of AI tools.",
      },
    ],
  }),
  component: SkillsSection,
});

function SkillsSection() {
  return (
    <div className="space-y-6">
      <section className="glass-card p-6 sm:p-8">
        <SectionHeading
          eyebrow="Skills"
          title="What I bring to a team"
          lead="A mix of analytical, organisational and people skills, supported by modern tools."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {SKILLS.map((skill) => (
            <div
              key={skill.name}
              className="flex items-center gap-4 rounded-3xl bg-glass/70 p-5 ring-1 ring-ink/5"
            >
              <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-ink/90 text-lg text-background">
                {skill.icon}
              </div>
              <p className="text-sm font-semibold text-ink/80">{skill.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
