import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FlowCanvas } from "@/components/FlowCanvas";
import { Intro } from "@/components/Intro";
import { Avatar, Card, Stage, useReveal } from "@/components/story";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jusflow — Your Instagram. In flow." },
      {
        name: "description",
        content:
          "Jusflow connects every Instagram interaction — content, audience, DMs, automation, leads and customers — into one continuous flow.",
      },
      { property: "og:title", content: "Jusflow — Your Instagram. In flow." },
      {
        property: "og:description",
        content:
          "One flowing system for Instagram creators and businesses: create, publish, reach, engage, automate, qualify, follow up and grow.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  "Dashboard",
  "Automations",
  "Content",
  "Inbox",
  "Audience",
  "Leads",
  "Analytics",
];

const LOOP = [
  "Create",
  "Publish",
  "Audience",
  "Engage",
  "DM",
  "Automate",
  "Lead",
  "Customer",
  "Grow",
];

function Ribbon() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 2400"
      preserveAspectRatio="none"
      className="pointer-events-none fixed inset-y-0 left-1/2 -z-10 h-full w-[120vw] -translate-x-1/2 opacity-60"
    >
      <defs>
        <linearGradient id="flowline" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.55 0.21 295)" />
          <stop offset="35%" stopColor="oklch(0.75 0.15 350)" />
          <stop offset="65%" stopColor="oklch(0.72 0.17 25)" />
          <stop offset="100%" stopColor="oklch(0.7 0.12 165)" />
        </linearGradient>
      </defs>
      <path
        d="M200 -100 C 40 300, 360 600, 180 950 S 20 1500, 220 1900 S 360 2300, 200 2600"
        fill="none"
        stroke="url(#flowline)"
        strokeWidth="28"
        strokeLinecap="round"
        style={{
          transform: `translateY(${-offset * 0.25}px)`,
          filter: "blur(0.5px)",
          opacity: 0.22,
        }}
      />
    </svg>
  );
}

