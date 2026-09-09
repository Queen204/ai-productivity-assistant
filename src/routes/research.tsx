import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { ToolWorkspace } from "@/components/ToolWorkspace";
import { useAssistant } from "@/lib/use-assistant";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — AI Small Business Assistant" },
      {
        name: "description",
        content:
          "Research any business topic and get a summary, key points, insights, recommendations and suggested research questions.",
      },
      { property: "og:title", content: "AI Research Assistant — AI Small Business Assistant" },
      {
        property: "og:description",
        content: "Summaries, insights and recommendations to support smarter business decisions.",
      },
    ],
  }),
  component: ResearchTool,
});

const OPTIONS = [
  "Summary",
  "Key points",
  "Insights",
  "Recommendations",
  "Research questions",
  "Areas for further research",
] as const;

function ResearchTool() {
  const [topic, setTopic] = useState("");
  const [context, setContext] = useState("");
  const [selected, setSelected] = useState<string[]>([...OPTIONS]);

  const assistant = useAssistant("research", "Your research brief is ready");

  const toggle = (option: string) =>
    setSelected((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option],
    );

  const submit = () => {
    if (!topic.trim()) {
      toast.error("Please enter a research topic or question first.");
      return;
    }
    if (selected.length === 0) {
      toast.error("Please choose at least one section to include.");
      return;
    }
    void assistant.generate({ topic, context, sections: selected.join(", ") });
  };

  return (
    <ToolWorkspace
      title="AI Research Assistant"
      subtitle="Enter a topic or a question and choose what you want back — a summary, the key points, insights, recommendations or questions worth exploring further."
      icon="🔎"
      accent="amber"
      submitLabel="Research Topic"
      outputLabel="Research brief"
      loadingLabel="Researching your topic…"
      emptyHint="Enter a topic or question, choose your sections, then press Research Topic."
      isLoading={assistant.isLoading}
      error={assistant.error}
      sections={assistant.sections}
      canRegenerate={assistant.canRegenerate}
      onSubmit={submit}
      onRegenerate={assistant.regenerate}
      onClear={() => {
        assistant.clear();
        setTopic("");
        setContext("");
        setSelected([...OPTIONS]);
      }}
    >
      <div>
        <label htmlFor="topic" className="mb-1.5 block text-xs font-bold text-ink/60">
          Research topic or question
        </label>
        <input
          id="topic"
          className="field-input"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="How do small cafés build repeat customers?"
        />
      </div>

      <div>
        <span className="mb-1.5 block text-xs font-bold text-ink/60">Include in the output</span>
        <div className="flex flex-wrap gap-1.5">
          {OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={selected.includes(option)}
              onClick={() => toggle(option)}
              className={`rounded-xl px-3 py-2.5 text-xs font-bold transition ${
                selected.includes(option)
                  ? "bg-amber text-primary-foreground shadow-lg shadow-amber/25"
                  : "bg-glass/70 text-ink/60 hover:text-ink"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="context" className="mb-1.5 block text-xs font-bold text-ink/60">
          Extra context (optional)
        </label>
        <textarea
          id="context"
          rows={4}
          className="field-input resize-none"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Your industry, location, size of business, what you've already tried…"
        />
      </div>
    </ToolWorkspace>
  );
}
