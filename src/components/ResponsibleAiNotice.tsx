export function ResponsibleAiNotice() {
  return (
    <div className="mt-5 flex items-start gap-3 rounded-3xl bg-amber/10 p-4 ring-1 ring-amber/25 backdrop-blur-xl">
      <span className="mt-0.5 text-xl">⚠️</span>
      <p className="text-xs leading-relaxed text-ink/70">
        <span className="font-bold text-amber-700">Responsible AI Notice:</span> AI-generated
        information may contain errors or inaccuracies. Users should review and verify important
        information before making business decisions or relying on AI-generated content. Please avoid
        entering confidential or sensitive business information.
      </p>
    </div>
  );
}
