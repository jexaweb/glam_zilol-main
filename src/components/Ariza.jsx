import React, { useState } from "react";
import { useLanguage } from "./LanguageContext";

export default function Ariza() {
  const { language } = useLanguage();

  /* ================= TRANSLATIONS ================= */
  const translations = {
    uz: {
      title: "Buyurtma qoldirish",
      name: "F.I.O",
      phone: "Tel",
      services: "Xizmatlar",
      quantity: "Soni",
      address: "Lokatsiya tugmani bosing ➡️ ",
      note: "Izoh,manzil (masalan: ertaga olib ketilsin manzil:margilol )",
      send: "Buyurtma yuborish",
      success: "Ariza yuborildi  ✅",
      location_error: "Lokatsiya olinmadi ❗",
      browser_error: "Brauzer lokatsiyani qo‘llab-quvvatlamaydi ❗",
    },
    ru: {
      title: "Оставить заявку",
      name: "Ф.И.О",
      phone: "Номер телефона",
      services: "Услуги",
      quantity: "Количество",
      address: "Нажмите кнопку «Местоположение» ➡️",
      note: "Комментарий (например: забрать завтра)",
      send: "Отправить заявку",
      success: "Заявка отправлена ✅",
      location_error: "Не удалось получить геолокацию ❗",
      browser_error: "Браузер не поддерживает геолокацию ❗",
    },
  };

  const t = translations[language] || translations.uz;

  /* ================= SERVICES ================= */
  const serviceData = {
    "Gilam yuvish": {
      tariffs: {
        "VIP Premium /1m/kv": 20000,
        "Premium /1m/kv": 15000,
        "Standart /1m/kv": 12000,
      },
    },
    "Adyol yuvish": {
      tariffs: {
        "Premium /1 dona": 80000,
        "Standart /1 dona": 60000,
      },
    },
    "Yakkandoz yuvish": {
      tariffs: {
        "Premium /1 dona": 50000,
        "Standart /1 dona": 40000,
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
        "Mebel /1 dona": 80000,
        "Stul /1 dona": 30000,
      },
    },
  };

  /* ================= SERVICE TRANSLATION ================= */
  const serviceNames = {
    uz: {
      "Gilam yuvish": "Gilam yuvish",
      "Adyol yuvish": "Adyol yuvish",
      "Yakkandoz yuvish": "Yakkandoz yuvish",
      "Parda yuvish": "Parda yuvish",
      "Mebel yuvish": "Mebel yuvish",
    },
    ru: {
      "Gilam yuvish": "Стирка ковров",
      "Adyol yuvish": "Стирка одеял",
      "Yakkandoz yuvish": "Стирка дорожек",
      "Parda yuvish": "Стирка штор",
      "Mebel yuvish": "Чистка мебели",
    },
  };

  /* ================= STATE ================= */
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });

  const [selectedServices, setSelectedServices] = useState({});
  const [loadingLoc, setLoadingLoc] = useState(false);

  /* ================= FUNCTIONS ================= */

  const toggleService = (service) => {
    const updated = { ...selectedServices };
    if (updated[service]) delete updated[service];
    else updated[service] = {};
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
        [tariff]: { quantity: value },
      },
    });
  };

  /* ================= LOCATION ================= */
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert(t.browser_error);
      return;
    }

    setLoadingLoc(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const link = `https://maps.google.com/?q=${position.coords.latitude},${position.coords.longitude}`;
        setForm((prev) => ({ ...prev, address: link }));
        setLoadingLoc(false);
      },
      () => {
        alert(t.location_error);
        setLoadingLoc(false);
      }
    );
  };

  /* ================= TELEGRAM ================= */
  const sendTelegram = async () => {
    let message = `🧼 ${t.title}\n\n👤 ${form.name}\n📞 ${form.phone}\n📍 ${form.address}\n\n`;

    let i = 1;

    Object.entries(selectedServices).forEach(([service, tariffs]) => {
      Object.entries(tariffs).forEach(([tariff, data]) => {
        const price = serviceData[service].tariffs[tariff];

        message += `${i}️⃣ ${serviceNames[language][service]}\n`;
        message += `Tarif: ${tariff}\n`;
        message += `Narx: ${price.toLocaleString()} so'm\n`;
        message += `${t.quantity}: ${data.quantity}\n\n`;

        i++;
      });
    });

    message += `✏️ ${form.note}`;

    await fetch("https://api.telegram.org/bot8789952135:AAEq5VuGMUAa7b094Les1nJm1DCnvM_TaK0/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: "6904234957",
        text: message,
      }),
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const service in selectedServices) {
      for (const tariff in selectedServices[service]) {
        if (!selectedServices[service][tariff].quantity) {
          alert("❗ " + t.quantity);
          return;
        }
      }
    }

    await sendTelegram();

    alert(t.success);

    setForm({ name: "", phone: "", address: "", note: "" });
    setSelectedServices({});
  };

  /* ================= UI ================= */
  return (
    <section className="min-h-screen flex justify-center items-center p-4 mt-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-xl space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-black">{t.title}</h2>

        <input
          className="input w-full"
          placeholder={t.name}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          className="input w-full"
          placeholder={t.phone}
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />

        {/* SERVICES */}
        <div className="space-y-3">
          <p className="font-semibold text-black">{t.services}</p>

          {Object.keys(serviceData).map((service) => {
            const selected = selectedServices[service];

            return (
              <div key={service} className="border rounded-xl overflow-hidden">
                <div
                  onClick={() => toggleService(service)}
                  className="p-4 cursor-pointer flex justify-between bg-black text-white"
                >
                  <span>
                    {serviceNames[language][service] || service}
                  </span>
                  <span>{selected ? "−" : "+"}</span>
                </div>

                {selected && (
                  <div className="p-4 space-y-2 bg-amber-500">
                    {Object.entries(serviceData[service].tariffs).map(
                      ([tariff, price]) => {
                        const selectedTariff = selected[tariff];

                        return (
                          <div key={tariff}>
                            <label className="flex gap-2">
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
                                className="input w-full mt-2"
                                placeholder={t.quantity}
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

        {/* ADDRESS */}
        <div className="flex gap-2">
          <input
            className="input w-full"
            placeholder={t.address}
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
            required
          />

          <button
            type="button"
            onClick={getLocation}
            className="bg-amber-500 text-white px-4 rounded-xl"
          >
            {loadingLoc ? "..." : "📍"}
          </button>
        </div>

        <textarea
          className="input w-100% h-24"
          placeholder={t.note}
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
        />

        <button className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold">
          {t.send}
        </button>
      </form>
    </section>
  );
}