import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────
   MarvelBanner – a cinematic full-width banner that
   sits between sections with:
   • "Assemble Your Skills" headline (Avengers font style)
   • Spider-Man web corner decorations (pure CSS/SVG)
   • Particle "power" dots floating across
   • Iron Man arc-reactor glow button → /Signup
   ───────────────────────────────────────────────────── */

const QUOTES = [
  { hero: "Iron Man",   quote: "Part of the journey is the end. But your learning journey starts NOW.",     color: "#ef4444", glow: "rgba(239,68,68,0.35)"   },
  { hero: "Spider-Man", quote: "With great power comes great responsibility — and great code skills.",      color: "#ef4444", glow: "rgba(220,38,38,0.35)"   },
  { hero: "Thor",       quote: "I am worthy of knowledge. Whosoever holds this course, shall possess power.", color: "#3b82f6", glow: "rgba(59,130,246,0.35)" },
  { hero: "Black Panther", quote: "Wakanda innovates forever. So do you when you learn every day.",        color: "#8b5cf6", glow: "rgba(139,92,246,0.35)"  },
  { hero: "Captain America", quote: "I can do this all day. And so can you with our lifetime-access courses.", color: "#6366f1", glow: "rgba(99,102,241,0.35)" },
];

// Spider-Man web SVG lines component
function WebCorner({ flip }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className="absolute w-28 h-28 opacity-20 pointer-events-none"
      style={{
        top: flip ? "auto" : 0,
        bottom: flip ? 0 : "auto",
        left: flip ? "auto" : 0,
        right: flip ? 0 : "auto",
        transform: flip ? "rotate(180deg)" : "none",
      }}
    >
      {/* Radial web lines */}
      {[0, 30, 60, 90].map((angle) => (
        <line
          key={angle}
          x1="0" y1="0"
          x2={120 * Math.cos((angle * Math.PI) / 180)}
          y2={120 * Math.sin((angle * Math.PI) / 180)}
          stroke="#ef4444"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ))}
      {/* Concentric web arcs */}
      {[25, 55, 85].map((r) => (
        <path
          key={r}
          d={`M ${r} 0 Q ${r * 0.7} ${r * 0.7} 0 ${r}`}
          fill="none"
          stroke="#ef4444"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

// Arc reactor glow button
function ArcReactorButton({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative group flex items-center gap-x-3 px-8 py-3 rounded-full font-bold text-white cursor-pointer overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3b82f6 100%)",
        border: "2px solid rgba(96,165,250,0.5)",
        boxShadow: "0 0 24px rgba(59,130,246,0.5), inset 0 0 20px rgba(59,130,246,0.1)",
      }}
    >
      {/* Arc reactor core */}
      <span className="relative flex-shrink-0">
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="block w-6 h-6 rounded-full border-2 border-blue-300 border-t-transparent"
          style={{ boxShadow: "0 0 10px #60a5fa" }}
        />
        <span
          className="absolute inset-1 rounded-full bg-blue-400"
          style={{ boxShadow: "0 0 8px #93c5fd" }}
        />
      </span>
      <span className="text-sm tracking-wide">Assemble Your Skills</span>
      {/* Shimmer sweep */}
      <motion.span
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)",
        }}
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
      />
    </motion.button>
  );
}

function MarvelBanner({ onJoin }) {
  const quoteIndex = Math.floor(Date.now() / 30000) % QUOTES.length; // changes every 30s
  const q = QUOTES[quoteIndex];

  return (
    <section
      className="relative w-full overflow-hidden py-16"
      style={{
        background:
          "linear-gradient(135deg, #0d0015 0%, #0a0020 40%, #12001a 100%)",
        borderTop: "1px solid rgba(139,92,246,0.15)",
        borderBottom: "1px solid rgba(139,92,246,0.15)",
      }}
    >
      {/* Web corners */}
      <WebCorner flip={false} />
      <WebCorner flip={true} />

      {/* Floating particles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 3 + (i % 4),
            height: 3 + (i % 4),
            background: i % 3 === 0 ? "#ef4444" : i % 3 === 1 ? "#f59e0b" : "#6366f1",
            left: `${(i * 5.8) % 100}%`,
            top: `${(i * 7.3) % 100}%`,
            opacity: 0.35,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + (i % 4),
            delay: i * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Big glow blob */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${q.glow} 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 w-10/12 max-w-4xl mx-auto flex flex-col items-center gap-y-6 text-center">
        {/* Hero badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
          style={{
            background: `linear-gradient(90deg, ${q.color}22, ${q.color}44)`,
            border: `1px solid ${q.color}55`,
            color: q.color,
          }}
        >
          ⚡ {q.hero} Says
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-black text-white leading-tight"
          style={{
            textShadow: `0 0 40px ${q.glow}`,
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          ASSEMBLE YOUR{" "}
          <span
            style={{
              background: `linear-gradient(90deg, ${q.color}, #f59e0b)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            SKILLS.
          </span>
        </motion.h2>

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-300 text-base md:text-lg max-w-2xl leading-relaxed italic"
        >
          "{q.quote}"
        </motion.p>

        {/* Hero icons row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex gap-x-3 items-center"
        >
          {["🕷️", "🛡️", "⚡", "🔮", "🦾", "🐾"].map((icon, i) => (
            <motion.span
              key={i}
              className="text-2xl cursor-default select-none"
              animate={{ y: [0, -6, 0], rotate: [0, 5, -5, 0] }}
              transition={{
                duration: 2.5,
                delay: i * 0.25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              title={["Spider-Man", "Captain America", "Thor", "Scarlet Witch", "Iron Man", "Black Panther"][i]}
            >
              {icon}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ArcReactorButton onClick={onJoin} />
        </motion.div>

        <p className="text-gray-600 text-xs mt-1">
          Join{" "}
          <span className="text-yellow-400 font-bold">12,000+ learners</span>{" "}
          already on their hero journey
        </p>
      </div>
    </section>
  );
}

export default MarvelBanner;
