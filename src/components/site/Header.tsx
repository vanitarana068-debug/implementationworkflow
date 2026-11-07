import { useEffect, useState } from "react";
import { ChevronRight, Menu, X } from "lucide-react";
import { BRAND, NAV } from "@/lib/site";
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
  return (
    <header className={`fixed inset-x-0 top-0 z-50 px-4 transition-all duration-500 sm:px-10 ${scrolled ? "pt-3" : "pt-6 sm:pt-8"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className={`pill flex items-center rounded-xl px-2 py-1.5 transition-shadow duration-500 ${scrolled ? "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)] !bg-[oklch(0.16_0.04_262/0.75)]" : ""}`}>
          <a href="#top" aria-label={BRAND} className="flex items-center px-2 py-0.5">
            <BrandLockup markClass="h-8" textClass="text-[22px]" />
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
        <button className="pill rounded-xl p-2 lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="pill mx-auto mt-2 max-w-7xl rounded-xl px-4 py-3 lg:hidden">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block py-2 font-mono text-sm uppercase tracking-wide text-foreground/85">
              {n.label}
            </a>
          ))}
          <a href="#calculator" onClick={() => setOpen(false)} className="mt-2 block rounded-lg bg-brand px-4 py-2 text-center font-mono text-sm uppercase text-primary-foreground">
            Get in touch
          </a>
        </div>
      )}
    </header>
  );
}
