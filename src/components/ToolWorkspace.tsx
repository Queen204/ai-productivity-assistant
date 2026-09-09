import { useState, type ReactNode } from "react";
import { toast } from "sonner";

import { ResponsibleAiNotice } from "@/components/ResponsibleAiNotice";
import { BUTTON_GRADIENT, ICON_GRADIENT, type ToolAccent } from "@/lib/nav";
import type { AssistantSection } from "@/lib/ai.functions";

type Props = {
  title: string;
  subtitle: string;
  icon: string;
  accent: ToolAccent;
  submitLabel: string;
  outputLabel: string;
  loadingLabel: string;
  emptyHint: string;
  isLoading: boolean;
  error: string | null;
  sections: AssistantSection[] | null;
  canRegenerate: boolean;
  onSubmit: () => void;
  onRegenerate: () => void;
  onClear: () => void;
  children: ReactNode;
};

function sectionToText(sections: AssistantSection[]) {
  return sections.map((s) => `${s.heading.toUpperCase()}\n${s.body}`).join("\n\n");
}

function SectionBody({ body }: { body: string }) {
  const lines = body.split("\n").filter((l) => l.trim().length > 0);
  const isList = lines.length > 0 && lines.every((l) => l.trim().startsWith("- "));

  if (isList) {
    return (
      <ul className="mt-1.5 space-y-1.5">
        {lines.map((line, i) => (
          <li key={i} className="flex gap-2 text-sm leading-relaxed text-ink/75">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand/50" />
            <span>{line.replace(/^\s*-\s*/, "")}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="mt-1.5 space-y-2">
      {lines.map((line, i) => (
        <p key={i} className="text-sm leading-relaxed text-ink/75">
          {line.replace(/^\s*-\s*/, "")}
        </p>
      ))}
    </div>
  );
}

export function ToolWorkspace(props: Props) {
  const {
    title,
    subtitle,
    icon,
    accent,
    submitLabel,
    outputLabel,
    loadingLabel,
    emptyHint,
    isLoading,
    error,
    sections,
    canRegenerate,
    onSubmit,
    onRegenerate,
    onClear,
    children,
  } = props;
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!sections) return;
    try {
      await navigator.clipboard.writeText(sectionToText(sections));
      setCopied(true);
      toast.success("Copied to your clipboard");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Your browser blocked copying. Please select the text manually.");
    }
  };

  return (
    <>
      <div className="mb-7">
        <h1 className="mt-1.5 font-display text-3xl font-semibold lg:text-4xl">{title}</h1>
        <p className="mt-2 max-w-[60ch] text-sm text-ink/60">{subtitle}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <form
          className="glass-card p-6 lg:col-span-2"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className={`grid size-11 place-items-center rounded-2xl text-xl shadow-lg ${ICON_GRADIENT[accent]}`}
            >
              {icon}
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold">Your details</h2>
              <p className="text-xs text-ink/50">Fill this in, then generate</p>
            </div>
          </div>

          <div className="mt-5 space-y-3">{children}</div>

          <button
            type="submit"
            disabled={isLoading}
            className={`mt-5 w-full rounded-2xl py-3.5 text-sm font-bold text-primary-foreground shadow-lg transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60 ${BUTTON_GRADIENT[accent]}`}
          >
            {isLoading ? "Working…" : `✨ ${submitLabel}`}
          </button>
        </form>

        <div className="glass-card flex flex-col p-6 lg:col-span-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-bold text-ink/70">{outputLabel}</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={copy}
                disabled={!sections}
                className="rounded-xl bg-glass/70 px-3 py-2 text-xs font-bold text-ink/60 ring-1 ring-glass/70 transition hover:text-ink disabled:opacity-40"
              >
                {copied ? "Copied" : "Copy"}
              </button>
              <button
                type="button"
                onClick={onRegenerate}
                disabled={!canRegenerate || isLoading}
                className="rounded-xl bg-glass/70 px-3 py-2 text-xs font-bold text-ink/60 ring-1 ring-glass/70 transition hover:text-ink disabled:opacity-40"
              >
                Regenerate
              </button>
              <button
                type="button"
                onClick={onClear}
                disabled={isLoading || (!sections && !error)}
                className="rounded-xl bg-glass/70 px-3 py-2 text-xs font-bold text-ink/60 ring-1 ring-glass/70 transition hover:text-ink disabled:opacity-40"
              >
                Clear
              </button>
            </div>
          </div>

          {isLoading && (
            <>
              <div className="mt-4 flex items-center gap-3 rounded-2xl bg-mint/10 px-4 py-3 ring-1 ring-mint/20">
                <span className="spin size-5 rounded-full border-2 border-mint border-t-transparent" />
                <span className="text-sm font-semibold text-emerald-700">{loadingLabel}</span>
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-3 w-1/3 rounded-full bg-brand/25" />
                <div className="h-3 w-full rounded-full bg-ink/10" />
                <div className="h-3 w-11/12 rounded-full bg-ink/10" />
                <div className="h-3 w-4/5 rounded-full bg-ink/10" />
                <div className="mt-3 h-3 w-2/3 rounded-full bg-pink/20" />
                <div className="h-3 w-2/3 rounded-full bg-ink/10" />
                <div className="h-3 w-1/2 rounded-full bg-ink/10" />
              </div>
            </>
          )}

          {!isLoading && error && (
            <div className="mt-4 rounded-2xl bg-destructive/10 px-4 py-4 ring-1 ring-destructive/25">
              <p className="text-sm font-bold text-destructive">We couldn't finish that</p>
              <p className="mt-1 text-sm leading-relaxed text-ink/70">{error}</p>
              <button
                type="button"
                onClick={onRegenerate}
                disabled={!canRegenerate}
                className="mt-3 rounded-xl bg-glass/80 px-3 py-2 text-xs font-bold text-ink/70 ring-1 ring-glass/70 disabled:opacity-40"
              >
                Try again
              </button>
            </div>
          )}

          {!isLoading && !error && !sections && (
            <div className="mt-4 flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-ink/15 px-6 py-14 text-center">
              <div className="grid size-12 place-items-center rounded-2xl bg-glass/70 text-2xl">
                {icon}
              </div>
              <p className="mt-3 text-sm font-bold text-ink/70">Nothing here yet</p>
              <p className="mt-1 max-w-[40ch] text-sm text-ink/50">{emptyHint}</p>
            </div>
          )}

          {!isLoading && sections && (
            <div className="rise-in mt-4 space-y-5">
              {sections.map((section, i) => (
                <div key={i}>
                  <p className="text-[11px] font-bold tracking-[0.14em] text-brand-deep uppercase">
                    {section.heading}
                  </p>
                  <SectionBody body={section.body} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ResponsibleAiNotice />
    </>
  );
}
