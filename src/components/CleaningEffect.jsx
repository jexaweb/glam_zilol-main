import { useState, useRef } from "react";

export default function CleaningEffect() {
  const [pos, setPos] = useState(0);
  const lastY = useRef(0);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;

    // faqat pastga harakatni tekshiradi
    if (y > lastY.current) {
      const percent = (y / rect.height) * 100;

      setPos((prev) => {
        // sekin oshadi (smooth feel)
        return Math.min(100, prev + (percent - prev) * 0.1);
      });
    }

    lastY.current = y;
  };

  return (
    <section
      onMouseMove={handleMove}
      className="relative h-[400px] md:h-[500px] overflow-hidden"
    >
      {/* CLEAN (pastda) */}
      <img
        src="https://images.unsplash.com/photo-1581578731548-c64695cc6952"
        alt="zilol gilam yuvish rasmi"
        className="absolute w-full h-full object-cover"
      />

      {/* DIRTY (ustda) */}
      <div
        className="absolute w-full left-0 overflow-hidden"
        style={{ height: `${100 - pos}%` }}
      >
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="zilol gilam yuvish bg-img "
          className="w-full h-full object-cover"
        />
      </div>

      {/* WAND */}
      <img
        src="https://octanecdn.com/zrengine/zrengine_943529811.png"
        alt="zilol gilam yuvish bg-img "
        className="absolute left-1/2 pointer-events-none transition-all duration-200"
        style={{
          top: `${pos}%`,
          transform: "translate(-50%, -50%) rotate(90deg)",
          width: "300px",
        }}
      />
    </section>
  );
}
