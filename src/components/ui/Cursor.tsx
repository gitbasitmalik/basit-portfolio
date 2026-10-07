"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Custom cursor: a precise dot plus a trailing ring that grows over
 * interactive elements and can show a label via `data-cursor="Label"`.
 * Only active on devices with a fine pointer and no reduced-motion setting.
 */
export default function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const dotEl = dot.current;
          const ringEl = ring.current;
          const labelEl = label.current;
          if (!dotEl || !ringEl || !labelEl || !root.current) return;

          document.documentElement.classList.add("has-custom-cursor");
          gsap.set(root.current, { autoAlpha: 0 });
          gsap.set([dotEl, ringEl], { xPercent: -50, yPercent: -50 });

          const dx = gsap.quickTo(dotEl, "x", { duration: 0.08, ease: "none" });
          const dy = gsap.quickTo(dotEl, "y", { duration: 0.08, ease: "none" });
          const rx = gsap.quickTo(ringEl, "x", { duration: 0.45, ease: "power3.out" });
          const ry = gsap.quickTo(ringEl, "y", { duration: 0.45, ease: "power3.out" });

          let shown = false;
          const onMove = (e: PointerEvent) => {
            if (!shown) {
              shown = true;
              gsap.to(root.current, { autoAlpha: 1, duration: 0.3 });
              gsap.set([dotEl, ringEl], { x: e.clientX, y: e.clientY });
            }
            dx(e.clientX);
            dy(e.clientY);
            rx(e.clientX);
            ry(e.clientY);
          };

          const setState = (size: number, text: string, fill: boolean) => {
            gsap.to(ringEl, {
              width: size,
              height: size,
              backgroundColor: fill ? "rgba(214,255,60,0.95)" : "rgba(214,255,60,0)",
              borderColor: fill ? "rgba(214,255,60,0)" : "rgba(243,242,237,0.55)",
              duration: 0.35,
              ease: "power3.out",
            });
            labelEl.textContent = text;
            gsap.to(labelEl, { autoAlpha: text ? 1 : 0, duration: 0.2 });
            gsap.to(dotEl, { scale: text ? 0 : 1, duration: 0.2 });
          };

          const onOver = (e: MouseEvent) => {
            const t = e.target as HTMLElement | null;
            if (!t?.closest) return;
            const labelled = t.closest<HTMLElement>("[data-cursor]");
            if (labelled) {
              setState(84, labelled.dataset.cursor ?? "", true);
              return;
            }
            if (t.closest("a, button, [role='button'], input, textarea")) {
              setState(56, "", false);
              return;
            }
            setState(34, "", false);
          };

          const onLeaveDoc = () => gsap.to(root.current, { autoAlpha: 0, duration: 0.2 });
          const onEnterDoc = () => {
            if (shown) gsap.to(root.current, { autoAlpha: 1, duration: 0.2 });
          };

          window.addEventListener("pointermove", onMove, { passive: true });
          document.addEventListener("mouseover", onOver, { passive: true });
          document.documentElement.addEventListener("mouseleave", onLeaveDoc);
          document.documentElement.addEventListener("mouseenter", onEnterDoc);

          return () => {
            document.documentElement.classList.remove("has-custom-cursor");
            window.removeEventListener("pointermove", onMove);
            document.removeEventListener("mouseover", onOver);
            document.documentElement.removeEventListener("mouseleave", onLeaveDoc);
            document.documentElement.removeEventListener("mouseenter", onEnterDoc);
          };
        },
      );
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[95] invisible"
    >
      <div
        ref={ring}
        className="fixed left-0 top-0 flex h-[34px] w-[34px] items-center justify-center rounded-full border border-fg/55 mix-blend-normal"
      >
        <span
          ref={label}
          className="invisible whitespace-nowrap font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-black"
        />
      </div>
      <div
        ref={dot}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-accent"
      />
    </div>
  );
}
