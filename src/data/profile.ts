/**
 * Single source of truth for the portfolio. Edit here, the whole site updates.
 * Every link below was checked to resolve; anything unverified is left out.
 */

export const profile = {
  name: "Basit Ur Rehman Malik",
  shortName: "Basit",
  initials: "BM",
  role: "Software Engineer",
  tagline: "Full-Stack & React Native",
  location: "London, England",
  timeZone: "Europe/London",
  email: "basiturrehmanmalik.cc@gmail.com",
  github: "https://github.com/gitbasitmalik",
  githubHandle: "gitbasitmalik",
  linkedin: "https://www.linkedin.com/in/basitmalik001",
  status: "Open to full-time UK engineering roles",
  summary:
    "I'm a full-stack and React Native engineer based in London. I build products end to end, from Next.js interfaces to Node, Python and Postgres back ends. I'm finishing an MSc in Software Engineering at the University of Hertfordshire, researching how LLMs can help catch performance anti-patterns in React apps, and I contribute fixes to open-source projects.",
  roles: [
    "Full-Stack Engineer",
    "React Native Developer",
    "Next.js Builder",
    "Open-Source Contributor",
  ],
  cvPath: "/Basit_Ur_Rehman_Malik_CV.pdf",
} as const;

export const stats = [
  { value: 47, suffix: "+", label: "Public GitHub repos" },
  { value: 3, suffix: "", label: "Merged open-source PRs" },
  { value: 4, suffix: "", label: "Engineering internships" },
  { value: 2, suffix: "", label: "Live client sites" },
] as const;

export const marqueeTech = [
  "TypeScript",
  "Next.js",
  "React Native",
  "Node.js",
  "Express",
  "FastAPI",
  "MongoDB",
  "PostgreSQL",
  "Supabase",
  "Firebase",
  "Stripe",
  "Socket.io",
  "Docker",
  "Tailwind CSS",
  "GSAP",
  "Framer Motion",
] as const;

export type Experience = {
  company: string;
  place: string;
  role: string;
  period: string;
  bullets: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    company: "Nexcell Solution",
    place: "UK (Remote)",
    role: "Full Stack Developer Intern",
    period: "Mar 2026 – Jul 2026",
    bullets: [
      "Contributed to ConneX, a UK real-estate CRM, enhancing AI-assisted lead and property management workflows that drove a 40% increase in operational engagement.",
      "Built modular Property and Contact Management interfaces with Next.js and Tailwind CSS, and front-end components for AI-driven semantic search backed by vector database logic.",
    ],
    tags: ["Next.js", "Tailwind CSS", "Semantic search", "CRM"],
  },
  {
    company: "Purpose Tech.AI Solutions",
    place: "USA (Remote)",
    role: "AI Engineer Intern",
    period: "Jan 2026 – Mar 2026",
    bullets: [
      "Evaluated internal AI research initiatives, digital platforms and system architectures, and contributed technical solutions during sprint planning.",
    ],
    tags: ["AI research", "System design", "Agile"],
  },
  {
    company: "Lean Automation Pvt. Ltd",
    place: "",
    role: "MERN Stack Developer Intern",
    period: "3 months, 2025",
    bullets: [
      "Worked across the full SDLC in a team of 4 engineers; wrote and maintained OpenAPI documentation for 6 core endpoints to speed up onboarding.",
    ],
    tags: ["MongoDB", "Express", "React", "Node.js", "OpenAPI"],
  },
  {
    company: "DevelopersHub Corporation",
    place: "Virtual",
    role: "Full Stack Developer Virtual Intern",
    period: "6 weeks, 2025",
    bullets: [
      "Built full-stack mock modules in JavaScript and React, collaborating remotely with 6 peers on GitHub using version-control best practice.",
    ],
    tags: ["JavaScript", "React", "Git"],
  },
  {
    company: "Digital Agency / Freelance",
    place: "Client projects",
    role: "Web Developer",
    period: "Client work",
    bullets: [
      "Rebuilding the JFA Construction Group site from WordPress/Elementor to Next.js 16.",
      "Currently working on design improvements for WestwayRide.",
    ],
    tags: ["Next.js 16", "Design improvements", "Client delivery"],
  },
];

