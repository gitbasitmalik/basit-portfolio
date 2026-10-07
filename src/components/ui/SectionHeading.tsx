import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";

/** Numbered eyebrow + large display title shared by every section. */
export default function SectionHeading({
  index,
  label,
  children,
  className = "",
}: {
  index: string;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Reveal>
        <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted">
          <span className="text-accent">{index}</span>
          <span className="h-px w-10 bg-line-strong" />
          {label}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display text-[clamp(2.4rem,6.5vw,5.5rem)] font-semibold leading-[0.95] text-fg">
          {children}
        </h2>
      </Reveal>
    </div>
  );
}
