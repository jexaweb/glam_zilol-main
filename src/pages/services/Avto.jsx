import { useEffect, useState } from "react";
import { useLanguage } from "../../components/LanguageContext";

export default function Avto() {
  const [showModal, setShowModal] = useState(false);
  const { language } = useLanguage();

  const t = {
    uz: {
      title: "Avto Chihol Yuvish 🚗",
      desc: "Avtomobil o‘rindiqlari va chihollarni chuqur tozalaymiz. Dog‘, chang va hidlarni yo‘q qilamiz.",
      badges: ["Tez xizmat", "Kuchli Texnologiyalar  ", "100% tozalik"],
      order: "Buyurtma berish",
      choose: "Tanlash",
      cta: "Mashinangizni yangidek qiling 🚗✨",
      ctaDesc: "Hozir buyurtma bering va toza salon zavqini his qiling",
      name: "F.I.O",
      phone: "Tel",
      address: "Lokatsiya tugmani bosing ➡️",
      note: "Izoh,manzil (masalan: ertaga olib ketilsin manzil:margilol )",
      quantity: "Soni",
      send: "Yuborish",
      service: "Avto chihol yuvish",
      tariffs: {
        seat1: "Old o‘rindiq (1 dona)",
        seat2: "Orqa o‘rindiq (komplekt)",
        full: "To‘liq salon",
        quantity: "Soni",
      },
    },

    ru: {
      title: "Химчистка автосалона 🚗",
      desc: "Глубокая чистка сидений и чехлов автомобиля. Удаляем пятна, пыль и неприятные запахи.",
      badges: ["Быстро", "Сильная Технологии", "100% чистота"],
      order: "Оформить заказ",
      choose: "Выбрать",
      cta: "Сделайте салон как новый 🚗✨",
      ctaDesc: "Закажите сейчас и наслаждайтесь чистотой",
      name: "Ф.И.О",
      phone: "Тел",
      address: "Нажмите кнопку «Местоположение» ➡️",
      note: "Комментарий (например: забрать завтра, адрес: маргилол )",
      quantity: "Количество",
      send: "Отправить",
      service: "Чистка автосалона",
      tariffs: {
        seat1: "Переднее сиденье (1 шт)",
        seat2: "Задние сиденья (комплект)",
        full: "Полный салон",
      },
    },
  }[language];

  const serviceData = {
    [t.service]: {
      tariffs: {
        [t.tariffs.seat1]: 50000,
        [t.tariffs.seat2]: 100000,
        [t.tariffs.full]: 200000,
      },
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });

  const [selectedServices, setSelectedServices] = useState({});

  const toggleService = (service) => {
    const updated = { ...selectedServices };

    if (updated[service]) delete updated[service];
    else updated[service] = {};

    setSelectedServices(updated);
  };

  const toggleTariff = (service, tariff) => {
    const updated = { ...selectedServices };

    if (updated[service]?.[tariff]) {
      delete updated[service][tariff];
    } else {
      updated[service] = {
        [tariff]: { quantity: "" },
      };
    }

    setSelectedServices(updated);
  };

  const handleQuantityChange = (service, tariff, value) => {
    setSelectedServices({
      ...selectedServices,
      [service]: {
        ...selectedServices[service],
        [tariff]: {
          quantity: value,
        },
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Buyurtma yuborildi 🚗✨");
  };

  return (
    <div className="py-20">
      {/* BG */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-amber-400/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/30 blur-3xl rounded-full"></div>
      {/* HERO */}
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>

        <p className="mb-6 ">{t.desc}</p>

        <div className="flex flex-wrap justify-center gap-3 mb-6 text-sm text-black">
          <span className="bg-gray-100  px-4 py-2 rounded-full">
            {t.badges[0]}
          </span>
          <span className="bg-gray-100 px-4 py-2 rounded-full">
            {t.badges[1]}
          </span>
          <span className="bg-gray-100 px-4 py-2 rounded-full">
            {t.badges[2]}
          </span>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-amber-400 px-6 py-3 rounded-full font-semibold shadow hover:scale-105 transition"
        >
          {t.order} 📝
        </button>
      </div>

      {/* TARIFS */}
      <div className="max-w-6xl mx-auto px-4 mt-16 grid md:grid-cols-3 gap-8 ">
        {Object.entries(serviceData[t.service]?.tariffs || {}).map(
          ([name, price], i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-xl shadow hover:shadow-xl  text-center transition hover:-translate-y-1"
            >
              <h3 className="font-semibold text-lg mb-2 text-black">{name}</h3>
              <p className="text-amber-500 font-bold text-xl">
                {price.toLocaleString()} so'm
              </p>

              <button
                onClick={() => setShowModal(true)}
                className="mt-4 w-full bg-black text-white  py-2 rounded-lg hover:bg-amber-400 hover:text-black transition"
              >
                {t.choose}
              </button>
            </div>
          ),
        )}
      </div>

      {/* CTA */}
      <div className="text-center mt-20">
        <h2 className="text-3xl font-bold mb-3">{t.cta}</h2>
        <p className="text-gray-500 mb-6">{t.ctaDesc}</p>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white backdrop-blur-xl w-full max-w-xl rounded-3xl shadow-2xl p-6 md:p-8 relative animate-[scaleIn_.3s_ease]">
            {/* CLOSE */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-2xl text-black hover:text-red-500 transition"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-center mb-6 text-black ">
              {t.order} 📝
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* INPUTS */}
              <div className="grid md:grid-cols-2 gap-4 ">
                <input
                  placeholder={t.name}
                  className="w-full border text-black border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 p-3 rounded-xl outline-none transition"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                  placeholder={t.phone}
                  className="w-full border text-black border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 p-3 rounded-xl outline-none transition"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              {/* SERVICES */}
              <div className="space-y-3 max-h-300px overflow-y-auto pr-2 border-gray-200">
                {Object.keys(serviceData).map((service) => (
                  <div
                    key={service}
                    className="border rounded-xl overflow-hidden bg-black"
                  >
                    <div
                      onClick={() => toggleService(service)}
                      className="p-3  from-black   cursor-pointer flex justify-between items-center"
                    >
                      <span>{service}</span>
                      <span className="text-lg">
                        {selectedServices[service] ? "−" : "+"}
                      </span>
                    </div>

                    {selectedServices[service] && (
                      <div className="p-4 space-y-3 bg-yellow-500">
                        {Object.entries(
                          serviceData[service]?.tariffs || {},
                        ).map(([tariff, price]) => {
                          const selected = selectedServices[service][tariff];

                          return (
                            <div key={tariff} className="border-b pb-3 ">
                              <label className="flex justify-between items-center cursor-pointer ">
                                <div className="flex items-center gap-2 ">
                                  <input
                                    type="checkbox"
                                    className="accent-amber-500 w-4 h-4"
                                    checked={!!selected}
                                    onChange={() =>
                                      toggleTariff(service, tariff)
                                    }
                                  />
                                  <span className="font-medium text-gray-950">
                                    {tariff}
                                  </span>
                                </div>

                                <span className="text-sm text-gray-950">
                                  {price} so'm
                                </span>
                              </label>

                              {selected && (
                                <input
                                  type="number"
                                  placeholder={t.quantity}
                                  className="w-full mt-2 border bg-white   border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 p-2 rounded-lg outline-none"
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
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* TEXTAREA */}
              <textarea
                placeholder={t.note}
                className="w-full  text-black border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 p-3 rounded-xl outline-none"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
              />

              {/* BUTTON */}
              <button className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-yellow-400 hover:to-amber-500 text-black py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-xl transition active:scale-95">
                {t.send}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
