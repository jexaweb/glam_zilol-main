import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import CarpetComparison from "../components/CarpetComparison";
import PhoneInput from "../components/PhoneInput";
import { useLanguage } from "../components/LanguageContext";
import ServiceCard from "../components/ServiceCard";

/* ================= ERROR ALERT ================= */
function ErrorAlert({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
      <div className="flex justify-between items-center gap-4">
        <span>{message}</span>
        <button onClick={onClose}>✕</button>
      </div>
    </div>
  );
}

function Home() {
  const { language } = useLanguage();

  /* ================= SLIDES ================= */
  const slides = [
    {
      imgDesktop:
        "https://d34mfkth6cubud.cloudfront.net/wp-content/uploads/2022/11/16073435/home-cleaning-services-in-Abu-Dhabi-_-Cover-16-11-22.jpg",
      imgMobile:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800",

      text1_uz: "Premium tezkor xizmat!",
      text2_uz:
        "ERA 111 antibakterial, gipoallergen shampun bilan chuqur yuvish.",
      text3_uz: "Quritish va 1 kunda yetkazib berish kafolati!",

      text1_ru: "Премиальный экспресс-сервис!",
      text2_ru:
        "Глубокая стирка антибактериальным гипоаллергенным шампунем ERA 111.",
      text3_ru: "Сушка и доставка всего за 1 день!",
    },
    {
      imgDesktop:
        "https://avatars.mds.yandex.net/get-altay/15265650/2a00000194cfc14c6f5dd8df9fe271072a6a/XXL_height",
      imgMobile:
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800",

      text1_uz: "Mebel va divanlarni joyida tozalaymiz!",
      text2_uz:
        "Professional uskunalar va ekologik vositalar bilan xizmat.",
      text3_uz: "Atigi 1–2 soatda yangidek natija!",

      text1_ru: "Чистим мебель у вас дома!",
      text2_ru:
        "Профессиональное оборудование и экологичные шампуни.",
      text3_ru: "Результат как новый всего за 1–2 часа!",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  /* ================= FORM ================= */
  const formRef = useRef();
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      setError("Ma'lumotlarni to‘liq kiriting.");
      return;
    }

    setLoading(true);

    emailjs
      .sendForm(
        "service_u8uok6n",
        "template_l0no0ke",
        formRef.current,
        "yqeQcMyCRd4i1twMv"
      )
      .then(() => {
        alert("Yuborildi!");
        setFormData({ name: "", phone: "" });
      })
      .catch(() => setError("Xatolik yuz berdi"))
      .finally(() => setLoading(false));
  };

  /* ================= SERVICES ================= */
const services = [ { title: language === "ru" ? "Стирка ковров" : "Gilam yuvish", image: "/images/gilam.jpg", link: "/gilam", }, { title: language === "ru" ? "Стирка штор" : "Parda yuvish", image: "/images/parda.jpg", link: "/parda", }, { title: language === "ru" ? "Стирка дорожек" : "Yakkandoz yuvish", image: "/images/yakkandoz.jpg", link: "/yakkandoz", }, { title: language === "ru" ? "Стирка одеял" : "Ko‘rpa yuvish", image: "/images/korpa.jpg", link: "/korpa", }, { title: language === "ru" ? "Чистка мебели" : "Mebel yuvish", image: "/images/mebel.jpg", link: "/mebel", }, { title: language === "ru" ? "Чистка матрасов" : "Matras yuvish", image: "/images/matras.jpg", link: "/matras", }, { title: language === "ru" ? "Чистка на месте" : "Joyida yuvish", image: "/images/kovrolin.jpg", link: "/kovrolin", }, { title: language === "ru" ? "Чистка игрушек" : "O‘yinchoqlar yuvish", image: "/images/ofis.jpg", link: "/ofis", }, { title: language === "ru" ? "Стирка подушек" : "Yostiqlar yuvish", image: "/images/antiseptik.jpg", link: "/antiseptik", }, { title: language === "ru" ? "Стирка авто чехлов" : "Avto chixol yuvish", image: "/images/avto.jpg", link: "/avto", }, ];
  return (
    <div className="pt-10">

      <ErrorAlert message={error} onClose={() => setError("")} />

      {/* ================= HERO SLIDER ================= */}
      <section className="relative w-full h-[90vh] mt-7 sm:mt-4 md:mt-7 lg:mt-9  overflow-hidden">

        {slides.map((item, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === index ? "opacity-100 z-20" : "opacity-0 z-10"
            }`}
          >
            <img
              src={item.imgDesktop}
              className="hidden lg:block w-full h-full object-cover"
              alt=""
            />
            <img
              src={item.imgMobile}
              className="block lg:hidden w-full h-full object-cover"
              alt=""
            />

            <div className="absolute inset-0 bg-black/50"></div>

            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center text-white max-w-4xl px-4 z-30">
              <h2 className="animate-slideUp font-extrabold text-3xl md:text-5xl mb-4">
                {item[`text1_${language}`]}
              </h2>
              <p className="animate-slideUp text-lg md:text-2xl">
                {item[`text2_${language}`]}
              </p>
            </div>

            <button
              onClick={prev}
              className="absolute top-1/2 left-5 -translate-y-1/2 bg-yellow-400 p-3 rounded-full"
            >
              ‹
            </button>

            <button
              onClick={next}
              className="absolute top-1/2 right-5 -translate-y-1/2 bg-yellow-400 p-3 rounded-full"
            >
              ›
            </button>
          </div>
        ))}
      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-20 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s, i) => (
          <ServiceCard key={i} {...s} />
        ))}
      </section> 

      <CarpetComparison />

    </div>
  );
}

export default Home;
