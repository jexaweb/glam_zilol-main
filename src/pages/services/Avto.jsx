import { useState } from "react";

export default function Avto() {
  const [showModal, setShowModal] = useState(false);

  const serviceData = {
    "Avto chihol yuvish": {
      tariffs: {
        "Old o‘rindiq (1 dona)": 50000,
        "Orqa o‘rindiq (komplekt)": 100000,
        "To‘liq salon": 200000,
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

      {/* HERO */}
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Avto Chihol Yuvish 🚗
        </h1>

        <p className="mb-6 text-gray-600">
          Avtomobil o‘rindiqlari va chihollarni chuqur tozalaymiz.
          Dog‘, chang va yoqimsiz hidlardan tozalab, yangi holatga keltiramiz.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-6 text-sm">
          <span className="bg-gray-100 px-4 py-2 rounded-full">✔ Tez xizmat</span>
          <span className="bg-gray-100 px-4 py-2 rounded-full">✔ Kuchli kimyo</span>
          <span className="bg-gray-100 px-4 py-2 rounded-full">✔ 100% tozalik</span>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-amber-400 px-6 py-3 rounded-full font-semibold shadow hover:scale-105 transition"
        >
          Buyurtma berish
        </button>
      </div>

      {/* TARIFS */}
      <div className="max-w-6xl mx-auto px-4 mt-16 grid md:grid-cols-3 gap-8">
        {Object.entries(serviceData["Avto chihol yuvish"].tariffs).map(
          ([name, price], i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-xl shadow hover:shadow-xl text-center transition hover:-translate-y-1"
            >
              <h3 className="font-semibold text-lg mb-2">{name}</h3>
              <p className="text-amber-500 font-bold text-xl">
                {price.toLocaleString()} so'm
              </p>

              <button
                onClick={() => setShowModal(true)}
                className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-amber-400 hover:text-black transition"
              >
                Tanlash
              </button>
            </div>
          )
        )}
      </div>

      {/* CTA */}
      <div className="text-center mt-20">
        <h2 className="text-3xl font-bold mb-3">
          Mashinangizni yangidek qiling 🚗✨
        </h2>
        <p className="text-gray-500 mb-6">
          Hozir buyurtma bering va toza salon zavqini his qiling
        </p>

        <button
          onClick={() => setShowModal(true)}
          className="bg-black text-white px-8 py-3 rounded-xl hover:scale-105 transition"
        >
          Buyurtma berish
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">

          <div className="bg-white w-full max-w-xl rounded-2xl p-6 relative">

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-xl"
            >
              ✕
            </button>

            <form onSubmit={handleSubmit} className="space-y-4">

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

                  <div
                    onClick={() => toggleService(service)}
                    className="bg-black text-white p-3 cursor-pointer"
                  >
                    {service}
                  </div>

                  {selectedServices[service] &&
                    Object.entries(
                      serviceData[service].tariffs
                    ).map(([tariff, price]) => {
                      const selected =
                        selectedServices[service][tariff];

                      return (
                        <div key={tariff} className="mt-2">

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
              ))}

              <textarea
                placeholder="Izoh"
                className="w-full border p-3 rounded"
                value={form.note}
                onChange={(e) =>
                  setForm({ ...form, note: e.target.value })
                }
              />

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