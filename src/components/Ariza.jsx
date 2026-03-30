import React, { useState } from "react";




export default function Ariza() {


  const serviceData = {
    "Gilam yuvish": {
      tariffs: {
        "VIP /1m/kv": 25000,
        "Premium /1m/kv": 15000,
        "Standart /1m/kv": 10000,
      },
    },
    "Adyol yuvish": {
      tariffs: {
        "Premium /1x/dona": 60000,
        "Standart /1x/dona": 40000,
      },
    },
    "Yakkandoz yuvish": {
      tariffs: {
        "Premium /1 dona": 40000,
        "Standart /1 dona": 30000,
      },
    },
    "Parda yuvish": {
      tariffs: {
        "Premium /1 kg": 35000,
        "Standart /1 kg": 25000,
      },
    },
    "Mebel yuvish": {
      tariffs: {
        "Mebel /1x/dona": 100000,
        "Stul /1x/dona": 30000,
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

  return (
    <section className="min-h-screen  flex justify-center items-center p-4 mt-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-xl space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-black">
          Buyurtma qoldirish
        </h2>

        <input
          className="input w-full  "
          placeholder="FIO"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="input w-full  "
          placeholder="TEL:"
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        {/* Xizmatlar */}
     <div className="space-y-3">
  <p className="font-semibold ">Xizmatlar:</p>

  {Object.keys(serviceData).map((service) => {
    const selected = selectedServices[service];

    return (
      <div key={service} className="border rounded-xl overflow-hidden">
        
        {/* 🔥 HEADER (bosilganda ochiladi) */}
        <div
          onClick={() => toggleService(service)}
          className="p-4 cursor-pointer flex justify-between items-center bg-black text-white transition"
        >
          <span className="font-medium">{service}</span>

          <span>
            {selected ? "−" : "+"}
          </span>
        </div>

        {/* 🔥 BODY */}
        {selected && (
          <div className="p-4 space-y-2 border-t bg-amber-500 hover:bg-amber-600 transition">
            {Object.entries(serviceData[service].tariffs).map(
              ([tariff, price]) => {
                const selectedTariff = selected[tariff];

                return (
                  <div key={tariff} >
                    <label className="flex items-center gap-2   ">
                      
                      <input
                   
                        type="checkbox"
                        checked={!!selectedTariff}
                        onChange={() =>
                          toggleTariff(service, tariff)
                        }
                      />

                      {tariff} - {price.toLocaleString()} so'm
                    </label>

                    {selectedTariff && (
                      <input
                        type="number"
                        min="1"
                        className="input w-full mt-2 "
                        placeholder="Soni"
                        value={selectedTariff.quantity}
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
        )}
      </div>
    );
  })}
</div>

        {/* LOCATION */}
        <div className="flex gap-2">
          <input
            className="input w-full"
            placeholder="Manzil"
            required
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
          />

          <button
            type="button"
            onClick={getLocation}
            className="bg-amber-500 text-white px-4 rounded-xl min-w-[60px]"
          >
            {loadingLoc ? "..." : "📍"}
          </button>
        </div>

        <textarea
          className="input w-full placeholder:text-white-50"
          placeholder="Izoh {ertaga olib ketilar soati}"
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
        />

        <button className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold">
          Buyurtma yuborish
        </button>
      </form>
    </section>
  );
}