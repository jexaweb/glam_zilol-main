import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../components/LanguageContext";
import Ariza from "../../components/Ariza";

export default function Parda() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  const translations = {
    uz: {
      title: "Parda yuvish xizmati 🪟",
      desc: "Pardalaringizni ehtiyotkorlik bilan yuvamiz, rangini saqlab qolamiz va yangi kabi qilib qaytaramiz.",
      list: [
        "Olib ketish va qaytarish mavjud",
        "Oqartirmasdan tozalash",
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
      ctaDesc: "Скидка 20% на первый заказ!",
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

          {/* VIDEO */}
          <div className="flex gap-4 overflow-x-auto">
            {videos.map((item, i) => (
              <div
                key={i}
                onClick={() => setActiveVideo(item.video)}
                className="min-w-64 cursor-pointer"
              >
                <img src={item.img} className="rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO MODAL */}
      {activeVideo && (
        <div
          onClick={() => setActiveVideo(null)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <video src={activeVideo} controls autoPlay className="max-w-2xl" />
        </div>
      )}

      {/* SERVICES */}
      <section className="py-20 bg-gray-100">
        <h2 className="text-center text-3xl font-bold mb-10">
          {t.servicesTitle}
        </h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {t.pricing.map((item, i) => (
            <div key={i} className="p-6 bg-white rounded-xl shadow">
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
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold">{t.ctaTitle}</h2>
        <p className="mb-6">{t.ctaDesc}</p>

        <div className="flex gap-4 justify-center">
          <a href="tel:+998732001313" className="bg-amber-400 px-6 py-3 rounded">
            {t.call}
          </a>

          <button
            onClick={() => setShowModal(true)}
            className="bg-black text-white px-6 py-3 rounded"
          >
            {t.orderBtn}
          </button>
        </div>

        <p className="mt-4 text-sm">{t.trust}</p>
      </section>

      {/* FORM */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl relative">
            <button onClick={() => setShowModal(false)}>✕</button>
            <Ariza />
          </div>
        </div>
      )}
    </div>
  );
}