import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  lane: number;
};

type Pulse = { x: number; y: number; radius: number; alpha: number; color: string };

const COLORS = [
  "rgba(139,92,246,0.62)",
  "rgba(244,114,182,0.58)",
  "rgba(251,113,133,0.52)",
  "rgba(34,211,238,0.5)",
  "rgba(52,211,153,0.48)",
];

const SIGNALS = ["♥", "+1", "DM", "↗", "●"];

/** Interactive Instagram signal stream that reacts to pointer, taps, and scroll velocity. */
export function FlowCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let scrollSpeed = 1;
    let lastY = window.scrollY;
    let raf = 0;
    let frame = 0;
    const pointer = { x: width / 2, y: height / 2, active: false };
    const pulses: Pulse[] = [];
    let particles: Particle[] = [];

    const fit = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const makeParticles = () => {
      const count = reducedMotion ? 28 : Math.min(110, Math.round(width / 11));
      particles = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0.25 + Math.random() * 0.5,
        vy: (Math.random() - 0.5) * 0.12,
        radius: Math.random() * 2.4 + 1,
        color: COLORS[index % COLORS.length] ?? COLORS[0] ?? "rgba(139,92,246,.6)",
        lane: index % 3,
      }));
    };

    const burst = (x: number, y: number) => {
      for (let index = 0; index < 3; index += 1) {
        pulses.push({
          x,
          y,
          radius: 8 + index * 13,
          alpha: 0.42 - index * 0.08,
          color: COLORS[index] ?? "rgba(244,114,182,.5)",
        });
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    const onPointerDown = (event: PointerEvent) => burst(event.clientX, event.clientY);
    const onScroll = () => {
      const delta = Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;
      scrollSpeed = Math.min(5, 1 + delta / 18);
    };
    const onResize = () => {
      fit();
      makeParticles();
    };

    const drawStream = (lane: number, time: number) => {
      const laneY = height * (0.24 + lane * 0.25);
      ctx.beginPath();
      for (let x = -20; x <= width + 20; x += 18) {
        const y = laneY + Math.sin(x * 0.006 + time + lane * 1.7) * (42 + lane * 11);
        if (x === -20) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, "rgba(139,92,246,0)");
      gradient.addColorStop(0.28, "rgba(139,92,246,0.13)");
      gradient.addColorStop(0.62, "rgba(244,114,182,0.14)");
      gradient.addColorStop(1, "rgba(34,211,238,0)");
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    };

    const tick = () => {
      frame += reducedMotion ? 0.08 : 1;
      ctx.clearRect(0, 0, width, height);
      const time = frame * 0.005;
      for (let lane = 0; lane < 3; lane += 1) drawStream(lane, time);
      scrollSpeed += (1 - scrollSpeed) * 0.045;

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index];
        if (!particle) continue;
        const laneY = height * (0.24 + particle.lane * 0.25);
        const targetY = laneY + Math.sin(particle.x * 0.006 + time + particle.lane * 1.7) * (42 + particle.lane * 11);
        particle.vy += (targetY - particle.y) * 0.0008;

        if (pointer.active) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 175) {
            const force = (175 - distance) / 175;
            particle.vx += (dx / (distance || 1)) * force * 0.045;
            particle.vy += (dy / (distance || 1)) * force * 0.045;
          }
        }

        particle.vx += (0.48 - particle.vx) * 0.008;
        particle.vy *= 0.985;
        particle.x += particle.vx * scrollSpeed;
        particle.y += particle.vy * scrollSpeed;
        if (particle.x > width + 30) {
          particle.x = -30;
          particle.y = laneY + (Math.random() - 0.5) * 70;
        }

        const next = particles[index + 1];
        if (next && next.lane === particle.lane) {
          const distance = Math.hypot(next.x - particle.x, next.y - particle.y);
          if (distance < 95) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(next.x, next.y);
            ctx.strokeStyle = "rgba(139,92,246,0.09)";
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        if (index % 23 === 0) {
          ctx.save();
          ctx.globalAlpha = 0.38;
          ctx.font = "600 10px Manrope, sans-serif";
          ctx.fillStyle = particle.color;
          ctx.fillText(SIGNALS[(index / 23) % SIGNALS.length] ?? "♥", particle.x + 7, particle.y - 7);
          ctx.restore();
        }
      }

      for (let index = pulses.length - 1; index >= 0; index -= 1) {
        const pulse = pulses[index];
        if (!pulse) continue;
        pulse.radius += 1.7;
        pulse.alpha *= 0.965;
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
        ctx.strokeStyle = pulse.color.replace(/0\.\d+\)/, `${pulse.alpha})`);
        ctx.lineWidth = 1.5;
        ctx.stroke();
        if (pulse.alpha < 0.018) pulses.splice(index, 1);
      }

      raf = requestAnimationFrame(tick);
    };

    fit();
    makeParticles();
    tick();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-90"
    />
  );
}