import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { ToolWorkspace } from "@/components/ToolWorkspace";
import { useAssistant } from "@/lib/use-assistant";

export const Route = createFileRoute("/meetings")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — AI Small Business Assistant" },
      {
        name: "description",
        content:
          "Turn long meeting notes into a summary with key discussion points, decisions, action items and deadlines.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer — AI Small Business Assistant" },
      {
        property: "og:description",
        content: "Paste your meeting notes and get decisions, action items and deadlines.",
      },
    ],
  }),
  component: MeetingsTool,
});

function MeetingsTool() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [participants, setParticipants] = useState("");
  const [notes, setNotes] = useState("");

  const assistant = useAssistant("meeting", "Your summary is ready");

  const submit = () => {
    if (notes.trim().length < 40) {
      toast.error("Please paste a bit more of your meeting notes first.");
      return;
    }
    void assistant.generate({
      title: title || "(untitled meeting)",
      date: date || "(not provided)",
      participants: participants || "(not provided)",
      notes,
    });
  };

  return (
    <ToolWorkspace
      title="Meeting Notes Summarizer"
      subtitle="Paste your raw meeting notes and get a clear summary, the decisions that were made, who owns which action, and the deadlines that follow."
      icon="📝"
      accent="sky"
      submitLabel="Summarize Notes"
      outputLabel="Meeting summary"
      loadingLabel="Reading through your notes…"
      emptyHint="Paste your meeting notes and press Summarize Notes."
      isLoading={assistant.isLoading}
      error={assistant.error}
      sections={assistant.sections}
      canRegenerate={assistant.canRegenerate}
      onSubmit={submit}
      onRegenerate={assistant.regenerate}
      onClear={() => {
        assistant.clear();
        setTitle("");
        setDate("");
        setParticipants("");
        setNotes("");
      }}
    >
      <div>
        <label htmlFor="title" className="mb-1.5 block text-xs font-bold text-ink/60">
          Meeting title
        </label>
        <input
          id="title"
          className="field-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Q2 roadmap review"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className="mb-1.5 block text-xs font-bold text-ink/60">
            Date
          </label>
          <input
            id="date"
            type="date"
            className="field-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="participants" className="mb-1.5 block text-xs font-bold text-ink/60">
            Participants
          </label>
          <input
            id="participants"
            className="field-input"
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            placeholder="Dana, Leo, Priya"
          />
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="mb-1.5 block text-xs font-bold text-ink/60">
          Meeting notes
        </label>
        <textarea
          id="notes"
          rows={9}
          className="field-input resize-none"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Paste everything that was discussed — rough notes are fine…"
        />
      </div>
    </ToolWorkspace>
  );
}
