import { useState, useRef, useEffect } from "react";

export default function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // 🔥 tashqariga bosilganda yopiladi
  useEffect(() => {
    const handleClick = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={menuRef} className="relative ml-auto">

      {/* 🔥 BUTTON */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // 🔥 MUHIM
          setOpen((prev) => !prev);
        }}
        className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-200 transition"
      >
        ⚙️
        <span className="hidden md:inline">
          Maxsus imkoniyatlar
        </span>
      </button>

      {/* 🔥 DROPDOWN */}
      {open && (
        <div className="absolute right-0 top-full mt-2 z-[999] bg-white text-black p-5 rounded-xl shadow-2xl w-[260px]">
          
          {/* 🔤 FONT SIZE */}
          <p className="font-bold mb-2">Shrift hajmi:</p>
          <div className="flex gap-2 mb-4">
            <button className="bg-gray-200 px-3 py-1 rounded">A</button>
            <button className="bg-gray-300 px-3 py-1 rounded text-lg">A</button>
            <button className="bg-gray-400 px-3 py-1 rounded text-xl">A</button>
          </div>

          {/* 🎨 THEME */}
          <p className="font-bold mb-2">Ranglar:</p>
          <div className="flex gap-2 mb-4">
            <button className="bg-white border px-3 py-1 rounded">☀️</button>
            <button className="bg-black text-white px-3 py-1 rounded">🌙</button>
            <button className="bg-blue-200 text-blue-900 px-3 py-1 rounded">🔵</button>
          </div>

          <hr className="my-3" />

          {/* RESET */}
          <button
            onClick={() => alert("Reset qilindi")}
            className="w-full text-blue-500 hover:underline"
          >
            Qayta tiklash
          </button>
        </div>
      )}
    </div>
  );
}