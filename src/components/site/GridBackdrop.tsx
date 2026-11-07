// Immersive hero background: night sky, a faint flat grid, a perspective grid floor
// that flows toward the viewer, and grid lines that light up around the cursor.
// The cursor position comes from --gx / --gy, set on an ancestor by the Hero.

const line = (c: string) =>
  `linear-gradient(${c} 1px, transparent 1px), linear-gradient(90deg, ${c} 1px, transparent 1px)`;

export function GridBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* sky */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 58%, #2c5aa8 0%, #173a7a 35%, #0b1a44 65%, #040818 100%)",
        }}
      />
      {/* soft streaky clouds */}
      <div className="animate-drift absolute inset-0 opacity-70">
        {[
          { t: "10%", l: "-8%", w: "60%", r: -7, o: 0.22 },
          { t: "18%", l: "40%", w: "70%", r: -10, o: 0.2 },
          { t: "30%", l: "5%", w: "45%", r: -3, o: 0.16 },
        ].map((c, i) => (
          <div
            key={i}
            className="absolute h-14 rounded-full"
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
      </div>

      {/* flat grid across the sky */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: line("rgba(160,200,255,0.07)"),
          backgroundSize: "64px 64px",
          backgroundPosition: "center top",
          maskImage: "radial-gradient(ellipse 75% 60% at 50% 35%, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 60% at 50% 35%, black 20%, transparent 75%)",
        }}
      />
      {/* same grid, brighter, revealed only around the cursor */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundImage: line("rgba(110,200,255,0.55)"),
          backgroundSize: "64px 64px",
          backgroundPosition: "center top",
          maskImage: "radial-gradient(260px circle at var(--gx, -999px) var(--gy, -999px), black, transparent 70%)",
          WebkitMaskImage: "radial-gradient(260px circle at var(--gx, -999px) var(--gy, -999px), black, transparent 70%)",
        }}
      />
      {/* cursor glow */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(380px circle at var(--gx, -999px) var(--gy, -999px), rgba(80,170,255,0.14), transparent 70%)",
        }}
      />

      {/* horizon glow */}
      <div
        className="absolute inset-x-0 top-[56%] h-40 -translate-y-1/2"
        style={{ background: "radial-gradient(ellipse 55% 50% at 50% 50%, rgba(120,190,255,0.45), transparent 70%)", filter: "blur(10px)" }}
      />
      <div
        className="absolute inset-x-[8%] top-[56%] h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(180,225,255,0.9), transparent)" }}
      />

      {/* perspective grid floor */}
      <div className="absolute inset-x-0 bottom-0 top-[56%] overflow-hidden" style={{ perspective: "420px", perspectiveOrigin: "50% 0%" }}>
        <div
          className="animate-grid-flow absolute -left-1/2 top-0 h-[260%] w-[200%] origin-top"
          style={{
            transform: "rotateX(70deg)",
            backgroundImage: line("rgba(110,190,255,0.45)"),
            backgroundSize: "52px 52px",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 60%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 60%, transparent 100%)",
          }}
        />
      </div>

      {/* vignette + bottom fade */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 45%, transparent 45%, rgba(3,6,25,0.6) 100%)" }} />
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
