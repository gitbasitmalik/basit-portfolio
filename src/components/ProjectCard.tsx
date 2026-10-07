"use client";

import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import ProjectArt from "@/components/art/ProjectArt";
import type { Project } from "@/data/profile";

function Visual({ project }: { project: Project }) {
  if (project.visual.type === "image") {
    const host = project.links[0]
      ? new URL(project.links[0].href).host.replace(/^www\./, "")
      : "";
    return (
      <div
        className="absolute inset-0 flex items-center justify-center p-5 sm:p-8"
        style={{
          background: `radial-gradient(circle at 50% 35%, ${project.accent}33, transparent 70%), #0d0d12`,
        }}
      >
        <div className="w-full overflow-hidden rounded-xl border border-white/15 bg-[#111118] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
          <div className="flex h-8 items-center gap-1.5 border-b border-white/10 bg-[#1a1a23] px-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            {host && (
              <span className="mx-auto truncate rounded-md bg-black/40 px-3 py-0.5 font-mono text-[10px] text-white/55">
                {host}
              </span>
            )}
          </div>
          <div
            className="relative"
            style={{ aspectRatio: project.visual.aspect }}
          >
            <Image
              src={project.visual.src}
              alt={project.visual.alt}
              fill
              sizes="(min-width: 1024px) 520px, 90vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    );
  }
  return <ProjectArt kind={project.visual.art} />;
}

export default function ProjectCard({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-9, 9]), {
    stiffness: 150,
    damping: 18,
  });
  const glareX = useTransform(mx, (v) => v * 100);
  const glareY = useTransform(my, (v) => v * 100);
  const glare = useMotionTemplate`radial-gradient(380px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.14), transparent 60%)`;

  const primary = project.links[0];

  const visual = (
    <motion.div
      style={reduce ? undefined : { rotateX, rotateY }}
      className="absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover/visual:scale-[1.04]">
        <Visual project={project} />
      </div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/visual:opacity-100"
        style={{ background: glare }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    </motion.div>
  );

  const visualProps = {
    className:
      "group/visual relative block aspect-[16/10] w-full overflow-hidden [perspective:1100px] lg:aspect-auto lg:h-auto lg:w-[54%] lg:shrink-0",
    onPointerMove: (e: React.PointerEvent<HTMLElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width);
      my.set((e.clientY - r.top) / r.height);
    },
    onPointerLeave: () => {
      mx.set(0.5);
      my.set(0.5);
    },
  };

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, scale: 0.94, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="flex w-full shrink-0 flex-col overflow-hidden rounded-[2rem] border border-line bg-surface lg:h-[min(74vh,640px)] lg:w-[min(78vw,1060px)] lg:flex-row"
      style={{ boxShadow: `0 40px 120px -60px ${project.accent}55` }}
    >
      {primary ? (
        <a
          href={primary.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title}: ${primary.label} (opens in a new tab)`}
          data-cursor={primary.type === "live" ? "Visit" : "Code"}
          {...visualProps}
        >
          {visual}
        </a>
      ) : (
        <div {...visualProps}>{visual}</div>
      )}

      <div className="relative flex flex-1 flex-col justify-between gap-6 p-6 sm:p-8 lg:p-9">
        <div>
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            <span className="whitespace-nowrap">
              <span style={{ color: project.accent }}>
                {String(index + 1).padStart(2, "0")}
              </span>{" "}
              / {String(total).padStart(2, "0")}
            </span>
            <span className="flex items-center gap-2">
              {project.badge && (
                <span
                  className="rounded-full border px-2.5 py-0.5"
                  style={{ borderColor: `${project.accent}66`, color: project.accent }}
                >
                  {project.badge}
                </span>
              )}
              {project.kind} · {project.year}
            </span>
          </div>

          <h3 className="font-display mt-5 text-[clamp(1.9rem,3.2vw,3rem)] font-semibold leading-[1] text-fg">
            {project.title}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            {project.blurb}
          </p>

          <ul className="mt-5 space-y-2.5 text-[13.5px] leading-snug text-fg/80">
            {project.points.map((p) => (
              <li key={p} className="flex gap-3">
                <span
                  className="mt-[7px] h-1 w-3 shrink-0 rounded-full"
                  style={{ background: project.accent }}
                />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-black transition-colors hover:bg-accent"
              >
                {l.label}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                >
                  ↗
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ))}
            {project.links.length === 0 && (
              <span className="rounded-full border border-dashed border-line-strong px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                Private · no public link
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
