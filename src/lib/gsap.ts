import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

// Registered once, on first import from a client component.
gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };

export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
export const NO_REDUCED_MOTION = "(prefers-reduced-motion: no-preference)";
