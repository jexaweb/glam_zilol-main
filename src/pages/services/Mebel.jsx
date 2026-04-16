import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Ariza from "../../components/Ariza";
import { useLanguage } from "../../components/LanguageContext";

export default function Mebel() {
  const [showModal, setShowModal] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const { language } = useLanguage();
  const navigate = useNavigate();

  const translations = {
    uz: {
      title: "Mebel tozalash xizmati 🛋️",
      desc: "Divan, kreslo va boshqa yumshoq mebellarni chuqur tozalaymiz. Dog‘, chang va hidlarni yo‘q qilamiz.",
      parg: "Professional uskunalar bilan yuvish.",
      list: [
        "Uyga borib xizmat ko‘rsatamiz",
        "1-5 soatda tayyor",
        "Xavfsiz kimyoviy vositalar",
      ],
      order: "Buyurtma qoldirish",

      servicesTitle: "Bizning xizmatlar",
      services: ["Stul yuvish", "Kreslo yuvish", "Mebel yuvish"],

      processTitle: "Qanday ishlaymiz?",
      steps: [
        "Buyurtma berasiz",
        "Uyga boramiz",
        "Mebelni ko‘zdan kechiramiz",
        " yuvishni boshlaymiz",
      ],

      priceTitle: "1 donadan narxlar",
      pricing: [
        { name: "Mebel", price: "100 000 so'm" },
        { name: "Stul", price: "30 000 so'm" },
      ],

      ctaTitle: "Hoziroq buyurtma bering 📞",
      ctaDesc: "Birinchi buyurtmaga 20% chegirma!",
      call: "Qo‘ng‘iroq qilish",
      orderBtn: "Buyurtma berish",
      trust: "✔ Tez javob beramiz • ✔ 100% bepul maslahat",
    },

    ru: {
      title: "Чистка мебели 🛋️",
      desc: "Глубокая очистка диванов, кресел и мягкой мебели. Удаляем пятна, пыль и запахи.",
      parg: "Мойка с использованием профессионального оборудования.",
      list: ["Выезд на дом", "Готово за 1-5 часа", "Безопасные средства"],
      order: "Оставить заявку",

      servicesTitle: "Наши услуги",
      services: ["Чистка стульев", "Чистка кресел", "Чистка мебели"],

      processTitle: "Как мы работаем?",
      steps: [
        "Оставляете заявку",
        "Приезжаем к вам",
        "Осматриваем мебель",
        "Проводим чистку",
      ],

      priceTitle: "Цены за единицу",
      pricing: [
        { name: "Мебель", price: "100 000 сум" },
        { name: "Стул", price: "30 000 сум" },
      ],

      ctaTitle: "Закажите прямо сейчас 📞",
      ctaDesc: "Скидка 20% на первый заказ!",
      call: "Позвонить",
      orderBtn: "Оставить заявку",
      trust: "✔ Быстрый ответ • ✔ Бесплатная консультация",
    },
  };

  const t = translations[language] || translations.uz;

  const videos = [
    { video: "/videos/mebel1.mp4", img: "/mebel1.png" },
    { video: "/videos/mebel2.mp4", img: "/mebel2.png" },
    { video: "/videos/mebel.mp4", img: "/zilolclengi.2.png" },
    { video: "/videos/mebel3.mp4", img: "/mebel3.png" },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-amber-400/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/30 blur-3xl rounded-full"></div>

      {/* HERO */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t.title}</h1>

            <p className="mb-6">{t.desc}</p>

            <ul className="space-y-2 mb-6">
              {t.list.map((item, i) => (
                <li key={i}>✔ {item}</li>
              ))}
            </ul>

            <button
              onClick={() => setShowModal(true)}
              className="bg-amber-500 text-white px-5 py-2 rounded-full shadow-lg hover:shadow-amber-400/50 hover:-translate-y-1 transition-all duration-300"
            >
              {t.order}
            </button>
          </div>
          {/* VIDEO THUMBNAILS */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {videos.map((item, i) => (
              <div
                key={i}
                onClick={() => setActiveVideo(item.video)}
                className="min-w-64  relative cursor-pointer rounded-2xl overflow-hidden group 
      shadow-md hover:shadow-2xl 
      transition-all duration-500 
      hover:-translate-y-2 hover:scale-[1.03]"
              >
                {/* IMAGE */}
                <img
                  src={item.img}
                  alt="zilol gilam yuvish vedos img"
                  className="w-full h-160px object-cover group-hover:scale-105 transition duration-300"
                />

                {/* PLAY ICON */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/50 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl backdrop-blur-sm group-hover:scale-110 transition">
                    ▶
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🎥 VIDEO MODAL */}
      {activeVideo && (
        <div
          onClick={() => setActiveVideo(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveVideo(null);
            }}
            className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center 
  rounded-full bg-black/60 backdrop-blur-md text-white text-lg
  hover:bg-amber-400 hover:text-black 
  transition-all duration-300 shadow-md hover:scale-110 active:scale-95"
          >
            ✕
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl"
          >
            {/* ❌ yopish tugmasi */}

            {/* 🎥 VIDEO */}
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <video
                src={activeVideo}
                controls
                autoPlay
                className="w-full max-h-[70vh] object-contain bg-black"
              />
            </div>
          </div>
        </div>
      )}

      {/* SERVICES */}
      <section className="py-20 bg-gray-50 text-black">
        <h2 className="text-3xl text-center mb-12">{t.servicesTitle}</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {t.services.map((item, i) => (
            <div key={i} className="p-6 bg-white rounded-xl shadow">
              <h3 className="font-semibold">{item}</h3>
              <p>{t.parg}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 bg-gray-100 text-black">
        <h2 className="text-3xl text-center mb-12">{t.processTitle}</h2>

        <div className="grid md:grid-cols-4 gap-6 text-center max-w-6xl mx-auto px-4">
          {t.steps.map((step, i) => (
            <div key={i}>
              <div className="text-3xl text-amber-400">{i + 1}</div>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 text-center">
        <h2 className="text-3xl mb-10">{t.priceTitle}</h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {t.pricing.map((item, i) => (
            <div key={i} className="p-6 border rounded-xl">
              <h3>{item.name}</h3>
              <p className="text-amber-400 text-xl">{item.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 text-center overflow-hidden">
        {/* 🔥 background glow */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-amber-400/30 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-500/30 blur-3xl rounded-full"></div>

        <div className="relative max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            {t.ctaTitle}
          </h2>

          <p className="mb-8 text-lg text-gray-300">{t.ctaDesc}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* 📞 CALL */}
            <a
              href="tel:+998732001313"
              className="px-8 py-4 rounded-xl bg-amber-400 text-black font-semibold 
        shadow-lg hover:shadow-amber-400/50 
        hover:scale-105 active:scale-95 
        transition duration-300"
            >
              {t.call} 📞
            </a>

            {/* 📝 ORDER */}
            <button
              onClick={() => setShowModal(true)}
              className="px-8 py-4 rounded-xl bg-white text-black font-semibold 
        shadow-md hover:shadow-xl 
        hover:scale-105 active:scale-95 
        transition duration-300"
            >
              {t.orderBtn} 📝
            </button>
          </div>

          {/* TRUST TEXT */}
          <p className="mt-6 text-sm text-gray-400">{t.trust}</p>
        </div>
      </section>

      {/* 📩 FORM MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="  max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl relative p-4">
            {/* ❌ yopish tugmasi */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-black text-xl bg-gray-200 px-2 rounded hover:text-red-600"
            >
              ✕
            </button>

            {/* 🔥 ARIZA ICHIDA */}
            <Ariza />
          </div>
        </div>
      )}
    </div>
  );
}
