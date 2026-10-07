"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, NO_REDUCED_MOTION } from "@/lib/gsap";
import { useReady } from "@/components/AppShell";
import Magnetic from "@/components/ui/Magnetic";
import Marquee from "@/components/ui/Marquee";
import { scrollToId } from "@/lib/lenis";
import { marqueeTech, profile } from "@/data/profile";

export default function Hero() {
  const ready = useReady();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ready || !root.current) return;
      const el = root.current;
      const mm = gsap.matchMedia();

      mm.add(NO_REDUCED_MOTION, () => {
        // --- Intro -----------------------------------------------------
        const split = SplitText.create(".hero-title", {
          type: "lines,chars",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.chars, {
              yPercent: 115,
              rotate: 8,
              duration: 1.1,
              stagger: 0.025,
              ease: "expo.out",
            }),
        });

        gsap.from(".hero-fade", {
          opacity: 0,
          y: 28,
          duration: 1,
          stagger: 0.1,
          delay: 0.45,
          ease: "power3.out",
        });
        gsap.from(".hero-orb", {
          scale: 0.4,
          opacity: 0,
          duration: 1.8,
          stagger: 0.15,
          ease: "expo.out",
        });

        // --- Role rotator ----------------------------------------------
        const roles = gsap.utils.toArray<HTMLElement>(".hero-role");
        gsap.set(roles, { yPercent: 110, opacity: 0 });
        const cycle = gsap.timeline({ repeat: -1, delay: 1.1 });
        roles.forEach((role) => {
          cycle
            .to(role, { yPercent: 0, opacity: 1, duration: 0.7, ease: "expo.out" })
            .to(role, {
              yPercent: -110,
              opacity: 0,
              duration: 0.6,
              ease: "expo.in",
            }, "+=1.7");
        });

        // --- Spinning badge --------------------------------------------
        gsap.to(".hero-badge-ring", {
          rotate: 360,
          duration: 22,
          ease: "none",
          repeat: -1,
        });

        // --- Pointer parallax + spotlight -------------------------------
        const orbX = gsap.quickTo(".hero-orb-a", "x", { duration: 1.2, ease: "power3.out" });
        const orbY = gsap.quickTo(".hero-orb-a", "y", { duration: 1.2, ease: "power3.out" });
        const orb2X = gsap.quickTo(".hero-orb-b", "x", { duration: 1.6, ease: "power3.out" });
        const orb2Y = gsap.quickTo(".hero-orb-b", "y", { duration: 1.6, ease: "power3.out" });
        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          orbX(nx * 90);
          orbY(ny * 70);
          orb2X(nx * -120);
          orb2Y(ny * -90);
          el.style.setProperty("--mx", `${e.clientX - r.left}px`);
          el.style.setProperty("--my", `${e.clientY - r.top}px`);
        };
        el.addEventListener("pointermove", onMove);

        // --- Scroll-away -------------------------------------------------
        gsap.to(".hero-content", {
          yPercent: -14,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        return () => {
          el.removeEventListener("pointermove", onMove);
          split.revert();
          cycle.kill();
        };
      });
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden pt-28"
      style={
        {
          "--mx": "50%",
          "--my": "40%",
        } as React.CSSProperties
      }
    >
      {/* Backdrop */}
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(520px circle at var(--mx) var(--my), rgba(214,255,60,0.10), transparent 65%)",
        }}
      />
      <div className="hero-orb hero-orb-a pointer-events-none absolute -left-40 top-10 h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle,rgba(124,108,255,0.30)_0%,rgba(124,108,255,0)_68%)]" />
      <div className="hero-orb hero-orb-b pointer-events-none absolute -right-40 top-1/4 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(214,255,60,0.16)_0%,rgba(214,255,60,0)_68%)]" />

      <div className="hero-content relative z-10 mx-auto flex w-full max-w-[1500px] flex-1 flex-col justify-center px-5 sm:px-10">
        <div className="hero-fade mb-8 inline-flex w-fit items-center gap-3 rounded-full border border-line-strong bg-bg/70 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          <span className="pulse-dot h-2 w-2 rounded-full bg-accent" />
          {profile.status}
        </div>

        <h1
          className="hero-title font-display text-[clamp(3.6rem,13vw,12.5rem)] font-semibold leading-[0.86] text-fg"
          aria-label={profile.name}
        >
          Basit Ur
          <br />
          <span className="text-stroke">Rehman</span> Malik
        </h1>

        <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="hero-fade">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
              {profile.role} / {profile.tagline}
            </p>
            <p className="sr-only">{profile.roles.join(", ")}</p>
            <div
              aria-hidden="true"
              className="font-display relative h-[1.2em] overflow-hidden text-[clamp(1.6rem,3.6vw,3rem)] font-medium text-accent"
            >
              {profile.roles.map((role) => (
                <span
                  key={role}
                  className="hero-role absolute left-0 top-0 whitespace-nowrap opacity-0 first:opacity-100"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-fade flex flex-col gap-8 lg:items-end">
            <p className="max-w-md text-base leading-relaxed text-muted lg:text-right">
              I design and ship web and mobile products end to end, and I like
              fixing things in codebases I don&apos;t own.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Magnetic>
                <button
                  type="button"
                  data-cursor="Go"
                  onClick={() => scrollToId("work")}
                  className="group flex h-14 items-center gap-3 rounded-full bg-accent pl-7 pr-3 text-sm font-semibold text-black"
                >
                  View selected work
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-accent transition-transform duration-500 group-hover:rotate-90">
                    →
                  </span>
                </button>
              </Magnetic>
              <Magnetic>
                <button
                  type="button"
                  onClick={() => scrollToId("contact")}
                  className="h-14 rounded-full border border-line-strong px-7 text-sm font-medium text-fg transition-colors hover:border-fg"
                >
                  Get in touch
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>

      {/* Spinning badge */}
      <div
        aria-hidden="true"
        className="hero-fade pointer-events-none absolute right-6 top-28 z-10 hidden h-32 w-32 items-center justify-center md:flex lg:right-14 lg:top-32 lg:h-40 lg:w-40"
      >
        <svg viewBox="0 0 200 200" className="hero-badge-ring absolute inset-0">
          <defs>
            <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
          </defs>
          <text className="fill-fg/70 font-mono text-[15px] uppercase tracking-[0.32em]">
            <textPath href="#badge-circle">
              Available for hire • London based •
            </textPath>
          </text>
        </svg>
        <span className="font-display text-3xl font-semibold text-accent">
          {profile.initials}
        </span>
      </div>

      {/* Tech marquee */}
      <div className="relative z-10 mt-16 border-y border-line bg-bg/80 py-5">
        <Marquee
          items={marqueeTech}
          className="font-display text-2xl font-medium text-fg/80 sm:text-3xl"
        />
      </div>
    </section>
  );
}
