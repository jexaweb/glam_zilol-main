import { useState } from "react";
import TariffCard from "../../components/TariffCard";
import { tariffDescriptions } from "../../hook/tariffData";

export default function Gilam() {
  const [selectedMainTariff, setSelectedMainTariff] = useState(null);
  const [mainQuantity, setMainQuantity] = useState(1);
  const [selectedExtra, setSelectedExtra] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    pickupDate: "",
    pickupTime: "",
  });

  const gilamTariffs = [
    { id: 1, title: "Oddiy", price: "50 000 so'm", desc: tariffDescriptions.basic },
    { id: 2, title: "Premium", price: "100 000 so'm", desc: tariffDescriptions.premium },
    { id: 3, title: "Premium Pro", price: "200 000 so'm", desc: tariffDescriptions.premiumPro },
  ];

  const otherServices = {
    Parda: ["80 000 so'm", "150 000 so'm", "200 000 so'm"],
    Yakkandoz: ["30 000 so'm", "60 000 so'm", "100 000 so'm"],
    Korpa: ["30 000 so'm", "50 000 so'm", "80 000 so'm"],
    Matras: ["40 000 so'm", "70 000 so'm", "120 000 so'm"],
    Mebel: ["50 000 so'm", "100 000 so'm", "180 000 so'm"],
  };

  const handleExtraSelect = (serviceName, price) => {
    setSelectedExtra((prev) => ({
      ...prev,
      [serviceName]: {
        price,
        quantity: prev[serviceName]?.quantity || 1,
      },
    }));
  };

  const handleExtraQuantityChange = (serviceName, value) => {
    setSelectedExtra((prev) => ({
      ...prev,
      [serviceName]: {
        ...prev[serviceName],
        quantity: Number(value),
      },
    }));
  };

  const removeService = (serviceName) => {
    const updated = { ...selectedExtra };
    delete updated[serviceName];
    setSelectedExtra(updated);
  };

  const handleSubmit = () => {
    const { name, phone, address, pickupDate, pickupTime } = formData;

    if (!name || !phone || !address || !pickupDate || !pickupTime) {
      alert("❗ Iltimos barcha maydonlarni to‘ldiring");
      return;
    }

    console.log({
      mainTariff: selectedMainTariff,
      mainQuantity,
      extras: selectedExtra,
      ...formData,
    });

    alert("✅ Buyurtmangiz qabul qilindi!");
  };

  return (
    <div className="p-6 mt-24 max-w-7xl mx-auto space-y-10">

      <h1 className="text-3xl font-bold">Gilam — Tarif tanlang</h1>

      {/* TARIFLAR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {gilamTariffs.map((t) => (
          <TariffCard
            key={t.id}
            title={t.title}
            price={t.price}
            desc={t.desc}
            selected={selectedMainTariff === t.id}
            onSelect={() => setSelectedMainTariff(t.id)}
          />
        ))}
      </div>

      {/* GILAM SONI */}
      {selectedMainTariff && (
        <div className="bg-gray-100 p-6 rounded-xl shadow-md">
          <label className="block font-semibold mb-2">
            Nechta gilam?
          </label>
          <input
            type="number"
            min="1"
            value={mainQuantity}
            onChange={(e) => setMainQuantity(Number(e.target.value))}
            className="w-32 p-3 border rounded-lg"
          />
        </div>
      )}

      {/* QO‘SHIMCHA XIZMATLAR */}
      {selectedMainTariff && (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Qo‘shimcha xizmatlar
          </h2>

          {Object.keys(otherServices).map((serviceKey) => (
            <div key={serviceKey} className="mb-8">
              <h3 className="font-semibold text-lg mb-3">
                {serviceKey}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {otherServices[serviceKey].map((price, idx) => (
                  <TariffCard
                    key={idx}
                    title={serviceKey}
                    price={price}
                    desc="Olib ketib, yuvib qaytaramiz"
                    selected={
                      selectedExtra[serviceKey]?.price === price
                    }
                    onSelect={() =>
                      handleExtraSelect(serviceKey, price)
                    }
                  />
                ))}
              </div>

              {selectedExtra[serviceKey] && (
                <div className="flex items-center gap-4 mt-3">
                  <input
                    type="number"
                    min="1"
                    value={selectedExtra[serviceKey].quantity}
                    onChange={(e) =>
                      handleExtraQuantityChange(
                        serviceKey,
                        e.target.value
                      )
                    }
                    className="w-24 p-2 border rounded-lg"
                  />

                  <button
                    onClick={() => removeService(serviceKey)}
                    className="text-red-600 font-semibold"
                  >
                    O‘chirish
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* BUYURTMA TAFSILOTI */}
      {(selectedMainTariff ||
        Object.keys(selectedExtra).length > 0) && (
        <div className="bg-white p-8 rounded-2xl shadow-2xl space-y-4">

          <h3 className="text-xl font-bold">
            Buyurtma tafsiloti:
          </h3>

          {/* GILAM */}
          {selectedMainTariff && (() => {
            const selectedTariff = gilamTariffs.find(
              (t) => t.id === selectedMainTariff
            );

            return (
              <p>
                Gilam ({selectedTariff.title}):{" "}
                <span className="font-semibold">
                  {mainQuantity} ta
                </span>
              </p>
            );
          })()}

          {/* QO‘SHIMCHA XIZMATLAR */}
          {Object.entries(selectedExtra).map(
            ([key, value]) => (
              <p key={key}>
                {key} ({value.price}):{" "}
                <span className="font-semibold">
                  {value.quantity} ta
                </span>
              </p>
            )
          )}

          {/* FORM */}
          <div className="space-y-3 mt-6">
            <input
              type="text"
              placeholder="Ismingiz"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="w-full p-3 border rounded-lg"
            />

            <input
              type="tel"
              placeholder="Telefon"
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value,
                })
              }
              className="w-full p-3 border rounded-lg"
            />

            <textarea
              placeholder="Manzil"
              value={formData.address}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: e.target.value,
                })
              }
              className="w-full p-3 border rounded-lg"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                value={formData.pickupDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pickupDate: e.target.value,
                  })
                }
                className="p-3 border rounded-lg"
              />

              <input
                type="time"
                value={formData.pickupTime}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pickupTime: e.target.value,
                  })
                }
                className="p-3 border rounded-lg"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:scale-[1.02] transition"
            >
              Buyurtmani jo‘natish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}