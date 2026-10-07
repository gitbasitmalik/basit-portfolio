"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Reveal from "@/components/ui/Reveal";
import { certifications, education, research } from "@/data/profile";

const view = { once: true, amount: 0.5 } as const;
const ease = [0.22, 1, 0.36, 1] as const;

/** Animated diagram of the MSc dissertation's analysis pipeline. */
function Pipeline() {
  const steps = research.pipeline;
  const w = 600;
  const nodeW = 118;
  const gap = (w - nodeW * steps.length) / (steps.length - 1);

  return (
    <svg
      viewBox={`0 0 ${w} 150`}
      role="img"
      aria-label={`Pipeline: ${steps.join(", then ")}`}
      className="h-auto w-full"
    >
      {steps.map((label, i) => {
        const x = i * (nodeW + gap);
        const last = i === steps.length - 1;
        return (
          <g key={label}>
            {i < steps.length - 1 && (
              <>
                <motion.line
                  x1={x + nodeW}
                  y1="75"
                  x2={x + nodeW + gap}
                  y2="75"
                  stroke="#ffffff30"
                  strokeWidth="2"
                  strokeDasharray="4 6"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={view}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.35, ease }}
                />
                <motion.circle
                  r="4"
                  cy="75"
                  fill="#d6ff3c"
                  initial={{ cx: x + nodeW, opacity: 0 }}
                  animate={{ cx: [x + nodeW, x + nodeW + gap], opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    repeatDelay: steps.length * 0.45 - 1.4 > 0 ? steps.length * 0.45 - 1.4 : 0.2,
                    delay: 1.2 + i * 0.45,
                    ease: "easeInOut",
                  }}
                />
              </>
            )}
            <motion.g
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={view}
              transition={{ duration: 0.6, delay: i * 0.3, ease }}
            >
              <rect
                x={x}
                y="40"
                width={nodeW}
                height="70"
                rx="16"
                fill={last ? "#d6ff3c" : "#17171f"}
                stroke={last ? "none" : "#ffffff26"}
              />
              <text
                x={x + nodeW / 2}
                y="70"
                textAnchor="middle"
                fontSize="11"
                fontFamily="monospace"
                fill={last ? "#0a0a0a" : "#9b9aa4"}
              >
                {`0${i + 1}`}
              </text>
              <text
                x={x + nodeW / 2}
                y="92"
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill={last ? "#0a0a0a" : "#f3f2ed"}
              >
                {label}
              </text>
            </motion.g>
          </g>
        );
      })}
    </svg>
  );
}

export default function Education() {
  return (
    <section
      id="education"
      className="relative mx-auto max-w-[1500px] px-5 py-32 sm:px-10 sm:py-40"
    >
      <SectionHeading index="07" label="Education & research">
        Studying why code
        <br />
        <span className="text-stroke">runs slow</span>
      </SectionHeading>

      <div className="mt-20 grid gap-6 lg:grid-cols-[1fr_1.25fr]">
        <div className="space-y-6">
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 0.08}>
              <SpotlightCard className="p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                  {e.period}
                </p>
                <h3 className="font-display mt-3 text-2xl font-semibold text-fg">
                  {e.degree}
                </h3>
                <p className="mt-1.5 text-sm text-muted">{e.school}</p>
              </SpotlightCard>
            </Reveal>
          ))}

          <Reveal delay={0.16}>
            <SpotlightCard className="p-7">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Certifications · 2025
              </p>
              <ul className="flex flex-wrap gap-2">
                {certifications.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-line-strong px-3.5 py-1.5 text-[13px] text-fg/90"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <SpotlightCard className="flex h-full flex-col justify-between gap-10 p-7 sm:p-10">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                {research.title} · {research.year}
              </p>
              <p className="font-display mt-5 text-[clamp(1.35rem,2.2vw,1.9rem)] font-medium leading-[1.25] text-fg">
                {research.summary}
              </p>
            </div>
            <Pipeline />
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
