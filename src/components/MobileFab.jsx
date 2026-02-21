export default function MobileFab() {
  return (
    <div className="fixed bottom-6 right-6 z-50 lg:hidden">
      <div className="relative flex flex-col items-end gap-4">

        {/* Action Buttons */}
        <div className="flex flex-col items-end gap-3">

          {/* Telegram */}
          <a
            href="https://t.me/zilolgilam"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white shadow-lg hover:scale-110 transition duration-300"
          >
          <img src="/tel.png" alt="" className="text-center" />
          </a>

          {/* Phone */}
          <a
            href="tel:+998732001313"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 shadow-lg hover:scale-110 transition duration-300"
          >
            <img
              src="/images.png"
              alt="Phone"
            
            />
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/yourusername"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg hover:scale-110 transition duration-300"
          >
            <img
              src="/instagram.png"
              alt="Instagram"
              className="w-12 h-12  "
            />
          </a>

        </div>

      </div>
    </div>
  );
}