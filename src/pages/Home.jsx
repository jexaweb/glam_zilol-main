import { useState, useEffect, useRef } from "react";

import CarpetComparison from "../components/CarpetComparison";
import PhoneInput from "../components/PhoneInput";
import { useLanguage } from "../components/LanguageContext";
import ServiceCard from "../components/ServiceCard";
import { AiFillSetting, AiFillStar } from "react-icons/ai";
import {
  FaRegCalendarDays,
  FaUserPlus,
  FaUsers,
  FaUsersLine,
} from "react-icons/fa6";
import { FaTools } from "react-icons/fa";
import { IoIosAlarm } from "react-icons/io";
import CountUp from "../components/CountUp";
import { BiUserCircle } from "react-icons/bi";
import Ariza from "../components/Ariza";


/* ================= ERROR ALERT ================= */
function ErrorAlert({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
      <div className="flex justify-between items-center gap-4">
        <span>{message}</span>
        <button clas onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
}

function Home() {
  const { language } = useLanguage();
  const [active, setActive] = useState(0);

  const translations = {
    uz: {
      faq: [
        {
          q: "Gilamni nimada yuvasizlar?",
          a: "Gilamlar Turkiya texnologiyasi asosidagi rotor apparatida yuviladi.",
        },
        {
          q: "Qanday quritasizlar?",
          a: "Sentrafuga apparati yordamida gilamlarning 95% gacha namligi siqib chiqariladi.",
        },
        {
          q: "Ishingizga kafolat bormi, yoqmasa-chi?",
          a: "Agar xizmatimiz sizga yoqsa — to‘lov qilasiz, yoqmasa — mutlaqo bepul.",
        },
        {
          q: "Qanday vositalardan foydalanasizlar?",
          a: "Gilam tolalariga zarar yetkazmaydigan, rangini saqlovchi va dog‘larni samarali ketkazuvchi professional, gipallergen vositalar hamda ERA 111 shampunlaridan foydalanamiz.",
        },
        {
          q: "Ko‘rpa va yostiqlarni qanday yuvasizlar?",
          a: "Maxsus apparatlarda yuvilib, siqiladi va quyosh nuri tushmaydigan issiq xonalarda quritilib, yumshoqligi tiklanadi.",
        },
      ],
      phone: "Telefon raqamingiz",
      faqTitle: "❓ Eng ko‘p beriladigan savollar",
    },
    ru: {
      faq: [
        {
          q: "Чем вы стираете ковры?",
          a: "Ковры стираются с использованием турецкого оборудования — роторных аппаратов.",
        },
        {
          q: "Как вы сушите ковры?",
          a: "С помощью центрифуги удаляется до 95% влаги из ковров.",
        },
        {
          q: "Есть ли гарантия, если не понравится?",
          a: "Если вам понравится — вы оплачиваете, если нет — услуга абсолютно бесплатна.",
        },
        {
          q: "Какие средства вы используете?",
          a: "Мы используем профессиональные гипоаллергенные средства и шампуни ERA 111, которые не повреждают волокна и сохраняют цвет ковра.",
        },
        {
          q: "Как вы стираете одеяла и подушки?",
          a: "Они стираются в специальных аппаратах, отжимаются и сушатся в теплых помещениях без прямого солнечного света для сохранения мягкости.",
        },
      ],
      phone: "Номер телефона",
      faqTitle: "❓ Часто задаваемые вопросы",
    },
  };

  const t = translations[language] || translations["uz"];
  /* ================= SLIDES ================= */
  const slides = [
    {
      imgDesktop:"/bg-zilol.jpg",
      alt: "Zilol gilam yuvish xizmati",
      imgMobile: "/bg-mbl1.webp",

      text1_uz: "Gilam yuvish!",
      text2_uz:
        "ERA 111 karpaks antibakterial,gipoallergen shampunlar bilan chuqur yuvish.",
      text3_uz: "O'zbekistondagi eng kota korxonalardan biri! ",

      text1_ru: "Премиальный экспресс-сервис!",
      text2_ru:
        "Глубокая стирка антибактериальным гипоаллергенным шампунем ERA 111.",
      text3_ru: "Сушка и доставка всего за 1 день!",
    },
    {
      imgDesktop:"/bg-zilol4.jpg",
      alt: "Zilol mebel yuvish xizmati",
      imgMobile: "/bg-mbl2.webp",


      text1_uz: "Mebel yuvish!",
      text2_uz:
        "Professional uskunalar va ekologik vositalar bilan mukammal xizmat.",
      text3_uz: "Atigi 1–2 soatda yangidek toza natija!",

      text1_ru: "Чистим мебель у вас дома!",
      text2_ru: "Профессиональное оборудование и экологичные шампуни.",
      text3_ru: "Результат как новый всего за 1–2 часа!",
    },
    {
      imgDesktop: "/bg-run.png",
      alt: "Zilol parda yuvish xizmati",
      imgMobile: "/bg-mbl3.webp",

      text1_uz: "VIP  Primum xizmat!",
      text2_uz: "Zamonaviy uskunalarda yuvish va tezkor quritish.",
      text3_uz: "1 kunda  24/7 yetkazib berish va kafolat!",

      text1_ru: "Профессиональная стирка штор!",
      text2_ru: "Современное оборудование и качественная сушка.",
      text3_ru: "Гарантия чистоты и приятного аромата!",
    },
  ];
  /* ================= ozif ================= */
  const testimonials = [
    {
      name: " Nurmatjon.",
      text: "Ассалому алайкум хайирли тонг барчага ювдирган гилам ,адёл ва юмшок уйинчогларимиз жуддаям тоза ва сифатли ювилибти  каттакон рахмат оллох рози булсин мехнатиларни рохатини курилар омадиларни берсин 🤲🤲🤲🤲",
      img: "/image/nurmatjon.webp",
      alt: "zilol gilam yuvish mijoz",
    },
    {
      name: "SHoxsanam.",
      text: "zor allohga shukur judayam yoqdi omadlarizni bersin robbim ilohim musofirda turib duo qildik raxmat yana bir bor",
      img: "/image/shoxsanam.webp",
      alt: "zilol gilam yuvish mijoz",
    },
    {
      name: "Barno.",
      text: "Ассалому алайкум. Рахмат Зилол гилам ювиш корхонасига. Гилам ва якандозларимни конглимдагидек килиб ювиб беришди. Хурсандман. Ишларинга ривож.",
      img: "/image/barno.webp",
      alt: "zilol gilam yuvish mijoz",
    },
    {
      name: "Гламур.",
      text: "Хайрли кеч!Сизларда гилам ва адёлларимни доим ювдираман.Сифатига гап йук.Аъло даражада👍.Куч-кувват берсин.Ишларингга омад! Ювдирмокчи булганларга тавсия киламан.",
      img: "/image/glamur.webp",
      alt: "zilol gilam yuvish mijoz",
    },
    {
      name: "Gulchexra B.",
      text: "Zilol hodimlari xalqни xizmatida  charchamelar  parda gilamlarim judayam chiroyli tozza yuvilipti raxamat ishlarizga rivoj",
      img: "/image/gulchexra.jpg",
      alt: "zilol gilam yuvish mijoz",
    },
    {
      name: "Margʻuba  A.",
      text: "Zilol xodimlari xodimlari xamelarga  kotta raxmat yakandozlar juda xam chiroyli yuvilibti xizmatilarga rozi boʻlinglar",
      img: "/image/marguba.jpg",
      alt: "zilol gilam yuvish mijoz",
    },
    {
      name: "Mahliyo G.",
      text: "Katta rahmat soĝ bolinglar. Shirin hidli , toza qilib yuvibsizlar. Mehnatlarizga rozi bolinglar. Korxonalarin bundanam katta bolib Allohim rivojini bersin. 🤲🤲Quvasoydan alangali salom. Gruppadagilar Zilol da hamma narsalariz zilol suvdek top-toza boladi😊TAVSIYA QILAMAN😊",
      img: "/image/mahliyo.webp",
      alt: "zilol gilam yuvish mijoz",
    },
    {
      name: "za.",
      text: "Assalom aleykum qizla yigitlar qilgan mehnatlarizga rozi boʻlilar rahmat kottakon koʻnglimdagidek tozza bitta dogʻ bitta soch tolasiyam qolmapti ishlaringga rivoj sogʻ boʻlila 👍👍👍",
      img: "/image/sah.webp",
      alt: "zilol gilam yuvish mijoz",
    },
    {
      name: "MUHAMMAD A.",
      text: "Yaxshimisizlar charchame ishlayabsilarmi issiqlarda rahmat gilamimizmi olib oldik judayam chiroyli qb yuvib beribsila😊",
      img: "/image/nigora.jpg",
      alt: "zilol gilam yuvish mijoz",
    },
    {
      name: "Шодия И.",
      text: "Assalomu aleykum, yaxshimisiz? 🙏 Gilamimiz juda chiroyli, oppoq toza  bolib qopti! 😍 Rahmat mehnatlaringizga, rozi bo'lasizlar! 🌟 Ishlaringa rivoj",
      img: "/image/umidjon.jpg",
      alt: "zilol gilam yuvish mijoz",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  /* ================= MODAL & FORM ================= */
  const formRef = useRef();
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowModal(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const sliderRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDown(false);
  const handleMouseUp = () => setIsDown(false);

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };
  const [phone, setPhone] = useState("");

  const BOT_TOKEN = "YOUR_BOT_TOKEN";
  const CHAT_ID = "YOUR_CHAT_ID";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = `📞 Yangi mijoz!\nTelefon: ${phone}`;

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

      alert("Yuborildi ✅");
      setPhone("");
    } catch (error) {
      alert("Xatolik ❌");
      console.error(error);
    }
  };

  /* ================= SERVICES ================= */
  const services = [
    {
      title: language === "ru" ? "Стирка ковров" : "Gilam yuvish",
      image: "/gilam.webp",
      alt: language === "ru" ? "Стирка ковров" : "Gilam yuvish",
      link: "/gilam",
      bgColor: "bg-blue-200",
    },

    {
      title: language === "ru" ? "Чистка мебели" : "Mebel yuvish",
      image: "/mebel.webp",
      alt: language === "ru" ? "Чистка мебели" : "Mebel yuvish",
      link: "/mebel",
      bgColor: "bg-blue-400",
    },

    {
      title: language === "ru" ? "Стирка штор" : "Parda yuvish",
      image: "/parda.webp",
      alt: language === "ru" ? "Стирка штор" : "Parda yuvish",
      link: "/parda",
      bgColor: "bg-indigo-600",
    },

    {
      title: language === "ru" ? "Стирка дорожек" : "Yakkandoz yuvish",
      image: "/yakandoz.webp",
      alt: language === "ru" ? "Стирка дорожек" : "Yakkandoz yuvish",
      link: "/yakkandoz",
      bgColor: "bg-blue-200",
    },

    {
      title: language === "ru" ? "Стирка одеял" : "Ko‘rpa yuvish",
      image: "/korpa1.png",
      alt: language === "ru" ? "Стирка одеял" : "Ko‘rpa yuvish",
      link: "/korpa",
      bgColor: "bg-blue-400",
    },

    {
      title: language === "ru" ? "Чистка матрасов" : "Matras yuvish",
      image: "/matras.png",
      alt: language === "ru" ? "Чистка матрасов" : "Matras yuvish",
      link: "/matras",
      bgColor: "bg-indigo-600",
    },

    {
      title: language === "ru" ? "Чистка на месте" : "Joyida Gilam yuvish",
      image: "/joyda.png",
      alt: language === "ru" ? "Чистка на месте" : "Joyida Gilam yuvish",
      link: "/kovrolin",
      bgColor: "bg-blue-200",
    },

    {
      title: language === "ru" ? "Чистка игрушек" : "O‘yinchoqlar yuvish",
      image: "/oyinchoqlar1.png",
      alt: language === "ru" ? "Чистка игрушек" : "O‘yinchoqlar yuvish",
      link: "/ofis",
      bgColor: "bg-blue-400",
    },

    {
      title: language === "ru" ? "Стирка подушек" : "Yostiqlar yuvish",
      image: "/yostiq.webp",
      alt: language === "ru" ? "Стирка подушек" : "Yostiqlar yuvish",
      link: "/antiseptik",
      bgColor: "bg-indigo-600",
    },

    {
      title: language === "ru" ? "Стирка авто чехлов" : "Avto chixol yuvish",
      image: "/avto.png",
      alt: language === "ru" ? "Стирка авто чехлов" : "Avto chixol yuvish",
      link: "/avto",
      bgColor: "bg-blue-200",
    },
  ];

  const [activeVideo, setActiveVideo] = useState(null);

  const videos = [
    {
      video: "/videos/gilam1.mp4",
      img: "/zilolclengi.webp",
      alt: "Zilol gilam yuvish xizmati",
    },
    {
      video: "/videos/gilam.mp4",
      img: "/zilolclengi.1.webp",
      alt: "Zilol gilam yuvish xizmati",
    },
    {
      video: "/videos/mebel.mp4",
      img: "/zilolclengi.2.webp",
      alt: "Zilol mebel yuvish xizmati",
    },
    {
      video: "/videos/yakandoz.mp4",
      img: "/zilolclengi.3.webp",
      alt: "Zilol yakandoz yuvish xizmati",
    },
  ];

  const texts = {
    uz: {
      why_title: "Nega aynan bizni tanlashadi?",
      why_desc:
        "Biz mijozlarimizga xuddi o‘zimizga xizmat ko‘rsatayotgandek yondashamiz. Ularning fikr-mulohazalarini qadrlaymiz va xizmat sifatini doimiy ravishda yaxshilaymiz.",

      best_solution: "Eng yaxshi tozalash yechimlari",
      specialists: "Malakali mutaxassislar",
      equipment: "Zamonaviy uskunalar",
      support: "24/7 qo‘llab-quvvatlash",

      best_solution1:
        "Biz har bir buyurtmaga mas’uliyat bilan yondashamiz va mijozlarimiz mamnunligi uchun sifatni birinchi o‘ringa qo‘yamiz.",
      specialists2:
        "Xodimlarimiz zamonaviy texnologiyalar bo‘yicha doimiy ravishda o‘qitiladi va yuqori standart asosida xizmat ko‘rsatadi.",
      equipment3:
        "Ekologik xavfsiz va samarali tozalash vositalaridan foydalanamiz, natijada mukammal tozalikka erishamiz.",
      support4:
        "Bizning call-markazimiz kecha-kunduz ishlaydi va tezkor javob beradi.",

      services: "Xizmatlar",
      services_desc:
        "Xonadoningizda poklik va qulaylikni ta’minlash uchun professional xizmatlar.",

      clients: "Mijozlar",
      experience: "Tajriba",
      services_count: "Xizmatlar",
      staff: "Malakali mutaxassislar",

      video_title: "Bizning haqiqiy",
      video_desc: "tozalash natijalarimizni ko‘ring",

      testimonials_title: "Mijozlarimiz biz haqimizda 💬",
      testimonials_desc: "1000+ mijozlar bizni tanladi va mamnun bo‘ldi",

      cta_title: "Bepul maslahat oling",
      cta_desc:
        "Telefon raqamingizni qoldiring — biz siz bilan tez orada bog‘lanamiz.",

      send: "Jo‘natish",

      trust1: "✔ Tez aloqa",
      trust2: "✔ 100% bepul",
      trust3: "✔ Ishonchli xizmat",
    },

    ru: {
      why_title: "Почему выбирают именно нас?",
      why_desc:
        "Мы относимся к клиентам как к себе. Ценим отзывы и постоянно улучшаем качество услуг.",

      best_solution: "Лучшие решения для чистки",
      specialists: "Квалифицированные специалисты",
      equipment: "Современное оборудование",
      support: "Поддержка 24/7",
      best_solution1:
        "Мы ответственно подходим к каждому заказу и ставим качество на первое место ради удовлетворения клиентов.",
      specialists2:
        "Наши сотрудники постоянно обучаются современным технологиям и работают по высоким стандартам.",
      equipment3:
        "Мы используем экологически безопасные и эффективные средства для чистки, достигая идеальной чистоты.",
      support4:
        "Наш call-центр работает круглосуточно и быстро отвечает на запросы.",

      services: "Услуги",
      services_desc: "Профессиональные услуги для чистоты и уюта в вашем доме.",

      clients: "Клиенты",
      experience: "Опыт",
      services_count: "Услуги",
      staff: "Квалифиц ированные специалисты",

      video_title: "Наши реальные",
      video_desc: "результаты чистки",

      testimonials_title: "Отзывы наших клиентов 💬",
      testimonials_desc: "Более 1000 клиентов остались довольны",

      cta_title: "Получите бесплатную консультацию",
      cta_desc: "Оставьте номер телефона — мы скоро с вами свяжемся.",

      send: "Отправить",

      trust1: "✔ Быстрая связь",
      trust2: "✔ 100% бесплатно",
      trust3: "✔ Надёжный сервис",
    },
  };

  const t2 = texts[language] || texts["uz"];

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

  return (
    <div className="pt-10 ">
      <ErrorAlert message={error} onClose={() => setError("")} />

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 ">
          {/* Modal box */}
          <div className="  max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl relative p-4">
            {/* ❌ Close button */}
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-black text-xl bg-gray-200 px-2 rounded hover:text-red-600"
            >
              ✕
            </button>

            {/* 🔥 BU YERGA ARIZA */}
            <Ariza />
          </div>
        </div>
      )}

      {/* ================= HERO SLIDER ================= */}
      <section className="relative w-full min-h-[90vh] overflow-hidden mt-7 sm:mt-10 md:mt-9">
        {slides.map((item, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === index ? "opacity-100 z-20" : "opacity-0 z-10"
            }`}
          >
            {/* Desktop */}
            <img
              src={item.imgDesktop}
             
              className="hidden lg:block w-full h-full object-cover"
              alt=" zilol gilam yuvish vedos img"
            />

            {/* Mobile */}
            <img
              src={item.imgMobile}
              className="block lg:hidden w-full h-full object-cover"
              alt=" zilol gilam yuvish vedos img"
            />

            <div className="absolute inset-0 bg-black/50"></div>

            <div className="absolute bottom-10 md:bottom-20 left-1/2 -translate-x-1/2 text-center text-white px-4 z-30 w-full max-w-3xl">
              <div className="absolute bottom-10 md:bottom-20 left-1/2 -translate-x-1/2 w-full px-4 z-30 flex justify-center">
                <div className="relative max-w-3xl w-full text-center text-white">
                  <div className="relative border-white/20 rounded-3xl p-6 md:p-10 text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3">
                      {item[`text1_${language}`]}
                    </h2>

                    <p className="text-lg sm:text-xl md:text-2xl">
                      {item[`text2_${language}`]}
                    </p>

                    <p className="text-base sm:text-lg md:text-xl mt-2 text-amber-300 font-semibold">
                      {item[`text3_${language}`]}
                    </p>
                  </div>
                </div>
              </div>
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

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
              {slides.map((_, dotIndex) => (
                <button
                  key={dotIndex}
                  onClick={() => setIndex(dotIndex)}
                  className={`w-3 h-3 rounded-full ${
                    dotIndex === index
                      ? "bg-yellow-400 scale-125"
                      : "bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </section>
      <section className="pb-20 pt-20  ">
        <div className="max-w-7xl mx-auto px-1">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className=" text-3xl md:text-4xl font-bold mb-4 ">
              {t2.why_title}
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-4"></div>
            <p className=" max-w-2xl mx-auto">{t2.why_desc}</p>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
            {/* Left Side */}
            <div className="space-y-8">
              <div className="flex  col-auto gap-4">
                <AiFillStar className=" text-1xl w-30 h-30 text-white   border-2 bg-yellow-400 hover:bg-black " />

                <div>
                  <h4 className="text-lg font-semibold mb-2 ">
                    {t2.best_solution}
                  </h4>
                  <p>{t2.best_solution1}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FaUsersLine className="text-white text-1xl w-30 h-30   border-2 bg-yellow-400  hover:bg-black" />
                <div>
                  <h4 className="text-lg font-semibold mb-2 ">
                    {t2.specialists}
                  </h4>
                  <p>{t2.specialists2}</p>
                </div>
              </div>
            </div>

            {/* Center Image */}
            <div className="">
              <img
                src="/bg-imgse.webp"
                alt=" zilol gilam yuvish service man img"
                className="rounded-xl w-110 h-auto  "
              />
            </div>

            {/* Right Side */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <FaTools className="text-white text-1xl w-21 h-28 p-2  border-2 bg-yellow-400  hover:bg-black" />
                <div>
                  <h4 className="text-lg font-semibold mb-2 ">
                    {t2.equipment}
                  </h4>
                  <p className="">{t2.equipment3}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <IoIosAlarm className="text-white w-15 h-29 p-2 border-2 bg-yellow-400 hover:bg-black " />
                <div>
                  <h4 className="text-lg font-semibold mb-2 ">{t2.support}</h4>
                  <p>{t2.support4}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 bg-[url('/bg-imgs.webp')] bg-cover bg-center bg-black/60 bg-blend-darken">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Card 1 */}
            <div
              className="group border-2 border-dashed border-amber-400 rounded-2xl 
      p-8 text-center hover:scale-105 transition duration-300 backdrop-blur-md"
            >
              <div className="flex justify-center mb-5">
                <div
                  className="w-16 h-16 flex items-center justify-center rounded-full
           bg-yellow-400/20 group-hover:bg-yellow-400 transition "
                >
                  <FaUsers className="text-yellow-400 group-hover:text-black w-8 h-8 transition" />
                </div>
              </div>

              <h3 className="text-white text-3xl font-bold mb-2">10000+</h3>

              <p className="text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                {t2.clients}
              </p>
            </div>

            {/* Card 2 */}
            <div
              className="group border-2 border-dashed border-amber-400 rounded-2xl p-8
       text-center hover:scale-105 transition duration-300"
            >
              <div className="flex justify-center mb-5">
                <div
                  className="w-16 h-16 flex items-center justify-center rounded-full
            bg-yellow-400/20 group-hover:bg-yellow-400 transition "
                >
                  <FaRegCalendarDays className="text-yellow-400 group-hover:text-black w-8 h-8 transition " />
                </div>
              </div>

              <h3 className="text-white text-4xl font-bold mb-2">
                <CountUp to={8} duration={2} separator="," />
                -yilk
              </h3>

              <p className="text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                {t2.experience}
              </p>
            </div>

            {/* Card 3 */}
            <div
              className="group border-2 border-dashed border-amber-400 rounded-2xl 
      p-8 text-center hover:scale-105 transition duration-300 backdrop-blur-md"
            >
              <div className="flex justify-center mb-5">
                <div
                  className="w-16 h-16 flex items-center justify-center rounded-full
            bg-yellow-400/20 group-hover:bg-yellow-400 transition "
                >
                  <AiFillSetting className="text-yellow-400 group-hover:text-black w-8 h-8 transition " />
                </div>
              </div>
              <h3 className="text-white text-4xl font-bold mb-2">
                <CountUp to={12} duration={2} separator="," />
                -xil
              </h3>

              <p className="text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                {t2.services_count}
              </p>
            </div>

            {/* Card 4 */}
            <div
              className="group border-2 border-dashed border-amber-400 rounded-2xl 
      p-8 text-center hover:scale-105 transition duration-300"
            >
              <div className="flex justify-center mb-5">
                <div
                  className="w-16 h-16 flex items-center justify-center rounded-full
            bg-yellow-400/20 group-hover:bg-yellow-400 transition "
                >
                  <BiUserCircle className="text-yellow-400 group-hover:text-black w-8 h-8 transition " />
                </div>
              </div>
              <h3 className="text-white text-4xl font-bold mb-2">
                <CountUp to={300} duration={2} separator="," />+
              </h3>

              <p className="text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                {t2.staff}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="services" className="  pt-10 pb-20">
        <h2
          className="mx-auto mb-10  flex items-center justify-center w-44 h-12 
bg-indigo-500 text-white font-bold text-lg rounded-xl 
border-b-4 border-amber-400 shadow-lg 
hover:bg-indigo-700 transition"
        >
          {t2.services}
        </h2>

        <h3 className="max-w-3xl mx-auto text-center  text-lg leading-relaxed mt-4 px-4 font-medium">
          {t2.services_desc}
        </h3>
        <div className="max-w-7xl mx-auto mt-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 px-4">
          {services.map((service, index) => {
            const colors = ["bg-blue-200", "bg-indigo-300", "bg-cyan-200"];

            return (
              <div
                key={index}
                className={`
          ${colors[index % 3]}
          opacity-0
          translate-y-10
          animate-[fadeUp_0.6s_ease_forwards]
          rounded-2xl
          
        `}
                style={{ animationDelay: `${index * 0.35}s` }}
              >
                <ServiceCard {...service} />
              </div>
            );
          })}
        </div>
      </section>

      <CarpetComparison />
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-center p-4">
          {t.faqTitle}
        </h2>
        <div className="w-full   flex items-center justify-center px-4 sm:px-6 lg:px-8 p-10">
          <div className="w-full max-w-6xl space-y-4 sm:space-y-5">
            {t.faq.map((item, i) => (
              <div
                key={i}
                onClick={() => setActive(i === active ? null : i)}
                className={`group relative rounded-xl sm:rounded-2xl transition duration-300 ${
                  active === i ? "bg-white" : "bg-white"
                } border border-gray-200 hover:border-indigo-400`}
              >
                {/* glow */}
                <div
                  className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 
        group-hover:opacity-100 transition duration-500 blur-lg bg-indigo-100"
                ></div>

                <div className="relative p-4 sm:p-5">
                  {/* HEADER */}
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-gray-800 text-sm sm:text-base md:text-lg font-semibold leading-snug">
                      {item.q}
                    </h3>

                    {/* ICON */}
                    <div
                      className={` w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center 
                rounded-full border transition duration-300 ${
                  active === i
                    ? "border-indigo-500 text-indigo-500 rotate-180"
                    : "border-gray-300 text-gray-400"
                }`}
                    >
                      ↓
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div
                    className={`transition-all duration-500 overflow-hidden ${
                      active === i
                        ? "max-h-40 sm:max-h-52 mt-3 sm:mt-4"
                        : "max-h-0"
                    }`}
                  >
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full  py-12 px-4 sm:px-6 lg:px-8 text-black dark:bg-white   ">
          {/* TITLE */}
          <div className="text-center  mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold ">
              {t2.video_title}
            </h2>
            <p className=" mt-2">{t2.video_desc}</p>
          </div>

          {/* GRID */}
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 ">
            {videos.map((item, i) => (
              <div
                key={i}
                onClick={() => setActiveVideo(item.video)}
                className="relative cursor-pointer rounded-2xl overflow-hidden group shadow-md"
              >
                {/* IMAGE */}
                <img
                  src={item.img}
                  alt="zilol gilam yuvish video thumbnail"
                  className="w-full aspect-9  group-hover:scale-105 transition duration-300"
                />

                {/* PLAY ICON */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="bg-black/50 w-12 h-12 rounded-full flex 
              items-center justify-center text-white text-xl backdrop-blur-sm group-hover:scale-110 transition"
                  >
                    ▶
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* MODAL */}
          {activeVideo && (
            <div
              onClick={() => setActiveVideo(null)}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            >
              <div
                className="relative w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <video
                  src={activeVideo}
                  controls
                  autoPlay
                  className="w-full rounded-xl"
                />

                {/* CLOSE */}
                <button
                  onClick={() => setActiveVideo(null)}
                  className="absolute -top-10 right-0 text-white text-2xl"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>
        <section className="py-20 ">
          <div className="max-w-7xl mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-5xl font-bold ">
                {t2.testimonials_title}
              </h2>
              <p className=" mt-3">{t2.testimonials_desc}</p>
            </div>

            {/* Slider */}
            <div
              ref={sliderRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className="flex gap-6 overflow-x-auto cursor-grab active:cursor-grabbing select-none scrollbar-hide"
            >
              {testimonials.map((item, i) => (
                <div
                  key={i}
                  className="min-w-70 max-w-70 bg-black p-6 rounded-2xl shadow-md hover:shadow-2xl transition duration-300"
                >
                  {/* User */}
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-green-400"
                    />
                    <div>
                      <h3 className="font-semibold text-white">{item.name}</h3>
                      <span className="text-xs text-green-500">
                        ✔ mijozimiz
                      </span>
                    </div>
                  </div>

                  {/* Text */}
                  <p className=" text-sm leading-relaxed text-white">
                    “{item.text}”
                  </p>

                  {/* Stars */}
                  <div className="mt-4 flex gap-1 text-yellow-400">
                    {Array(5)
                      .fill()
                      .map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="relative py-1  overflow-hidden">
          {/* Background blur effect */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-amber-400/20 blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full"></div>

          <div className="relative max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-14 items-center">
              {/* IMAGE */}
              <div data-aos="fade-up" className="relative flex justify-center">
                <div className="absolute inset-0  to-transparent rounded-3xl blur-2xl"></div>

                <img
                  src="/bg-img2.webp"
                  alt="zilol gilam yuvish cta image"
                  className="relative w-full max-w-md rounded-3xl  hover:scale-105 transition duration-500"
                />
              </div>

              {/* CONTENT */}
              <div data-aos="fade-left">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                  {t2.cta_title}
                </h2>

                <p className=" text-lg mb-10 leading-relaxed">{t2.cta_desc}</p>

                {/* FORM */}
                <form className="general__form" onSubmit={handleSubmit}>
                  <div
                    className="flex flex-col sm:flex-row gap-4 bg-white/10 backdrop-blur-xl 
              p-4 rounded-2xl border border-white/20 shadow-lg"
                  >
                    {/* Phone */}
                    <input
                      type="tel"
                      name="phone"
                      value={phone}
                      onChange={handleChange}
                      placeholder={t.phone}
                      required
                      className="flex-1 bg-transparent px-4 py-3 rounded-xl outline-none "
                    />

                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-500
                   text-black font-bold shadow-lg transition duration-300 hover:scale-105 active:scale-95"
                    >
                      {t2.send}
                    </button>
                  </div>
                </form>

                {/* TRUST BADGES */}
                <div className="flex gap-6 mt-8 text-sm ">
                  <span>{t2.trust1}</span>
                  <span>{t2.trust2}</span>
                  <span>{t2.trust3}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
