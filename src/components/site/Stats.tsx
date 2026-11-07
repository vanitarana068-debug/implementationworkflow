// Figures here come from the site's own content (FAQ timelines, solution and industry lists).
const STATS = [
  { v: "24/7", l: "AI agents that never clock out" },
  { v: "1–2", u: "weeks", l: "From kickoff to your first live workflow" },
  { v: "6", l: "Core AI solutions in one connected system" },
  { v: "10+", l: "Industries with ready-made playbooks" },
];

export function Stats() {
  return (
    <section className="px-4 pt-14 sm:px-6 sm:pt-20">
      <div data-reveal-stagger className="mx-auto grid max-w-6xl grid-cols-2 gap-x-3 gap-y-8 sm:gap-y-10 md:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={s.l} className={`px-2 text-center sm:px-6 md:text-left ${i > 0 ? "md:border-l md:border-white/10" : ""}`}>
            <div className="whitespace-nowrap text-[2.6rem] font-light leading-none tracking-tight sm:text-5xl md:text-6xl">
              {s.v}
              {s.u && <span className="accent-serif ml-1.5 text-2xl sm:ml-2 sm:text-3xl md:text-4xl">{s.u}</span>}
            </div>
            <div className="mt-3 text-[13px] leading-snug text-muted-foreground sm:text-sm">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
