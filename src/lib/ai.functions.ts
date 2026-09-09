import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MODEL = "google/gemini-3.8-flash";

const RequestSchema = z.object({
  tool: z.enum(["email", "meeting", "planner", "research"]),
  fields: z.record(z.string()),
});

export type AssistantSection = { heading: string; body: string };
export type AssistantResult = { sections: AssistantSection[] };

const SHARED_RULES = `
You are a careful business assistant for small business owners.
Return ONLY valid JSON, no markdown fences, in this exact shape:
{"sections":[{"heading":"<section name>","body":"<content>"}]}
Rules for "body":
- Plain text. For lists, put each item on its own line prefixed with "- ".
- Never invent facts, names, figures or dates that were not provided. If something is missing, say so plainly.
- Be concise, specific and professional. No filler, no emoji, no markdown symbols other than the "- " list prefix.
`.trim();

function buildPrompt(tool: string, f: Record<string, string>): { system: string; user: string } {
  switch (tool) {
    case "email":
      return {
        system: `${SHARED_RULES}\nYou write business emails. Use exactly these four sections, in order: "Subject", "Greeting", "Email Body", "Closing". Match the requested tone precisely: Formal = respectful and restrained; Friendly = warm and conversational but still professional; Persuasive = confident, benefit-led, with a clear call to action. The Email Body should be 2-3 short paragraphs separated by blank lines.`,
        user: `Purpose of the email: ${f["purpose"]}\nRecipient: ${f["recipient"]}\nImportant information to include: ${f["details"]}\nTone: ${f["tone"]}\nSender name to sign off with: ${f["sender"] || "(not provided — use a neutral sign-off without a name)"}`,
      };
    case "meeting":
      return {
        system: `${SHARED_RULES}\nYou summarize meeting notes. Use exactly these five sections, in order: "Meeting Summary", "Key Discussion Points", "Decisions Made", "Action Items", "Deadlines". "Action Items" must name the owner where the notes state one, formatted as "- Owner — task". "Deadlines" must list dates found in the notes, formatted as "- Date — what is due". If a section has nothing in the notes, write "- None recorded in these notes.".`,
        user: `Meeting title: ${f["title"]}\nDate: ${f["date"]}\nParticipants: ${f["participants"]}\nRaw notes:\n${f["notes"]}`,
      };
    case "planner":
      return {
        system: `${SHARED_RULES}\nYou are a scheduling assistant. Use exactly these five sections, in order: "Prioritised Task Order", "Suggested Schedule", "Deadline Overview", "Why This Order", "Workload Warnings". Rank tasks by urgency (deadline proximity) and importance (priority level). "Prioritised Task Order" lists tasks as "- 1. Task name — priority, due date, estimated time". "Suggested Schedule" groups work into realistic day blocks assuming about 6 focused hours per working day, formatted as "- Day/date: task (time)". "Workload Warnings" flags any deadline that cannot realistically be met, or states "- No conflicts detected.".`,
        user: `Planning window: ${f["window"]}\nTasks:\n${f["tasks"]}`,
      };
    default:
      return {
        system: `${SHARED_RULES}\nYou are a research assistant. Include ONLY the sections the user requested, using these exact headings where requested, in this order: "Topic Summary", "Key Points", "Insights", "Recommendations", "Suggested Research Questions", "Areas for Further Research". Base answers on well-established general knowledge, and say clearly when something is uncertain or would need verifying from a primary source.`,
        user: `Research topic or question: ${f["topic"]}\nSections requested: ${f["sections"]}\nAdditional context: ${f["context"] || "(none provided)"}`,
      };
  }
}

function parseSections(raw: string): AssistantSection[] {
  const cleaned = raw
    .replace(/^\s*```(?:json)?/i, "")
    .replace(/```\s*$/, "")
    .trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  const candidate = start >= 0 && end > start ? cleaned.slice(start, end + 1) : cleaned;

  try {
    const parsed = JSON.parse(candidate) as { sections?: unknown };
    if (Array.isArray(parsed.sections)) {
      const sections = parsed.sections
        .map((s) => s as { heading?: unknown; body?: unknown })
        .filter((s) => typeof s.heading === "string" && typeof s.body === "string")
        .map((s) => ({ heading: String(s.heading), body: String(s.body) }));
      if (sections.length > 0) return sections;
    }
  } catch {
    // fall through to plain-text fallback below
  }

  return [{ heading: "Result", body: cleaned }];
}

async function readStream(response: Response): Promise<string> {
  const reader = response.body?.getReader();
  if (!reader) return "";
  const decoder = new TextDecoder();
  let buffer = "";
  let text = "";

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const payload = trimmed.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;
      try {
        const chunk = JSON.parse(payload) as {
          choices?: Array<{ delta?: { content?: string } }>;
        };
        const delta = chunk.choices?.[0]?.delta?.content;
        if (delta) text += delta;
      } catch {
        // ignore keep-alive / non-JSON frames
      }
    }
  }

  return text;
}

export const runAssistant = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => RequestSchema.parse(input))
  .handler(async ({ data }): Promise<AssistantResult> => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) {
      throw new Error("The AI service is not configured yet. Please try again later.");
    }

    const { system, user } = buildPrompt(data.tool, data.fields);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        stream: true,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      if (response.status === 429) {
        throw new Error("Too many requests right now. Please wait a moment and try again.");
      }
      if (response.status === 402 || response.status === 403) {
        throw new Error(
          "AI usage is currently unavailable for this workspace. Please check your AI credits and try again.",
        );
      }
      throw new Error(
        `The assistant could not complete your request${detail ? ` (${response.status})` : ""}. Please try again.`,
      );
    }

    const text = await readStream(response);
    if (!text.trim()) {
      throw new Error("The assistant returned an empty response. Please try again.");
    }

    return { sections: parseSections(text) };
  });
