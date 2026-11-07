// Figures here come from the site's own content (FAQ timelines, solution and industry lists).
const STATS = [
  { v: "24/7", l: "AI agents that never clock out" },
  { v: "1–2", u: "weeks", l: "From kickoff to your first live workflow" },
  { v: "6", l: "Core AI solutions in one connected system" },
  { v: "10+", l: "Industries with ready-made playbooks" },
];

export function Stats() {
  return (
    <section className="px-6 pt-20">
      <div data-reveal-stagger className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 md:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={s.l} className={`px-6 text-center md:text-left ${i > 0 ? "md:border-l md:border-white/10" : ""}`}>
            <div className="text-5xl font-light tracking-tight md:text-6xl">
              {s.v}
              {s.u && <span className="accent-serif ml-2 text-3xl md:text-4xl">{s.u}</span>}
            </div>
            <div className="mt-3 text-sm text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