function Index() {
  const [intro, setIntro] = useState(true);
  const loop = useReveal<HTMLDivElement>();

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {intro && <Intro onDone={() => setIntro(false)} />}
      <FlowCanvas />
      <Ribbon />

      <header className="glass sticky top-4 z-30 mx-auto flex w-[min(96%,72rem)] items-center justify-between rounded-full px-5 py-3">
        <span className="font-display text-lg font-semibold tracking-tight">
          Jusflow
        </span>
        <nav className="hidden gap-6 text-sm text-muted-foreground lg:flex">
          {NAV.map((n) => (
            <a key={n} href="#flow" className="transition-colors hover:text-foreground">
              {n}
            </a>
          ))}
        </nav>
        <a
          href="#flow"
          className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
        >
          Start free
        </a>
      </header>

      <section className="mx-auto flex min-h-[86vh] max-w-4xl flex-col items-center justify-center px-6 text-center">
        <span className="glass rounded-full px-4 py-1.5 text-xs tracking-[0.25em] text-muted-foreground uppercase">
          Built for Instagram growth
        </span>
        <h1 className="mt-8 text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[0.95]">
          Your audience is <span className="flow-text">already there.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          For creators, Instagram businesses and promoters. Turn content, comments,
          DMs and audience attention into qualified leads and customers.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2" aria-label="Who Jusflow is for">
          {["Creators & influencers", "Instagram businesses", "Growth promoters"].map((audience) => (
            <span key={audience} className="signal-chip glass rounded-full px-3.5 py-2 text-xs font-medium text-foreground">
              <span className="signal-dot" aria-hidden />
              {audience}
            </span>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href="#flow"
            className="rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground shadow-[var(--shadow-float)] transition-transform hover:scale-105"
          >
            See the flow
          </a>
          <a
            href="#flow"
            className="glass rounded-full px-6 py-3 font-medium text-foreground"
          >
            Watch the journey
          </a>
        </div>
      </section>

      <div id="flow">
        <Stage
          index={0}
          label="Create"
          title="It starts with one piece of content"
          body="A photo, a Reel, a Story. The moment it enters the flow, Jusflow is already tracking where the attention goes."
        >
          <Card>
            <Avatar name="your.brand" />
            <div
              className="mt-4 aspect-[4/3] rounded-2xl"
              style={{ background: "var(--gradient-flow)", backgroundSize: "200%" }}
            />
            <div className="mt-4 flex gap-2 text-xs text-muted-foreground">
              {["Photo", "Reel", "Story"].map((t) => (
                <span key={t} className="rounded-full bg-secondary px-3 py-1">
                  {t}
                </span>
              ))}
            </div>
          </Card>
        </Stage>

        <Stage
          index={1}
          label="Publish · Reach"
          title="One post becomes thousands of interactions"
          body="Your content reaches real people. Views, likes, saves, shares and comments branch out from a single moment."
        >
          <div className="grid grid-cols-2 gap-4">
            {[
              ["Views", "184K"],
              ["Saves", "6,240"],
              ["Shares", "2,180"],
              ["Comments", "1,904"],
            ].map(([k, v], i) => (
              <Card key={k} delay={i * 0.4}>
                <div className="text-xs tracking-widest text-muted-foreground uppercase">
                  {k}
                </div>
                <div className="mt-2 text-2xl font-semibold">{v}</div>
              </Card>
            ))}
          </div>
        </Stage>

        <Stage
          index={2}
          label="Engage · DM"
          title="A comment becomes a conversation"
          body="The viewer comments, the comment becomes a DM, and Jusflow reads the intent behind it — quietly, in the background."
        >
          <Card className="space-y-3">
            <Avatar name="maya.k" />
            <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-secondary px-4 py-2.5 text-sm">
              Hey! How much is the coaching program?
            </div>
            <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
              Hi Maya — here's the full breakdown, plus this week's opening.
            </div>
            <div className="text-xs text-muted-foreground">
              Keyword detected · intent: pricing · replied in 2s
            </div>
          </Card>
        </Stage>

        <Stage
          index={3}
          label="Automate · Qualify"
          title="Interest becomes a qualified lead"
          body="The flow branches, responds and reconnects. Every conversation with business value becomes a structured lead card."
        >
          <Card>
            <Avatar name="maya.k" />
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              {[
                ["Interest", "Coaching"],
                ["Source", "Reel · 12 Sep"],
                ["Intent", "High"],
                ["Status", "Qualified"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-secondary/60 px-3 py-2">
                  <dt className="text-xs text-muted-foreground">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </Stage>

        <Stage
          index={4}
          label="Follow up · Customer"
          title="The flow carries them, not you"
          body="Reminders, follow-ups and human handoff happen along the same stream. You step in only when it matters."
        >
          <div className="space-y-3">
            {["DM", "Follow-up", "Reminder", "Response", "Human handoff"].map(
              (s, i) => (
                <Card key={s} delay={i * 0.3} className="flex items-center gap-4 py-3">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ background: "var(--gradient-flow)" }}
                  />
                  <span className="text-sm font-medium">{s}</span>
                  <span className="ml-auto text-xs text-muted-foreground">auto</span>
                </Card>
              ),
            )}
          </div>
        </Stage>

        <Stage
          index={5}
          label="Schedule · Analytics"
          title="Content keeps moving while you work"
          body="Schedule posts and Reels into the future flow, and watch every interaction resolve into living, minimal analytics."
        >
          <Card>
            <div className="flex items-end gap-2">
              {[38, 62, 45, 80, 58, 92, 70].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-lg"
                  style={{
                    height: `${h * 1.6}px`,
                    background: "var(--gradient-flow)",
                    backgroundSize: "400% 100%",
                    backgroundPosition: `${i * 16}% 0`,
                    opacity: 0.85,
                  }}
                />
              ))}
            </div>
            <div className="mt-4 flex justify-between text-xs text-muted-foreground">
              <span>Scheduled · 14 posts</span>
              <span>Replies · 3,102</span>
              <span>Leads · 418</span>
            </div>
          </Card>
        </Stage>
      </div>

      <section
        ref={loop.ref}
        className="mx-auto max-w-5xl px-6 py-28 text-center"
        style={{
          opacity: loop.shown ? 1 : 0,
          transition: "opacity 1s var(--ease-flow)",
        }}
      >
        <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold">
          The flow never stops
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {LOOP.map((s, i) => (
            <span key={s} className="flex items-center gap-3">
              <span className="glass lift rounded-full px-5 py-2.5 text-sm font-medium">
                {s}
              </span>
              {i < LOOP.length - 1 && (
                <span className="text-muted-foreground">→</span>
              )}
            </span>
          ))}
        </div>
      </section>

      <footer className="relative mx-auto flex max-w-4xl flex-col items-center px-6 pb-28 text-center">
        <h2 className="flow-text text-[clamp(3rem,10vw,7rem)] font-semibold leading-none">
          Jusflow
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">Your Instagram. In flow.</p>
        <a
          href="#flow"
          className="mt-10 rounded-full bg-primary px-7 py-3 font-medium text-primary-foreground shadow-[var(--shadow-float)] transition-transform hover:scale-105"
        >
          Start free
        </a>
        <p className="mt-12 text-xs text-muted-foreground">
          Everything connected. Everything moving. Everything in flow.
        </p>
      </footer>
    </div>
  );
}
