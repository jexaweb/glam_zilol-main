import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../components/LanguageContext";
import Ariza from "../components/Ariza";

/* ================= ERROR ALERT ================= */
function ErrorAlert({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
      <div className="flex justify-between items-center gap-4">
        <span>{message}</span>
        <button onClick={onClose}>✕</button>
      </div>
    </div>
  );
}

function About() {
  const { language } = useLanguage();
  const [showModal, setShowModal] = useState(false);

useEffect(() => {
    const timer = setTimeout(() => setShowModal(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const translations = {
    uz: {
      title: "ZILOL GILAM YUVISH KORXONASIGA XUSH KELIBSIZ!",
      desc: "Biz 8 yildan beri mijozlarimizga sifatli xizmat ko‘rsatib kelmoqdamiz. Sifat, ishonch va tezlik — bizning asosiy qadriyatlarimiz.",
      aboutTitle: "Nima uchun aynan bizni tanlaysiz?",
      aboutText: [
        "8 yillik tajribamiz davomida 150 000 dan ortiq mijozlarimiz ishonchini qozonganmiz.",
        "Yetakchi tashkilotlar bilan hamkorlik qilamiz.",
        "Yil davomida uzluksiz xizmat ko‘rsatamiz.",
        "Ekologik toza va xavfsiz vositalardan foydalanamiz.",
      ],
      list: [
        "Professional uskunalar",
        "Tezkor xizmat",
        "Individual yondashuv",
      ],
      stats: [
        { num: "150 000+", label: "Mamnun mijozlar" },
        { num: "10K+", label: "Tozalangan mahsulotlar" },
        { num: "8+", label: "Yillik tajriba" },
        { num: "100%", label: "Sifat kafolati" },
      ],
      valuesTitle: "Bizning qadriyatlarimiz",
      values: [
        { title: "Sifat", text: "Mukammallikka intilamiz." },
        { title: "Ishonch", text: "Mijozlar ishonchi muhim." },
        { title: "Tezlik", text: "Tez va sifatli xizmat." },
      ],
      ctaTitle: "Yuvishni bizga ishoning!",
      ctaText: "Hoziroq buyurtma qoldiring!",
      btn: "Buyurtma berish",
    },

    ru: {
      title: "ДОБРО ПОЖАЛОВАТЬ В ZILOL!",
      desc: "Более 8 лет качественного сервиса.",
      aboutTitle: "Почему выбирают нас?",
      aboutText: [
        "Более 150 000 довольных клиентов.",
        "Работаем с организациями.",
        "Круглогодичный сервис.",
        "Безопасные средства.",
      ],
      list: [
        "Профессиональное оборудование",
        "Быстрое обслуживание",
        "Индивидуальный подход",
      ],
      stats: [
        { num: "150 000+", label: "Клиентов" },
        { num: "10K+", label: "Изделий" },
        { num: "8+", label: "Лет опыта" },
        { num: "100%", label: "Гарантия" },
      ],
      valuesTitle: "Наши ценности",
      values: [
        { title: "Качество", text: "Стремимся к лучшему." },
        { title: "Доверие", text: "Важно доверие." },
        { title: "Скорость", text: "Быстро работаем." },
      ],
      ctaTitle: "Доверьте нам!",
      ctaText: "Оставьте заявку прямо сейчас!",
      btn: "Оставить заявку",
    },
  };

  const data = translations[language] || translations.uz;

  return (
    <div className="mt-28 overflow-x-hidden">

      {/* MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl relative p-4 "
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-black text-xl bg-gray-200 px-2 rounded hover:text-red-600"
            >
              ✕
            </button>

            <Ariza />
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="py-24 text-center text-black bg-[url('/bg-text1.png')] bg-cover bg-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-4"
        >
          <h1 className="text-3xl md:text-6xl font-bold mb-6">
            {data.title}
          </h1>
          <p className="text-lg md:text-xl">{data.desc}</p>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center py-20">
        <motion.img
          src="/about.png"
          alt="about"
          className="rounded-3xl shadow-xl"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        />

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-5">
            {data.aboutTitle}
          </h2>

          {/* FIXED ARRAY */}
          <div className="mb-6 space-y-3">
            {data.aboutText.map((item, i) => (
              <p key={i}>{item}</p>
            ))}
          </div>

          <div className="space-y-3">
            {data.list.map((item, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-blue-500">✔</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="bg-yellow-500 text-white py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {data.stats.map((item, i) => (
            <div key={i}>
              <h3 className="text-4xl font-bold">{item.num}</h3>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {data.valuesTitle}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {data.values.map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white shadow-lg hover:-translate-y-2 transition"
            >
              <h3 className="text-xl font-bold mb-3 text-blue-600">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">
          {data.ctaTitle}
        </h2>
        <p className="mb-8">{data.ctaText}</p>

      
      </section>
    </div>
  );
}

export default About;