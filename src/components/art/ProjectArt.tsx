"use client";

import { motion, useInView } from "framer-motion";
import { createContext, useContext, useId, useRef, type ReactNode } from "react";
import type { ArtKind } from "@/data/profile";

/**
 * Illustrated stand-ins for projects without a public screenshot.
 * Each one sketches the product's core idea. They are illustrations,
 * not captures of the real UI.
 */

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Entrance animations are driven by ONE observer on a plain HTML wrapper.
 * Observing individual SVG children is unreliable in some browsers and
 * leaves them invisible, so the children just follow this flag.
 */
const PlayContext = createContext(false);
const usePlay = () => useContext(PlayContext);

function Stage({ children, glow }: { children: ReactNode; glow: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg
      viewBox="0 0 640 420"
      role="img"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id={`g-${uid}`} cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor={glow} stopOpacity="0.28" />
          <stop offset="100%" stopColor={glow} stopOpacity="0" />
        </radialGradient>
        <pattern id={`dots-${uid}`} width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#ffffff" opacity="0.07" />
        </pattern>
      </defs>
      <rect width="640" height="420" fill="#0d0d12" />
      <rect width="640" height="420" fill={`url(#dots-${uid})`} />
      <rect width="640" height="420" fill={`url(#g-${uid})`} />
      {children}
    </svg>
  );
}

const hidden = { opacity: 0, y: 18, scale: 0.96 };
const shown = { opacity: 1, y: 0, scale: 1 };
const pop = (play: boolean, delay = 0) => ({
  initial: hidden,
  animate: play ? shown : hidden,
  transition: { duration: 0.7, delay, ease },
});

