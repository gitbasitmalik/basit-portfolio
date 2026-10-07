"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, NO_REDUCED_MOTION } from "@/lib/gsap";

/**
 * Infinite marquee. Scroll speed and direction nudge its timeScale, so it
 * surges when you scroll quickly and reverses when you scroll up.
 */
export default function Marquee({
  items,
  className = "",
  duration = 38,
}: {
  items: readonly string[];
  className?: string;
  duration?: number;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(NO_REDUCED_MOTION, () => {
        const track = root.current?.querySelector<HTMLElement>(".mq-track");
        if (!track) return;
        const tween = gsap.to(track, {
          xPercent: -50,
          repeat: -1,
          duration,
          ease: "none",
        });
        const st = ScrollTrigger.create({
          onUpdate: (self) => {
            const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 350, 7);
            gsap.to(tween, {
              timeScale: self.direction * boost,
              duration: 0.25,
              overwrite: true,
              onComplete: () => {
                gsap.to(tween, { timeScale: self.direction, duration: 1.2 });
              },
            });
          },
        });
        return () => {
          st.kill();
          tween.kill();
        };
      });
    },
    { scope: root },
  );

  const group = (key: string) => (
    <ul key={key} className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={key === "b"}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-10 whitespace-nowrap">
          <span>{item}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        </li>
      ))}
    </ul>
  );

  return (
    <div ref={root} className={`overflow-hidden ${className}`}>
      <div className="mq-track flex w-max">
        {group("a")}
        {group("b")}
      </div>
    </div>
  );
}
