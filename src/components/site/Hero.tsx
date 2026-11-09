import { useRef, type PointerEvent } from "react";
import { AUDIT_URL, DESCRIPTION, PILLARS } from "@/lib/site";
import { GridBackdrop } from "./GridBackdrop";
import { CalendarDays, ChevronRight, Mail, Server, Sparkles, Users, Database, MessageCircle, Phone, Workflow } from "lucide-react";

const W = 1440;
const N = 70;

// Builds a field of flowing lines that read as wind-swept dunes.
function dunePaths() {
  const paths: { d: string; o: number; w: number }[] = [];
  for (let k = 0; k < N; k++) {
    const t = k / N;
    const base = 420 + k * 6.5;
    let d = "";
    for (let x = -40; x <= W + 40; x += 24) {
      const hill = -170 * Math.exp(-(((x - 760) / 330) ** 2)) * (1 - t * 0.55);
      const swell = 34 * Math.sin(x * 0.0042 + k * 0.09) + 14 * Math.sin(x * 0.011 + k * 0.23);
      const y = base + hill + swell * (0.6 + t);
      d += `${x === -40 ? "M" : "L"}${x},${y.toFixed(1)} `;
    }
    // Round so server and browser render identical attribute strings (avoids hydration mismatch).
    paths.push({ d, o: +(0.18 + 0.5 * Math.sin(Math.PI * t)).toFixed(3), w: +(0.6 + t * 1.6).toFixed(3) });
  }
  return paths;
}

const DUNES = dunePaths();

const TOOLS = [
  { i: Workflow, n: "n8n" },
  { i: Database, n: "Airtable" },
  { i: MessageCircle, n: "WhatsApp" },
  { i: Phone, n: "Twilio" },
  { i: CalendarDays, n: "Google Calendar" },
  { i: Users, n: "HubSpot" },
  { i: Sparkles, n: "OpenAI" },
  { i: Mail, n: "Brevo" },
  { i: Server, n: "Supabase" },
];

