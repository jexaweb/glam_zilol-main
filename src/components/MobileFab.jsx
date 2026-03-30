import { useState } from "react";
import { FaPhone, FaTelegram } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import Ariza from "./Ariza"; // 🔥 MUHIM

export default function MobileFab() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* RIGHT ICONS */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

        <a
          href="https://t.me/zilolgilam"
          className="flex items-center justify-center rounded-full bg-blue-500 shadow-lg hover:scale-110 transition"
        >
          <FaTelegram className="w-12 h-12 text-white" />
        </a>

        <a
          href="tel:+998732001313"
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg hover:scale-110 transition"
        >
          <FaPhone className="w-7 h-7 text-black" />
        </a>

        <a
          href="https://www.instagram.com/zilolgilam_yuvish"
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg hover:scale-110 transition"
        >
          <GrInstagram className="w-7 h-7 text-pink-500" />
        </a>
      </div>

      {/* BUTTON */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:hidden z-50">
        <button
          onClick={() => setShowModal(true)}
          className="
            group relative inline-flex items-center justify-center
            min-w-[130px] sm:min-w-[160px] md:min-w-[180px]
            min-h-[45px] sm:min-h-[55px]
            px-4 sm:px-6 py-2 sm:py-3
            text-sm sm:text-base font-bold uppercase tracking-wider
            text-[#313133] rounded-full bg-yellow-300
            shadow-[12px_12px_24px_rgba(79,209,197,0.64)]
            transition-all duration-300 hover:-translate-y-2 overflow-hidden
          "
        >
          Buyurtma qoldirish

          <span className="absolute inset-0 rounded-full border-[4px] sm:border-[6px] border-[#00FFCB] shadow-[0_0_60px_rgba(0,255,203,0.64)] opacity-0 transition group-hover:opacity-100"></span>

          <span className="absolute w-[30px] h-[30px] rounded-full border-[4px] sm:border-[6px] border-[#00FFCB] animate-[ring_1.5s_infinite]"></span>

          <style>
            {`
              @keyframes ring {
                0% { width: 30px; height: 30px; opacity: 1; }
                100% { width: 260px; height: 260px; opacity: 0; }
              }
            `}
          </style>
        </button>
      </div>

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          
          <div className=" max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl relative p-4">

            {/* ❌ CLOSE */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-black text-xl bg-gray-200 px-2 rounded hover:text-red-600"
            >
              ✕
            </button>

            {/* 🔥 FORM */}
            <Ariza />

          </div>
        </div>
      )}
    </>
  );
}