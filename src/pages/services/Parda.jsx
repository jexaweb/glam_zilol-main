import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../components/LanguageContext";
import Ariza from "../../components/Ariza";

export default function Parda() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  const translations = {
    uz: {
      title: "Parda yuvish xizmati 🪟",
      desc: "Pardalaringizni ehtiyotkorlik bilan yuvamiz, rangini saqlab qolamiz va yangi kabi qilib qaytaramiz.",
      list: [
        "Olib ketish va yetkazish bepul",
        "yegib olamiz va ilib berish",
        "Tez va sifatli xizmat",
      ],
      order: "Buyurtma qoldirish",

      servicesTitle: "Bizning xizmatlar",
      pricing: [
        {
          title: "Premium parda yuvish",
          price: "35 000 so'm / 1 kg",
          desc: "Yegib olamiz va ilib beramiz",
        },
        {
          title: "Standart parda yuvish",
          price: "25 000 so'm / 1 kg",
          desc: "1-5 kun ichida yetkazib beramiz",
        },
      ],

      processTitle: "Qanday ishlaymiz?",
      steps: [
        "Buyurtma berasiz",
        "Uyga boramiz",
        "Olib ketamiz",
        "Yuvib quritib yetkazamiz",
      ],

      ctaTitle: "Hoziroq buyurtma bering 📞",
      ctaDesc: "Birinchi buyurtmaga 20% chegirma!",
      call: "Qo‘ng‘iroq qilish",
      orderBtn: "Buyurtma berish",
      trust: "✔ Tez javob beramiz • ✔ 100% bepul maslahat",
    },

    ru: {
      title: "Стирка штор 🪟",
      desc: "Мы аккуратно стираем ваши шторы, сохраняем их цвет и возвращаем как новые.",
      list: [
        "Забираем и доставляем обратно",
        "Чистка без отбеливания",
        "Быстро и качественно",
      ],
      order: "Оставить заявку",

      servicesTitle: "Наши услуги",
      pricing: [
        {
          title: "Премиум стирка штор",
          price: "35 000 сум / 1 кг",
          desc: "Снимаем и вешаем обратно",
        },
        {
          title: "Стандартная стирка штор",
          price: "25 000 сум / 1 кг",
          desc: "Доставка за 1-5 дней",
        },
      ],

      processTitle: "Как мы работаем?",
      steps: [
        "Оставляете заявку",
        "Приезжаем к вам",
        "Забираем",
        "Стираем, сушим и доставляем",
      ],

      ctaTitle: "Закажите прямо сейчас 📞",
      ctaDesc: "Скидка 10% на первый заказ!",
      call: "Позвонить",
      orderBtn: "Оставить заявку",
      trust: "✔ Быстрый ответ • ✔ Бесплатная консультация",
    },
  };

  const t = translations[language] || translations.uz;

  const videos = [
    { video: "/videos/gilam1.mp4", img: "/zilolclengi.png" },
    { video: "/videos/gilam.mp4", img: "/zilolclengi.1.png" },
    { video: "/videos/mebel.mp4", img: "/zilolclengi.2.png" },
    { video: "/videos/yakandoz.mp4", img: "/zilolclengi.3.png" },
  ];

  return (
    <div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-amber-400/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/30 blur-3xl rounded-full"></div>
      {/* HERO */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-6">{t.title}</h1>
            <p className="mb-6">{t.desc}</p>

            <ul className="space-y-2 mb-6">
              {t.list.map((item, i) => (
                <li key={i}>✔ {item}</li>
              ))}
            </ul>

            <button
              onClick={() => setShowModal(true)}
              className="bg-amber-500 text-white px-5 py-2 rounded-full"
            >
              {t.order}
            </button>
          </div>

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
      <section className="py-20 bg-gray-100">
        <h2 className="text-center text-3xl font-bold mb-10 text-black">
          {t.servicesTitle}
        </h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {t.pricing.map((item, i) => (
            <div
              key={i}
              className="p-6 bg-black/80  text-white rounded-xl shadow"
            >
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-blue-600">{item.price}</p>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20">
        <h2 className="text-center text-3xl font-bold mb-10">
          {t.processTitle}
        </h2>

        <div className="grid md:grid-cols-4 gap-6 text-center">
          {t.steps.map((step, i) => (
            <div key={i}>
              <div className="text-2xl font-bold">{i + 1}</div>
              <p>{step}</p>
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
