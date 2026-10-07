"use client";

import { useRef } from "react";
import { gsap, useGSAP, NO_REDUCED_MOTION } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Reveal from "@/components/ui/Reveal";
import { experience } from "@/data/profile";

export default function Experience() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(NO_REDUCED_MOTION, () => {
        // The progress line draws as you scroll down the timeline.
        gsap.fromTo(
          ".tl-progress",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top",
            scrollTrigger: {
              trigger: ".tl",
              start: "top 65%",
              end: "bottom 60%",
              scrub: true,
            },
          },
        );
        // Each node lights up when the line reaches it.
        gsap.utils.toArray<HTMLElement>(".tl-dot").forEach((dot) => {
          gsap.to(dot, {
            backgroundColor: "#d6ff3c",
            borderColor: "#d6ff3c",
            scale: 1.35,
            duration: 0.4,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: dot,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      id="experience"
      ref={root}
      className="relative mx-auto max-w-[1500px] px-5 py-32 sm:px-10 sm:py-40"
    >
      <SectionHeading index="02" label="Experience">
        Where I&apos;ve
        <br />
        been <span className="text-stroke">building</span>
      </SectionHeading>

      <ol className="tl relative mt-20 ml-2 space-y-10 pl-8 sm:ml-4 sm:pl-14 lg:pl-20">
        <span
          aria-hidden="true"
          className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px bg-line-strong"
        />
        <span
          aria-hidden="true"
          className="tl-progress absolute left-0 top-2 h-[calc(100%-1rem)] w-px origin-top bg-accent"
        />

        {experience.map((job, i) => (
          <li key={job.company + job.role} className="relative">
            <span
              aria-hidden="true"
              className="tl-dot absolute -left-8 top-8 h-3 w-3 -translate-x-1/2 rounded-full border border-line-strong bg-bg sm:-left-14 lg:-left-20"
            />
            <Reveal delay={0.05}>
              <SpotlightCard className="p-6 sm:p-9">
                <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-2">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                      0{i + 1} · {job.role}
                    </p>
                    <h3 className="font-display mt-3 text-3xl font-semibold text-fg sm:text-4xl">
                      {job.company}
                    </h3>
                    {job.place && (
                      <p className="mt-1 text-sm text-muted">{job.place}</p>
                    )}
                  </div>
                  <p className="rounded-full border border-line-strong px-4 py-1.5 font-mono text-xs text-muted">
                    {job.period}
                  </p>
                </div>

                <ul className="mt-6 space-y-3 text-[15px] leading-relaxed text-fg/80">
                  {job.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap gap-2">
                  {job.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