/* ------------------------------------------------------------------ */
/* LocalLens: a tagged post travels from a phone to the shop's display */
/* ------------------------------------------------------------------ */
function LocalLens() {
  const play = usePlay();
  const tiles = [
    ["#ff6b4a", "#ffb199"],
    ["#7c6cff", "#b9b1ff"],
    ["#d6ff3c", "#f1ffb0"],
    ["#38bdf8", "#a5e3fb"],
    ["#ff9a3c", "#ffd0a1"],
    ["#f472b6", "#fbc1de"],
  ];
  return (
    <Stage glow="#ff6b4a">
      {/* TV */}
      <motion.g {...pop(play, 0)}>
        <rect x="150" y="48" width="440" height="270" rx="18" fill="#17171f" stroke="#ffffff22" />
        <rect x="164" y="62" width="412" height="242" rx="10" fill="#0a0a0f" />
        {tiles.map(([a, b], i) => (
          <motion.g key={a} {...pop(play, 0.25 + i * 0.09)}>
            <rect
              x={176 + (i % 3) * 133}
              y={76 + Math.floor(i / 3) * 106}
              width="122"
              height="98"
              rx="8"
              fill={a}
              opacity="0.92"
            />
            <rect
              x={176 + (i % 3) * 133}
              y={76 + Math.floor(i / 3) * 106}
              width="122"
              height="98"
              rx="8"
              fill={`url(#shade)`}
            />
            <circle cx={190 + (i % 3) * 133} cy={90 + Math.floor(i / 3) * 106} r="6" fill={b} />
            <rect
              x={202 + (i % 3) * 133}
              y={87 + Math.floor(i / 3) * 106}
              width="38"
              height="6"
              rx="3"
              fill="#ffffff"
              opacity="0.8"
            />
          </motion.g>
        ))}
        <rect x="330" y="318" width="60" height="14" fill="#1d1d27" />
        <rect x="290" y="330" width="140" height="8" rx="4" fill="#1d1d27" />
      </motion.g>

      <defs>
        <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* Live chip */}
      <motion.g {...pop(play, 0.9)}>
        <rect x="448" y="26" width="96" height="26" rx="13" fill="#ff6b4a" />
        <circle cx="464" cy="39" r="4" fill="#fff" />
        <text x="476" y="43.5" fill="#fff" fontSize="11" fontFamily="monospace" letterSpacing="1.5">
          LIVE
        </text>
      </motion.g>

      {/* Phone */}
      <motion.g {...pop(play, 0.5)}>
        <rect x="34" y="150" width="126" height="236" rx="20" fill="#17171f" stroke="#ffffff2a" />
        <rect x="46" y="170" width="102" height="100" rx="10" fill="#ff6b4a" />
        <circle cx="60" cy="184" r="6" fill="#ffd0c4" />
        <rect x="72" y="181" width="48" height="6" rx="3" fill="#fff" opacity="0.85" />
        <rect x="46" y="280" width="64" height="8" rx="4" fill="#ffffff55" />
        <rect x="46" y="296" width="44" height="8" rx="4" fill="#ffffff33" />
        <rect x="46" y="322" width="102" height="30" rx="15" fill="#d6ff3c" />
        <text x="97" y="341" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0a0a0a">
          Approve
        </text>
      </motion.g>

      {/* Flow arrow */}
      <motion.path
        d="M164 250 C 200 250, 200 330, 262 330 S 330 330, 330 306"
        fill="none"
        stroke="#d6ff3c"
        strokeWidth="2"
        strokeDasharray="5 7"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={play ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{ duration: 1.4, delay: 0.7, ease }}
      />
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* NaanStaap: phone with menu, loyalty ring and order tracker           */
/* ------------------------------------------------------------------ */
function NaanStaap() {
  const play = usePlay();
  return (
    <Stage glow="#d6ff3c">
      <motion.g {...pop(play, 0)}>
        <rect x="224" y="24" width="192" height="372" rx="30" fill="#14141b" stroke="#ffffff2a" strokeWidth="1.5" />
        <rect x="302" y="34" width="36" height="8" rx="4" fill="#0a0a0f" />
        <text x="244" y="76" fontSize="15" fontWeight="700" fill="#f3f2ed">
          Naan Staap
        </text>
        <rect x="240" y="92" width="160" height="96" rx="14" fill="#c2410c" />
        <circle cx="352" cy="140" r="38" fill="#fb923c" opacity="0.7" />
        <circle cx="352" cy="140" r="22" fill="#fdba74" opacity="0.75" />
        <text x="252" y="170" fontSize="11" fontWeight="600" fill="#fff">
          Chicken Tikka Masala
        </text>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="240" y={202 + i * 44} width="160" height="36" rx="10" fill="#1d1d27" />
            <circle cx="258" cy={220 + i * 44} r="10" fill={["#d6ff3c", "#7c6cff", "#ff6b4a"][i]} opacity="0.85" />
            <rect x="276" y={212 + i * 44} width="64" height="6" rx="3" fill="#ffffff80" />
            <rect x="276" y={223 + i * 44} width="40" height="5" rx="2.5" fill="#ffffff33" />
            <rect x="358" y={212 + i * 44} width="32" height="16" rx="8" fill="#d6ff3c" />
          </g>
        ))}
        <rect x="240" y="350" width="160" height="34" rx="17" fill="#1d1d27" />
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} cx={262 + i * 29} cy="367" r="5" fill={i === 1 ? "#d6ff3c" : "#ffffff30"} />
        ))}
      </motion.g>

      {/* Loyalty ring */}
      <motion.g {...pop(play, 0.35)}>
        <rect x="438" y="84" width="170" height="170" rx="22" fill="#14141b" stroke="#ffffff22" />
        <circle cx="523" cy="156" r="46" fill="none" stroke="#ffffff14" strokeWidth="10" />
        <motion.circle
          cx="523"
          cy="156"
          r="46"
          fill="none"
          stroke="#d6ff3c"
          strokeWidth="10"
          strokeLinecap="round"
          transform="rotate(-90 523 156)"
          initial={{ pathLength: 0 }}
          animate={play ? { pathLength: 0.72 } : undefined}
          transition={{ duration: 1.6, delay: 0.7, ease }}
        />
        <text x="523" y="153" textAnchor="middle" fontSize="20" fontWeight="700" fill="#f3f2ed">
          GOLD
        </text>
        <text x="523" y="171" textAnchor="middle" fontSize="10" fill="#9b9aa4" fontFamily="monospace">
          loyalty tier
        </text>
        <text x="523" y="236" textAnchor="middle" fontSize="11" fill="#9b9aa4" fontFamily="monospace">
          points · referrals
        </text>
      </motion.g>

      {/* Order tracker */}
      <motion.g {...pop(play, 0.55)}>
        <rect x="32" y="120" width="170" height="150" rx="22" fill="#14141b" stroke="#ffffff22" />
        <text x="50" y="150" fontSize="12" fontWeight="600" fill="#f3f2ed">
          Order status
        </text>
        {["Placed", "Preparing", "Ready"].map((label, i) => (
          <g key={label}>
            <circle cx="62" cy={182 + i * 30} r="7" fill={i < 2 ? "#d6ff3c" : "#ffffff22"} />
            {i < 2 && <rect x="60.5" y={188 + i * 30} width="3" height="16" fill="#d6ff3c" opacity="0.6" />}
            <text x="78" y={186 + i * 30} fontSize="11" fill={i < 2 ? "#f3f2ed" : "#9b9aa4"}>
              {label}
            </text>
          </g>
        ))}
      </motion.g>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* EcoRentUK: EPC ladder, energy trend and an AI assistant bubble       */
