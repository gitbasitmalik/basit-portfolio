# Basit Ur Rehman Malik, portfolio

A single-page portfolio built with **Next.js 16 (App Router)**, **GSAP** (+ ScrollTrigger, SplitText, ScrambleText), **Framer Motion**, **Lenis** smooth scrolling and **Tailwind CSS 4**.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Edit the content

Everything on the page comes from one file: [`src/data/profile.ts`](src/data/profile.ts)
(profile, stats, experience, featured projects, builds, open-source PRs, skills, education).
Change it there and the whole site updates.

| Want to… | Do this |
| --- | --- |
| Add the **Download CV** button | Put your PDF at `public/Basit_Ur_Rehman_Malik_CV.pdf`. The button appears automatically. |
| Add a project screenshot | Drop a `~1280×800` JPG in `public/projects/`, then use `visual: { type: "image", src, alt }` in `featured`. |
| Add a project with no screenshot | Use `visual: { type: "art", art: "..." }`. The illustrations live in `src/components/art/ProjectArt.tsx`. |
| Link a repo or live site | Add it to the project's `links`. Projects with no links show "Private · no public link". |
| Change the colours | `:root` variables at the top of `src/app/globals.css`. |

## What's where

| Interaction | File |
| --- | --- |
| Preloader (counter, name reveal, curtain) | `src/components/Preloader.tsx` |
| Smooth scroll wired to ScrollTrigger | `src/components/SmoothScroll.tsx` |
| Custom cursor with labels (`data-cursor="..."`) | `src/components/ui/Cursor.tsx` |
| Magnetic buttons | `src/components/ui/Magnetic.tsx` |
| Hero: SplitText intro, role rotator, parallax, marquee | `src/components/Hero.tsx` |
| Scroll-scrubbed text and count-up stats | `src/components/About.tsx` |
| Timeline that draws as you scroll | `src/components/Experience.tsx` |
| Pinned horizontal project scroller + 3D-tilt cards | `src/components/Work.tsx`, `ProjectCard.tsx` |
| Animated filter grid (layout animations) | `src/components/MoreBuilds.tsx` |
| Diff bars for merged pull requests | `src/components/OpenSource.tsx` |
| Language donut, skill chips | `src/components/Skills.tsx` |
| Dissertation pipeline diagram | `src/components/Education.tsx` |
| Email scramble, copy button, London clock | `src/components/Contact.tsx` |

## Accessibility and performance

- Respects `prefers-reduced-motion`: no preloader, no smooth scrolling, no pinned scroller, content visible immediately.
- Custom cursor only appears on devices with a fine pointer.
- Skip link, focus outlines, labelled external links, mobile menu with scroll lock.
- Fully static output: deploy anywhere (`npx vercel`).

## Notes

- GitHub stats on the page (47 repos, star counts, language mix) are a snapshot from October 2026; update them in `profile.ts` when they drift.
- The WestwayRide and JFA images are screenshots of the live sites. Retake them if those sites change.
- The illustrated project visuals (LocalLens, NaanStaap, EcoRentUK, Restaurant POS, Wheel Magic) are sketches of each product's idea, not captures of the real UI.
