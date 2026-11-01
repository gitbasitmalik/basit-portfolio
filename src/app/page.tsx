import type { Metadata } from "next";

// The homepage is the interactive "Basit's London" experience.
// In production the next.config rewrite serves /public/london/index.html
// directly at "/" (best for SEO). This component is a guaranteed fallback:
// if the rewrite is ever not applied, "/" still shows the game full-screen
// (and never the old site) via the embed below.

export const metadata: Metadata = {
  title: "Basit Ur Rehman Malik — Software Engineer, London",
  description:
    "Explore the portfolio of Basit Ur Rehman Malik, a London-based full-stack and React Native engineer, as an interactive walk along the Thames from London Bridge to Tower Bridge.",
  alternates: { canonical: "https://www.basitmalik.me/" },
};

export default function Home() {
  return (
    <main>
      <iframe
        src="/london/index.html"
        title="Basit's London — an interactive portfolio"
        allow="fullscreen"
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          border: 0,
          display: "block",
        }}
      />
      {/* Crawlable summary for search engines (visually hidden). */}
      <div className="sr-only">
        <h1>
          Basit Ur Rehman Malik — Software Engineer (Full-Stack and React
          Native), London
        </h1>
        <p>
          Basit Ur Rehman Malik builds web and mobile products end to end with
          Next.js, React, React Native, Node, Python and PostgreSQL, and is open
          to full-time engineering roles in the UK. 47+ public GitHub
          repositories, three merged open-source pull requests, four engineering
          internships, and an MSc in Software Engineering (University of
          Hertfordshire, 2026). Selected work includes LocalLens, NaanStaap,
          WestwayRide, JFA Construction Group, EcoRentUK, Restaurant POS and
          Wheel Magic.
        </p>
        <p>
          Contact: basiturrehmanmalik.cc@gmail.com. GitHub:
          github.com/gitbasitmalik. LinkedIn: linkedin.com/in/basitmalik001.
        </p>
      </div>
    </main>
  );
}
