"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { profile } from "@/data/profile";

const SEEN_KEY = "bm-intro-seen";

/**
 * Full-screen intro: counter, name reveal, then a curtain lift.
 * Plays in full once per session and in a shorter form after that.
 */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const finish = () => {
        gsap.set(el, { display: "none" });
        document.documentElement.classList.add("is-ready");
        try {
          sessionStorage.setItem(SEEN_KEY, "1");
        } catch {
          /* storage unavailable */
        }
      };

      if (reduced) {
        finish();
        onDone();
        return;
      }

      let seen = false;
      try {
        seen = sessionStorage.getItem(SEEN_KEY) === "1";
      } catch {
        /* storage unavailable: play the full intro */
      }

      const speed = seen ? 0.45 : 1;
      const state = { n: 0 };

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".pl-word", {
        yPercent: 120,
        duration: 0.9 * speed,
        stagger: 0.08,
        ease: "expo.out",
      })
        .from(
          ".pl-meta",
          { opacity: 0, y: 12, duration: 0.6 * speed, stagger: 0.08 },
          "<0.2",
        )
        .to(
          state,
          {
            n: 100,
            duration: 1.5 * speed,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counter.current) {
                counter.current.textContent = String(
                  Math.round(state.n),
                ).padStart(3, "0");
              }
            },
          },
          0,
        )
        .to(".pl-bar", { scaleX: 1, duration: 1.5 * speed, ease: "power2.inOut" }, 0)
        .to(".pl-word", {
          yPercent: -120,
          duration: 0.6 * speed,
          stagger: 0.05,
          ease: "power3.in",
        })
        .to(
          ".pl-meta",
          { opacity: 0, duration: 0.3 * speed },
          "<",
        )
        .add(() => onDone(), ">-0.15")
        .to(el, {
          yPercent: -100,
          duration: 1 * speed + 0.2,
          ease: "expo.inOut",
          onComplete: finish,
        }, "<");
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="pl-root fixed inset-0 z-[90] flex flex-col justify-between bg-bg p-6 sm:p-10"
    >
      <noscript>
        <style>{`.pl-root{display:none!important}`}</style>
      </noscript>
      <div className="pl-meta flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        <span>{profile.initials} / Portfolio</span>
        <span>London, UK</span>
      </div>

      <div className="font-display text-[clamp(3rem,11vw,9.5rem)] font-semibold leading-[0.9] text-fg">
        {profile.name.split(" ").slice(0, 2).map((w) => (
          <span key={w} className="mr-[0.25em] inline-block overflow-hidden align-top">
            <span className="pl-word inline-block">{w}</span>
          </span>
        ))}
        <br />
        {profile.name.split(" ").slice(2).map((w) => (
          <span key={w} className="mr-[0.25em] inline-block overflow-hidden align-top">
            <span className="pl-word inline-block text-accent">{w}</span>
          </span>
        ))}
      </div>

      <div>
        <div className="pl-meta mb-4 flex items-end justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            Loading experience
          </span>
          <span
            ref={counter}
            className="font-display text-6xl font-semibold tabular-nums text-fg sm:text-8xl"
          >
            000
          </span>
        </div>
        <div className="h-px w-full bg-line-strong">
          <div className="pl-bar h-full origin-left scale-x-0 bg-accent" />
        </div>
      </div>
    </div>
  );
}
