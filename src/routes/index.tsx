import { createFileRoute, Link } from "@tanstack/react-router";

import { ResponsibleAiNotice } from "@/components/ResponsibleAiNotice";
import { BUTTON_GRADIENT, ICON_GRADIENT, TAG_STYLE, type ToolAccent } from "@/lib/nav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Small Business Assistant — Dashboard" },
      {
        name: "description",
        content:
          "Write emails, summarise meetings, plan tasks and research topics with four AI tools built for small businesses.",
      },
      { property: "og:title", content: "AI Small Business Assistant — Dashboard" },
      {
        property: "og:description",
        content:
          "Four AI tools for small businesses: email drafting, meeting summaries, task planning and research.",
      },
    ],
  }),
  component: Dashboard,
});

const TOOLS: Array<{
  to: string;
  tag: string;
  icon: string;
  accent: ToolAccent;
  title: string;
  description: string;
}> = [
  {
    to: "/email",
    tag: "Communication",
    icon: "✉️",
    accent: "brand",
    title: "Smart Email Generator",
    description:
      "Draft polished client emails in seconds with a tone you choose — formal, friendly or persuasive.",
  },
  {
    to: "/meetings",
    tag: "Meetings",
    icon: "📝",
    accent: "sky",
    title: "Meeting Notes Summarizer",
    description:
      "Turn long note dumps into summaries, decisions, action items and deadlines at a glance.",
  },
  {
    to: "/planner",
    tag: "Productivity",
    icon: "🗓️",
    accent: "mint",
    title: "AI Task Planner",
    description:
      "Drop in tasks and deadlines — get a prioritised daily schedule in the best working order.",
  },
  {
    to: "/research",
    tag: "Research",
    icon: "🔎",
    accent: "amber",
    title: "AI Research Assistant",
    description:
      "Get topic summaries, insights and recommendations to back up smarter business decisions.",
  },
];

function Dashboard() {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <>
      <div className="mb-7">
        <div className="flex items-center gap-2 text-xs font-medium text-ink/50">
          <span className="inline-block size-2 rounded-full bg-mint" />
          {today}
        </div>
        <h1 className="mt-1.5 font-display text-3xl font-semibold lg:text-4xl">
          Welcome to AI Small Business Assistant
        </h1>
        <p className="mt-2 max-w-[60ch] text-sm text-ink/60">
          Four practical AI tools that save you time on writing, meetings, planning and research.
          Pick one to get started.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {TOOLS.map((tool) => (
          <div
            key={tool.to}
            className="glass-card p-6 transition hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <div
                className={`grid size-12 place-items-center rounded-2xl text-2xl shadow-lg ${ICON_GRADIENT[tool.accent]}`}
              >
                {tool.icon}
              </div>
              <span
                className={`rounded-full px-3 py-1 text-[11px] font-bold ${TAG_STYLE[tool.accent]}`}
              >
                {tool.tag}
              </span>
            </div>
            <h2 className="mt-4 font-display text-xl font-semibold">{tool.title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{tool.description}</p>
            <Link
              to={tool.to}
              className={`mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold text-primary-foreground shadow-lg transition hover:brightness-105 ${BUTTON_GRADIENT[tool.accent]}`}
            >
              Open Tool <span aria-hidden>→</span>
            </Link>
          </div>
        ))}
      </div>

      <ResponsibleAiNotice />
    </>
  );
}
