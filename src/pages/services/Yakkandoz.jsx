import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Ariza from "../../components/Ariza";
import { useLanguage } from "../../components/LanguageContext";

export default function Yakkandoz() {
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

  const t = {
    uz: {
      title: "Yakkandoz yuvish xizmati 🧼",
      desc: "Yakkandozlarni chuqur tozalaymiz, dog‘ va hidlarni yo‘q qilamiz. Sifatli va tez xizmat kafolatlanadi.",
      list: ["Tez xizmat", "Arzon narxlar", "Professional uskunalar"],
      order: "Buyurtma qoldirish",

      services: "Bizning xizmatlar",
      premium: "Premium yakandoz yuvish",
      premiumDesc: "1-3 kunda yetkazib beramiz",
      standard: "Standart yakandoz yuvish",
      standardDesc: "3-7 kunda yetkazib beramiz",

      process: "Qanday ishlaymiz?",
      steps: [
        "Buyurtma berasiz",
        "Uyga boramiz",
        "Olib ketamiz",
        "Yuvib quritib topshiramiz",
      ],

      ctaTitle: "Hoziroq buyurtma bering 📞",
      ctaDesc: "Birinchi buyurtmaga 10% chegirma!",
      call: "Qo‘ng‘iroq qilish",
      orderBtn: "Buyurtma berish",
      trust: "✔ Tez javob beramiz • ✔ 100% bepul maslahat",
    },

    ru: {
      title: "Стирка яккандозов 🧼",
      desc: "Глубокая чистка яккандозов, удаляем пятна и запахи. Гарантируем качество и скорость.",
      list: ["Быстрый сервис", "Доступные цены", "Профессиональное оборудование"],
      order: "Оставить заявку",

      services: "Наши услуги",
      premium: "Премиум стирка",
      premiumDesc: "Доставка за 1-3 дня",
      standard: "Стандартная стирка",
      standardDesc: "Доставка за 3-7 дней",

      process: "Как мы работаем?",
      steps: [
        "Оставляете заявку",
        "Выезжаем к вам",
        "Забираем",
        "Чистим и возвращаем",
      ],

      ctaTitle: "Закажите прямо сейчас 📞",
      ctaDesc: "Скидка 10% на первый заказ!",
      call: "Позвонить",
      orderBtn: "Заказать",
      trust: "✔ Быстрый ответ • ✔ Бесплатная консультация",
    },
  };

  const text = t[language];

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
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {text.title}
            </h1>

            <p className="mb-6">{text.desc}</p>

            <ul className="space-y-2 mb-6">
              {text.list.map((item, i) => (
                <li key={i}>✔ {item}</li>
              ))}
            </ul>

            <button
              onClick={() => setShowModal(true)}
              className="bg-amber-500 text-white px-5 py-2 rounded-full"
            >
              {text.order}
            </button>
          </div>

          {/* RIGHT VIDEO */}
          <div className="flex gap-4 overflow-x-auto pb-4">
            {videos.map((item, i) => (
              <div
                key={i}
                onClick={() => setActiveVideo(item.video)}
                className="min-w-64 relative cursor-pointer rounded-2xl overflow-hidden"
              >
                <img src={item.img} className="w-full object-cover" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/50 w-12 h-12 rounded-full flex items-center justify-center text-white">
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
        <div className="max-w-6xl mx-auto px-4">

          <h2 className="text-3xl font-bold text-center mb-12">
            {text.services}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: text.premium,
                price: "50 000 so'm",
                desc: text.premiumDesc,
              },
              {
                title: text.standard,
                price: "40 000 so'm",
                desc: text.standardDesc,
              },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl shadow">
                <h3 className="font-semibold text-xl">{item.title}</h3>
                <p className="text-blue-600 font-bold">{item.price}</p>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 bg-gray-100 text-black">
        <h2 className="text-3xl font-bold text-center mb-12">
          {text.process}
        </h2>

        <div className="grid md:grid-cols-4 gap-6 text-center">
          {text.steps.map((step, i) => (
            <div key={i}>
              <div className="text-3xl text-amber-400">{i + 1}</div>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      
      
    <section className="relative py-20 text-center overflow-hidden">
  
  {/* 🔥 background glow */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-amber-400/30 blur-3xl rounded-full"></div>
  <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-500/30 blur-3xl rounded-full"></div>

  <div className="relative max-w-3xl mx-auto px-4">
    
    <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
      {text.ctaTitle}
    </h2>

    <p className="mb-8 text-lg text-gray-300">
      {text.ctaDesc}
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      
      {/* 📞 CALL */}
      <a
        href="tel:+998732001313"
        className="px-8 py-4 rounded-xl bg-amber-400 text-black font-semibold 
        shadow-lg hover:shadow-amber-400/50 
        hover:scale-105 active:scale-95 
        transition duration-300"
      >
         {text.call}  📞 
      </a>

      {/* 📝 ORDER */}
      <button
        onClick={() => setShowModal(true)}
        className="px-8 py-4 rounded-xl bg-white text-black font-semibold 
        shadow-md hover:shadow-xl 
        hover:scale-105 active:scale-95 
        transition duration-300"
      >
        {text.orderBtn} 📝
      </button>

    </div>

    {/* TRUST TEXT */}
    <p className="mt-6 text-sm text-gray-400">
      {text.trust}
    </p>

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