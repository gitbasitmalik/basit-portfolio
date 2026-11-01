import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: `${profile.name} | ${profile.role}`,
  description:
    "Interactive portfolio of Basit Ur Rehman Malik, a London-based full-stack and React Native engineer. Walk the Thames through nine chapters of projects, experience and open-source work.",
  authors: [{ name: profile.name, url: profile.github }],
  keywords: [
    "Basit Ur Rehman Malik",
    "software engineer",
    "full-stack developer",
    "React Native",
    "Next.js",
    "London",
  ],
  openGraph: {
    title: `${profile.name} | ${profile.role}`,
    description:
      "Walk a 3D London from London Bridge to Tower Bridge and explore the work of a full-stack and React Native engineer in London.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} antialiased`}
    >
      <body className="grain min-h-screen">{children}</body>
    </html>
  );
}