/* ------------------------------------------------------------------ */
function EcoRent() {
  const play = usePlay();
  const bands = [
    ["A", "#16a34a", 150],
    ["B", "#4ade80", 190],
    ["C", "#a3e635", 230],
    ["D", "#facc15", 270],
    ["E", "#fb923c", 310],
    ["F", "#f97316", 350],
    ["G", "#ef4444", 390],
  ] as const;
  return (
    <Stage glow="#4ade80">
      <motion.g {...pop(play, 0)}>
        <rect x="40" y="36" width="560" height="348" rx="24" fill="#14141b" stroke="#ffffff22" />
        <text x="68" y="76" fontSize="15" fontWeight="700" fill="#f3f2ed">
          14 Elm Court · EPC rating
        </text>
      </motion.g>
      {bands.map(([letter, color, w], i) => (
        <motion.g
          key={letter}
          initial={{ opacity: 0, x: -24 }}
          animate={play ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.2 + i * 0.07, ease }}
        >
          <rect x="68" y={96 + i * 32} width={w} height="24" rx="5" fill={color} opacity={letter === "B" ? 1 : 0.55} />
          <text x="80" y={113 + i * 32} fontSize="13" fontWeight="800" fill="#0a0a0a">
            {letter}
          </text>
        </motion.g>
      ))}
      <motion.g {...pop(play, 0.9)}>
        <rect x="240" y="124" width="64" height="26" rx="13" fill="#0a0a0a" stroke="#4ade80" />
        <text x="272" y="141" textAnchor="middle" fontSize="11" fontWeight="700" fill="#4ade80">
          B · 84
        </text>
      </motion.g>

      {/* trend */}
      <g>
        <text x="372" y="112" fontSize="11" fill="#9b9aa4" fontFamily="monospace">
          ENERGY USE / MONTH
        </text>
        <motion.path
          d="M372 220 L408 200 L444 212 L480 172 L516 184 L552 140 L580 150"
          fill="none"
          stroke="#4ade80"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={play ? { pathLength: 1 } : undefined}
          transition={{ duration: 1.8, delay: 0.5, ease }}
        />
        <line x1="372" y1="236" x2="580" y2="236" stroke="#ffffff1a" />
      </g>

      {/* chat bubble */}
      <motion.g {...pop(play, 1.1)}>
        <rect x="372" y="262" width="204" height="78" rx="16" fill="#1d1d27" stroke="#ffffff22" />
        <circle cx="392" cy="284" r="9" fill="#4ade80" />
        <text x="408" y="288" fontSize="11" fontWeight="600" fill="#f3f2ed">
          AI tenant assistant
        </text>
        <rect x="388" y="302" width="150" height="6" rx="3" fill="#ffffff55" />
        <rect x="388" y="316" width="108" height="6" rx="3" fill="#ffffff2a" />
      </motion.g>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* POS: order ticket, table map and revenue chart                       */
/* ------------------------------------------------------------------ */
function Pos() {
  const play = usePlay();
  const bars = [88, 130, 104, 160, 142, 190, 172];
  const tables = ["#4ade80", "#4ade80", "#fb923c", "#7c6cff", "#4ade80", "#fb923c", "#ffffff2a", "#4ade80", "#7c6cff"];
  return (
    <Stage glow="#7c6cff">
      {/* tabs */}
      <motion.g {...pop(play, 0)}>
        {["Dine-in", "Takeaway", "Delivery"].map((t, i) => (
          <g key={t}>
            <rect x={40 + i * 96} y="30" width="88" height="28" rx="14" fill={i === 0 ? "#d6ff3c" : "#1d1d27"} />
            <text x={84 + i * 96} y="48.5" textAnchor="middle" fontSize="11" fontWeight="700" fill={i === 0 ? "#0a0a0a" : "#9b9aa4"}>
              {t}
            </text>
          </g>
        ))}
      </motion.g>

      {/* ticket */}
      <motion.g {...pop(play, 0.2)}>
        <path d="M40 80 h190 v280 l-12 -10 l-12 10 l-12 -10 l-12 10 l-12 -10 l-12 10 l-12 -10 l-12 10 l-12 -10 l-12 10 l-12 -10 l-12 10 l-12 -10 z" fill="#f3f2ed" />
        <text x="58" y="108" fontSize="12" fontWeight="800" fill="#0a0a0a" fontFamily="monospace">
          ORDER #0142
        </text>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x="58" y={128 + i * 28} width={[84, 100, 70, 92][i]} height="7" rx="3.5" fill="#0a0a0a" opacity="0.7" />
            <rect x="182" y={128 + i * 28} width="30" height="7" rx="3.5" fill="#0a0a0a" opacity="0.35" />
          </g>
        ))}
        <line x1="58" y1="250" x2="212" y2="250" stroke="#0a0a0a" strokeDasharray="3 4" opacity="0.4" />
        <text x="58" y="278" fontSize="14" fontWeight="800" fill="#0a0a0a">
          Total
        </text>
        <text x="212" y="278" textAnchor="end" fontSize="14" fontWeight="800" fill="#0a0a0a">
          Rs 3,480
        </text>
        <rect x="58" y="296" width="154" height="30" rx="15" fill="#0a0a0a" />
        <text x="135" y="315" textAnchor="middle" fontSize="11" fontWeight="700" fill="#d6ff3c">
          Send to kitchen
        </text>
      </motion.g>

      {/* tables */}
      <motion.g {...pop(play, 0.4)}>
        <rect x="262" y="80" width="150" height="150" rx="18" fill="#14141b" stroke="#ffffff22" />
        {tables.map((c, i) => (
          <circle key={i} cx={292 + (i % 3) * 45} cy={110 + Math.floor(i / 3) * 45} r="14" fill={c} opacity="0.9" />
        ))}
        <text x="274" y="252" fontSize="10" fill="#9b9aa4" fontFamily="monospace">
          TABLE MAP · LIVE
        </text>
      </motion.g>

      {/* revenue chart */}
      <motion.g {...pop(play, 0.55)}>
        <rect x="436" y="80" width="170" height="280" rx="18" fill="#14141b" stroke="#ffffff22" />
        <text x="452" y="108" fontSize="12" fontWeight="700" fill="#f3f2ed">
          Revenue
        </text>
        {bars.map((h, i) => (
          <motion.rect
            key={i}
            x={452 + i * 21}
            y={330 - h}
            width="14"
            height={h}
            rx="4"
            fill={i === 5 ? "#d6ff3c" : "#7c6cff"}
            style={{ transformOrigin: "50% 100%", transformBox: "fill-box" }}
            initial={{ scaleY: 0 }}
            animate={play ? { scaleY: 1 } : undefined}
            transition={{ duration: 0.9, delay: 0.7 + i * 0.07, ease }}
          />
        ))}
      </motion.g>

      {/* kitchen */}
      <motion.g {...pop(play, 0.7)}>
        <rect x="262" y="250" width="150" height="110" rx="18" fill="#14141b" stroke="#ffffff22" />
        <text x="278" y="278" fontSize="12" fontWeight="700" fill="#f3f2ed">
          Kitchen
        </text>
        {[0, 1].map((i) => (
          <g key={i}>
            <rect x="278" y={292 + i * 28} width="118" height="20" rx="10" fill={i ? "#1d1d27" : "#fb923c"} opacity={i ? 1 : 0.9} />
            <text x="290" y={306 + i * 28} fontSize="10" fontWeight="600" fill={i ? "#9b9aa4" : "#0a0a0a"}>
              {i ? "#0141 · ready" : "#0142 · preparing"}
            </text>
          </g>
        ))}
      </motion.g>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* Wheel Magic: part listing, Stripe-style pay sheet and chat           */
