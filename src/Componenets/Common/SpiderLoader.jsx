import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────
   SpiderLoader – shows for 1.8s on first visit (session),
   then disappears. Spider-Man themed cinematic intro.
   ───────────────────────────────────────────────────────── */

const WEB_LINES = 12;

function SpiderWeb({ cx, cy, maxR }) {
  const rings = [maxR * 0.25, maxR * 0.5, maxR * 0.75, maxR];
  const angles = Array.from({ length: WEB_LINES }, (_, i) => (i * 360) / WEB_LINES);

  return (
    <svg
      viewBox={`${-maxR} ${-maxR} ${maxR * 2} ${maxR * 2}`}
      className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
      style={{ left: cx, top: cy }}
    >
      {/* Radial lines */}
      {angles.map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={angle}
            x1="0" y1="0"
            x2={maxR * Math.cos(rad)}
            y2={maxR * Math.sin(rad)}
            stroke="#ef4444"
            strokeWidth="1"
            strokeLinecap="round"
          />
        );
      })}
      {/* Concentric rings */}
      {rings.map((r) => (
        <circle key={r} cx="0" cy="0" r={r} fill="none" stroke="#ef4444" strokeWidth="0.8" />
      ))}
    </svg>
  );
}

function SpiderLoader() {
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    if (sessionStorage.getItem("studynotion_intro_done")) return false;
    return true;
  });

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => {
      sessionStorage.setItem("studynotion_intro_done", "1");
      setShow(false);
    }, 2200);
    return () => clearTimeout(t);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="spider-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          className="fixed inset-0 flex flex-col items-center justify-center z-[99999] overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0a0010 0%, #0f0028 60%, #080015 100%)",
          }}
        >
          {/* Full-screen web */}
          <SpiderWeb cx={0} cy={0} maxR={900} />

          {/* Spider-Man symbol */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.1 }}
            className="relative mb-6"
          >
            {/* Outer glow ring */}
            <motion.div
              animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.15, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(220,38,38,0.6) 0%, transparent 70%)",
                filter: "blur(18px)",
              }}
            />
            <span className="text-7xl select-none drop-shadow-lg" style={{ filter: "drop-shadow(0 0 20px #ef4444)" }}>
              🕷️
            </span>
          </motion.div>

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col items-center gap-y-2"
          >
            <motion.h1
              className="text-4xl font-black text-white tracking-widest uppercase"
              style={{
                fontFamily: "'Outfit', sans-serif",
                textShadow: "0 0 30px rgba(220,38,38,0.7)",
              }}
            >
              Study<span style={{ color: "#ef4444" }}>Notion</span>
            </motion.h1>
            <p className="text-gray-400 text-sm tracking-[0.25em] uppercase">
              Assemble Your Skills
            </p>
          </motion.div>

          {/* Web-swing progress bar */}
          <motion.div
            className="mt-8 relative w-60 h-1 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background: "linear-gradient(90deg, #ef4444, #f97316)",
                boxShadow: "0 0 10px #ef4444",
              }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "linear" }}
            />
          </motion.div>

          {/* Swinging spider */}
          <motion.div
            className="absolute top-0 text-3xl pointer-events-none select-none"
            style={{ left: "10%" }}
            animate={{
              x: ["0vw", "80vw"],
              y: ["-2vh", "15vh", "-2vh"],
              rotate: [0, 15, -15, 0],
            }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
          >
            🕷️
          </motion.div>

          {/* Skip hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-6 text-gray-600 text-xs"
          >
            Loading your hero journey...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SpiderLoader;
