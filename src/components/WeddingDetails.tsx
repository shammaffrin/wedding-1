import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Clock } from "lucide-react";
import confetti from "canvas-confetti";

export default function WeddingDetails() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [revealed, setRevealed] = useState(false);

  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-10%",
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 320;
    canvas.height = 180;

    // Gold scratch layer
    ctx.fillStyle = "#D4AF37";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#000";
    ctx.font = "20px serif";
    ctx.textAlign = "center";
    ctx.fillText("Scratch Here ✨", canvas.width / 2, 95);

    let scratching = false;

    const scratch = (x: number, y: number) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
    };

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();

      if ("touches" in e) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      }

      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const start = () => (scratching = true);
    const end = () => {
      scratching = false;

      const imageData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );

      let transparentPixels = 0;

      for (let i = 3; i < imageData.data.length; i += 4) {
        if (imageData.data[i] === 0) transparentPixels++;
      }

      const percent =
        transparentPixels / (canvas.width * canvas.height);

      if (percent > 0.4 && !revealed) {
        setRevealed(true);

        confetti({
  particleCount: 220,
  spread: 100,
  origin: { y: 0.6 },
  colors: [
    "#D4AF37", // gold
    "#FFD700", // bright gold
    "#E6BE8A", // champagne gold
    "#C5A977", // muted gold
    "#F8E7A1", // soft shimmer
  ],
});
      }
    };

    const move = (e: MouseEvent | TouchEvent) => {
      if (!scratching) return;
      const pos = getPos(e);
      scratch(pos.x, pos.y);
    };

    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mouseup", end);
    canvas.addEventListener("mousemove", move);

    canvas.addEventListener("touchstart", start);
    canvas.addEventListener("touchend", end);
    canvas.addEventListener("touchmove", move);

    return () => {
      canvas.removeEventListener("mousedown", start);
      canvas.removeEventListener("mouseup", end);
      canvas.removeEventListener("mousemove", move);

      canvas.removeEventListener("touchstart", start);
      canvas.removeEventListener("touchend", end);
      canvas.removeEventListener("touchmove", move);
    };
  }, [revealed]);

 return (
  <section
    ref={sectionRef}
    className="relative py-24 text-center overflow-hidden bg-black"
  >
    {/* Background image layer */}

    {/* Dark overlay for readability */}
    <div className="absolute inset-0 bg-black/70" />

    <div className="relative z-10 max-w-4xl mx-auto px-6">
      <h2 className="text-5xl text-[#D4AF37] mb-10">
        Save The Date
      </h2>

      {/* Scratch Card */}
      <div className="relative w-[320px] h-[180px] mx-auto mb-20">

  {/* Background layer only */}
  <div className="absolute inset-0 bg-[#111] opacity-80 rounded-xl border border-[#D4AF37]/20" />

  {/* Content layer (always fully visible) */}
  <div className="absolute inset-0 flex flex-col items-center justify-center">
    <h2 className="text-6xl text-[#D4AF37]">15</h2>
    <p className="text-3xl text-[#E8D8B8] mt-2">
      June 2026
    </p>
  </div>

  {/* Scratch layer */}
  {!revealed && (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 rounded-xl cursor-pointer"
    />
  )}
</div>

      {/* Wedding details */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
      >
        <h3 className="text-4xl text-[#D4AF37] mb-8">
          Nikah & Reception
        </h3>

        <Clock className="mx-auto text-[#D4AF37] mb-4" />

        <p className="text-2xl text-white">
          Nikah at 11:00 AM
        </p>

        <p className="text-lg text-[#C5A977] mt-2 italic">
          Reception follows until 2:00 PM
        </p>

        <p className="mt-6 text-white">
          Venue details below
        </p>
      </motion.div>
    </div>
  </section>
);
}