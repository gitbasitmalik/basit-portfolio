"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Magnetic from "@/components/ui/Magnetic";
import { scrollToId } from "@/lib/lenis";
import { featured } from "@/data/profile";

/**
 * Selected work. On large screens the section pins and the cards travel
 * horizontally as you scroll (GSAP ScrollTrigger). On small screens or with
 * reduced motion it falls back to a normal vertical stack.
 */
export default function Work() {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const wrapEl = wrap.current;
          const trackEl = track.current;
          if (!wrapEl || !trackEl) return;

          const getDist = () =>
            Math.max(0, trackEl.scrollWidth - window.innerWidth);
          const counter = wrapEl.querySelector<HTMLElement>(".work-counter");
          const total = featured.length;

          const tween = gsap.to(trackEl, {
            x: () => -getDist(),
            ease: "none",
          });

          const st = ScrollTrigger.create({
            trigger: wrapEl,
            start: "top top",
            end: () => "+=" + getDist(),
            pin: true,
            scrub: 0.8,
            animation: tween,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              gsap.set(".work-progress", { scaleX: self.progress });
              if (counter) {
                const i = Math.min(
                  total,
                  Math.max(1, Math.round(self.progress * (total - 1)) + 1),
                );
                counter.textContent = String(i).padStart(2, "0");
              }
            },
          });

          return () => {
            st.kill();
            tween.kill();
          };
        },
      );
    },
    { scope: wrap },
  );

  return (
    <section
      id="work"
      ref={wrap}
      className="relative overflow-hidden py-28 lg:h-screen lg:py-0"
    >
      <div
        ref={track}
        className="flex flex-col gap-10 px-5 sm:px-10 lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-12 lg:px-[6vw]"
      >
        {/* Intro panel */}
        <div className="lg:w-[min(36vw,520px)] lg:shrink-0">
          <SectionHeading index="03" label="Selected work">
            Things I&apos;ve
            <br />
            <span className="text-accent">built</span> &amp; shipped
          </SectionHeading>
          <p className="mt-8 max-w-sm text-[15px] leading-relaxed text-muted">
            Real client sites, mobile apps, SaaS prototypes and a spare-parts
            marketplace. Scroll to travel through them; links open the live
            site or the code where it&apos;s public.
          </p>
          <p className="mt-8 hidden items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted lg:flex">
            <span className="inline-block h-px w-12 bg-accent" />
            Keep scrolling
            <span aria-hidden="true" className="inline-block animate-[float-y_2s_ease-in-out_infinite]">
              →
            </span>
          </p>
        </div>

        {featured.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={i}
            total={featured.length}
          />
        ))}

        {/* Outro panel */}
        <div className="flex flex-col items-start gap-6 lg:w-[min(28vw,380px)] lg:shrink-0">
          <p className="font-display text-4xl font-semibold leading-tight text-fg">
            More builds,
            <br />
            <span className="text-stroke">smaller scale</span>
          </p>
          <Magnetic>
            <button
              type="button"
              data-cursor="Go"
              onClick={() => scrollToId("builds")}
              className="group flex h-14 items-center gap-3 rounded-full border border-line-strong pl-7 pr-3 text-sm font-medium text-fg hover:border-accent"
            >
              See the rest
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-black transition-transform duration-500 group-hover:rotate-90">
                ↓
              </span>
            </button>
          </Magnetic>
        </div>
      </div>

      {/* Progress (desktop pin only) */}
      <div className="pointer-events-none absolute inset-x-[6vw] bottom-8 hidden items-center gap-5 lg:flex">
        <span className="font-mono text-xs text-accent">
          <span className="work-counter">01</span>
          <span className="text-muted"> / {String(featured.length).padStart(2, "0")}</span>
        </span>
        <div className="h-px flex-1 bg-line-strong">
          <div className="work-progress h-full origin-left scale-x-0 bg-accent" />
        </div>
      </div>
    </section>
  );
}
