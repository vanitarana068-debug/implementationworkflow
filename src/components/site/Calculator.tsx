import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { ASSUMPTIONS, calculate, type CalcInput } from "@/lib/site";
import { Section } from "./Section";

const fields: { k: keyof CalcInput; l: string; min: number; max: number; step: number; fmt?: (n: number) => string }[] = [
  { k: "employees", l: "Number of employees", min: 1, max: 100, step: 1 },
  { k: "salary", l: "Average monthly salary ($)", min: 300, max: 10000, step: 100, fmt: (n) => `$${n.toLocaleString()}` },
  { k: "repetitiveHours", l: "Repetitive hours / employee / day", min: 0, max: 8, step: 0.5, fmt: (n) => `${n}h` },
  { k: "enquiries", l: "Monthly customer enquiries", min: 0, max: 2000, step: 10 },
  { k: "missedPct", l: "Estimated missed enquiries", min: 0, max: 60, step: 1, fmt: (n) => `${n}%` },
  { k: "customerValue", l: "Average value per customer ($)", min: 10, max: 5000, step: 10, fmt: (n) => `$${n.toLocaleString()}` },
];

const money = (n: number) => `$${Math.round(n).toLocaleString()}`;

export function Calculator() {
  const [v, setV] = useState<CalcInput>({ employees: 8, salary: 2000, repetitiveHours: 2, enquiries: 300, missedPct: 20, customerValue: 150 });
  const r = calculate(v);
  const max = Math.max(r.costSavings, r.extraRevenue, 1);

  return (
    <Section id="calculator" eyebrow="Calculator" title="See what automation is *worth to you.*" alt>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass space-y-7 rounded-2xl p-8">
          {fields.map((f) => (
            <div key={f.k}>
              <div className="mb-3 flex justify-between text-sm">
                <span className="text-foreground/75">{f.l}</span>
                <span className="font-mono font-medium text-primary">{f.fmt ? f.fmt(v[f.k]) : v[f.k]}</span>
              </div>
              <Slider min={f.min} max={f.max} step={f.step} value={[v[f.k]]} onValueChange={([n]) => setV({ ...v, [f.k]: n })} />
            </div>
          ))}
        </div>
        <div className="glass flex flex-col rounded-2xl p-8">
          <div className="label-mono text-foreground/60">Estimated annual value</div>
          <div className="mt-3 text-5xl font-normal tracking-tight md:text-6xl">{money(r.annual)}</div>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {[
              ["Repetitive hours / month", `${Math.round(r.repetitiveMonthly)}h`],
              ["Potential hours saved", `${Math.round(r.hoursSaved)}h`],
              ["Monthly cost savings", money(r.costSavings)],
              ["Extra sales / month", r.extraSales.toFixed(1)],
            ].map(([l, x]) => (
              <div key={l} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="text-2xl font-normal">{x}</div>
                <div className="label-mono mt-1 text-foreground/50">{l}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 space-y-4">
            {[["Labour time value", r.costSavings, "bg-primary"], ["Recovered sales", r.extraRevenue, "bg-electric"]].map(([l, n, c]) => (
              <div key={l as string}>
                <div className="mb-1.5 flex justify-between text-xs"><span className="text-muted-foreground">{l as string} / month</span><span className="font-mono">{money(n as number)}</span></div>
                <div className="h-1.5 rounded-full bg-white/5"><div className={`h-full rounded-full ${c} transition-all duration-500`} style={{ width: `${((n as number) / max) * 100}%` }} /></div>
              </div>
            ))}
          </div>
          <p className="mt-auto pt-8 text-xs leading-relaxed text-muted-foreground">
            Estimates only, not guaranteed savings. Assumes {ASSUMPTIONS.automationRate * 100}% of repetitive hours can be automated, {ASSUMPTIONS.workDays} working days/month, {ASSUMPTIONS.recoveryRate * 100}% of missed enquiries recovered and {ASSUMPTIONS.conversionRate * 100}% of those converting. Saved hours represent time value, not necessarily direct cash savings.
          </p>
        </div>
      </div>
    </Section>
  );
}
