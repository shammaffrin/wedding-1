import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import musicFile from "../../public/Kudmay.aac";

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(musicFile);
    audio.loop = true;
    audio.volume = 0.5;

    audioRef.current = audio;

    // try autoplay
    audio.play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // ▶️ START (from beginning or resume if already loaded)
  const start = async () => {
    if (!audioRef.current) return;

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {}
  };

  // ⏸ STOP (pause + reset to start)
  const stop = () => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  // 🔁 TOGGLE
  const toggle = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      start();
    } else {
      stop();
    }
  };

  return (
    <motion.button
      className="fixed bottom-6 right-6 z-40 w-12 h-12 flex items-center justify-center"
      style={{
        background: "rgba(13,10,5,0.85)",
        border: "1px solid rgba(212,175,55,0.3)",
        backdropFilter: "blur(12px)",
      }}
      onClick={toggle}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      {isPlaying ? (
        <Volume2 size={18} className="text-[#D4AF37]" />
      ) : (
        <VolumeX size={18} className="text-[#D4AF37]/70" />
      )}
    </motion.button>
  );
}