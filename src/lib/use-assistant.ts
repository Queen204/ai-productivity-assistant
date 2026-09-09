import { useServerFn } from "@tanstack/react-start";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

import { runAssistant, type AssistantSection } from "@/lib/ai.functions";

type ToolId = "email" | "meeting" | "planner" | "research";

export function useAssistant(tool: ToolId, successMessage: string) {
  const call = useServerFn(runAssistant);
  const [sections, setSections] = useState<AssistantSection[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastFields = useRef<Record<string, string> | null>(null);

  const generate = useCallback(
    async (fields: Record<string, string>) => {
      lastFields.current = fields;
      setIsLoading(true);
      setError(null);
      try {
        const result = await call({ data: { tool, fields } });
        setSections(result.sections);
        toast.success(successMessage);
      } catch (e) {
        const message =
          e instanceof Error && e.message
            ? e.message
            : "Something went wrong while generating your result. Please try again.";
        setError(message);
        toast.error("Generation failed");
      } finally {
        setIsLoading(false);
      }
    },
    [call, tool, successMessage],
  );

  const regenerate = useCallback(() => {
    if (lastFields.current) void generate(lastFields.current);
  }, [generate]);

  const clear = useCallback(() => {
    setSections(null);
    setError(null);
    lastFields.current = null;
  }, []);

  return { sections, isLoading, error, generate, regenerate, clear, canRegenerate: !!lastFields.current };
}
