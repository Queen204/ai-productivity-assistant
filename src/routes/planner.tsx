import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { ToolWorkspace } from "@/components/ToolWorkspace";
import { useAssistant } from "@/lib/use-assistant";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — AI Small Business Assistant" },
      {
        name: "description",
        content:
          "Add your tasks, deadlines, priorities and estimated time, and get a prioritised daily or weekly schedule.",
      },
      { property: "og:title", content: "AI Task Planner — AI Small Business Assistant" },
      {
        property: "og:description",
        content: "Turn a messy task list into a realistic, prioritised schedule.",
      },
    ],
  }),
  component: PlannerTool,
});

type Task = {
  id: number;
  name: string;
  deadline: string;
  priority: "High" | "Medium" | "Low";
  estimate: string;
};

const PRIORITIES = ["High", "Medium", "Low"] as const;

let nextId = 2;

function PlannerTool() {
  const [window, setWindow] = useState("This week");
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: "", deadline: "", priority: "Medium", estimate: "" },
  ]);

  const assistant = useAssistant("planner", "Your schedule is ready");

  const update = (id: number, patch: Partial<Task>) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));

  const submit = () => {
    const filled = tasks.filter((t) => t.name.trim().length > 0);
    if (filled.length === 0) {
      toast.error("Please add at least one task with a name.");
      return;
    }
    const list = filled
      .map(
        (t) =>
          `- ${t.name} | deadline: ${t.deadline || "not set"} | priority: ${t.priority} | estimated time: ${t.estimate || "not given"}`,
      )
      .join("\n");
    void assistant.generate({ window, tasks: list });
  };

  return (
    <ToolWorkspace
      title="AI Task Planner"
      subtitle="List what you need to get done with deadlines, priorities and rough time estimates. The assistant orders the work and builds a schedule you can actually follow."
      icon="🗓️"
      accent="mint"
      submitLabel="Create My Schedule"
      outputLabel="Your schedule"
      loadingLabel="Prioritising your tasks…"
      emptyHint="Add a few tasks with deadlines and priorities, then press Create My Schedule."
      isLoading={assistant.isLoading}
      error={assistant.error}
      sections={assistant.sections}
      canRegenerate={assistant.canRegenerate}
      onSubmit={submit}
      onRegenerate={assistant.regenerate}
      onClear={() => {
        assistant.clear();
        setWindow("This week");
        setTasks([{ id: nextId++, name: "", deadline: "", priority: "Medium", estimate: "" }]);
      }}
    >
      <div>
        <span className="mb-1.5 block text-xs font-bold text-ink/60">Planning window</span>
        <div className="flex gap-1.5">
          {["Today", "This week"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setWindow(option)}
              className={`flex-1 rounded-xl py-3 text-xs font-bold transition ${
                window === option
                  ? "bg-mint text-primary-foreground shadow-lg shadow-mint/25"
                  : "bg-glass/70 text-ink/60 hover:text-ink"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {tasks.map((task, index) => (
        <div key={task.id} className="rounded-2xl bg-glass/50 p-3.5 ring-1 ring-glass/70">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-[0.14em] text-ink/40 uppercase">
              Task {index + 1}
            </span>
            {tasks.length > 1 && (
              <button
                type="button"
                onClick={() => setTasks((prev) => prev.filter((t) => t.id !== task.id))}
                className="text-[11px] font-bold text-ink/40 transition hover:text-destructive"
              >
                Remove
              </button>
            )}
          </div>

          <input
            className="field-input"
            value={task.name}
            onChange={(e) => update(task.id, { name: e.target.value })}
            placeholder="Task name, e.g. Send the client invoice"
            aria-label={`Task ${index + 1} name`}
          />

          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <input
              type="date"
              className="field-input"
              value={task.deadline}
              onChange={(e) => update(task.id, { deadline: e.target.value })}
              aria-label={`Task ${index + 1} deadline`}
            />
            <input
              className="field-input"
              value={task.estimate}
              onChange={(e) => update(task.id, { estimate: e.target.value })}
              placeholder="Estimated time, e.g. 2 hours"
              aria-label={`Task ${index + 1} estimated time`}
            />
          </div>

          <div className="mt-2 flex gap-1.5">
            {PRIORITIES.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => update(task.id, { priority: option })}
                className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition ${
                  task.priority === option
                    ? "bg-brand text-primary-foreground shadow-lg shadow-brand/25"
                    : "bg-glass/70 text-ink/60 hover:text-ink"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          setTasks((prev) => [
            ...prev,
            { id: nextId++, name: "", deadline: "", priority: "Medium", estimate: "" },
          ])
        }
        className="w-full rounded-2xl bg-brand/10 py-3 text-xs font-bold text-brand-deep transition hover:bg-brand/20"
      >
        + Add another task
      </button>
    </ToolWorkspace>
  );
}
