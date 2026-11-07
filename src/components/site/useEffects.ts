import { useEffect } from "react";

// Page-wide polish: reveal-on-scroll and the cursor spotlight on .glass cards.
export function usePagePolish() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).setAttribute("data-shown", "");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    document.querySelectorAll("[data-reveal], [data-reveal-stagger]").forEach((el) => io.observe(el));

    const onMove = (ev: PointerEvent) => {
      const card = (ev.target as Element | null)?.closest?.(".glass") as HTMLElement | null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${ev.clientX - r.left}px`);
      card.style.setProperty("--my", `${ev.clientY - r.top}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      root.classList.remove("reveal-ready");
    };
  }, []);
}
