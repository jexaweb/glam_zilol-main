import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="mt-28">

      {/* HERO */}
      <section className="relative py-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-white opacity-60"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-4xl mx-auto px-4"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            ZILOL – Tozalik san’ati
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">
            Biz sizning uyingizga nafaqat tozalik, balki qulaylik va ishonch olib kelamiz.
          </p>
        </motion.div>
      </section>

      {/* ABOUT GRID */}
      <section className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center py-16">
        
        <motion.img
          src="/about.jpg"
          alt="about"
          className="rounded-3xl shadow-2xl"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        />

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold mb-5">
            Biz boshqalardan nimasi bilan farq qilamiz?
          </h2>

          <p className=" mb-6">
            Zamonaviy texnologiyalar, tajribali jamoa va mijozlarga bo‘lgan hurmat –
            bizning asosiy qadriyatlarimiz. Har bir buyurtma biz uchun muhim.
          </p>

          <div className="space-y-4">
            <div className="flex gap-3 items-start">
              <span className="text-amber-500 text-xl">✔</span>
              <p>Professional uskunalar va ekologik vositalar</p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-amber-500 text-xl">✔</span>
              <p>Tez xizmat va kafolatlangan natija</p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-amber-500 text-xl">✔</span>
              <p>Har bir mijozga individual yondashuv</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="bg-amber-400 text-white py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { num: "5000+", label: "Mijozlar" },
            { num: "10K+", label: "Tozalangan buyumlar" },
            { num: "5+", label: "Yillik tajriba" },
            { num: "100%", label: "Kafolat" },
          ].map((item, i) => (
            <div key={i} className="hover:scale-110 transition">
              <h3 className="text-4xl font-bold">{item.num}</h3>
              <p className="opacity-90">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Bizning qadriyatlarimiz
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Sifat",
              text: "Har bir xizmatimizda mukammallikka intilamiz.",
            },
            {
              title: "Ishonch",
              text: "Mijozlarimiz bizga ishonadi va biz bu ishonchni oqlaymiz.",
            },
            {
              title: "Tezlik",
              text: "Buyurtmalarni tez va sifatli bajaramiz.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white shadow-xl hover:-translate-y-2 transition"
            >
              <h3 className="text-xl font-bold mb-3 text-amber-500">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-100 text-center px-4">
        <h2 className="text-3xl font-bold mb-4">
          Tozalikni bizga ishoning!
        </h2>
        <p className="text-gray-600 mb-8">
          Hoziroq buyurtma qoldiring va farqni o‘zingiz ko‘ring
        </p>

        <Link
          to="/ariza"
          className="inline-block bg-amber-500 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-amber-400/50 hover:-translate-y-1 transition-all duration-300"
        >
          Buyurtma berish
        </Link>
      </section>
    </div>
  );
}

export default About;