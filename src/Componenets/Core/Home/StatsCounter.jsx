import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

const STATS = [
  { value: 12000, suffix: "+", label: "Students Enrolled", icon: "🎓", color: "from-blue-500 to-cyan-400" },
  { value: 500,   suffix: "+", label: "Expert Courses",    icon: "📚", color: "from-purple-500 to-pink-400" },
  { value: 50,    suffix: "+", label: "Top Instructors",   icon: "🏆", color: "from-yellow-400 to-orange-400" },
  { value: 4.8,   suffix: "★", label: "Average Rating",    icon: "⭐", color: "from-green-400 to-emerald-500", isFloat: true },
];

function AnimatedNumber({ target, suffix, isFloat }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (inView) {
      motionVal.set(target);
    }
  }, [inView, target, motionVal]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      setDisplay(isFloat ? v.toFixed(1) : Math.floor(v).toLocaleString());
    });
    return unsub;
  }, [spring, isFloat]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}{suffix}
    </span>
  );
}

function StatsCounter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="w-full py-16 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0f0a1e 0%, #1e1040 50%, #0a0f1e 100%)",
      }}
    >
      {/* Glow orbs */}
      <div
        className="absolute top-0 left-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="w-10/12 max-w-5xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl font-extrabold text-white mb-12"
        >
          Trusted by Learners{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Worldwide
          </span>
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="flex flex-col items-center justify-center gap-y-2 p-6 rounded-2xl text-center cursor-default"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }}
            >
              <motion.span
                className="text-3xl"
                animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
              >
                {stat.icon}
              </motion.span>

              <span
                className={`text-3xl font-black bg-gradient-to-r ${stat.color} text-transparent bg-clip-text`}
              >
                <AnimatedNumber
                  target={stat.value}
                  suffix={stat.suffix}
                  isFloat={stat.isFloat}
                />
              </span>

              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsCounter;
