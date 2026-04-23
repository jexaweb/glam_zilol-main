import { useEffect, useState } from "react";
import { useLanguage } from "../../components/LanguageContext";

export default function Antiseptik() {
  const [showModal, setShowModal] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const { language } = useLanguage();

  const t = {
    uz: {
      title: "Professional Yostiq Yuvish 🛏️",
      desc: "Yostiqlaringizni chuqur tozalaymiz, bakteriya va hidlarni yo‘q qilamiz.",
      benefits: [
        "Bepul olib ketish va yetkazib berish",
        "24 soat ichida tayyor",
        "Zamonaviy texnologiya",
      ],
      order: "Buyurtma berish",
      tariffs: "Yostiq Yuvish Tariflari",
      name: "F.I.O",
      phone: "Tel",
      call: "Qo‘ng‘iroq qilish",

      address: "Lokatsiya tugmani bosing ➡️",
      addres: "Manzil (margilon ko‘chasi 12 uy)",
      note: "Izoh,manzil (masalan: ertaga olib ketilsin  )",
      quantity: "Soni",
      send: "Yuborish",
      ctaTitle: "Hoziroq buyurtma bering",

      orderBtn: "Buyurtma berish",
      trust: "✔ Tez javob beramiz • ✔ 100% bepul maslahat",
    },
    ru: {
      title: "Профессиональная чистка подушек 🛏️",
      desc: "Глубокая чистка подушек, удаление бактерий и запахов.",
      benefits: [
        "Бесплатный вывоз и доставка",
        "Готово за 24 часа",
        "Современные технологии",
      ],
      order: "Сделать заказ",
      tariffs: "Тарифы на чистку подушек",
      name: "Ф.И.О",
      phone: "Тел",
      call: "Позвонить",
      send: "Отправить",

      address: "Нажмите кнопку «Местоположение» ➡️",
      addres: "Адрес (например: улица маргилон 12 дом)",
      note: "Комментарий (например: забрать завтра, )",
      quantity: "Количество",

      ctaTitle: "Закажите прямо сейчас",

      orderBtn: "Оставить заявку",
      trust: "✔ Быстрый ответ • ✔ Бесплатная консультация",
    },
  }[language];

 const videos = [
    {
      video: "/videos/gilam1.mp4",
      img: "/zilolclengi.png",
      alt: "Zilol gilam yuvish xizmati",
    },
    {
      video: "/videos/gilam.mp4",
      img: "/zilolclengi.1.png",
      alt: "Zilol gilam yuvish xizmati",
    },
    {
      video: "/videos/mebel.mp4",
      img: "/zilolclengi.2.png",
      alt: "Zilol mebel yuvish xizmati",
    },
    {
      video: "/videos/yakandoz.mp4",
      img: "/zilolclengi.3.png",
      alt: "Zilol yakandoz yuvish xizmati",
    },
  ];


  const [selectedServices, setSelectedServices] = useState({});
  const [loadingLoc, setLoadingLoc] = useState(false);

  // xizmatni ochish/yopish
const toggleService = (service) => {
  setSelectedServices((prev) => ({
    ...prev,
    [service]: prev[service] ? null : {},
  }));
};

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // tarif tanlash
  const toggleTariff = (service, tariff) => {
    setSelectedServices((prev) => {
      const serviceData = prev[service] || {};

      if (serviceData[tariff]) {
        delete serviceData[tariff];
      } else {
        serviceData[tariff] = { quantity: "" };
      }

      return {
        ...prev,
        [service]: { ...serviceData },
      };
    });
  };
  // 🚀 TELEGRAM
  const sendTelegram = async () => {
    let message = `🧼 Yangi ariza\n\n👤 ${form.name}\n📞 ${form.phone}\n🏠 ${form.addres}\n 📍 ${form.address}\n\n`;

    let i = 1;

    Object.entries(selectedServices).forEach(([service, tariffs]) => {
      Object.entries(tariffs).forEach(([tariff, data]) => {
        const price = serviceData[service].tariffs[tariff];

        message += `${i}️⃣ ${service}\n`;
        message += `Tarif: ${tariff}\n`;
        message += `Narx: ${price.toLocaleString()} so'm\n`;
        message += `Soni: ${data.quantity} dona\n\n`;

        i++;
      });
    });

    message += `✏️ Izoh: ${form.note}`;

    await fetch(
      "https://api.telegram.org/bot8789952135:AAEq5VuGMUAa7b094Les1nJm1DCnvM_TaK0/sendMessage",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: "-1003968108301",
          text: message,
        }),
      },
    );
  };

  // quantity change
  const handleQuantityChange = (service, tariff, value) => {
    setSelectedServices((prev) => ({
      ...prev,
      [service]: {
        ...prev[service],
        [tariff]: {
          quantity: value,
        },
      },
    }));
  };

  // location olish
  const getLocation = () => {
    setLoadingLoc(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setForm((prev) => ({
          ...prev,
          address: `https://maps.google.com/?q=${latitude},${longitude}`,
        }));
        setLoadingLoc(false);
      },
      () => {
        alert("Lokatsiya olinmadi ❌");
        setLoadingLoc(false);
      },
    );
  };

  

  const serviceData = {
    "Yostiq yuvish": {
      tariffs: {
        "Oddiy yostiq": 20000,
        "Katta yostiq": 30000,
      },
    },
  };

  const [form, setForm] = useState({
    name: "",
    phone: "",
  });

