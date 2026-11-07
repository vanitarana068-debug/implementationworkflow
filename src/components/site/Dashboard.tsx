import {
  AlertTriangle, Bell, Bot, Brain, CalendarCheck, CheckCircle2, Clock, Gauge, LayoutGrid, Lightbulb, LogOut,
  Network, Plus, Search, Settings, ShieldAlert, Sparkles, UserCheck, Workflow, Zap,
} from "lucide-react";
import { Section } from "./Section";
import { Connector, FlowNode, StatusChip, type Status } from "./FlowNode";
import { BrandLockup } from "./Logo";
import { BRAND } from "@/lib/site";

const KPIS = [
  { i: Workflow, l: "Active workflows", v: "128" },
  { i: Gauge, l: "Success rate", v: "92%" },
  { i: Clock, l: "Pending approvals", v: "18" },
  { i: AlertTriangle, l: "Failed tasks", v: "07" },
];

const MAP = [
  { i: UserCheck, t: "New request", v: "24", c: "Incoming", s: "running" as Status },
  { i: Brain, t: "AI classification", v: "22", c: "Auto-sorted", s: "optimised" as Status },
  { i: ShieldAlert, t: "Risk detection", v: "18", c: "Analysing", s: "running" as Status, active: true },
  { i: Bot, t: "Human follow-up", v: "08", c: "Escalated", s: "waiting" as Status },
  { i: CalendarCheck, t: "Scheduling", v: "06", c: "Booked", s: "delayed" as Status },
  { i: Zap, t: "Execution", v: "12", c: "Completed", s: "running" as Status },
];
const OFF = [0, 36, 0, 36, 0, 36]; // zig-zag heights
const NODE_H = 132;
const ROW_H = NODE_H + 36 + 30; // room for the status chip under the lower nodes

const ACTIVE = [
  { t: "Customer onboarding", p: 65, s: "running" as Status },
  { t: "Invoice generation", p: 42, s: "running" as Status },
  { t: "Support ticket routing", p: 80, s: "waiting" as Status },
];

const APPROVALS = [
  { r: "Refund approval", d: "Finance", risk: "Medium", w: "2h 5m" },
  { r: "Contract validation", d: "Legal", risk: "High", w: "4h 20m" },
  { r: "Price change request", d: "Sales", risk: "Low", w: "38m" },
  { r: "Budget allocation", d: "Operations", risk: "High", w: "3h 15m" },
];
const RISK: Record<string, string> = {
  High: "border-rose-400/30 bg-rose-400/10 text-rose-300",
  Medium: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  Low: "border-sky-400/30 bg-sky-400/10 text-sky-300",
};

const RECS = [
  { i: AlertTriangle, t: "Billing workflow is taking 24% longer than usual", lvl: "High" },
  { i: Lightbulb, t: "12 support tickets can be auto-routed to the priority queue", lvl: "Medium" },
  { i: Sparkles, t: "Document validation flow has repeated errors in step 3", lvl: "Low" },
];

