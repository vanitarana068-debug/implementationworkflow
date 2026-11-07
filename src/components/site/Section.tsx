import type { ReactNode } from "react";

// Words wrapped in *asterisks* render in the italic serif accent.
export function Accent({ text }: { text: string }) {
  return (
    <>
      {text.split("*").map((part, i) =>
        i % 2 ? (
          <em key={i} className="accent-serif">
            {part}
          </em>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function Section({ id, eyebrow, title, sub, children, alt }: { id?: string; eyebrow?: string; title: string; sub?: string; children: ReactNode; alt?: boolean }) {
  return (
    <section id={id} className={`relative scroll-mt-16 py-28 ${alt ? "bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,oklch(0.3_0.08_255/0.25),transparent)]" : ""}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div data-reveal className="mx-auto max-w-3xl text-center">
          {eyebrow && <div className="eyebrow-line font-mono text-xs uppercase tracking-[0.15em] text-foreground/80">{eyebrow}</div>}
          <h2 className="mt-4 text-3xl font-normal tracking-tight md:text-[3.4rem] md:leading-[1.05]"><Accent text={title} /></h2>
          {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
        </div>
        <div data-reveal className="mt-14">{children}</div>
      </div>
    </section>
  );
}
