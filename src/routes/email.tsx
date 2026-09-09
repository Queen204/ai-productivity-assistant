import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { ToolWorkspace } from "@/components/ToolWorkspace";
import { useAssistant } from "@/lib/use-assistant";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — AI Small Business Assistant" },
      {
        name: "description",
        content:
          "Generate professional business emails with a subject, greeting, body and closing in a formal, friendly or persuasive tone.",
      },
      { property: "og:title", content: "Smart Email Generator — AI Small Business Assistant" },
      {
        property: "og:description",
        content: "Draft a complete business email in seconds, in the tone you choose.",
      },
    ],
  }),
  component: EmailTool,
});

const TONES = ["Formal", "Friendly", "Persuasive"] as const;

function EmailTool() {
  const [purpose, setPurpose] = useState("");
  const [recipient, setRecipient] = useState("");
  const [details, setDetails] = useState("");
  const [sender, setSender] = useState("");
  const [tone, setTone] = useState<(typeof TONES)[number]>("Formal");

  const assistant = useAssistant("email", "Your email is ready");

  const submit = () => {
    if (!purpose.trim() || !recipient.trim()) {
      toast.error("Please add the purpose and the recipient first.");
      return;
    }
    void assistant.generate({ purpose, recipient, details, tone, sender });
  };

  return (
    <ToolWorkspace
      title="Smart Email Generator"
      subtitle="Tell the assistant what the email is for and who it's going to, and get a ready-to-send draft with a subject line, greeting, body and closing."
      icon="✉️"
      accent="brand"
      submitLabel="Generate Email"
      outputLabel="Generated email"
      loadingLabel="Drafting your email…"
      emptyHint="Add the purpose, recipient and key details, then press Generate Email."
      isLoading={assistant.isLoading}
      error={assistant.error}
      sections={assistant.sections}
      canRegenerate={assistant.canRegenerate}
      onSubmit={submit}
      onRegenerate={assistant.regenerate}
      onClear={() => {
        assistant.clear();
        setPurpose("");
        setRecipient("");
        setDetails("");
        setSender("");
        setTone("Formal");
      }}
    >
      <div>
        <label htmlFor="purpose" className="mb-1.5 block text-xs font-bold text-ink/60">
          Purpose of the email
        </label>
        <input
          id="purpose"
          className="field-input"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          placeholder="Follow up on the branding proposal"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="recipient" className="mb-1.5 block text-xs font-bold text-ink/60">
            Recipient
          </label>
          <input
            id="recipient"
            className="field-input"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Jordan Lee, Acme Supplies"
          />
        </div>
        <div>
          <label htmlFor="sender" className="mb-1.5 block text-xs font-bold text-ink/60">
            Your name (optional)
          </label>
          <input
            id="sender"
            className="field-input"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            placeholder="Maya Okafor"
          />
        </div>
      </div>

      <div>
        <span className="mb-1.5 block text-xs font-bold text-ink/60">Tone</span>
        <div className="flex gap-1.5">
          {TONES.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setTone(option)}
              className={`flex-1 rounded-xl py-3 text-xs font-bold transition ${
                tone === option
                  ? "bg-brand text-primary-foreground shadow-lg shadow-brand/25"
                  : "bg-glass/70 text-ink/60 hover:text-ink"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="details" className="mb-1.5 block text-xs font-bold text-ink/60">
          Important information
        </label>
        <textarea
          id="details"
          rows={4}
          className="field-input resize-none"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Proposed timeline, pricing, next steps…"
        />
      </div>
    </ToolWorkspace>
  );
}
