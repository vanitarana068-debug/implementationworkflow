import { ChevronRight } from "lucide-react";
import { AUDIT_URL, BRAND, DESCRIPTION, NAV, PILLARS, TAGLINE } from "@/lib/site";
import { Backdrop } from "./Hero";
import { BrandLockup } from "./Logo";


export function FinalCTA() {
  return (
    <section className="px-2 py-16 sm:px-6">
      <div className="relative overflow-hidden rounded-[28px] border border-white/15">
        <div className="absolute inset-0 rotate-180">
          <Backdrop id="cta" />
        </div>
        <div className="absolute inset-0 bg-background/30" />
        <div className="relative mx-auto max-w-3xl px-6 py-28 text-center">
          <div className="eyebrow-line label-mono text-foreground/80">Get started</div>
          <h2 className="mt-5 text-4xl font-normal tracking-tight md:text-6xl">Put your busywork on <em className="accent-serif">autopilot.</em></h2>
          <p className="mx-auto mt-5 max-w-xl text-foreground/80">
            Book a free AI audit and we'll map out the workflows that will save you the most time and money.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href={AUDIT_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Get your free AI audit <ChevronRight className="h-3.5 w-3.5" />
            </a>
            <a href="#solutions" className="btn-ghost backdrop-blur">
              Explore solutions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-6 pb-10">
      <div className="flex flex-col gap-10 border-t border-white/10 pt-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <a href="#top" aria-label={BRAND} className="block">
            <BrandLockup markClass="h-10" textClass="text-2xl tracking-[0.2em]" />
          </a>
          <p className="mt-4 text-sm text-foreground/85">{TAGLINE}</p>
          <p className="mt-2 text-sm text-muted-foreground">{DESCRIPTION}</p>
        </div>
        <nav className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-3">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="label-mono text-foreground/60 transition-colors hover:text-foreground">
              {n.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="label-mono mt-12 flex flex-col justify-between gap-2 text-foreground/35 sm:flex-row">
        <span>© {new Date().getFullYear()} {BRAND}</span>
        <span>{PILLARS.join(" · ")}</span>
      </div>
    </footer>
  );
}
