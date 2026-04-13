import { useState } from "react";
import Ariza from "../../components/Ariza";

export default function Kovrolin() {
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
    "Joyda yuvish": {
      tariffs: {
        "Narx / 1 kv": 25000,
      
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

  const toggleService = (service) => {
    const updated = { ...selectedServices };

    if (updated[service]) {
      delete updated[service];
    } else {
      updated[service] = {};
    }

    setSelectedServices(updated);
  };

  const toggleTariff = (service, tariff) => {
    const updated = { ...selectedServices };

    if (updated[service][tariff]) {
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

  const sendTelegram = async () => {
    let message = `🚿 Joyda yuvish ariza\n\n👤 ${form.name}\n📞 ${form.phone}\n📍 ${form.address}\n\n`;

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
      name: "Ddsd",
      price: "200 000 so‘m",
    },
    {
      name: "Kreslo yuvish",
      price: "100 000 so‘m",
    },
    {
      name: "Gilam joyida yuvish",
      price: "120 000 so‘m",
    },
  ];

  return (
    <div className="relative overflow-hidden">

      {/* HERO */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Joyda Yuvish 🚿
            </h1>

            <p className="mb-6">
              Divan, kreslo va gilamlarni uyingizni o‘zida chuqur tozalaymiz.
              Dog‘, chang va hidlarni joyida yo‘q qilamiz.
            </p>

            <ul className="space-y-2 mb-6">
              <li>✔ Uyga kelib xizmat ko‘rsatamiz</li>
              <li>✔ 1-2 soat ichida tayyor</li>
              <li>✔ Zamonaviy texnologiya</li>
            </ul>

            <button
              onClick={() => setShowModal(true)}
              className="bg-amber-400 px-6 py-3 rounded-full"
            >
              Buyurtma berish
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4">
            {videos.map((item, i) => (
              <div
                key={i}
                onClick={() => setActiveVideo(item.video)}
                className="w-64 flex-shrink-0 relative cursor-pointer rounded-2xl overflow-hidden"
              >
                <img
                  src={item.img}
                  className="w-full h-40 object-cover"
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* TARIFS */}
      <section className="py-20 bg-gray-50 text-black">
        <div className="max-w-6xl mx-auto px-4 text-center">

          <h2 className="text-3xl font-bold mb-12">
            Joyda Yuvish Tariflari
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {tariffs.map((t, i) => (
              <div key={i} className="p-6 bg-white rounded-xl shadow">
                <h3 className="font-semibold text-lg mb-2">{t.name}</h3>
                <p className="text-amber-500 font-bold text-xl">{t.price}</p>

                <button
                  onClick={() => setShowModal(true)}
                  className="mt-4 w-full py-2 bg-black text-white rounded-lg"
                >
                  Buyurtma berish
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-xl rounded-2xl p-6 relative">

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

              {Object.keys(serviceData).map((service) => (
                <div key={service}>
                  <div
                    onClick={() => toggleService(service)}
                    className="p-3 bg-black text-white cursor-pointer"
                  >
                    {service}
                  </div>

                  {selectedServices[service] &&
                    Object.entries(serviceData[service].tariffs).map(
                      ([tariff, price]) => {
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
                      }
                    )}
                </div>
              ))}

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