function Panel({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.03] p-4 ${className}`}>
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-medium">{title}</div>
        <span className="grid h-6 w-6 place-items-center rounded-full border border-white/10 text-foreground/50">
          <Plus className="h-3 w-3 rotate-45" />
        </span>
      </div>
      {children}
    </div>
  );
}

export function Dashboard() {
  return (
    <Section
      id="platform"
      eyebrow="The platform"
      title="Your whole operation, *on one screen.*"
      sub="One command centre for every agent, workflow and approval — live, visible and in your control."
    >
      <div className="relative mx-auto max-w-6xl [perspective:2000px]">
        {/* glow behind the screen */}
        <div className="pointer-events-none absolute -inset-x-10 top-10 bottom-0 rounded-[40px] bg-[radial-gradient(ellipse_at_50%_40%,rgba(40,130,255,0.35),transparent_65%)] blur-2xl" />

        {/* the screen */}
        <div className="relative origin-top rounded-[22px] border border-white/15 bg-[#040a1f] p-1.5 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] transition-transform duration-700 md:[transform:rotateX(6deg)] md:hover:[transform:rotateX(0deg)]">
          <div className="relative overflow-hidden rounded-2xl bg-[radial-gradient(ellipse_70%_50%_at_30%_0%,rgba(40,110,255,0.28),transparent),radial-gradient(ellipse_50%_40%_at_90%_100%,rgba(30,160,255,0.15),transparent)] p-3.5 sm:p-4 md:p-6">
            {/* light streak like the hero */}
            <div className="pointer-events-none absolute left-[22%] top-0 h-40 w-32 bg-[repeating-linear-gradient(90deg,rgba(120,200,255,0.25)_0_2px,transparent_2px_7px)] opacity-60 blur-[2px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />

            <div className="relative flex gap-4">
              {/* sidebar */}
              <div className="hidden flex-col items-center gap-3 pt-16 md:flex">
                {[LayoutGrid, Network, CheckCircle2, Workflow, Sparkles, Settings, LogOut].map((I, n) => (
                  <span
                    key={n}
                    className={`grid h-9 w-9 place-items-center rounded-full border ${n === 4 ? "border-sky-300/40 bg-sky-500/20 text-sky-200 shadow-[0_0_16px_rgba(60,160,255,0.5)]" : "border-white/10 bg-white/[0.03] text-foreground/55"}`}
                  >
                    <I className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                ))}
              </div>

              <div className="min-w-0 flex-1">
                {/* top bar */}
                <div className="flex flex-wrap items-center gap-3">
                  <BrandLockup markClass="h-5" textClass="text-sm tracking-[0.2em]" />
                  <div className="ml-2 hidden flex-1 items-center justify-between rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-foreground/40 lg:flex lg:max-w-xs">
                    Search <Search className="h-3.5 w-3.5" />
                  </div>
                  <div className="ml-auto flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 text-[11px]">
                    <span className="rounded-full bg-[linear-gradient(180deg,#4aa3ff,#2a6be0)] px-3 py-1 text-white shadow-[0_0_14px_rgba(60,150,255,0.6)]">Today</span>
                    <span className="px-3 py-1 text-foreground/55">7 days</span>
                    <span className="hidden px-3 py-1 text-foreground/55 sm:inline">30 days</span>
                  </div>
                  <span className="hidden h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-foreground/60 sm:grid">
                    <Bell className="h-3.5 w-3.5" />
                  </span>
                </div>

                {/* heading + KPIs */}
                <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <div className="text-[26px] font-light tracking-tight sm:text-3xl md:text-4xl">Automation center</div>
                    <div className="mt-1 text-xs text-foreground/50">Monitor workflows, approvals and AI recommendations in real time</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {KPIS.map(({ i: I, l, v }) => (
                      <div key={l} className="min-w-[92px] rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
                        <div className="flex items-center gap-1.5 text-[10px] leading-tight text-foreground/50">
                          <I className="h-3 w-3 shrink-0" /> {l}
                        </div>
                        <div className="mt-1.5 text-xl font-light">{v}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* workflow map */}
                <div className="mt-7 flex items-center justify-between">
                  <div className="text-sm text-foreground/80">AI workflow map</div>
                  <div className="hidden items-center gap-1.5 sm:flex">
                    <StatusChip s="running" />
                    <StatusChip s="optimised" />
                    <StatusChip s="waiting" />
                    <StatusChip s="delayed" />
                  </div>
                </div>
                <div className="-mx-1 mt-3 overflow-x-auto px-1 pb-3 pt-2 [scrollbar-width:none]">
                  <div className="flex min-w-[860px]" style={{ height: ROW_H }}>
                    {MAP.map((m, n) => (
                      <div key={m.t} className="contents">
                        <div className="flex w-[140px] shrink-0 flex-col" style={{ paddingTop: OFF[n] }}>
                          <FlowNode icon={m.i} title={m.t} value={m.v} caption={m.c} active={m.active} className="h-[132px]" />
                          <div className="mt-2 flex justify-center">
                            <StatusChip s={m.s} />
                          </div>
                        </div>
                        {n < MAP.length - 1 && (
                          <Connector from={OFF[n]! + NODE_H / 2 + 6} to={OFF[n + 1]! + NODE_H / 2 + 6} lit={n < 2} h={ROW_H} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* bottom panels */}
                <div className="mt-8 grid gap-3 lg:grid-cols-[1fr_1.35fr_1fr]">
                  <Panel title="Active workflows">
                    <div className="space-y-4">
                      {ACTIVE.map((a) => (
                        <div key={a.t}>
                          <div className="flex items-center justify-between gap-2 text-xs">
                            <span className="text-foreground/80">{a.t}</span>
                            <StatusChip s={a.s} label={a.s === "waiting" ? "Warning" : undefined} />
                            <span className="ml-auto font-mono text-foreground/60">{a.p}%</span>
                          </div>
                          <div className="mt-2 h-1 rounded-full bg-white/5">
                            <div className="h-full rounded-full bg-[linear-gradient(90deg,#2a6be0,#5cc4ff)] shadow-[0_0_10px_rgba(92,196,255,0.6)]" style={{ width: `${a.p}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Panel>

                  <Panel title="Pending approvals">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="text-[10px] text-foreground/40">
                          <tr>
                            <th className="pb-2 font-normal">Request</th>
                            <th className="hidden pb-2 font-normal sm:table-cell">Team</th>
                            <th className="pb-2 font-normal">Risk</th>
                            <th className="pb-2 text-right font-normal">Waiting</th>
                          </tr>
                        </thead>
                        <tbody className="text-foreground/80">
                          {APPROVALS.map((a) => (
                            <tr key={a.r} className="border-t border-white/5">
                              <td className="py-2">{a.r}</td>
                              <td className="hidden py-2 text-foreground/55 sm:table-cell">{a.d}</td>
                              <td className="py-2">
                                <span className={`rounded-md border px-1.5 py-0.5 text-[10px] ${RISK[a.risk]}`}>{a.risk}</span>
                              </td>
                              <td className="py-2 text-right font-mono text-foreground/55">{a.w}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Panel>

                  <Panel title="AI recommendations">
                    <div className="space-y-3">
                      {RECS.map(({ i: I, t, lvl }) => (
                        <div key={t} className="flex items-start gap-3">
                          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-sky-300">
                            <I className="h-3.5 w-3.5" />
                          </span>
                          <span className="flex-1 text-xs leading-snug text-foreground/75">{t}</span>
                          <span className={`rounded-md border px-1.5 py-0.5 text-[10px] ${RISK[lvl]}`}>{lvl}</span>
                        </div>
                      ))}
                    </div>
                  </Panel>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">Illustrative dashboard preview — every Aurevix build is tailored to your workflows.</p>
      </div>
    </Section>
  );
}
