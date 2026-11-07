import { BRAND } from "@/lib/site";

// The Aurevix "A" emblem (cut from the brand artwork, transparent background).
export function Logo({ className = "h-6" }: { className?: string }) {
  return <img src="/aurevix-mark.png" alt="" aria-hidden width={657} height={339} className={`w-auto select-none ${className}`} draggable={false} />;
}

// Emblem + wordmark styled like the brand artwork: silver letters, cyan X.
export function BrandLockup({ markClass = "h-7", textClass = "text-xl" }: { markClass?: string; textClass?: string }) {
  const name = BRAND.toUpperCase();
  return (
    <span className="flex items-center gap-2.5">
      <Logo className={markClass} />
      <span className={`font-normal uppercase tracking-[0.2em] ${textClass}`}>
        <span className="bg-[linear-gradient(180deg,#ffffff_0%,#c9d3e4_55%,#8e9ab2_100%)] bg-clip-text text-transparent">
          {name.slice(0, -1)}
        </span>
        <span className="bg-[linear-gradient(180deg,#9be6ff,#2bb6ff)] bg-clip-text text-transparent">{name.slice(-1)}</span>
      </span>
    </span>
  );
}
