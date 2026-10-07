"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, NO_REDUCED_MOTION } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Reveal from "@/components/ui/Reveal";
import { profile, stats } from "@/data/profile";

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(NO_REDUCED_MOTION, () => {
        // Words light up as you scroll through the paragraph.
        const split = SplitText.create(".about-text", {
          type: "words",
          autoSplit: true,
          onSplit: (self) =>
            gsap.fromTo(
              self.words,
              { opacity: 0.16 },
              {
                opacity: 1,
                stagger: 0.12,
                ease: "none",
                scrollTrigger: {
                  trigger: ".about-text",
                  start: "top 82%",
                  end: "bottom 55%",
                  scrub: true,
                },
              },
            ),
        });

        // Count-up numbers.
        gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
          const target = Number(el.dataset.value ?? 0);
          const state = { v: 0 };
          el.textContent = "0";
          gsap.to(state, {
            v: target,
            duration: 2.2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
            onUpdate: () => {
              el.textContent = String(Math.round(state.v));
            },
          });
        });

        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section
      id="about"
      ref={root}
      className="relative mx-auto max-w-[1500px] px-5 py-32 sm:px-10 sm:py-44"
    >
      <SectionHeading index="01" label="About">
        A builder who <span className="text-accent">ships</span>
        <br />
        and keeps learning.
      </SectionHeading>

      <p className="about-text font-display mt-16 max-w-[28ch] text-[clamp(1.5rem,3.1vw,2.75rem)] font-medium leading-[1.2] text-fg sm:max-w-[34ch] lg:max-w-[40ch]">
        {profile.summary}
      </p>

      <div className="mt-24 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-bg p-6 sm:p-10">
            <div className="font-display flex items-baseline text-[clamp(3.2rem,7vw,6rem)] font-semibold leading-none text-fg">
              <span className="stat-num tabular-nums" data-value={s.value}>
                {s.value}
              </span>
              <span className="text-accent">{s.suffix}</span>
            </div>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {[
          {
            k: "Studying",
            t: "MSc Software Engineering",
            d: "University of Hertfordshire, finishing Nov 2026.",
          },
          {
            k: "Researching",
            t: "LLMs for performance linting",
            d: "Finding re-render, waterfall and data-leak anti-patterns in React apps.",
          },
          {
            k: "Based in",
            t: "London, England",
            d: "Open to full-time UK engineering roles.",
          },
        ].map((c, i) => (
          <Reveal key={c.k} delay={i * 0.08}>
            <SpotlightCard className="h-full p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                {c.k}
              </p>
              <h3 className="font-display mt-4 text-2xl font-semibold text-fg">
                {c.t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.d}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