/* ------------------------------------------------------------------ */
function Wheel() {
  const play = usePlay();
  return (
    <Stage glow="#38bdf8">
      <motion.g {...pop(play, 0)}>
        <rect x="214" y="22" width="212" height="376" rx="30" fill="#14141b" stroke="#ffffff2a" strokeWidth="1.5" />
        <rect x="230" y="62" width="180" height="150" rx="16" fill="#0a0a0f" />
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="320" cy="137" r="54" fill="none" stroke="#38bdf8" strokeWidth="8" />
          <circle cx="320" cy="137" r="14" fill="#38bdf8" />
          {[0, 45, 90, 135].map((a) => (
            <line
              key={a}
              x1="320"
              y1="90"
              x2="320"
              y2="184"
              stroke="#7dd3fc"
              strokeWidth="5"
              strokeLinecap="round"
              transform={`rotate(${a} 320 137)`}
            />
          ))}
        </motion.g>
        <text x="232" y="244" fontSize="14" fontWeight="700" fill="#f3f2ed">
          Alloy wheel · 17&quot;
        </text>
        <text x="232" y="264" fontSize="11" fill="#9b9aa4" fontFamily="monospace">
          peer-to-peer listing
        </text>
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            transform={`translate(${232 + i * 18} 276)`}
            d="M7 0l2.1 4.6 5 .6-3.7 3.4 1 5-4.4-2.5-4.4 2.5 1-5L0 5.2l5-.6z"
            fill={i < 4 ? "#facc15" : "#ffffff30"}
          />
        ))}
        <rect x="232" y="312" width="176" height="40" rx="20" fill="#38bdf8" />
        <text x="320" y="337" textAnchor="middle" fontSize="13" fontWeight="800" fill="#06202e">
          Pay with card
        </text>
      </motion.g>

      {/* Pay sheet */}
      <motion.g {...pop(play, 0.4)}>
        <rect x="448" y="120" width="160" height="120" rx="18" fill="#14141b" stroke="#ffffff22" />
        <rect x="464" y="140" width="128" height="76" rx="12" fill="#635bff" />
        <rect x="476" y="156" width="26" height="18" rx="4" fill="#ffffff55" />
        <text x="476" y="196" fontSize="11" fill="#fff" fontFamily="monospace">
          •••• 4242
        </text>
        <text x="476" y="209" fontSize="9" fill="#ffffffaa" fontFamily="monospace">
          saved card
        </text>
      </motion.g>

      {/* Chat */}
      <motion.g {...pop(play, 0.6)}>
        <rect x="34" y="150" width="150" height="40" rx="16" fill="#1d1d27" stroke="#ffffff22" />
        <text x="48" y="174" fontSize="11" fill="#f3f2ed">
          Still available?
        </text>
        <rect x="52" y="202" width="132" height="40" rx="16" fill="#38bdf8" />
        <text x="66" y="226" fontSize="11" fontWeight="600" fill="#06202e">
          Yes, ready to ship
        </text>
      </motion.g>
    </Stage>
  );
}

function Art({ kind }: { kind: ArtKind }) {
  switch (kind) {
    case "locallens":
      return <LocalLens />;
    case "naanstaap":
      return <NaanStaap />;
    case "ecorent":
      return <EcoRent />;
    case "pos":
      return <Pos />;
    case "wheel":
      return <Wheel />;
  }
}

export default function ProjectArt({ kind }: { kind: ArtKind }) {
  const ref = useRef<HTMLDivElement>(null);
  const play = useInView(ref, { once: true, amount: 0.2 });
  return (
    <PlayContext.Provider value={play}>
      <div ref={ref} className="h-full w-full">
        <Art kind={kind} />
      </div>
    </PlayContext.Provider>
  );
}
