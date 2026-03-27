import React, { useRef, useState, useEffect } from "react";

export default function BeforeAfterSection() {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState(50);
  const [active, setActive] = useState(0);

  const data = [
    {
      name: "Gilam",
      icon: "/icons/gilam.png",
      before: "/gilam-before.jpg",
      after: "/gilam-after.jpg",
    },
    {
      name: "Mebel",
      icon: "/icons/mebel.png",
      before: "/mebel-before.jpg",
      after: "/mebel-after.jpg",
    },
      {
      name: "Stul",
      icon: "/icons/stul.png",
      before: "/stul-before.jpg",
      after: "/stul-after.jpg",
    },
    {
      name: "Yakkandoz",
      icon: "/icons/yakkandoz.png",
      before: "/yakkandoz-before.jpg",
      after: "/yakkandoz-after.jpg",
    },
    {
      name: "Matras",
      icon: "/icons/matras.png",
      before: "/matras-before.jpg",
      after: "/matras-after.jpg",
    },
  ];

  const current = data[active];

  // DRAG
  useEffect(() => {
    const onMove = (e) => {
      if (!isDragging) return;

      requestAnimationFrame(() => {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const rect = containerRef.current.getBoundingClientRect();
        let pct = ((clientX - rect.left) / rect.width) * 100;
        pct = Math.max(0, Math.min(100, pct));
        setPos(pct);
      });
    };

    const stop = () => setIsDragging(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", stop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", stop);
    };
  }, [isDragging]);

  return (
    <section className="bg-[#e5f6f5] py-16 md:py-20 px-4 md:px-6 text-black">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 text-center">Before & After</h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
  

        {/* LEFT - SLIDER */}
     <div
  ref={containerRef}
  onMouseDown={() => setIsDragging(true)}
  onTouchStart={() => setIsDragging(true)}
  className="relative overflow-hidden w-full max-w-[650px] h-[300px] md:h-[420px] lg:h-[500px] lg:w-[600px]  
  shadow-2xl ring-2 ring-white/20 cursor-ew-resize select-none rounded-xl"
>

  {/* AFTER */}
  <img
    src={current.after}
    className="w-full h-full object-cover block pointer-events-none select-none"
    draggable="false"
  />

  {/* AFTER LABEL */}
  <div className="absolute top-4 right-4 z-10 bg-amber-400 text-white text-xs
   md:text-sm px-3 py-1 rounded-full backdrop-blur">
      Oldin
  </div>

  {/* BEFORE */}
  <div
    className="absolute top-0 left-0 h-full w-full"
    style={{
      clipPath: `inset(0 ${100 - pos}% 0 0)`,
      transition: isDragging ? "none" : "clip-path 0.2s ease-out",
      willChange: "clip-path",
    }}
  >
    <img
      src={current.before}
      className="w-full h-full object-cover block pointer-events-none select-none"
      draggable="false"
    />

    {/* BEFORE LABEL */}
    <div className="absolute top-4 left-4 z-10 bg-amber-400 text-white text-xs
     md:text-sm px-3 py-1 rounded-full backdrop-blur">
     Keyin
    </div>
  </div>

  {/* HANDLE */}
  <div
    className="absolute top-0 bottom-0 flex items-center justify-center"
    style={{
      left: `${pos}%`,
      transform: "translateX(-50%)",
      transition: isDragging ? "none" : "left 0.2s ease-out",
      willChange: "left",
    }}
  >
    <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-white border-
     border-yellow-400 rounded-full flex items-center justify-center shadow-lg">
      <div className="w-1.5 h-4 md:h-6 bg-yellow-400"></div>
    </div>
  </div>

  {/* LINE */}
  <div
    className="absolute top-0 bottom-0 w-1 bg-yellow-400 opacity-60"
    style={{
      left: `${pos}%`,
      transform: "translateX(-50%)",
    }}
  ></div>
</div>

        {/* RIGHT - ICON LIST */}
        <div className="lg:col-span-4 sm:ml-170 w-full">

          {/* MOBILE */}
          <div className="flex lg:hidden gap-3 overflow-x-auto pb-2">
            {data.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  setActive(i);
                  setPos(50);
                }}
                className={`min-w-[110px] flex flex-col items-center justify-center gap-2 cursor-pointer p-3 
                  rounded-xl transition
                ${
                  active === i
                    ? "bg-white shadow-lg scale-105"
                    : "bg-white/50"
                }`}
              >
                <img src={item.icon} className="w-8 h-8" />
                <span className="text-sm font-medium text-center">
                  {item.name}
                </span>
              </div>
            ))}
          </div>

          {/* DESKTOP */}
          <div className="hidden lg:flex flex-col gap-4">
            {data.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  setActive(i);
                  setPos(50);
                }}
                className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl transition
                ${
                  active === i
                    ? "bg-white shadow-lg scale-105"
                    : "hover:bg-white/50"
                }`}
              >
                <img
                  src={item.icon}
                  className="w-10 h-10 object-contain"
                />
                <span className="font-semibold">{item.name}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}