import React, { useRef, useState } from "react";
import { useLanguage } from "./LanguageContext";

function EmailForm() {
  const form = useRef();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const { language } = useLanguage();

  const translations = {
    uz: {
      name: "Ismingiz",
      phone: "Telefon raqamingiz",
      address: "Manzilingiz (masalan: Farg‘ona, Marg‘ilon)",
      message: "Xabaringizni kiriting...",
      send: "Yuborish",
      sending: "Yuborilmoqda...",
      success:
        "✅ Ma’lumot muvaffaqiyatli yuborildi tez orada siz bilan bog‘lanamiz!",
      error: "❌ Xatolik yuz berdi, qayta urinib ko‘ring!",
    },
    ru: {
      name: "Имя",
      phone: "Номер телефона",
      address: "Адрес (например: Фергана, Маргилан)",
      message: "Сообщение...",
      send: "Отправить",
      sending: "Отправка...",
      success: "✅ Данные успешно отправлены Мы скоро свяжемся с вами!!",
      error: "❌ Произошла ошибка, попробуйте снова!",
    },
  };

  const t = translations[language] || translations["uz"];

  // 📞 Telefon formatlash
  const formatPhone = (val) => {
    val = val.replace(/\D/g, "");
    if (!val.startsWith("998")) val = "998" + val;
    const d = val.slice(3);

    let f = "+998";
    if (d.length > 0) f += " (" + d.slice(0, 2);
    if (d.length >= 2) f += ")";
    if (d.length > 2) f += " " + d.slice(2, 5);
    if (d.length > 5) f += "-" + d.slice(5, 7);
    if (d.length > 7) f += "-" + d.slice(7, 9);

    return f;
  };

  const handleChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "");
    const formatted = formatPhone(digits);
    setPhone(formatted);
  };

  // 🚀 TELEGRAM SEND
  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const formData = new FormData(form.current);

    const name = formData.get("name");
    const phone = formData.get("phone");
    const address = formData.get("address");
    const message = formData.get("message");

    const text = `
📥 Yangi buyurtma!

👤 Ism: ${name}
📞 Telefon: ${phone}
📍 Manzil: ${address}
💬 Xabar: ${message}
    `;

    try {
      await fetch(
        "https://api.telegram.org/bot8789952135:AAEq5VuGMUAa7b094Les1nJm1DCnvM_TaK0/sendMessage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: "6904234957",
            text: text,
          }),
        },
      );

      setStatus(t.success);
      setPhone("");
      e.target.reset();
    } catch (error) {
      console.error(error);
      setStatus(t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-15 ">
      <form
        ref={form}
        onSubmit={sendEmail}
        className="w-full  flex flex-col gap-4  "
      >
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder={t.name}
          required
          className="w-full px-4 py-3 rounded-full border-2 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none text-white placeholder-white bg-transparent"
        />

        {/* Phone */}
        <input
          type="tel"
          name="phone"
          value={phone}
          onChange={handleChange}
          placeholder={t.phone}
          required
          className="w-full px-4 py-3 rounded-full border-2 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none text-white placeholder-white bg-transparent"
        />

        {/* Address */}
        <input
          type="text"
          name="address"
          placeholder={t.address}
          required
          className="w-full px-4 py-3 rounded-full border-2 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none text-white placeholder-white bg-transparent"
        />

        {/* Message */}
        <textarea
          name="message"
          placeholder={t.message}
          rows="4"
          className="w-full px-4 py-3 rounded-2xl border-2 focus:ring-2 focus:ring-amber-300 focus:border-amber-400 outline-none text-white placeholder-white resize-none bg-transparent"
        ></textarea>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 bg-amber-400 text-black font-semibold py-3 rounded-full hover:bg-white transition shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          {loading ? t.sending : t.send}
        </button>

        {/* Status */}
        {status && (
          <p className="text-center mt-2 text-white font-medium">{status}</p>
        )}
      </form>
    </div>
  );
}

export default EmailForm;
