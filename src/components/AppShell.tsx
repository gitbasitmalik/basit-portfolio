"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/ui/Cursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Nav from "@/components/Nav";

const ReadyContext = createContext(false);

/** True once the preloader has finished and the page can start animating. */
export const useReady = () => useContext(ReadyContext);

export default function AppShell({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  return (
    <ReadyContext.Provider value={ready}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black"
      >
        Skip to content
      </a>
      <SmoothScroll />
      <Cursor />
      <ScrollProgress />
      <Preloader onDone={() => setReady(true)} />
      <Nav />
      <main id="main">{children}</main>
    </ReadyContext.Provider>
  );
}
