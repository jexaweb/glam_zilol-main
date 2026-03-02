import { FaPhone, FaTelegram } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { Link } from "react-router-dom";

export default function MobileFab() {
  return (
    <>
      {/* RIGHT SIDE ICONS — HAR DOIM KO'RINADI */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

        {/* Telegram */}
        <a
          href="https://t.me/zilolgilam"
          className="  flex items-center justify-center rounded-full bg-blue-500 shadow-lg hover:scale-110 transition duration-300"
        >
          {/* <img src="/tel.png" alt="Telegram" className="w-12 h-12" /> */}
          <FaTelegram className="w-12 h-12 text-white" />
        </a>

        {/* Phone */}
        <a
          href="tel:+998732001313"
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg hover:scale-110 transition duration-300"
        >
          {/* <img src="/images.png" alt="Phone" className="w-12 h-12" /> */}
          <FaPhone className="w-7 h-7 text-stone-950" />
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com/yourusername"
          className=" w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg hover:scale-110 transition duration-300"
        >
          {/* <img src="/instagram.png" alt="Instagram" className="w-12 h-12" /> */}
          <GrInstagram className="w-7 h-7 text-shadow-red-600" />
        </a>
      </div>

      {/* ARIZA QOLDIRISH — FAFAQAT MOBIL, CENTERDA */}
 <div className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:hidden z-50">
  <Link
    to="/ariza"
    className="
      relative
      inline-flex
      items-center
      justify-center
      min-w-[150px]
      min-h-[55px]
px-6
py-3
      
      font-bold
      uppercase
      tracking-wider
      text-[#313133]
      rounded-full
      bg-gradient-to-r
      from-[#eeff00]
      to-[#eaff00]
      shadow-[12px_12px_24px_rgba(79,209,197,0.64)]
      transition-all
      duration-300
      hover:-translate-y-2
      overflow-hidden
    "
  >
    Ariza qoldirish

    {/* Hover glow border */}
    <span
      className="
        absolute
        inset-0
        rounded-full
        border-[6px]
        border-[#00FFCB]
        shadow-[0_0_60px_rgba(0,255,203,0.64)]
        opacity-0
        transition-all
        duration-300
        group-hover:opacity-100
      "
    ></span>

    {/* Ring animation */}
    <span
      className="
        absolute
        w-[30px]
        h-[30px]
        rounded-full
        border-[6px]
        border-[#00FFCB]
        animate-[ring_1.5s_infinite]
      "
    ></span>

    {/* Keyframe */}
    <style>
      {`
        @keyframes ring {
          0% {
            width: 30px;
            height: 30px;
            opacity: 1;
          }
          100% {
            width: 260px;
            height: 260px;
            opacity: 0;
          }
        }
      `}
    </style>
  </Link>
</div>
    </>
  );
}