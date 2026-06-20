import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const STICKERS = [
  { emoji: "📚", size: 28 },
  { emoji: "🎓", size: 34 },
  { emoji: "⭐", size: 22 },
  { emoji: "💡", size: 26 },
  { emoji: "🚀", size: 30 },
  { emoji: "✨", size: 20 },
  { emoji: "🎯", size: 28 },
  { emoji: "📖", size: 24 },
  { emoji: "🔥", size: 26 },
  { emoji: "💻", size: 30 },
  { emoji: "🎨", size: 24 },
  { emoji: "🏆", size: 28 },
  { emoji: "🌟", size: 22 },
  { emoji: "💎", size: 20 },
  { emoji: "🧠", size: 26 },
  { emoji: "📝", size: 22 },
  { emoji: "🎵", size: 20 },
  { emoji: "🌈", size: 28 },
];

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function FloatingStickers() {
  const [stickers, setStickers] = useState([]);

  useEffect(() => {
    const rand = seededRandom(42);
    const items = Array.from({ length: 18 }, (_, i) => {
      const sticker = STICKERS[i % STICKERS.length];
      return {
        id: i,
        emoji: sticker.emoji,
        size: sticker.size + rand() * 12,
        left: rand() * 96 + "%",
        top: rand() * 90 + "%",
        duration: 10 + rand() * 14,
        delay: rand() * -12,
        xRange: (rand() - 0.5) * 80,
        yRange: (rand() - 0.5) * 80,
        rotateRange: (rand() - 0.5) * 60,
        opacity: 0.08 + rand() * 0.1,
      };
    });
    setStickers(items);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {stickers.map((s) => (
        <motion.div
          key={s.id}
          style={{
            position: "absolute",
            left: s.left,
            top: s.top,
            fontSize: s.size,
            opacity: s.opacity,
            userSelect: "none",
          }}
          animate={{
            x: [0, s.xRange, -s.xRange / 2, 0],
            y: [0, s.yRange, -s.yRange / 3, 0],
            rotate: [0, s.rotateRange, -s.rotateRange / 2, 0],
            opacity: [s.opacity, s.opacity * 1.8, s.opacity * 0.6, s.opacity],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {s.emoji}
        </motion.div>
      ))}
    </div>
  );
}

export default FloatingStickers;