export function Backdrop({ id = "hero" }: { id?: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* sky */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0a1638 0%, #1b3a78 22%, #4a72b0 38%, #6f8fc0 44%, #27457f 56%, #0d1b44 75%, #040818 100%)",
        }}
      />
      {/* streaky clouds */}
      <div className="animate-drift absolute inset-0">
        {[
          { t: "12%", l: "-10%", w: "70%", r: -8, o: 0.35 },
          { t: "20%", l: "30%", w: "80%", r: -12, o: 0.3 },
          { t: "6%", l: "45%", w: "60%", r: -6, o: 0.22 },
          { t: "30%", l: "-5%", w: "55%", r: -4, o: 0.25 },
          { t: "34%", l: "55%", w: "55%", r: -3, o: 0.28 },
        ].map((c, i) => (
          <div
            key={i}
            className="absolute h-16 rounded-full"
            style={{
              top: c.t,
              left: c.l,
              width: c.w,
              transform: `rotate(${c.r}deg)`,
              background: "radial-gradient(ellipse at center, rgba(205,225,255,1), rgba(150,185,240,0.4) 45%, transparent 70%)",
              opacity: c.o,
              filter: "blur(18px)",
            }}
          />
        ))}
        {/* warm glow on the horizon */}
        <div
          className="absolute left-[55%] top-[30%] h-24 w-[40%] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(255,170,120,0.35), transparent 70%)", filter: "blur(24px)" }}
        />
      </div>
      {/* dunes */}
      <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${W} 900`} preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`${id}-dune`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#3d63b5" />
            <stop offset="0.18" stopColor="#d98a63" />
            <stop offset="0.32" stopColor="#5b86d6" />
            <stop offset="0.55" stopColor="#9fc2ff" />
            <stop offset="0.72" stopColor="#e09772" />
            <stop offset="0.86" stopColor="#4d75c4" />
            <stop offset="1" stopColor="#c27a5c" />
          </linearGradient>
          <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2a4a8f" stopOpacity="0.55" />
            <stop offset="1" stopColor="#050a1e" stopOpacity="1" />
          </linearGradient>
          <filter id={`${id}-soft`}>
            <feGaussianBlur stdDeviation="0.8" />
          </filter>
        </defs>
        <path d={`${DUNES[0]!.d} L${W + 40},900 L-40,900 Z`} fill={`url(#${id}-fill)`} />
        <g filter={`url(#${id}-soft)`}>
          {DUNES.map((p, i) => (
            <path key={i} d={p.d} fill="none" stroke={`url(#${id}-dune)`} strokeOpacity={p.o} strokeWidth={p.w} />
          ))}
        </g>
      </svg>
      {/* vignette + bottom fade */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 40%, transparent 40%, rgba(3,6,25,0.55) 100%)" }} />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}

export function Hero() {
  const frame = useRef<HTMLDivElement>(null);
  // Feed the cursor position to the grid so lines light up around it.
  const track = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = frame.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--gx", `${e.clientX - r.left}px`);
    el.style.setProperty("--gy", `${e.clientY - r.top}px`);
  };
  const leave = () => {
    frame.current?.style.setProperty("--gx", "-999px");
    frame.current?.style.setProperty("--gy", "-999px");
  };
  return (
    <section id="top" className="px-2 pt-2 sm:px-6 sm:pt-6">
      <div
        ref={frame}
        onPointerMove={track}
        onPointerLeave={leave}
        className="relative overflow-hidden rounded-[28px] border border-white/15 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
      >
        <GridBackdrop />
        <div className="relative mx-auto flex min-h-[640px] max-w-5xl flex-col items-center px-6 pb-12 pt-44 text-center sm:min-h-[760px] sm:pt-52">
          <div className="animate-rise label-mono mb-6 flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-foreground/80 backdrop-blur-md">
            {PILLARS.map((p, i) => (
              <span key={p} className="flex items-center gap-2.5">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-primary" />}
                {p}
              </span>
            ))}
          </div>
          <h1 className="animate-rise text-5xl font-normal leading-[1.04] tracking-[-0.02em] drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)] [animation-delay:120ms] md:text-[5.5rem]">
            Intelligence beyond
            <br className="hidden sm:block" /> <em className="accent-serif">operations.</em>
          </h1>
          <p className="animate-rise mt-6 max-w-2xl text-base text-foreground/85 [animation-delay:240ms] md:text-lg">
            {DESCRIPTION}
          </p>
          <a
            href={AUDIT_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary animate-rise mt-9 [animation-delay:360ms]"
          >
            Get your free AI audit <ChevronRight className="h-3.5 w-3.5" />
          </a>
          <a
            href="https://www.northstarai.online/"
            target="_blank"
            rel="noopener noreferrer"
            className="animate-rise group mt-7 inline-flex flex-col items-center gap-0.5 rounded-3xl sm:flex-row sm:gap-3 sm:rounded-full border border-white/20 bg-white/[0.07] px-6 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.25)] backdrop-blur-md transition-colors [animation-delay:420ms] hover:border-primary/60 hover:bg-white/[0.12]"
          >
            <span className="text-base font-medium text-foreground/80 md:text-lg">In partnership with</span>
            <span className="flex items-center gap-2 whitespace-nowrap text-xl font-semibold tracking-tight text-foreground md:text-2xl">
              <span>
                NorthStar <em className="accent-serif font-normal">AI</em>
              </span>
              <ChevronRight className="h-4 w-4 text-foreground/70 transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>

          <div className="animate-rise mt-auto w-full pt-28 [animation-delay:500ms]">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/50">Built on tools you already use</div>
            <div className="mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_18%,black_82%,transparent)]">
              <div className="animate-marquee flex w-max">
                {[0, 1].map((copy) => (
                  <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
                    {TOOLS.map(({ i: I, n }) => (
                      <div key={n} className="flex items-center gap-2 px-7 text-lg font-semibold tracking-tight text-foreground/85">
                        <I className="h-4 w-4" strokeWidth={2.2} /> {n}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
