import { useEffect, useRef, useState } from "react";
import {
  BarChart3, Bell, Brain, CalendarCheck, CheckCircle2, Clock, Database, Mail, MessageCircle, Play, RotateCcw, UserPlus, Zap,
  type LucideIcon,
} from "lucide-react";
import { Section } from "./Section";
import { Connector, FlowNode, StatusChip, type Status } from "./FlowNode";

const flows = {
  Restaurant: ["Customer sends WhatsApp enquiry", "AI understands request", "Checks booking availability", "Records reservation", "Sends confirmation"],
  "Real Estate": ["Website enquiry", "AI qualifies lead", "Saves customer in CRM", "Notifies property agent", "Sends follow-up", "Schedules viewing"],
  Sales: ["New lead", "AI qualification", "CRM entry", "Personalised email", "Follow-up reminder", "Sales team notified", "Performance report"],
} as const;
type Key = keyof typeof flows;

// Pick an icon from the step's wording.
function iconFor(step: string): LucideIcon {
  const s = step.toLowerCase();
  if (s.includes("whatsapp") || s.includes("enquiry")) return MessageCircle;
  if (s.includes("ai ")) return Brain;
  if (s.includes("crm") || s.includes("record")) return Database;
  if (s.includes("notif")) return Bell;
  if (s.includes("email")) return Mail;
  if (s.includes("follow") || s.includes("reminder")) return Clock;
  if (s.includes("booking") || s.includes("schedul")) return CalendarCheck;
  if (s.includes("confirm")) return CheckCircle2;
  if (s.includes("report")) return BarChart3;
  if (s.includes("lead")) return UserPlus;
  return Zap;
}

const NODE_H = 132;
const DROP = 36;
const ROW_H = NODE_H + DROP + 30; // room for the status chip

export function WorkflowDemo() {
  const [k, setK] = useState<Key>("Restaurant");
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const steps = flows[k];
  const rail = useRef<HTMLDivElement>(null);
  const done = step >= steps.length - 1 && !running && step >= 0;

  useEffect(() => {
    if (!running) return;
    if (step >= steps.length - 1) {
      setRunning(false);
      return;
    }
    const t = setTimeout(() => setStep((s) => s + 1), 900);
    return () => clearTimeout(t);
  }, [running, step, steps.length]);

  // On narrow screens the map scrolls sideways: keep the running step centred in view.
  useEffect(() => {
    const el = rail.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    const node = el.querySelector<HTMLElement>(`[data-step="${Math.max(step, 0)}"]`);
    if (!node) return;
    el.scrollTo({ left: node.offsetLeft - (el.clientWidth - node.offsetWidth) / 2, behavior: step < 0 ? "auto" : "smooth" });
  }, [step, k]);

  const reset = () => {
    setRunning(false);
    setStep(-1);
  };
  const play = () => {
    setStep(-1);
    setRunning(true);
  };

  const statusOf = (i: number): Status => (i < step || done ? "done" : i === step ? "running" : "idle");
  const off = (i: number) => (i % 2 ? DROP : 0);
  const minW = steps.length * 112 + (steps.length - 1) * 32;

  return (
    <Section id="workflows" eyebrow="Live demo" title="Watch a workflow *run itself.*">
      <div className="relative mx-auto max-w-6xl">
        <div className="pointer-events-none absolute inset-x-10 -top-6 bottom-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(40,130,255,0.22),transparent_65%)] blur-2xl" />
        <div className="glass relative overflow-hidden rounded-2xl">
          {/* toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-black/20 px-4 py-4 sm:gap-4 sm:px-5 md:px-8">
            <div>
              <div className="text-sm font-medium">AI workflow map</div>
              <div className="text-xs text-foreground/45">Pick an industry and press play</div>
            </div>
            <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
              {(Object.keys(flows) as Key[]).map((x) => (
                <button
                  key={x}
                  onClick={() => {
                    setK(x);
                    reset();
                  }}
                  className={`rounded-full px-3.5 py-1.5 text-xs transition-all ${
                    k === x
                      ? "bg-[linear-gradient(180deg,#4aa3ff,#2a6be0)] text-white shadow-[0_0_14px_rgba(60,150,255,0.6)]"
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {x}
                </button>
              ))}
            </div>
            <div className="flex w-full gap-2 sm:w-auto">
              <button onClick={play} disabled={running} className="btn-primary flex-1 !py-2.5 disabled:opacity-50 sm:flex-none sm:!py-2">
                <Play className="h-3.5 w-3.5" /> Play
              </button>
              <button onClick={reset} className="btn-ghost flex-1 !py-2.5 sm:flex-none sm:!py-2">
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
            </div>
          </div>

          {/* map */}
          <div ref={rail} className="relative overflow-x-auto overscroll-x-contain px-5 pb-6 pt-8 [scrollbar-width:none] md:px-8">
            <div className="flex" style={{ minWidth: minW, height: ROW_H }}>
              {steps.map((s, i) => {
                const st = statusOf(i);
                return (
                  <div key={s} className="contents">
                    <div data-step={i} className="flex min-w-[112px] flex-1 flex-col" style={{ paddingTop: off(i) }}>
                      <FlowNode
                        icon={iconFor(s)}
                        title={s}
                        value={String(i + 1).padStart(2, "0")}
                        caption={st === "done" ? "Complete" : st === "running" ? "Processing" : "Step"}
                        active={st === "running"}
                        dim={step >= 0 && st === "idle"}
                        className="h-[132px]"
                      />
                      <div className="mt-2.5 flex justify-center">
                        <StatusChip s={st} />
                      </div>
                    </div>
                    {i < steps.length - 1 && (
                      <Connector from={off(i) + NODE_H / 2 + 6} to={off(i + 1) + NODE_H / 2 + 6} lit={i < step || done} h={ROW_H} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="min-h-[60px] px-5 pb-6 md:px-8">
            {done && (
              <div className="flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
                <CheckCircle2 className="h-5 w-5" /> Workflow completed automatically — no manual work required.
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
