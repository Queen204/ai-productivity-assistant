import { createFileRoute, Link } from "@tanstack/react-router";

import { ResponsibleAiNotice } from "@/components/ResponsibleAiNotice";
import { ICON_GRADIENT, type ToolAccent } from "@/lib/nav";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — AI Small Business Assistant" },
      {
        name: "description",
        content:
          "What the AI Small Business Assistant is, the problem it solves, its four AI tools, and how AI helps small businesses save time.",
      },
      { property: "og:title", content: "About — AI Small Business Assistant" },
      {
        property: "og:description",
        content:
          "How four AI tools help small businesses communicate, organise and research more effectively.",
      },
    ],
  }),
  component: About,
});

const FEATURES: Array<{ icon: string; accent: ToolAccent; title: string; body: string }> = [
  {
    icon: "✉️",
    accent: "brand",
    title: "Smart Email Generator",
    body: "Give it the purpose, the recipient, the key facts and a tone, and it returns a complete email — subject line, greeting, body and closing — ready to review and send.",
  },
  {
    icon: "📝",
    accent: "sky",
    title: "Meeting Notes Summarizer",
    body: "Paste rough notes from any meeting and get a summary, the key discussion points, the decisions made, who owns each action, and the deadlines involved.",
  },
  {
    icon: "🗓️",
    accent: "mint",
    title: "AI Task Planner",
    body: "List tasks with deadlines, priorities and time estimates. The planner ranks them by urgency and importance, then builds a daily or weekly schedule with a recommended order.",
  },
  {
    icon: "🔎",
    accent: "amber",
    title: "AI Research Assistant",
    body: "Ask a business question and choose what you want back: a summary, key points, insights, recommendations, suggested questions, or areas worth digging into further.",
  },
];

const BENEFITS = [
  "Hours saved every week on routine writing and admin",
  "Clearer, more consistent communication with customers and suppliers",
  "Nothing lost after a meeting — decisions and actions are captured",
  "Calmer days, because the most urgent work is obvious",
  "Better-informed decisions, backed by a quick research brief",
  "No extra headcount needed to keep up with the paperwork",
];

function About() {
  return (
    <>
      <div className="mb-7">
        <h1 className="font-display text-3xl font-semibold lg:text-4xl">
          About AI Small Business Assistant
        </h1>
        <p className="mt-2 max-w-[70ch] text-sm leading-relaxed text-ink/60">
          A single workspace where small business owners can hand off the writing, summarising,
          planning and research that eats their day — and get straight back to the work only they can
          do.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="glass-card p-6">
          <h2 className="font-display text-xl font-semibold">The problem it solves</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">
            In a small business, one person is often the whole back office. The same person answers
            customers, takes meeting notes, plans the week and looks things up. Those tasks are
            important but repetitive, and they crowd out the work that actually grows the business.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">
            Hiring extra help isn't always realistic, and most business software is built for larger
            teams. This assistant closes that gap with four focused tools that need nothing more than
            a browser and a few sentences of input.
          </p>
        </section>

        <section className="glass-card p-6">
          <h2 className="font-display text-xl font-semibold">How it improves productivity</h2>
          <ul className="mt-3 space-y-2.5">
            {[
              "A first draft appears in seconds, so you edit instead of starting from a blank page.",
              "Long meeting notes become a short list of decisions, owners and deadlines.",
              "Your task list arrives already sorted by what matters most today.",
              "Background research is condensed into a brief you can read in a minute.",
            ].map((line) => (
              <li key={line} className="flex gap-2.5 text-sm leading-relaxed text-ink/70">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand/50" />
                {line}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <h2 className="mt-8 mb-4 font-display text-2xl font-semibold">The four AI features</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {FEATURES.map((feature) => (
          <section key={feature.title} className="glass-card p-6">
            <div
              className={`grid size-12 place-items-center rounded-2xl text-2xl shadow-lg ${ICON_GRADIENT[feature.accent]}`}
            >
              {feature.icon}
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold">{feature.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{feature.body}</p>
          </section>
        ))}
      </div>

      <section className="glass-card mt-4 p-6">
        <h2 className="font-display text-xl font-semibold">Benefits of AI in small businesses</h2>
        <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {BENEFITS.map((benefit) => (
            <p key={benefit} className="flex gap-2.5 text-sm leading-relaxed text-ink/70">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-mint" />
              {benefit}
            </p>
          ))}
        </div>
      </section>

      <section className="glass-card mt-4 p-6">
        <h2 className="font-display text-xl font-semibold">Using it responsibly</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">
          Every result is a draft, not a decision. Read what the assistant produces, correct anything
          that looks off, and check facts, figures and dates against your own records before acting on
          them. Keep confidential and sensitive business information — customer data, contracts,
          banking details, passwords — out of these tools.
        </p>
        <Link
          to="/"
          className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand to-pink px-5 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-brand/30 transition hover:brightness-105"
        >
          Back to dashboard <span aria-hidden>→</span>
        </Link>
      </section>

      <ResponsibleAiNotice />
    </>
  );
}