const handleSubmit = async (e) => {
  e.preventDefault();

  let isValid = false;

  for (const service of Object.keys(selectedServices)) {
    const tariffs = selectedServices[service];

    if (tariffs && typeof tariffs === "object") {
      for (const tariff of Object.keys(tariffs)) {
        const qty = tariffs[tariff]?.quantity;

        if (qty && Number(qty) > 0) {
          isValid = true;
          break;
        }
      }
    }

    if (isValid) break;
  }

  if (!isValid) {
    alert(
      language === "ru"
        ? "Введите количество услуги!"
        : "Iltimos, xizmat ~ sonini kiriting!"
    );
    return;
  }

  await sendTelegram();

  alert(
    language === "ru"
      ? "Заказ успешно отправлен ✨"
      : "Buyurtma yuborildi ✨"
  );

  setForm({
    name: "",
    phone: "",
    address: "",
    addres: "",
    note: "",
  });

  setSelectedServices({});
  setShowModal(false);
};

  const tariffs = [
    {
      name: language === "ru" ? "Обычная подушка" : "Oddiy yostiq",
      price: language === "ru" ? "20 000 сум" : "20 000 so‘m",
    },
    {
      name: language === "ru" ? "Большая подушка" : "Katta yostiq",
      price: language === "ru" ? "30 000 сум" : "30 000 so‘m",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* BG */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-amber-400/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/30 blur-3xl rounded-full"></div>

      {/* HERO */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center px-4">
          <div>
            <h1 className="text-4xl font-bold mb-6">{t.title}</h1>

            <p className="mb-6">{t.desc}</p>

            <ul className="space-y-2 mb-6">
              {t.benefits.map((b, i) => (
                <li key={i}>✔ {b}</li>
              ))}
            </ul>

            <button
              onClick={() => setShowModal(true)}
              className="bg-amber-400 px-6 py-3 rounded-full shadow-lg hover:scale-105 transition"
            >
              {t.order}
            </button>
          </div>

          {/* RIGHT - VIDEO GRID */}
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
      {/* TARIFS */}
      <section className="py-20  ">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-12">{t.tariffs}</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {tariffs.map((item, i) => (
              <div
                key={i}
                className="p-6 bg-white text-black rounded-xl shadow hover:shadow-2xl transition hover:-translate-y-2"
              >
                <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                <p className="text-amber-500 font-bold text-xl">{item.price}</p>

                <button
                  onClick={() => setShowModal(true)}
                  className="mt-4 w-full py-2 bg-black text-white rounded-lg hover:bg-amber-400 hover:text-black transition"
                >
                  {t.order}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="py-20 text-center">
        <div className="absolute top-0 left-0 w-72 h-72 bg-amber-400/30 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-500/30 blur-3xl rounded-full"></div>
        <h2 className="text-3xl font-bold mb-4">{t.ctaTitle} 📞</h2>

        <p className="mb-6">{t.ctaDesc}</p>

        <a
          href="tel:+998732001313"
          className="px-6 py-3 bg-amber-400 rounded-xl font-semibold"
        >
          {t.call}
        </a>
      </section>
      {/* ✅ MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4 ">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-6 md:p-8 relative animate-scaleIn">
            {/* ❌ close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 bg-white right-4 text-gray-500 hover:text-red-600 text-2xl transition"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center text-black">
              {t.order}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* INPUTS */}
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  className="w-full border text-black border-gray-300 focus:border-y-amber-500 focus:ring-1 focus:ring-yellow-500 p-3 rounded-xl outline-none transition"
                  placeholder={t.name}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                  className="w-full border text-black border-gray-300 focus:border-y-amber-500 focus:ring-1 focus:ring-yellow-500 p-3 rounded-xl outline-none transition"
                  placeholder={t.phone}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              {/* XIZMAT */}
              <div className="space-y-3 max-h-300px overflow-y-auto pr-2">
                {Object.keys(serviceData).map((service) => (
                  <div
                    key={service}
                    className="border rounded-xl overflow-hidden"
                  >
                    <div
                      onClick={() => toggleService(service)}
                      className="p-3 bg-black text-white cursor-pointer flex justify-between items-center"
                    >
                      <span>
                        {language === "ru" ? "Чистка подушек" : "Yostiq yuvish"}
                      </span>
                      <span>{selectedServices[service] ? "−" : "+"}</span>
                    </div>

                    {selectedServices[service] && (
                      <div className="p-4 space-y-3 bg-yellow-500">
                        {Object.entries(serviceData[service].tariffs).map(
                          ([tariff, price]) => {
                            const selected = selectedServices[service][tariff];

                            return (
                              <div key={tariff} className="border-b pb-3">
                                <label className="flex justify-between items-center gap-2 cursor-pointer">
                                  <div className="flex gap-2 items-center">
                                    <input
                                      type="checkbox"
                                      className="accent-black"
                                      checked={!!selected}
                                      onChange={() =>
                                        toggleTariff(service, tariff)
                                      }
                                    />
                                    <span className="font-medium">
                                      {tariff}
                                    </span>
                                  </div>

                                  <span className="text-sm text-black">
                                    {price} so'm
                                  </span>
                                </label>

                                {selected && (
                                  <input
                                    type="number"
                                    placeholder={t.quantity}
                                    className="w-full bg-white border border-gray-300 placeholder:text-black/40 text-black focus:border-black p-2 mt-2 rounded-lg outline-none"
                                    value={selected.quantity}
                                    onChange={(e) =>
                                      handleQuantityChange(
                                        service,
                                        tariff,
                                        e.target.value,
                                      )
                                    }
                                  />
                                )}
                              </div>
                            );
                          },
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* ADDRESS */}
              <div className="flex gap-2">
                <input
                  className="input w-full "
                  placeholder={t.address}
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  required
                  readOnly
                />

                <button
                  type="button"
                  onClick={getLocation}
                  className="bg-amber-500 text-white px-4 rounded-xl"
                >
                  {loadingLoc ? "..." : "📍"}
                </button>
              </div>
              <input
                className="input w-full "
                placeholder={t.addres}
                value={form.addres}
                onChange={(e) => setForm({ ...form, addres: e.target.value })}
                required
              />
              <textarea
                className="w-full border-2 text-black placeholder:text-black/40 border-gray-300 focus:border-y-amber-500 focus:ring-1 focus:ring-yellow-600 p-3 rounded-xl outline-none"
                placeholder={t.note}
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
              />

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-yellow-500 text-white py-3 rounded-xl text-lg font-semibold transition active:scale-95"
              >
                {t.send}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
