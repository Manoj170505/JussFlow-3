import { useEffect, useRef, useState } from "react";

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e?.isIntersecting) setShown(true); },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

export function Stage({
  label,
  title,
  body,
  children,
  index,
}: {
  label: string;
  title: string;
  body: string;
  children: React.ReactNode;
  index: number;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const flip = index % 2 === 1;
  return (
    <section
      ref={ref}
      className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:py-32"
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(40px)",
        transition: "opacity .9s var(--ease-flow), transform .9s var(--ease-flow)",
      }}
    >
      <div className={flip ? "md:order-2" : ""}>
        <span className="flow-text text-xs font-semibold tracking-[0.35em] uppercase">
          {label}
        </span>
        <h2 className="mt-4 text-[clamp(1.8rem,4vw,3rem)] font-semibold text-foreground">
          {title}
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
          {body}
        </p>
      </div>
      <div className={flip ? "md:order-1" : ""}>{children}</div>
    </section>
  );
}

export function Card({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={`glass lift rounded-3xl p-5 ${className}`}
      style={{ animation: `drift ${6 + delay}s ease-in-out ${delay}s infinite` }}
    >
      {children}
    </div>
  );
}

export function Avatar({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="size-9 rounded-full"
        style={{ background: "var(--gradient-flow)", backgroundSize: "200%" }}
      />
      <div className="text-sm font-medium text-foreground">{name}</div>
    </div>
  );
}
