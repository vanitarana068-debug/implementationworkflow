import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronRight, Menu, X } from "lucide-react";
import { AUDIT_URL, BRAND, NAV } from "@/lib/site";
import { BrandLockup } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Phone menu: lock page scroll while open, close on Escape or when the screen grows to desktop.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-3 transition-all duration-500 sm:px-10 ${scrolled ? "pt-3" : "pt-4 sm:pt-8"}`}
      style={{ marginTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 sm:gap-4">
        <div
          className={`pill flex min-w-0 items-center rounded-xl px-1.5 py-1 transition-shadow duration-500 sm:px-2 sm:py-1.5 ${solid ? "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)] !bg-[oklch(0.16_0.04_262/0.8)]" : ""}`}
        >
          <a href="#top" aria-label={BRAND} onClick={() => setOpen(false)} className="flex items-center px-1.5 py-0.5 sm:px-2">
            <BrandLockup markClass="h-6 sm:h-8" textClass="text-lg tracking-[0.14em] sm:text-[22px] sm:tracking-[0.2em]" />
          </a>
          <span className="mx-2 hidden h-6 w-px bg-white/15 lg:block" />
          <nav className="hidden items-center lg:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="rounded-md px-2.5 py-1 font-mono text-xs uppercase tracking-wide text-foreground/85 transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
        <a
          href="#calculator"
          className="pill hidden items-center gap-1 rounded-xl px-3.5 py-2.5 font-mono text-xs uppercase tracking-wide transition-colors hover:bg-white/10 lg:inline-flex"
        >
          Get in touch <ChevronRight className="h-3.5 w-3.5" />
        </a>
        <button
          className={`pill grid h-11 w-11 shrink-0 place-items-center rounded-xl lg:hidden ${solid ? "!bg-[oklch(0.16_0.04_262/0.8)]" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Phone menu sheet */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 top-0 -z-10 bg-[oklch(0.11_0.035_268/0.92)] backdrop-blur-xl transition-opacity duration-300 lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      >
        <nav
          className={`mx-auto flex h-full max-w-md flex-col px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-28 transition-transform duration-500 ${open ? "translate-y-0" : "-translate-y-4"}`}
          onClick={(e) => e.stopPropagation()}
        >
          {NAV.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className="group flex items-center justify-between border-b border-white/10 py-4 text-2xl font-light"
            >
              <span className="flex items-baseline gap-4">
                <span className="label-mono text-primary">0{i + 1}</span>
                {n.label}
              </span>
              <ArrowUpRight className="h-5 w-5 text-foreground/40 transition-transform group-active:translate-x-0.5" />
            </a>
          ))}
          <div className="mt-auto space-y-3 pt-8">
            <a href={AUDIT_URL} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} className="btn-primary w-full !py-4">
              Get your free AI audit <ChevronRight className="h-3.5 w-3.5" />
            </a>
            <a href="#calculator" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} className="btn-ghost w-full !py-4">
              Get in touch
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
