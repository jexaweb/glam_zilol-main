import { useState } from "react";
import Ariza from "../../components/Ariza";

export default function Antiseptik() {
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
    address: "",
    note: "",
  });

  const [selectedServices, setSelectedServices] = useState({});

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
    alert("Ariza yuborildi ✅");
  };

  const tariffs = [
    {
      name: "Oddiy yostiq",
      price: "20 000 so‘m",
    },
    {
      name: "Katta yostiq",
      price: "30 000 so‘m",
    },
    {
      name: "Antibakterial tozalash",
      price: "40 000 so‘m",
    },
  ];

  return (
    <div className="relative overflow-hidden">

      {/* HERO */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Yostiq Yuvish 🛏️
            </h1>

            <p className="mb-6">
              Yostiqlaringizni chuqur tozalaymiz, chang, bakteriya va hidlarni yo‘q qilamiz.
              Toza va sog‘lom uyqu uchun eng yaxshi xizmat.
            </p>

            <ul className="space-y-2 mb-6">
              <li>✔ Bepul olib ketish va yetkazib berish</li>
              <li>✔ 24 soat ichida tayyor</li>
              <li>✔ Zamonaviy texnologiya</li>
            </ul>

            <button
              onClick={() => setShowModal(true)}
              className="bg-amber-400 px-6 py-3 rounded-full"
            >
              Buyurtma berish
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto">
            {videos.map((item, i) => (
              <img
                key={i}
                src={item.img}
                className="w-64 h-40 object-cover rounded-xl"
              />
            ))}
          </div>

        </div>
      </section>

      {/* TARIFS */}
      <section className="py-20 bg-gray-50 text-black">
        <div className="max-w-6xl mx-auto px-4 text-center">

          <h2 className="text-3xl font-bold mb-12">
            Yostiq Yuvish Tariflari
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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-white w-full max-w-xl p-6 rounded-xl">

            <button
              onClick={() => setShowModal(false)}
              className="float-right"
            >
              ✕
            </button>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">

              <input
                placeholder="Ism"
                className="w-full border p-3 rounded"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                placeholder="Telefon"
                className="w-full border p-3 rounded"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />

              {Object.keys(serviceData).map((service) => (
                <div key={service}>
                  <div className="bg-black text-white p-2">{service}</div>

                  {Object.entries(serviceData[service].tariffs).map(
                    ([tariff, price]) => (
                      <div key={tariff}>
                        {tariff} - {price} so'm
                      </div>
                    )
                  )}
                </div>
              ))}

              <button className="w-full bg-black text-white py-3 rounded">
                Yuborish
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}