export type ArtKind = "locallens" | "naanstaap" | "ecorent" | "pos" | "wheel";

export type ProjectLink = { label: string; href: string; type: "live" | "code" };

export type Project = {
  slug: string;
  title: string;
  kind: "Web" | "Mobile" | "Full-stack" | "Desktop" | "Backend";
  year: string;
  badge?: string;
  blurb: string;
  points: string[];
  tags: string[];
  links: ProjectLink[];
  visual:
    | { type: "image"; src: string; alt: string; aspect: number }
    | { type: "art"; art: ArtKind };
  accent: string;
};

export const featured: Project[] = [
  {
    slug: "locallens",
    title: "LocalLens",
    kind: "Full-stack",
    year: "2026",
    badge: "Prototype",
    blurb:
      "A self-serve SaaS that turns customers' tagged Instagram posts into a branded in-store display for independent shops.",
    points: [
      "Custom cookie auth (scrypt + HMAC-signed sessions) and a 14-day trial gated by Stripe Checkout with signature-verified webhooks.",
      "Instagram OAuth, tagged-media polling and HMAC-verified mention webhooks across 19 API routes.",
      "Backed by a written validation report: competitors, Instagram vs TikTok API limits, and rights capture.",
    ],
    tags: ["Next.js 15", "React 19", "Stripe", "Instagram Graph API", "GSAP"],
    links: [],
    visual: { type: "art", art: "locallens" },
    accent: "#ff6b4a",
  },
  {
    slug: "naanstaap",
    title: "NaanStaap Ordering App",
    kind: "Mobile",
    year: "2026",
    blurb:
      "A cross-platform ordering app for a nine-store UK restaurant brand, with loyalty, referrals and scheduled orders.",
    points: [
      "File-based routing with Expo Router and nine persisted Zustand stores.",
      "Loyalty tiers, referral codes, redeemable discount codes, reviews and reorder.",
      "66-route Express API over nine MongoDB collections with JWT access and refresh tokens.",
    ],
    tags: ["Expo", "TypeScript", "Zustand", "Express", "MongoDB"],
    links: [
      {
        label: "Code",
        href: "https://github.com/gitbasitmalik/NaanStaapMobileApp",
        type: "code",
      },
    ],
    visual: { type: "art", art: "naanstaap" },
    accent: "#d6ff3c",
  },
  {
    slug: "westwayride",
    title: "WestwayRide",
    kind: "Web",
    year: "2026",
    badge: "In progress",
    blurb:
      "Design improvements for a London chauffeur and airport-transfer brand's live site, including its chauffeur-tours page.",
    points: [
      "Ongoing design-improvement work on WestwayRide's live site.",
      "A cinematic chauffeur-tours page with a tour showcase and a fleet section.",
      "Clear calls to action for London tours and enquiries.",
    ],
    tags: ["UI design", "Landing page", "Client work"],
    links: [
      {
        label: "Live site",
        href: "https://www.westwayride.com/tours",
        type: "live",
      },
    ],
    visual: {
      type: "image",
      src: "/projects/westwayride-tours.jpg",
      alt: "WestwayRide chauffeur tours page with a chauffeur and a black saloon in front of Windsor Castle",
      aspect: 1.6,
    },
    accent: "#e0b04a",
  },
  {
    slug: "jfa-construction",
    title: "JFA Construction Group",
    kind: "Web",
    year: "2026",
    badge: "Live",
    blurb:
      "A marketing site for a London loft-conversion and renovation company, moving from WordPress/Elementor to Next.js 16.",
    points: [
      "Statically exported App Router site with sitemap, robots and structured data for local SEO.",
      "Filterable project gallery and a contact form validated with React Hook Form and Zod.",
      "Tailwind CSS 4 and Framer Motion for a fast, polished feel.",
    ],
    tags: ["Next.js 16", "React 19", "Tailwind CSS 4", "Framer Motion", "Zod"],
    links: [
      {
        label: "Live site",
        href: "https://jfaconstructiongroup.co.uk",
        type: "live",
      },
    ],
    visual: {
      type: "image",
      src: "/projects/jfa-home-hero.jpg",
      alt: "JFA Construction Group home page: a dark-kitchen hero reading Building spaces where memories are made",
      aspect: 1.751,
    },
    accent: "#e0912b",
  },
  {
    slug: "ecorentuk",
    title: "EcoRentUK",
    kind: "Full-stack",
    year: "2026",
    blurb:
      "A property-management SaaS for UK landlords with EPC sustainability tracking and an AI tenant assistant.",
    points: [
      "EPC sustainability score tracking per property.",
      "AI tenant chat and lead capture.",
      "JWT and Google sign-in with two-factor authentication.",
    ],
    tags: ["React", "FastAPI", "MongoDB", "JWT"],
    links: [
      {
        label: "Code",
        href: "https://github.com/gitbasitmalik/EcoRentUK",
        type: "code",
      },
    ],
    visual: { type: "art", art: "ecorent" },
    accent: "#4ade80",
  },
  {
    slug: "restaurant-pos",
    title: "Restaurant POS",
    kind: "Full-stack",
    year: "2025",
    blurb:
      "A point-of-sale for dine-in, takeaway and delivery with a kitchen display, payments and sales analytics.",
    points: [
      "Cash, card and mobile-banking payments, plus a live kitchen display.",
      "Analytics for revenue, average order value, peak hours and period-over-period comparison.",
      "Nine-table PostgreSQL schema on Supabase with row-level security and PL/pgSQL triggers.",
    ],
    tags: ["Next.js 15", "TypeScript", "Supabase", "PostgreSQL", "Recharts"],
    links: [],
    visual: { type: "art", art: "pos" },
    accent: "#7c6cff",
  },
  {
    slug: "wheel-magic",
    title: "Wheel Magic",
    kind: "Mobile",
    year: "2024",
    badge: "Final-year project",
    blurb:
      "A spare-parts marketplace for cars and bikes, built with a team of three: an admin-managed store plus peer-to-peer listings.",
    points: [
      "Stripe payments with saved cards, in-app chat, wishlist and order reviews.",
      "38-endpoint REST API with Firebase authentication.",
      "Admin dashboard for products, orders and notifications.",
    ],
    tags: ["React Native", "Node.js", "MongoDB", "Firebase", "Stripe"],
    links: [
      {
        label: "Code",
        href: "https://github.com/gitbasitmalik/MagicWheel",
        type: "code",
      },
    ],
    visual: { type: "art", art: "wheel" },
    accent: "#38bdf8",
  },
];

