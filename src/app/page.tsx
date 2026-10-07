import { existsSync } from "node:fs";
import { join } from "node:path";
import AppShell from "@/components/AppShell";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Work from "@/components/Work";
import MoreBuilds from "@/components/MoreBuilds";
import OpenSource from "@/components/OpenSource";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import { profile } from "@/data/profile";

export default function Home() {
  // The "Download CV" button only appears once the PDF is dropped into /public.
  const hasCv = existsSync(join(process.cwd(), "public", profile.cvPath));

  return (
    <AppShell>
      <Hero />
      <About />
      <Experience />
      <Work />
      <MoreBuilds />
      <OpenSource />
      <Skills />
      <Education />
      <Contact hasCv={hasCv} />
    </AppShell>
  );
}
