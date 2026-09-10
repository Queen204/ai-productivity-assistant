import { createFileRoute } from "@tanstack/react-router";

import { SectionHeading } from "@/components/ProfileNav";
import { ABOUT_PARAGRAPHS, ACHIEVEMENTS } from "@/lib/profile";

export const Route = createFileRoute("/profile/about")({
  head: () => ({
    meta: [
      { title: "About Nomvuselelo Queen Thwala" },
      {
        name: "description",
        content:
          "About Nomvuselelo Queen Thwala: organised, adaptable and analytical Operations Management student, plus achievements, leadership and personal interests.",
      },
      { property: "og:title", content: "About Nomvuselelo Queen Thwala" },
      {
        property: "og:description",
        content:
          "Organised, adaptable and analytical Operations Management student, with achievements, leadership roles and a love of reading.",
      },
    ],
  }),
  component: AboutSection,
});

function AboutSection() {
  return (
    <div className="space-y-6">
      <section className="glass-card p-6 sm:p-8">
        <SectionHeading eyebrow="About Me" title="A little about who I am" />
        <div className="space-y-4">
          {ABOUT_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph} className="max-w-3xl text-sm leading-relaxed text-ink/70">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="glass-card p-6 sm:p-8">
        <h2 className="font-display text-2xl font-semibold">Achievements &amp; Leadership</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {ACHIEVEMENTS.map((item) => (
            <div key={item.title} className="rounded-3xl bg-glass/70 p-5 ring-1 ring-ink/5">
              <p className="text-2xl">★</p>
              <p className="mt-2 font-semibold">{item.title}</p>
              <p className="mt-1 text-sm text-ink/60">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card p-6 sm:p-8">
        <h2 className="font-display text-2xl font-semibold">Beyond My Career</h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink/70">
          I love reading books. Reading helps me relax, expand my knowledge, develop new
          perspectives and keep learning long after class ends. I am passionate about personal
          development and discovering new ideas, whether that comes from a book, a course or a
          conversation with someone who sees the world differently.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {["Reading", "Personal development", "New ideas", "Continuous learning"].map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-ink/5 px-3 py-1.5 text-xs font-medium text-ink/70"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
