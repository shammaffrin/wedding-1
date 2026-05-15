import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


interface OpeningScreenProps {
  onOpen: () => void;
}

export default function OpeningScreen({
  onOpen,
}: OpeningScreenProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);

    setTimeout(() => {
      onOpen();
    }, 1400);
  };

  return (
    <AnimatePresence>
      {!isOpening ? (
        <motion.div
          key="opening"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Dark background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-[#111111]" />

          {/* Gold glow */}
          <div className="absolute top-10 left-10 w-72 h-72 bg-[#D4AF37]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#B8860B]/20 rounded-full blur-3xl" />

          {/* Floating particles */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                background: "rgba(212,175,55,0.4)",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: Math.random() * 6 + 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}

          {/* Main content */}
          <div className="relative z-10 text-center px-6 max-w-2xl">

            {/* Bismillah */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-3xl text-[#E8D8B8] mb-7"
              style={{
                fontFamily: "'Noto Nastaliq Urdu', serif",
              }}
            >
              بسم الله الرحمن الرحيم
            </motion.p>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="w-28 h-[1px] mx-auto mb-6"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #D4AF37, transparent)",
              }}
            />

            {/* Wedding invitation */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-xs tracking-[0.5em] uppercase text-[#C5A977] mb-5"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              Wedding Invitation
            </motion.p>

            {/* Names */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-[54px] sm:text-6xl text-[#D4AF37] mb-4 flex items-center justify-center gap-3 text-center"
              style={{
                  fontFamily: "'Gwendolyn', cursive",
              }}
            >
              <span>Shamma </span>
              &
              <span>Shuhaib</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-xs tracking-[0.4em] uppercase text-[#C5A977] mb-10"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              Request The Honour Of Your Presence
            </motion.p>

            {/* Open button */}
            <motion.button
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              onClick={handleOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 rounded-full border border-[#D4AF37]/40 bg-[#111111]/70 backdrop-blur-sm text-[#D4AF37] tracking-[0.35em] uppercase text-sm"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              Open Invitation
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="transition"
          className="fixed inset-0 z-50 bg-black"
          initial={{ opacity: 1 }}
          animate={{
            opacity: 0,
            scale: 1.05,
          }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
          }}
        />
      )}
    </AnimatePresence>
  );
}