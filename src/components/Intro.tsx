import { useEffect, useState } from "react";

const STEPS = ["JF", "Jus", "Jusflow"];

/** Opening brand moment: JF forms, expands into Jusflow, dissolves into the site. */
export function Intro({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t = [
      setTimeout(() => setStep(1), 1100),
      setTimeout(() => setStep(2), 2000),
      setTimeout(() => setLeaving(true), 3200),
      setTimeout(onDone, 4000),
    ];
    return () => t.forEach(clearTimeout);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background transition-all duration-[800ms]"
      style={{
        opacity: leaving ? 0 : 1,
        transform: leaving ? "scale(1.35)" : "scale(1)",
        transitionTimingFunction: "var(--ease-flow)",
        pointerEvents: leaving ? "none" : "auto",
      }}
    >
      <div className="relative flex flex-col items-center">
        <svg
          viewBox="0 0 800 200"
          className="absolute -z-10 w-[min(90vw,900px)] opacity-80"
          aria-hidden
        >
          <defs>
            <linearGradient id="ribbon" x1="0" x2="1">
              <stop offset="0%" stopColor="oklch(0.55 0.21 295)" />
              <stop offset="50%" stopColor="oklch(0.75 0.15 350)" />
              <stop offset="100%" stopColor="oklch(0.78 0.12 210)" />
            </linearGradient>
          </defs>
          <path
            d="M-20 120 C 150 40, 280 190, 420 100 S 680 40, 820 110"
            fill="none"
            stroke="url(#ribbon)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray="1000"
            style={{ animation: "dash 6s linear infinite", opacity: 0.35 }}
          />
        </svg>
        <h1
          key={step}
          className="flow-text text-[clamp(3rem,12vw,9rem)] font-semibold leading-none"
          style={{ animation: "rise 0.9s var(--ease-flow) both" }}
        >
          {STEPS[step]}
        </h1>
        <p className="mt-4 text-sm tracking-[0.4em] text-muted-foreground uppercase">
          Your Instagram. In flow.
        </p>
      </div>
    </div>
  );
}
