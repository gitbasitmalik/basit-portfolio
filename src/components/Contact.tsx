"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap, SplitText, useGSAP, NO_REDUCED_MOTION } from "@/lib/gsap";
import Magnetic from "@/components/ui/Magnetic";
import { getLenis } from "@/lib/lenis";
import { profile } from "@/data/profile";

function useLondonTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: profile.timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const tick = () => setTime(fmt.format(new Date()));
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);
  return time;
}

const socials = [
  { label: "GitHub", href: profile.github, handle: `@${profile.githubHandle}` },
  { label: "LinkedIn", href: profile.linkedin, handle: "in/basitmalik001" },
  { label: "Email", href: `mailto:${profile.email}`, handle: "Say hello" },
] as const;

export default function Contact({ hasCv }: { hasCv: boolean }) {
  const root = useRef<HTMLElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const [copied, setCopied] = useState(false);
  const time = useLondonTime();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(NO_REDUCED_MOTION, () => {
        const split = SplitText.create(".contact-title", {
          type: "lines,chars",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.chars, {
              yPercent: 110,
              duration: 1,
              stagger: 0.02,
              ease: "expo.out",
              scrollTrigger: { trigger: ".contact-title", start: "top 85%", once: true },
            }),
        });
        return () => split.revert();
      });
    },
    { scope: root },
  );

  const scramble = () => {
    const el = emailRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(el, {
      duration: 0.9,
      scrambleText: { text: profile.email, chars: "upperAndLowerCase", speed: 0.5 },
    });
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section
      id="contact"
      ref={root}
      className="relative overflow-hidden px-5 pb-10 pt-32 sm:px-10 sm:pt-44"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(ellipse_at_50%_0%,rgba(124,108,255,0.22),transparent_70%)]" />

      <div className="relative mx-auto max-w-[1500px]">
        <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted">
          <span className="text-accent">08</span>
          <span className="h-px w-10 bg-line-strong" />
          Contact
        </p>

        <h2 className="contact-title font-display text-[clamp(3.2rem,11.5vw,11rem)] font-semibold leading-[0.9] text-fg">
          Let&apos;s build
          <br />
          something <span className="text-accent">good.</span>
        </h2>

        <div className="mt-16">
          <a
            ref={emailRef}
            href={`mailto:${profile.email}?subject=Hello%20Basit`}
            onPointerEnter={scramble}
            onFocus={scramble}
            data-cursor="Write"
            className="font-display inline-block max-w-full break-words text-[clamp(1.2rem,4.4vw,3.6rem)] font-medium text-fg underline decoration-accent decoration-2 underline-offset-[10px] transition-colors hover:text-accent"
          >
            {profile.email}
          </a>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={copy}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
            >
              {copied ? "Copied to clipboard ✓" : "Copy email"}
            </button>
            {hasCv && (
              <a
                href={profile.cvPath}
                download
                className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-black"
              >
                Download CV <span aria-hidden="true">↓</span>
              </a>
            )}
            <AnimatePresence>
              {copied && (
                <motion.span
                  role="status"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="font-mono text-xs text-accent"
                >
                  Ready to paste
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        <ul className="mt-14 grid gap-3 sm:grid-cols-3">
          {socials.map((s) => (
            <li key={s.label}>
              <Magnetic strength={0.12} className="block w-full">
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex h-full flex-col justify-between rounded-3xl border border-line bg-surface p-6 transition-colors hover:border-accent"
                >
                  <span className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                    {s.label}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    >
                      ↗
                    </span>
                  </span>
                  <span className="font-display mt-10 block text-2xl font-semibold text-fg">
                    {s.handle}
                  </span>
                  {s.href.startsWith("http") && (
                    <span className="sr-only">(opens in a new tab)</span>
                  )}
                </a>
              </Magnetic>
            </li>
          ))}
        </ul>

        <footer className="mt-28 flex flex-col items-start justify-between gap-6 border-t border-line pt-8 font-mono text-xs text-muted sm:flex-row sm:items-center">
          <p className="flex items-center gap-3">
            <span className="pulse-dot h-2 w-2 rounded-full bg-accent" />
            London {time ? <span className="tabular-nums text-fg">{time}</span> : null}
          </p>
          <p>© 2026 {profile.name}. Built with Next.js, GSAP &amp; Framer Motion.</p>
          <button
            type="button"
            onClick={() => {
              const lenis = getLenis();
              if (lenis) lenis.scrollTo(0, { duration: 2 });
              else window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group inline-flex items-center gap-2 text-fg"
          >
            Back to top
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong transition-all group-hover:-translate-y-1 group-hover:border-accent group-hover:text-accent"
            >
              ↑
            </span>
          </button>
        </footer>
      </div>
    </section>
  );
}
