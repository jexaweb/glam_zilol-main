import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Ariza from "../../components/Ariza";
import { useLanguage } from "../../components/LanguageContext";

export default function Korpa() {
 const [showModal, setShowModal] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
    const { language } = useLanguage();

    useEffect(() => {
            const timer = setTimeout(() => {
              setShowModal(true);
            }, 2000);
          
            return () => clearTimeout(timer);
          }, []);

  const t = {
    uz: {
      title: "Ko‘rpa yuvish xizmati 🛏️",
      desc: "Ko‘rpalaringizni chuqur tozalaymiz, chang va bakteriyalarni yo‘q qilamiz. Yangi kabi toza va yoqimli holatda qaytaramiz.",
      list: [
        "✔ Oqartirmasdan tozalash",
        "✔ Tez va sifatli xizmat",
        "✔ Uyga olib ketish va qaytarish",
      ],
      order: "Buyurtma qoldirish",
      services: "Bizning xizmatlar",
      premium: "Premium korpa yuvish",
      premiumDesc: "2 kishilik paxtali ko'rpa",
      standard: "Standart korpa yuvish",
      standardDesc: "1 kishilik paxtali ko'rpa",
      process: "Qanday ishlaymiz?",
      steps: [
        "Buyurtma berasiz",
        "Uyga boramiz",
        "Tozalaymiz",
        "Quritib topshiramiz",
      ],
      cta: "Hoziroq buyurtma bering 📞",
      discount: "Birinchi buyurtmaga",
      call: "Qo‘ng‘iroq qilish",
      orderBtn: "Buyurtma berish",
      name: "F.I.O",
      phone: "Tel",
      address: "Lokatsiya tugmani bosing ➡️",
      note: "Izoh,manzil (masalan: ertaga olib ketilsin manzil:margilol )",
      send: "Buyurtma yuborish",
      mattress: "Matras yuvish",
    },
    ru: {
      title: "Стирка одеял 🛏️",
      desc: "Глубоко очищаем ваши одеяла, удаляем пыль и бактерии. Возвращаем чистыми и свежими.",
      list: [
        "✔ Без отбеливания",
        "✔ Быстро и качественно",
        "✔ Забираем и доставляем",
      ],
      order: "Оставить заявку",
      services: "Наши услуги",
      premium: "Премиум стирка одеяла",
      premiumDesc: "Двуспальное хлопковое одеяло",
      standard: "Стандартная стирка одеяла",
      standardDesc: "Односпальное хлопковое одеяло",
      process: "Как мы работаем?",
      steps: [
        "Вы оставляете заявку",
        "Мы приезжаем",
        "Чистим",
        "Сушим и доставляем",
      ],
      cta: "Закажите прямо сейчас 📞",
      discount: "Скидка",
      call: "Позвонить",
      orderBtn: "Сделать заказ",
      name: "Ф.И.О",
      phone: "Тел",
      address: "Нажмите кнопку «Местоположение» ➡️",
      note: "Комментарий  (например: забрать завтра)",
      send: "Отправить",
      mattress: "Чистка матраса",
    },
  }[language];

  const navigate = useNavigate();

  const videos = [
    {
      video: "/videos/gilam1.mp4",
      img: "/zilolclengi.png",
    },
    {
      video: "/videos/gilam.mp4",
      img: "/zilolclengi.1.png",
    },
    {
      video: "/videos/mebel.mp4",
      img: "/zilolclengi.2.png",
    },
    {
      video: "/videos/yakandoz.mp4",
      img: "/zilolclengi.3.png",
    },
  ];
   const serviceData = {
    
    "Korpa yuvish": {
      tariffs: {
        "primum /2x/dona": 120000,
        "Standart /1x/dona":80000,
        
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
      name: "1 kishilik matras",
      price: "80, 000 so‘m",
     
    },
    {
      name: "2 kshilik matras",
      price: "120, 000 so‘m",
     
    },
   
  ];

  return (
    <div className=" ">
        
      
      {/* HERO */}
       <div className="absolute top-0 left-0 w-72 h-72 bg-amber-400/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/30 blur-3xl rounded-full"></div>

      {/* HERO */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          
          {/* LEFT */}
          <div>
        
 <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t.title}
            </h1>

            <p className=" mb-6">
              {t.desc}
            </p>

            <ul className="space-y-2  mb-6">
              <li>{t.list[0]}</li>
              <li>{t.list[1]}</li>
              <li>{t.list[2]}</li>
            </ul>

            <button
              onClick={() => setShowModal(true)}
              className="bg-amber-500 text-white px-5 py-2 rounded-full shadow-lg hover:shadow-amber-400/50 hover:-translate-y-1 transition-all duration-300"
            >
              {t.order}
            </button>
          </div>

          {/* RIGHT - VIDEO GRID */}
     <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
  {videos.map((item, i) => (
    <div
      key={i}
      onClick={() => setActiveVideo(item.video)}
      className="min-w-64  relative cursor-pointer rounded-2xl overflow-hidden group 
      shadow-md hover:shadow-2xl 
      transition-all duration-500 
      hover:-translate-y-2 hover:scale-[1.03]"
    >
      {/* IMAGE */}
      <img
        src={item.img}
        className="w-full h-160px object-cover group-hover:scale-105 transition duration-300"
      />

      {/* PLAY ICON */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-black/50 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl backdrop-blur-sm group-hover:scale-110 transition">
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
  className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4"
>
  <button
  onClick={(e) => {
    e.stopPropagation();   
    setActiveVideo(null);
  }}
  className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center 
  rounded-full bg-black/60 backdrop-blur-md text-white text-lg
  hover:bg-amber-400 hover:text-black 
  transition-all duration-300 shadow-md hover:scale-110 active:scale-95"
>
  ✕
</button>
  <div
    onClick={(e) => e.stopPropagation()}
    className="relative w-full max-w-2xl"
  >
    
    {/* ❌ yopish tugmasi */}


    {/* 🎥 VIDEO */}
    <div className="rounded-2xl overflow-hidden shadow-2xl">
      <video
        src={activeVideo}
        controls
        autoPlay
        className="w-full max-h-[70vh] object-contain bg-black"
      />
    </div>

  </div>
</div>
      )}
     {/* SERVICES */}
<section className="py-20 bg-gray-50 text-black">
  <div className="max-w-6xl mx-auto px-4">
    
    <h2 className="text-3xl font-bold text-center mb-12">
      {t.services}
    </h2>

    <div className="grid md:grid-cols-2 gap-8">
      {[
      
        {
          title: t.premium,
          price: "120 000 so'm / 2x dona",
          desc: t.premiumDesc,
        },
        {
          title: t.standard,
          price: "80 000 so'm / 1x dona",
          desc: t.standardDesc,
        },
      ].map((item, i) => (
        <div
          key={i}
          className="p-6 bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 hover:-translate-y-2 border"
        >
          {/* ICON */}
          <div className="text-4xl mb-4">🧼</div>

          {/* TITLE */}
          <h3 className="font-semibold text-xl mb-2">
            {item.title}
          </h3>

          {/* PRICE */}
          <p className="text-blue-600 font-bold mb-2">
            {item.price}
          </p>

          {/* DESC */}
          <p className="text-gray-500 mb-4">
            {item.desc}
          </p>

        
        </div>
      ))}
    </div>
  </div>
</section>

      {/* PROCESS */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          
          <h2 className="text-3xl font-bold text-center mb-12 text-black">
            {t.process}
          </h2>

         <div className="grid md:grid-cols-4 gap-6 text-center text-black">
  
  {t.steps.map((step, i) => (
    <div key={i} className="p-4">
      <div className="text-3xl font-bold text-amber-400 mb-2">
        {i + 1}
      </div>
      <p>{step}</p>
    </div>
  ))}

</div>
        </div>
      </section>


       <section className="relative py-20 text-center overflow-hidden">
  
  {/* 🔥 background glow */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-amber-400/30 blur-3xl rounded-full"></div>
  <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-500/30 blur-3xl rounded-full"></div>

  <div className="relative max-w-3xl mx-auto px-4">
    
    <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
      {t.cta}
    </h2>

    <p className="mb-8 text-lg text-gray-300">
      {t.discount} 
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      
      {/* 📞 CALL */}
      <a
        href="tel:+998732001313"
        className="px-8 py-4 rounded-xl bg-amber-400 text-black font-semibold 
        shadow-lg hover:shadow-amber-400/50 
        hover:scale-105 active:scale-95 
        transition duration-300"
      >
          {t.call}  
      </a>

      {/* 📝 ORDER */}
      <button
        onClick={() => setShowModal(true)}
        className="px-8 py-4 rounded-xl bg-white text-black font-semibold 
        shadow-md hover:shadow-xl 
        hover:scale-105 active:scale-95 
        transition duration-300"
      >
        {t.orderBtn} 📝
      </button>

    </div>

    {/* TRUST TEXT */}
    <p className="mt-6 text-sm text-gray-400">
      {t.trust}
    </p>

  </div>
</section>

   {/* ✅ MODAL */}
{showModal && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4 ">

    <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-6 md:p-8 relative animate-scaleIn">

      {/* ❌ close */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-2 bg-white right-4 text-gray-500 hover:text-red-600 text-2xl transition"
      >
        ✕
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center text-black">
        {t.order}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* INPUTS */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="w-full border text-black border-gray-300 focus:border-y-amber-500 focus:ring-1 focus:ring-yellow-500 p-3 rounded-xl outline-none transition"
            placeholder={t.name}
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            className="w-full border text-black border-gray-300 focus:border-y-amber-500 focus:ring-1 focus:ring-yellow-500 p-3 rounded-xl outline-none transition"
            placeholder={t.phone}
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />
        </div>

        {/* XIZMAT */}
        <div className="space-y-3 max-h-300px overflow-y-auto pr-2">
          {Object.keys(serviceData).map((service) => (
            <div key={service} className="border rounded-xl overflow-hidden">

              <div
                onClick={() => toggleService(service)}
                className="p-3 bg-black text-white cursor-pointer flex justify-between items-center"
              >
                <span>{service}</span>
                <span>
                  {selectedServices[service] ? "−" : "+"}
                </span>
              </div>

              {selectedServices[service] && (
                <div className="p-4 space-y-3 bg-yellow-500">
                  {Object.entries(
                    serviceData[service].tariffs
                  ).map(([tariff, price]) => {
                    const selected =
                      selectedServices[service][tariff];

                    return (
                      <div key={tariff} className="border-b pb-3">

                        <label className="flex justify-between items-center gap-2 cursor-pointer">
                          <div className="flex gap-2 items-center">
                            <input
                              type="checkbox"
                              className="accent-black"
                              checked={!!selected}
                              onChange={() =>
                                toggleTariff(service, tariff)
                              }
                            />
                            <span className="font-medium">
                              {tariff}
                            </span>
                          </div>

                          <span className="text-sm text-black">
                            {price} so'm
                          </span>
                        </label>

                        {selected && (
                          <input
                            type="number"
                            placeholder={t.quantity}
                            className="w-full bg-white border border-gray-300 focus:border-black p-2 mt-2 rounded-lg outline-none"
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
        </div>

         {/* ADDRESS */}
        <div className="flex gap-2">
          <input
            className="input w-full "
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
          className="w-full border-2 placeholder:text-black/40 border-gray-300 focus:border-y-amber-500 focus:ring-1 focus:ring-yellow-600 p-3 rounded-xl outline-none"
          placeholder={t.note}
          value={form.note}
          onChange={(e) =>
            setForm({ ...form, note: e.target.value })
          }
        />

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-amber-500 hover:bg-yellow-500 text-white py-3 rounded-xl text-lg font-semibold transition active:scale-95"
        >
          {t.send}
        </button>

      </form>
    </div>
  </div>
)}
    </div>
  );
}


