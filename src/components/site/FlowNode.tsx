import type { LucideIcon } from "lucide-react";

export type Status = "running" | "optimised" | "waiting" | "delayed" | "done" | "idle";

const CHIP: Record<Status, { label: string; cls: string }> = {
  running: { label: "Running", cls: "border-sky-400/30 bg-sky-400/10 text-sky-300" },
  optimised: { label: "Optimised", cls: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" },
  waiting: { label: "At risk", cls: "border-amber-400/30 bg-amber-400/10 text-amber-300" },
  delayed: { label: "Delayed", cls: "border-rose-400/30 bg-rose-400/10 text-rose-300" },
  done: { label: "Done", cls: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" },
  idle: { label: "Queued", cls: "border-white/10 bg-white/5 text-foreground/50" },
};

export function StatusChip({ s, label }: { s: Status; label?: string | undefined }) {
  const c = CHIP[s];
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-medium ${c.cls}`}>
      <span className="h-1 w-1 rounded-full bg-current" />
      {label ?? c.label}
    </span>
  );
}

// A folder-shaped card: a tab on the top-left, an icon, a big figure and a caption.
// `active` lifts it and fills it with the brand gradient.
export function FlowNode({
  icon: Icon,
  title,
  value,
  caption,
  active,
  dim,
  className = "",
}: {
  icon: LucideIcon;
  title: string;
  value?: string | undefined;
  caption?: string | undefined;
  active?: boolean | undefined;
  dim?: boolean | undefined;
  className?: string | undefined;
}) {
  const body = active
    ? "border-sky-300/40 bg-[linear-gradient(160deg,#3a8dff_0%,#1c5fd6_55%,#123b9a_100%)] shadow-[0_18px_50px_-12px_rgba(40,140,255,0.75)]"
    : "border-white/10 bg-[linear-gradient(160deg,rgba(60,90,160,0.35),rgba(20,30,70,0.55))]";
  const tab = active ? "bg-[#3a8dff] border-sky-300/40" : "bg-[rgba(48,74,140,0.45)] border-white/10";
  return (
    <div className={`relative pt-3 transition-all duration-500 ${active ? "-translate-y-2" : ""} ${dim ? "opacity-55" : ""} ${className}`}>
      <div className={`absolute left-0 top-0 h-4 w-[46%] rounded-t-lg border border-b-0 backdrop-blur-md ${tab}`} />
      <div className={`relative flex h-full flex-col rounded-xl rounded-tl-none border p-3.5 backdrop-blur-md ${body}`}>
        <div className="flex items-start justify-between">
          <Icon className={`h-4 w-4 ${active ? "text-white" : "text-sky-300"}`} strokeWidth={1.75} />
          <span className={`h-5 w-5 rounded-full border ${active ? "border-white/50 bg-white/20" : "border-white/15 bg-white/5"} grid place-items-center`}>
            <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-white" : "bg-sky-300/70"}`} />
          </span>
        </div>
        <div className={`mt-2 line-clamp-2 text-[13px] leading-tight ${active ? "text-white" : "text-foreground/85"}`}>{title}</div>
        {(value || caption) && (
          <div className="mt-auto flex items-end justify-between gap-2 pt-1.5">
            {value && <span className={`text-[22px] font-light leading-none tracking-tight ${active ? "text-white" : ""}`}>{value}</span>}
            {caption && <span className={`text-[10px] ${active ? "text-white/80" : "text-foreground/45"}`}>{caption}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

// Curved connector between two nodes sitting at different heights.
export function Connector({ from, to, lit, h = 150 }: { from: number; to: number; lit?: boolean; h?: number }) {
  return (
    <svg className="w-7 shrink-0 self-stretch md:w-8" viewBox={`0 0 40 ${h}`} preserveAspectRatio="none" aria-hidden>
      <path
        d={`M0,${from} C20,${from} 20,${to} 40,${to}`}
        fill="none"
        stroke={lit ? "#5cc4ff" : "rgba(255,255,255,0.18)"}
        strokeWidth={lit ? 1.75 : 1.25}
        strokeDasharray={lit ? undefined : "3 4"}
        vectorEffect="non-scaling-stroke"
        className="transition-all duration-500"
      />
    </svg>
  );
}
