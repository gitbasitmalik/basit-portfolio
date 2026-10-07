"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Reveal from "@/components/ui/Reveal";
import { openSource } from "@/data/profile";

const fmt = (n: number) => n.toLocaleString("en-GB");

export default function OpenSource() {
  return (
    <section
      id="open-source"
      className="relative mx-auto max-w-[1500px] px-5 py-32 sm:px-10 sm:py-40"
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading index="05" label="Open source">
            Fixes in code
            <br />I <span className="text-accent">don&apos;t</span> own
          </SectionHeading>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-muted">
              Three pull requests merged into public repositories in June 2026:
              an accessibility fix, a data-fetching bug fix and a dashboard
              feature. Each links to the real pull request.
            </p>
            <a
              href="https://github.com/gitbasitmalik"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-3 font-mono text-sm text-fg"
            >
              <span className="border-b border-accent pb-0.5">
                github.com/gitbasitmalik
              </span>
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                ↗
              </span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </Reveal>
        </div>

        <ul className="space-y-6">
          {openSource.map((pr, i) => {
            const total = pr.additions + pr.deletions;
            const addShare = (pr.additions / total) * 100;
            return (
              <li key={pr.href}>
                <Reveal delay={i * 0.08}>
                  <SpotlightCard className="group p-6 sm:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <a
                          href={pr.repoHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-sm text-muted transition-colors hover:text-accent"
                        >
                          {pr.repo}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                        <p className="mt-1 flex items-center gap-3 font-mono text-[11px] text-muted/80">
                          <span>★ {fmt(pr.stars)}</span>
                          <span>{pr.language}</span>
                        </p>
                      </div>
                      <span className="flex items-center gap-2 rounded-full border border-accent/40 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        Merged {pr.merged}
                      </span>
                    </div>

                    <h3 className="font-display mt-6 text-2xl font-semibold leading-tight text-fg sm:text-[1.9rem]">
                      {pr.title}
                    </h3>

                    <div className="mt-8">
                      <div
                        className="flex h-2.5 overflow-hidden rounded-full bg-surface-2"
                        role="img"
                        aria-label={`${pr.additions} additions, ${pr.deletions} deletions`}
                      >
                        <motion.div
                          className="h-full origin-left bg-accent"
                          style={{ width: `${addShare}%` }}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true, amount: 0.8 }}
                          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        />
                        <motion.div
                          className="h-full origin-left bg-accent-3"
                          style={{ width: `${100 - addShare}%` }}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true, amount: 0.8 }}
                          transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                        <p className="flex items-center gap-4">
                          <span className="text-accent">+{fmt(pr.additions)}</span>
                          <span className="text-accent-3">−{fmt(pr.deletions)}</span>
                          <span className="text-muted">
                            {pr.files} {pr.files === 1 ? "file" : "files"}
                          </span>
                        </p>
                        <a
                          href={pr.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-2 text-fg transition-colors hover:text-accent"
                        >
                          View pull request #{pr.number}
                          <span
                            aria-hidden="true"
                            className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                          >
                            ↗
                          </span>
                          <span className="sr-only">(opens in a new tab)</span>
                        </a>
                      </div>
                    </div>
                  </SpotlightCard>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
