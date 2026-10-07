"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { builds, type Build } from "@/data/profile";

const filters = ["All", "Web", "Mobile", "Full-stack", "Backend", "Desktop"] as const;
type Filter = (typeof filters)[number];

function LinkPill({
  href,
  label,
  title,
}: {
  href: string;
  label: string;
  title: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-fg transition-colors hover:border-accent hover:bg-accent hover:text-black"
    >
      {label}
      <span aria-hidden="true">↗</span>
      <span className="sr-only">
        ({title} {label.toLowerCase()}, opens in a new tab)
      </span>
    </a>
  );
}

function BuildCard({ build }: { build: Build }) {
  const hasLinks = !!(build.liveHref || build.href);
  return (
    <SpotlightCard className="group flex h-full flex-col justify-between p-6 transition-transform duration-500 hover:-translate-y-1">
      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-line-strong px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            {build.kind}
          </span>
          {hasLinks ? (
            <div className="flex flex-wrap justify-end gap-2">
              {build.liveHref && (
                <LinkPill href={build.liveHref} label="Live" title={build.title} />
              )}
              {build.href && (
                <LinkPill href={build.href} label="Code" title={build.title} />
              )}
            </div>
          ) : (
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted/70">
              Private
            </span>
          )}
        </div>
        <h3 className="font-display mt-6 text-2xl font-semibold text-fg">
          {build.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{build.blurb}</p>
      </div>
      <div className="mt-6 flex flex-wrap gap-1.5">
        {build.tags.map((t) => (
          <span
            key={t}
            className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[10.5px] text-muted"
          >
            {t}
          </span>
        ))}
      </div>
    </SpotlightCard>
  );
}

export default function MoreBuilds() {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = filter === "All" ? builds : builds.filter((b) => b.kind === filter);

  return (
    <section
      id="builds"
      className="relative mx-auto max-w-[1500px] px-5 py-32 sm:px-10 sm:py-40"
    >
      <SectionHeading index="04" label="More builds">
        The <span className="text-stroke">long tail</span>
      </SectionHeading>

      <LayoutGroup>
        <div
          role="group"
          aria-label="Filter projects by type"
          className="mt-14 flex flex-wrap items-center gap-2"
        >
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className="relative rounded-full border border-line px-5 py-2.5 text-sm text-muted transition-colors hover:text-fg aria-pressed:text-black"
            >
              {filter === f && (
                <motion.span
                  layoutId="filter-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded-full bg-accent"
                />
              )}
              <span className="relative z-10">{f}</span>
            </button>
          ))}
          <p className="ml-auto font-mono text-xs text-muted" aria-live="polite">
            {shown.length} of {builds.length}
          </p>
        </div>

        <motion.ul layout className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((b) => (
              <motion.li
                key={b.title}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="min-h-[240px]"
              >
                <BuildCard build={b} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>
    </section>
  );
}
