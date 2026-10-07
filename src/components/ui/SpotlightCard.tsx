"use client";

import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

/** Card whose background glow follows the pointer. */
export default function SpotlightCard({
  children,
  className = "",
  ...rest
}: { children: ReactNode; className?: string } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      style={{ "--mx": "50%", "--my": "0%" } as CSSProperties}
      className={`spotlight-card rounded-3xl border border-line transition-colors duration-500 hover:border-line-strong ${className}`}
    >
      {children}
    </div>
  );
}
