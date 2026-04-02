import { useState } from "react";
import Ariza from "../../components/Ariza";

export default function Matras() {
  const [showModal, setShowModal] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  const videos = [
    {
      video: "/videos/matras1.mp4",
      img: "/matras1.png",
    },
    {
      video: "/videos/matras2.mp4",
      img: "/matras2.png",
    },
    {
      video: "/videos/matras3.mp4",
      img: "/matras3.png",
    },
  ];
  const serviceData = {
    
    "Matras yuvish": {
      tariffs: {
        "primum /2x/dona": 200000,
        "Standart /1x/dona": 100000,
      },
    },
 
  };

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });

  const [selectedServices, setSelectedServices] = useState({});
  const [loadingLoc, setLoadingLoc] = useState(false);

  // ✅ xizmatni yoqish/o‘chirish
  const toggleService = (service) => {
    const updated = { ...selectedServices };

    if (updated[service]) {
      delete updated[service];
    } else {
      updated[service] = {};
    }

    setSelectedServices(updated);
  };

  // ✅ faqat 1 ta tarif
const toggleTariff = (service, tariff) => {
  const updated = { ...selectedServices };

  // agar shu tarif allaqachon tanlangan bo‘lsa → o‘chir
  if (updated[service][tariff]) {
    delete updated[service][tariff];
  } else {
    // aks holda faqat shu tarifni qoldir
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

  // 📍 LOCATION
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Brauzer lokatsiyani qo‘llab-quvvatlamaydi ❗");
      return;
    }

    setLoadingLoc(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const link = `https://maps.google.com/?q=${lat},${lon}`;

        setForm((prev) => ({
          ...prev,
          address: link,
        }));

        setLoadingLoc(false);
      },
      () => {
        alert("Lokatsiya olinmadi ❗");
        setLoadingLoc(false);
      }
    );
  };

  // 🚀 TELEGRAM
  const sendTelegram = async () => {
    let message = `🧼 Yangi ariza\n\n👤 ${form.name}\n📞 ${form.phone}\n📍 ${form.address}\n\n`;

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
          chat_id: "6904234957",
          text: message,
        }),
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const service in selectedServices) {
      for (const tariff in selectedServices[service]) {
        const qty = selectedServices[service][tariff].quantity;

        if (!qty || qty <= 0) {
          alert(`${service} (${tariff}) sonini kiriting ❗`);
          return;
        }
      }
    }

    await sendTelegram();

    alert("Ariza yuborildi ✅");

    setForm({
      name: "",
      phone: "",
      address: "",
      note: "",
    });

    setSelectedServices({});
  };
  const tariffs = [
    {
      name: "1 o‘rinlik matras",
      price: "40 000 so‘m",
    },
    {
      name: "2 o‘rinlik matras",
      price: "70 000 so‘m",
    },
    {
      name: "Katta matras",
      price: "120 000 so‘m",
    },
  ];

  return (
    <div className="relative overflow-hidden">

      {/* 🔥 BACKGROUND */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-amber-400/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/30 blur-3xl rounded-full"></div>

      {/* HERO */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Matras Yuvish 🛏️
            </h1>

            <p className="mb-6">
              Matraslaringizni chuqur tozalaymiz, bakteriya va hidlarni yo‘q qilamiz.
              Sog‘lom uy muhiti uchun eng yaxshi xizmat.
            </p>

            <ul className="space-y-2 mb-6">
              <li>✔ Bepul olib ketish va yetkazib berish</li>
              <li>✔ 24-48 soat ichida tayyor</li>
              <li>✔ Zamonaviy texnologiya</li>
            </ul>

           <button
        onClick={() => setShowModal(true)}
        className="bg-amber-400 px-6 py-3 rounded-full"
      >
        Buyurtma berish
      </button>
          </div>

          {/* RIGHT - VIDEO */}
          <div className="flex gap-4 overflow-x-auto pb-4">
            {videos.map((item, i) => (
              <div
                key={i}
                onClick={() => setActiveVideo(item.video)}
                className="w-64 flex-shrink-0 relative cursor-pointer rounded-2xl overflow-hidden group 
                shadow-md hover:shadow-2xl transition-all duration-500 
                hover:-translate-y-2 hover:scale-105"
              >
                <img
                  src={item.img}
                  className="w-full h-40 object-cover group-hover:scale-105 transition duration-300"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/50 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl backdrop-blur-sm">
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
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveVideo(null);
              }}
              className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center 
              rounded-full bg-black/60 text-white text-lg"
            >
              ✕
            </button>

            <video
              src={activeVideo}
              controls
              autoPlay
              className="w-full max-h-[70vh] rounded-xl"
            />
          </div>
        </div>
      )}

      {/* TARIFS */}
      <section className="py-20 bg-gray-50 text-black">
        <div className="max-w-6xl mx-auto px-4 text-center">

          <h2 className="text-3xl font-bold mb-12">
            Matras Yuvish Tariflari
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {tariffs.map((t, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-xl shadow hover:shadow-xl transition hover:-translate-y-1"
              >
                <h3 className="font-semibold text-lg mb-2">{t.name}</h3>
                <p className="text-amber-500 font-bold text-xl">{t.price}</p>

                <button
                  onClick={() => setShowModal(true)}
                  className="mt-4 w-full py-2 bg-black text-white rounded-lg hover:bg-amber-400 hover:text-black transition"
                >
                  Buyurtma berish
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Hoziroq buyurtma bering 📞
        </h2>

        <p className="mb-6">
          Birinchi buyurtmaga 20% chegirma!
        </p>

     <button
        onClick={() => setShowModal(true)}
        className="bg-amber-400 px-6 py-3 rounded-full"
      >
        Buyurtma berish
      </button>
      </section>

  

      {/* ✅ MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          
          <div className="bg-white w-full max-w-xl rounded-2xl p-6 relative">
            
            {/* ❌ close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-xl"
            >
              ✕
            </button>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                className="w-full border p-3 rounded"
                placeholder="Ism"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                className="w-full border p-3 rounded"
                placeholder="Telefon"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />

              {/* XIZMAT */}
              {Object.keys(serviceData).map((service) => (
                <div key={service} className="border rounded">
                  
                  <div
                    onClick={() => toggleService(service)}
                    className="p-3 bg-black text-white cursor-pointer"
                  >
                    {service}
                  </div>

                  {selectedServices[service] && (
                    <div className="p-3 space-y-2">
                      {Object.entries(
                        serviceData[service].tariffs
                      ).map(([tariff, price]) => {
                        const selected =
                          selectedServices[service][tariff];

                        return (
                          <div key={tariff}>
                            <label className="flex gap-2">
                              <input
                                type="checkbox"
                                checked={!!selected}
                                onChange={() =>
                                  toggleTariff(service, tariff)
                                }
                              />
                              {tariff} - {price} so'm
                            </label>

                            {selected && (
                              <input
                                type="number"
                                placeholder="Soni"
                                className="w-full border p-2 mt-2"
                                value={selected.quantity}
                                onChange={(e) =>
                                  handleQuantityChange(
                                    service,
                                    tariff,
                                    e.target.value
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

              {/* ADDRESS */}
              <div className="flex gap-2">
                <input
                  className="w-full border p-3 rounded"
                  placeholder="Manzil"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />

                <button
                  type="button"
                  onClick={getLocation}
                  className="bg-amber-400 px-3 rounded"
                >
                  📍
                </button>
              </div>

              <textarea
                className="w-full border p-3 rounded"
                placeholder="Izoh"
                value={form.note}
                onChange={(e) =>
                  setForm({ ...form, note: e.target.value })
                }
              />

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded"
              >
                Yuborish
              </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}