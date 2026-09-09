export type ToolAccent = "brand" | "sky" | "mint" | "amber";

export type NavItem = {
  to: string;
  label: string;
  shortLabel: string;
  icon: string;
};

export const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "Dashboard", shortLabel: "Dashboard", icon: "▦" },
  { to: "/email", label: "Smart Email Generator", shortLabel: "Email", icon: "✉️" },
  { to: "/meetings", label: "Meeting Summarizer", shortLabel: "Notes", icon: "📝" },
  { to: "/planner", label: "AI Task Planner", shortLabel: "Planner", icon: "🗓️" },
  { to: "/research", label: "Research Assistant", shortLabel: "Research", icon: "🔎" },
  { to: "/about", label: "About", shortLabel: "About", icon: "ⓘ" },
];

export const ICON_GRADIENT: Record<ToolAccent, string> = {
  brand: "bg-gradient-to-br from-brand to-sky shadow-brand/25",
  sky: "bg-gradient-to-br from-sky to-mint shadow-sky/25",
  mint: "bg-gradient-to-br from-mint to-amber shadow-mint/25",
  amber: "bg-gradient-to-br from-amber to-pink shadow-amber/25",
};

export const BUTTON_GRADIENT: Record<ToolAccent, string> = {
  brand: "bg-gradient-to-r from-brand to-pink shadow-brand/30",
  sky: "bg-gradient-to-r from-sky to-mint shadow-sky/30",
  mint: "bg-gradient-to-r from-mint to-amber shadow-mint/30",
  amber: "bg-gradient-to-r from-amber to-pink shadow-amber/30",
};

export const TAG_STYLE: Record<ToolAccent, string> = {
  brand: "text-brand-deep bg-brand/10",
  sky: "text-sky-600 bg-sky/10",
  mint: "text-emerald-600 bg-mint/10",
  amber: "text-amber-600 bg-amber/10",
};