export type Build = {
  title: string;
  kind: Project["kind"];
  blurb: string;
  tags: string[];
  /** Public source repository, if there is one. */
  href?: string;
  /** Live website, if there is one. */
  liveHref?: string;
};

export const builds: Build[] = [
  {
    title: "UniConnect",
    kind: "Full-stack",
    blurb:
      "A platform for international students in the UK: .ac.uk-only sign-up with email verification, filtered listings and real-time chat.",
    tags: ["React", "Express", "Socket.io", "MongoDB"],
  },
  {
    title: "NHS Queue Navigator",
    kind: "Mobile",
    blurb:
      "Hospital finder with map and list views, geospatial nearby search and symptom guidance. Runs on a simulated wait-time feed.",
    tags: ["Expo", "Node.js", "MongoDB", "node-cron"],
  },
  {
    title: "AI E-Commerce",
    kind: "Full-stack",
    blurb:
      "MERN storefront with an admin dashboard, a Rasa FAQ chatbot and a TF-IDF recommender prototype.",
    tags: ["React", "Redux Toolkit", "Rasa", "FastAPI"],
  },
  {
    title: "Food Delivery Platform",
    kind: "Backend",
    blurb:
      "An eight-model Mongoose schema with geospatial and TTL indexes in a Dockerised Express and MongoDB stack.",
    tags: ["Express", "MongoDB", "Docker"],
  },
  {
    title: "Ration Bridge",
    kind: "Full-stack",
    blurb:
      "A food-donation platform linking donors, families and verified NGOs, with an English/Urdu interface.",
    tags: ["React", "TypeScript", "Express", "MongoDB"],
    href: "https://github.com/gitbasitmalik/asaan-ration",
  },
  {
    title: "EasyPrompt",
    kind: "Full-stack",
    blurb:
      "A prompt-sharing community with JWT auth, owner-only editing, tags, search, likes and favourites.",
    tags: ["React", "Express", "MongoDB", "JWT"],
    href: "https://github.com/gitbasitmalik/easy-prompt",
  },
  {
    title: "Offline Lab POS",
    kind: "Desktop",
    blurb:
      "An offline-first Electron app for a clinical laboratory: patients, a test catalogue and inventory on SQLite.",
    tags: ["Electron", "SQLite", "Express"],
  },
  {
    title: "POS_PAK",
    kind: "Web",
    blurb:
      "An offline-capable restaurant POS progressive web app with a kitchen display and role-based demo logins.",
    tags: ["React", "TypeScript", "PWA", "Vercel"],
    href: "https://github.com/gitbasitmalik/POS_PAK",
  },
  {
    title: "Retail POS",
    kind: "Full-stack",
    blurb:
      "Sales, products, inventory and reports, with PDF receipts generated in the browser.",
    tags: ["React", "Vite", "jsPDF", "Express"],
    href: "https://github.com/gitbasitmalik/pos-system",
  },
  {
    title: "ecommerce-marketplace",
    kind: "Full-stack",
    blurb:
      "An Alibaba-style electronics marketplace storefront with filters, sorting and a persisted cart, backed by a product CRUD API.",
    tags: ["React", "TypeScript", "Zustand", "Express", "MongoDB"],
    href: "https://github.com/gitbasitmalik/ecommerce-marketplace",
  },
  {
    title: "Tyger Inn",
    kind: "Web",
    blurb:
      "A website for a hotel in Derby, UK: rooms, amenities, reviews and a contact form.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vercel"],
    liveHref: "https://www.tygerinn.co.uk",
  },
  {
    title: "Anglian Self Storage",
    kind: "Web",
    blurb:
      "A marketing site on the Next.js App Router with MDX content and Zod-validated forms. Private repository.",
    tags: ["Next.js 16", "React 19", "Tailwind CSS 4", "MDX"],
  },
  {
    title: "Landlord Leaked",
    kind: "Mobile",
    blurb: "A UK tenant energy-efficiency guide built with Expo.",
    tags: ["Expo", "React Native"],
    href: "https://github.com/gitbasitmalik/landlord-leaked",
  },
  {
    title: "Sneakers Store",
    kind: "Mobile",
    blurb:
      "An Expo sneaker store with Firebase auth, a Firestore catalogue and admin CRUD.",
    tags: ["Expo", "Firebase", "Firestore"],
    href: "https://github.com/gitbasitmalik/Sneakers",
  },
  {
    title: "TourGuide",
    kind: "Web",
    blurb:
      "A tour-booking front-end prototype with tour listings, details and a booking flow.",
    tags: ["React 19", "TypeScript", "Radix UI"],
    href: "https://github.com/gitbasitmalik/TourGuide",
  },
];

