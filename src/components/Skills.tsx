"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { languageMix, skillGroups } from "@/data/profile";

const R = 78;
const C = 2 * Math.PI * R;
const TOTAL = languageMix.reduce((n, l) => n + l.count, 0);

// Pre-computed arc lengths and start offsets for each donut segment.
const segments = languageMix.reduce<
  { name: string; color: string; count: number; len: number; offset: number }[]
>((acc, l) => {
  const prev = acc[acc.length - 1];
  acc.push({
    ...l,
    len: (l.count / TOTAL) * C,
    offset: prev ? prev.offset + prev.len : 0,
  });
  return acc;
}, []);

function Donut() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-10 sm:flex-row lg:flex-col xl:flex-row">
      <svg
        viewBox="0 0 200 200"
        className="h-56 w-56 shrink-0 -rotate-90"
        role="img"
        aria-label={`Primary language mix across ${TOTAL} public repositories`}
      >
        <circle cx="100" cy="100" r={R} fill="none" stroke="#ffffff10" strokeWidth="22" />
        {segments.map((l, i) => {
          const { len, offset } = l;
          return (
            <motion.circle
              key={l.name}
              cx="100"
              cy="100"
              r={R}
              fill="none"
              stroke={l.color}
              strokeWidth={hover === l.name ? 28 : 22}
              strokeDashoffset={-offset}
              initial={{ strokeDasharray: `0 ${C}` }}
              whileInView={{ strokeDasharray: `${Math.max(len - 3, 0)} ${C - len + 3}` }}
              viewport={{ once: true, amount: 0.6 }}
              animate={{ opacity: hover && hover !== l.name ? 0.3 : 1 }}
              transition={{ duration: 1.2, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              style={{ cursor: "pointer" }}
              onPointerEnter={() => setHover(l.name)}
              onPointerLeave={() => setHover(null)}
            />
          );
        })}
      </svg>

      <div className="w-full">
        <p className="font-display text-5xl font-semibold text-fg">
          {TOTAL}
          <span className="ml-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            repos with code
          </span>
        </p>
        <ul className="mt-5 space-y-2.5">
          {languageMix.map((l) => (
            <li
              key={l.name}
              onPointerEnter={() => setHover(l.name)}
              onPointerLeave={() => setHover(null)}
              className="flex items-center gap-3 text-sm transition-opacity"
              style={{ opacity: hover && hover !== l.name ? 0.35 : 1 }}
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: l.color }} />
              <span className="text-fg">{l.name}</span>
              <span className="ml-auto font-mono text-xs text-muted">
                {l.count} · {Math.round((l.count / TOTAL) * 100)}%
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-xs leading-relaxed text-muted">
          Primary language of the 37 non-fork public GitHub repositories that contain code.
        </p>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative mx-auto max-w-[1500px] px-5 py-32 sm:px-10 sm:py-40"
    >
      <SectionHeading index="06" label="Skills">
        The <span className="text-accent">toolbox</span>
      </SectionHeading>

      <div className="mt-20 grid gap-16 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
        <Reveal>
          <div className="rounded-3xl border border-line bg-surface p-7 sm:p-9">
            <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              On GitHub
            </p>
            <Donut />
          </div>
        </Reveal>

        <div className="space-y-12">
          {skillGroups.map((g, gi) => (
            <div key={g.title}>
              <Reveal delay={gi * 0.05}>
                <p className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  <span className="text-accent">0{gi + 1}</span>
                  {g.title}
                  <span className="h-px flex-1 bg-line" />
                </p>
              </Reveal>
              <motion.ul
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={{ show: { transition: { staggerChildren: 0.03 } } }}
                className="flex flex-wrap gap-2.5"
              >
                {g.items.map((item) => (
                  <motion.li
                    key={item}
                    variants={{
                      hidden: { opacity: 0, y: 14, scale: 0.94 },
                      show: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: { type: "spring", stiffness: 260, damping: 22 },
                      },
                    }}
                    whileHover={{ y: -4, scale: 1.04 }}
                    className="cursor-default rounded-full border border-line-strong bg-surface px-4 py-2 text-sm text-fg/90 transition-colors hover:border-accent hover:text-accent"
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
