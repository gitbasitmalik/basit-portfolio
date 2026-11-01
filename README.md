# Basit Ur Rehman Malik — Portfolio ("Basit's London")

An interactive portfolio. Visitors walk a low-poly **3D London** along the
Thames, from London Bridge to Tower Bridge, and discover nine chapters of the
story — experience, projects, open source, skills and contact — plus repo
pickups, small mini-games, day/night, rain and a photo-postcard spot.

Built as one self-contained HTML page (Three.js) and served at the site root by
a thin **Next.js 16 (App Router)** app.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## How it's wired

- The whole experience lives in **`public/london/index.html`** — a single
  self-contained file (Three.js via CDN; all art and audio generated in code,
  no external image/audio assets).
- The homepage shows it two ways, so `/` always shows the experience and never
  an old page:
  1. `next.config.ts` **rewrites `/` → `/london/index.html`** (served directly — best for SEO).
  2. `src/app/page.tsx` is a full-screen fallback that embeds the same file.
- `src/app/layout.tsx` holds the site `<title>` and metadata.
- `src/data/profile.ts` holds the name/role used in that metadata.
- `public/Basit_Ur_Rehman_Malik_CV.pdf` is the CV the experience links to.

## Edit the content

Open **`public/london/index.html`** and edit the data arrays near the top of the
script: `PROJECTS`, the `CH` chapters, `SKILLS`, `TAIL` (more builds) and the
contact links. It's all in that one file.

## Deploy

Hosted on **Vercel**, connected to this GitHub repository:

- **Push to `main` → production deploys automatically.**
- Other branches get preview deployments (login-protected by default).
- Run `npm run build` locally first to catch errors before pushing.