export type OpenSourcePR = {
  repo: string;
  stars: number;
  language: string;
  title: string;
  number: number;
  merged: string;
  additions: number;
  deletions: number;
  files: number;
  href: string;
  repoHref: string;
};

export const openSource: OpenSourcePR[] = [
  {
    repo: "activist-org/activist",
    stars: 751,
    language: "TypeScript",
    title: "Translate edit and delete icon labels for screen readers",
    number: 2206,
    merged: "20 Jun 2026",
    additions: 8,
    deletions: 4,
    files: 3,
    href: "https://github.com/activist-org/activist/pull/2206",
    repoHref: "https://github.com/activist-org/activist",
  },
  {
    repo: "ansvisor/ansvisor",
    stars: 129,
    language: "TypeScript",
    title: "Prevent a spurious 'Failed to fetch' toast when switching brand tabs",
    number: 257,
    merged: "16 Jun 2026",
    additions: 271,
    deletions: 85,
    files: 5,
    href: "https://github.com/ansvisor/ansvisor/pull/257",
    repoHref: "https://github.com/ansvisor/ansvisor",
  },
  {
    repo: "jpdevhub/Agronavis-AI-Farm-Assistant",
    stars: 6,
    language: "TypeScript",
    title: "Enhance empty states for tasks, farms and crops in the dashboard",
    number: 56,
    merged: "12 Jun 2026",
    additions: 1033,
    deletions: 371,
    files: 11,
    href: "https://github.com/jpdevhub/Agronavis-AI-Farm-Assistant/pull/56",
    repoHref: "https://github.com/jpdevhub/Agronavis-AI-Farm-Assistant",
  },
];

