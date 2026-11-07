import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { AUDIT_URL } from "@/lib/site";

// Phone-only sticky call to action: appears once the hero has scrolled away,
// hides again near the footer's own call to action.
export function MobileCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => {
      const y = window.scrollY;
      const nearEnd = y + window.innerHeight > document.documentElement.scrollHeight - 900;
      setShow(y > window.innerHeight * 0.9 && !nearEnd);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 transition-all duration-500 md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
      aria-hidden={!show}
    >
      <div className="pill flex items-center gap-3 rounded-2xl !bg-[oklch(0.16_0.04_262/0.85)] p-2 pl-4 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.8)]">
        <span className="flex-1 truncate text-sm text-foreground/85">Ready to automate?</span>
        <a href={AUDIT_URL} target="_blank" rel="noopener noreferrer" tabIndex={show ? 0 : -1} className="btn-primary shrink-0 !px-3.5 !py-3">
          Free audit <ChevronRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
