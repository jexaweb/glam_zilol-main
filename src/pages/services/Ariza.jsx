import React, { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Ariza() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
      quantity: "", 
    tariff: "",
    address: "",
    note: "",
  });

  const [loading, setLoading] = useState(false);

  const services = [
    "Gilam yuvish",
    "Yakkandoz yuvish",
    "Parda yuvish",
    "Ko‘rpa yuvish",
    "Mebel yuvish",
    "O‘rindiq yuvish",
    "Kovrolin yuvish",
    "Pol yuvish",
    "Deraza tozalash",
    "Ofis tozalash",
  ];

  const tariffs = ["Standart", "Premium", "VIP"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const loc = `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`;
        setFormData({ ...formData, address: loc });
      });
    } else {
      alert("Geolocation ishlamayapti");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        formData,
        "YOUR_PUBLIC_KEY"
      )
      .then(() => {
        alert("Ariza muvaffaqiyatli yuborildi ✅");
        setFormData({
          name: "",
          phone: "",
          service: "",
          tariff: "",
          address: "",
          note: "",
        });
      })
      .catch(() => {
        alert("Xatolik yuz berdi ❌");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen mt-10 bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Ariza qoldirish
        </h2>

        {/* Ism */}
        <input
          type="text"
          name="name"
          placeholder="Ismingiz"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none"
        />

        {/* Telefon */}
        <input
          type="tel"
          name="phone"
          placeholder="Telefon raqam"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none"
        />

        {/* Xizmat */}
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none"
        >
          <option value="">Xizmat tanlang</option>
          {services.map((s, i) => (
            <option key={i} value={s}>
              {s}
            </option>
          ))}
        </select>
<input
  type="number"
  name="quantity"
  placeholder="Nechta? (masalan 3 ta)"
  value={formData.quantity}
  onChange={handleChange}
  min="1"
  required
  className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none"
/>
        {/* Tarif */}
        <select
          name="tariff"
          value={formData.tariff}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none"
        >
          <option value="">Tarif tanlang</option>
          {tariffs.map((t, i) => (
            <option key={i} value={t}>
              {t}
            </option>
          ))}
        </select>

        {/* Lokatsiya */}
        <div className="flex gap-3">
          <input
            type="text"
            name="address"
            placeholder="Manzil (Lokatsiya)"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none"
          />
          <button
            type="button"
            onClick={getLocation}
            className="bg-blue-500 text-white px-4 rounded-xl hover:bg-blue-600 transition"
          >
            Lokatsiya
          </button>
        </div>

        {/* Izoh */}
        <textarea
          name="note"
          placeholder="Izoh"
          value={formData.note}
          onChange={handleChange}
          rows="4"
          className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-500 text-white py-3 rounded-xl font-semibold hover:bg-amber-600 transition"
        >
          {loading ? "Yuborilmoqda..." : "Ariza yuborish"}
        </button>
      </form>
    </div>
  );
}