export const skillGroups = [
  {
    title: "Languages & Front end",
    items: [
      "TypeScript",
      "JavaScript (ES6+)",
      "Java",
      "Python",
      "React",
      "Next.js",
      "React Native (Expo)",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "GSAP",
      "Framer Motion",
      "Radix UI",
      "MDX",
      "Redux Toolkit",
      "Zustand",
    ],
  },
  {
    title: "Back end & Data",
    items: [
      "Node.js",
      "Express",
      "FastAPI",
      "MongoDB",
      "PostgreSQL",
      "Firebase",
      "Supabase",
      "SQL",
      "REST APIs",
      "Socket.io",
      "Zod / React Hook Form",
      "JWT / Google auth",
      "Stripe",
    ],
  },
  {
    title: "Tools & Practice",
    items: [
      "Git / GitHub",
      "Postman",
      "Vercel",
      "ESLint",
      "SonarQube",
      "Lighthouse",
      "Agile / Scrum",
      "Docker",
      "Claude Code",
    ],
  },
] as const;

/** Primary-language mix of my 37 original (non-fork) public GitHub repos that contain code. */
export const languageMix = [
  { name: "JavaScript", count: 15, color: "#d6ff3c" },
  { name: "TypeScript", count: 11, color: "#7c6cff" },
  { name: "Java", count: 5, color: "#ff6b4a" },
  { name: "HTML", count: 4, color: "#38bdf8" },
  { name: "CSS, R & other", count: 2, color: "#8d8c95" },
] as const;

export const education = [
  {
    degree: "MSc Software Engineering",
    school: "University of Hertfordshire, Hatfield",
    period: "2025 – Nov 2026",
  },
  {
    degree: "BSc Software Engineering",
    school: "COMSATS University Islamabad, Abbottabad",
    period: "2021 – 2025",
  },
] as const;

export const certifications = [
  "Meta Front-End Development",
  "IBM Intro to Software Engineering",
  "LinkedIn Learning Full-Stack JavaScript",
  "Packt MERN Stack",
] as const;

export const research = {
  title: "MSc Dissertation",
  year: "2026",
  summary:
    "LLM-augmented static analysis for detecting performance anti-patterns in React and Next.js apps: unnecessary re-renders, N+1 fetch waterfalls and client-server data leaks. AST feature extraction is verified by an LLM, and measured against ESLint and SonarQube baselines.",
  pipeline: ["Source code", "AST extraction", "LLM verification", "Report"],
} as const;
