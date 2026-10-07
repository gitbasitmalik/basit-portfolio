"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Magnetic from "@/components/ui/Magnetic";
import { getLenis, scrollToId } from "@/lib/lenis";
import { profile } from "@/data/profile";

export const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "open-source", label: "Open source" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export default function Nav() {
  const [active, setActive] = useState<string>("");
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  // Hide on scroll down, reveal on scroll up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > prev && y > 220 && !open);
  });

  // Track which section is under the viewport centre.
  useEffect(() => {
    // "top" is the hero: when it is under the viewport centre, nothing is active.
    const els = ["top", ...sections.map((s) => s.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id === "top" ? "" : e.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Lock scroll while the mobile menu is open.
  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    // Wait a frame so the scroll lock is released first.
    requestAnimationFrame(() => scrollToId(id));
  };

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 30, delay: hidden ? 0 : 0.1 }}
        className="fixed inset-x-0 top-0 z-[80] flex items-center justify-between px-4 py-4 sm:px-8"
      >
        <Magnetic strength={0.25}>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              const lenis = getLenis();
              if (lenis) lenis.scrollTo(0, { duration: 1.6 });
              else window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label={`${profile.name}, back to top`}
            className="font-display flex h-11 items-center gap-2 rounded-full border border-line-strong bg-bg/85 px-4 text-lg font-semibold"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            {profile.initials}
          </a>
        </Magnetic>

        <nav
          aria-label="Primary"
          className={`hidden items-center gap-1 rounded-full border bg-bg/85 p-1.5 transition-colors md:flex ${
            scrolled ? "border-line-strong" : "border-line"
          }`}
        >
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => go(s.id)}
              aria-current={active === s.id ? "true" : undefined}
              className="relative rounded-full px-4 py-2 text-sm text-muted transition-colors hover:text-fg aria-[current=true]:text-black"
            >
              {active === s.id && (
                <motion.span
                  layoutId="nav-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded-full bg-accent"
                />
              )}
              <span className="relative z-10">{s.label}</span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Magnetic strength={0.3} className="hidden sm:inline-block">
            <button
              type="button"
              onClick={() => go("contact")}
              data-cursor="Hi"
              className="h-11 rounded-full bg-fg px-5 text-sm font-medium text-black transition-colors hover:bg-accent"
            >
              Let&apos;s talk
            </button>
          </Magnetic>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-[90] flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-bg/85 md:hidden"
          >
            <span className="relative block h-3 w-5">
              <motion.span
                animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                className="absolute left-0 top-0 block h-px w-5 bg-fg"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                className="absolute bottom-0 left-0 block h-px w-5 bg-fg"
              />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[75] flex flex-col justify-center bg-bg-2 px-8 md:hidden"
          >
            <ul className="space-y-1">
              {sections.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.25 + i * 0.06 } }}
                  exit={{ opacity: 0 }}
                >
                  <button
                    type="button"
                    onClick={() => go(s.id)}
                    className="font-display flex w-full items-baseline gap-4 py-2 text-left text-5xl font-semibold text-fg"
                  >
                    <span className="font-mono text-xs text-accent">
                      0{i + 1}
                    </span>
                    {s.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <motion.a
              href={`mailto:${profile.email}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.7 } }}
              className="mt-10 font-mono text-sm text-muted"
            >
              {profile.email}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
