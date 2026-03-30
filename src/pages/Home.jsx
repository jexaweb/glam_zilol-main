import { useState, useEffect, useRef } from "react";

import CarpetComparison from "../components/CarpetComparison";
import PhoneInput from "../components/PhoneInput";
import { useLanguage } from "../components/LanguageContext";
import ServiceCard from "../components/ServiceCard";
import { AiFillSetting, AiFillStar } from "react-icons/ai";
import { FaRegCalendarDays, FaUserPlus, FaUsers, FaUsersLine } from "react-icons/fa6";
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
        <button clas onClick={onClose}>✕</button>
      </div>
    </div>
  );
}



function Home() {
  const { language } = useLanguage();
   const [active, setActive] = useState(0);
  /* ================= faq-data ================= */
     const data = [
    {
      q: "How do I create an account?",
      a: "Click the Sign Up button and follow the registration process."
    },
    {
      q: "I forgot my password. What should I do?",
      a: "Use the Forgot Password option and follow the steps sent to your email."
    },
    {
      q: "How do I update my profile?",
      a: "Go to account settings and edit your profile information."
    },
      {
      q: "How do I update my profile?",
      a: "Go to account settings and edit your profile information."
    },  {
      q: "How do I update my profile?",
      a: "Go to account settings and edit your profile information."
    }
  ];


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
      text3_uz: "Atigi 1  2 soatda yangidek natija!",

      text1_ru: "Чистим мебель у вас дома!",
      text2_ru:
        "Профессиональное оборудование и экологичные шампуни.",
      text3_ru: "Результат как новый всего за 1–2 часа!",
    },
    {
      imgDesktop:
        "https://biryusa.ru/up/opti/resizetmp/2520_3000_1/27d166727599573d9fa491436e510f7b/SM2_3.jpg",
      imgMobile:
        "https://images.unsplash.com/photo-1616627452395-3a6c02b6a5b2?q=80&w=800",

      text1_uz: "Pardalarni mukammal yuvish xizmati!",
      text2_uz:
        "Zamonaviy uskunalarda yuvish va professional quritish.",
      text3_uz: "Tozalik va xushbo‘y nafislik kafolati!",

      text1_ru: "Профессиональная стирка штор!",
      text2_ru:
        "Современное оборудование и качественная сушка.",
      text3_ru: "Гарантия чистоты и приятного аромата!",
    },
  ];
  /* ================= ozif ================= */
const testimonials = [
  {
    name: "Nurmatjon.",
    text: "Ассалому алайкум хайирли тонг барчага ювдирган гилам ,адёл ва юмшок уйинчогларимиз жуддаям тоза ва сифатли ювилибти  каттакон рахмат оллох рози булсин мехнатиларни рохатини курилар омадиларни берсин 🤲🤲🤲🤲",
    img: "/image/nurmatjon.jpg",
  },
  {
    name: "SHoxsanam.",
    text: "zor allohga shukur judayam yoqdi omadlarizni bersin robbim ilohim musofirda turib duo qildik raxmat yana bir bor",
    img: "/image/shoxsanam.jpg",
  },
  {
    name: "Barno.",
    text: "Ассалому алайкум. Рахмат Зилол гилам ювиш корхонасига. Гилам ва якандозларимни конглимдагидек килиб ювиб беришди. Хурсандман. Ишларинга ривож.",
    img: "/image/barno.jpg",
  },
  {
    name: "Гламур.",
    text: "Хайрли кеч!Сизларда гилам ва адёлларимни доим ювдираман.Сифатига гап йук.Аъло даражада👍.Куч-кувват берсин.Ишларингга омад! Ювдирмокчи булганларга тавсия киламан.",
    img: "/image/glamur.jpg",
  },
  {
    name: "Gulchexra B.",
    text: "Zilol hodimlari xalqни xizmatida  charchamelar  parda gilamlarim judayam chiroyli tozza yuvilipti raxamat ishlarizga rivoj",
    img: "/image/gulchexra.jpg",
  },
  {
    name: "Margʻuba  A.",
    text: "Zilol xodimlari xodimlari xamelarga  kotta raxmat yakandozlar juda xam chiroyli yuvilibti xizmatilarga rozi boʻlinglar",
    img: "/image/marguba.jpg",
  },
  {
    name: "Mahliyo G.",
    text: "Katta rahmat soĝ bolinglar. Shirin hidli , toza qilib yuvibsizlar. Mehnatlarizga rozi bolinglar. Korxonalarin bundanam katta bolib Allohim rivojini bersin. 🤲🤲Quvasoydan alangali salom. Gruppadagilar Zilol da hamma narsalariz zilol suvdek top-toza boladi😊TAVSIYA QILAMAN😊",
    img: "/image/mahliyo.jpg",
  },
  {
    name: "Shahzod E.",
    text: "Operatorlar juda muloyim, xizmat ham tez.",
    img: "https://i.pravatar.cc/100?img=8",
  },
  {
    name: "Nigora B.",
    text: "Oldingi rangiga qaytibdi, juda hayron qoldim!",
    img: "https://i.pravatar.cc/100?img=9",
  },
  {
    name: "Umidjon P.",
    text: "Professional darajada ishlashadi, gap yo‘q 👍",
    img: "https://i.pravatar.cc/100?img=10",
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

  /* ================= SERVICES ================= */
const services = [
  { 
    title: language === "ru" ? "Стирка ковров" : "Gilam yuvish",
    image: "/gilam.png",
    link: "/gilam",
    bgColor: "bg-blue-200"
  },

  { 
    title: language === "ru" ? "Чистка мебели" : "Mebel yuvish",
    image: "/mebel.png",
    link: "/mebel1",
    bgColor: "bg-blue-400"
  },

  { 
    title: language === "ru" ? "Стирка штор" : "Parda yuvish",
    image: "/parda.png",
    link: "/parda",
     bgColor: "bg-indigo-600",
  },

  { 
    title: language === "ru" ? "Стирка дорожек" : "Yakkandoz yuvish",
    image: "/yakandoz.png",
    link: "/yakkandoz",
    bgColor: "bg-blue-200",
  },

  { 
    title: language === "ru" ? "Стирка одеял" : "Ko‘rpa yuvish",
    image: "/korpa1.png",
    link: "/korpa",
    bgColor: "bg-blue-400",
  },

  { 
    title: language === "ru" ? "Чистка матрасов" : "Matras yuvish",
    image: "/matras.png",
    link: "/matras",
      bgColor: "bg-indigo-600",
  },

  { 
    title: language === "ru" ? "Чистка на месте" : "Joyida yuvish",
    image: "/joyda.png",
    link: "/kovrolin",
    bgColor: "bg-blue-200"
  },

  { 
    title: language === "ru" ? "Чистка игрушек" : "O‘yinchoqlar yuvish",
    image: "/oyinchoqlar1.png",
    link: "/ofis",
    bgColor: "bg-blue-400"
  },

  { 
    title: language === "ru" ? "Стирка подушек" : "Yostiqlar yuvish",
    image: "/yostiq.png",
    link: "/antiseptik",
    bgColor: "bg-indigo-600"
  },

  { 
    title: language === "ru" ? "Стирка авто чехлов" : "Avto chixol yuvish",
    image: "/avto.png",
    link: "/avto",
    bgColor: "bg-blue-200"
  }
];


const [activeVideo, setActiveVideo] = useState(null);

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
              alt=""
            />

            {/* Mobile */}
            <img
              src={item.imgMobile}
              className="block lg:hidden w-full h-full object-cover"
              alt=""
            />

            <div className="absolute inset-0 bg-black/50"></div>

            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center text-white px-4 z-30">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
                {item[`text1_${language}`]}
              </h2>
              <p className="text-lg md:text-2xl">
                {item[`text2_${language}`]}
              </p>
              <p className="text-lg md:text-xl mt-2">
                {item[`text3_${language}`]}
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
         Nega aynan bizni tanlashadi?
      </h2>
       <div className="w-24 h-1 bg-yellow-400 mx-auto mb-4"></div>
      <p className=" max-w-2xl mx-auto">
        Biz mijozlarimizga xuddi o‘zimizga xizmat ko‘rsatayotgandek yondashamiz.
        Ularning fikr-mulohazalarini qadrlaymiz va xizmat sifatini doimiy ravishda yaxshilaymiz.
      </p>
    </div>

    {/* Content */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">

      {/* Left Side */}
      <div className="space-y-8">
        <div className="flex  col-auto gap-4">
    
          <AiFillStar  className=" text-1xl w-30 h-30   border-2 bg-yellow-400 hover:bg-black " />

          <div>
            <h4 className="text-lg font-semibold mb-2 ">
                  Eng yaxshi tozalash yechimlari
            </h4>
            <p >
            Biz har bir buyurtmaga mas’uliyat bilan yondashamiz va mijozlarimiz
            mamnunligi uchun sifatni birinchi o‘ringa qo‘yamiz.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
         <FaUsersLine className="text-white text-1xl w-30 h-30   border-2 bg-yellow-400  hover:bg-black" />
          <div>
            <h4 className="text-lg font-semibold mb-2 ">
                Malakali mutaxassislar
            </h4>
            <p >
                   Xodimlarimiz zamonaviy texnologiyalar bo‘yicha doimiy ravishda
            o‘qitiladi va yuqori standart asosida xizmat ko‘rsatadi.
            </p>
          </div>
        </div>
      </div>

      {/* Center Image */}
      <div className="">
        <img
          src="/bg-imgse.jpg"
          alt="Service Man"
          className="rounded-xl w-110 h-110  "
        />
      </div>

      {/* Right Side */}
      <div className="space-y-8">
        <div className="flex items-start gap-4">
         <FaTools className="text-white text-1xl w-21 h-28 p-2  border-2 bg-yellow-400  hover:bg-black" />
          <div>
            <h4 className="text-lg font-semibold mb-2 ">
              Zamonaviy uskunalar
            </h4>
            <p className="">
                        Ekologik xavfsiz va samarali tozalash vositalaridan foydalanamiz,
            natijada mukammal tozalikka erishamiz.

            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
      <IoIosAlarm className="text-white w-15 h-29 p-2 border-2 bg-yellow-400 hover:bg-black " />
          <div>
            <h4 className="text-lg font-semibold mb-2 ">
            24/7 qo‘llab-quvvatlash
            </h4>
            <p >
             Bizning call-markazimiz kecha-kunduz ishlaydi va tezkor javob beradi.
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>


<section className="px-5 py-24 bg-[url('/bg-imgs.jpg')] bg-cover bg-center bg-black/60 bg-blend-darken">
  <div className="max-w-7xl mx-auto">

    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10">

      {/* Card 1 */}
      <div className="group border-2 border-dashed border-amber-400 rounded-2xl p-8 text-center hover:scale-105 transition duration-300 backdrop-blur-md">
        
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-400/20 group-hover:bg-yellow-400 transition ">
            <FaUsers className="text-yellow-400 group-hover:text-black w-8 h-8 transition"/>
          </div>
        </div>

        <h3 className="text-white text-3xl font-bold mb-2">
          10000+
        </h3>

       <p className="text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
  Mijozlar
</p>
      </div>

      {/* Card 2 */}
      <div className="group border-2 border-dashed border-amber-400 rounded-2xl p-8 text-center hover:scale-105 transition duration-300">
         <div className="flex justify-center mb-5">
           <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-400/20 group-hover:bg-yellow-400 transition ">
         <FaRegCalendarDays className="text-yellow-400 group-hover:text-black w-8 h-8 transition "  />
          </div>
          </div>
       
        <h3 className="text-white text-4xl font-bold mb-2">
          <CountUp to={8} duration={2} separator="," />-yilk
        </h3>

        <p className="text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          Tajriba
        </p>
      </div>

      {/* Card 3 */}
      <div className="group border-2 border-dashed border-amber-400 rounded-2xl p-8 text-center hover:scale-105 transition duration-300 backdrop-blur-md">
          <div className="flex justify-center mb-5">
           <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-400/20 group-hover:bg-yellow-400 transition ">
         <AiFillSetting className="text-yellow-400 group-hover:text-black w-8 h-8 transition "  />
          </div>
          </div>
        <h3 className="text-white text-4xl font-bold mb-2">
          <CountUp to={12} duration={2} separator="," />-xil
        </h3>

        <p className="text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          Xizmatlar
        </p>
      </div>

      {/* Card 4 */}
      <div className="group border-2 border-dashed border-amber-400 rounded-2xl p-8 text-center hover:scale-105 transition duration-300">
            <div className="flex justify-center mb-5">
           <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-400/20 group-hover:bg-yellow-400 transition ">
         <BiUserCircle className="text-yellow-400 group-hover:text-black w-8 h-8 transition "  />
          </div>
          </div>
        <h3 className="text-white text-4xl font-bold mb-2">
          <CountUp to={300} duration={2} separator="," />+
        </h3>

        <p className="text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
           Malakali mutaxassislar
        </p>
      </div>

    </div>

  </div>
</section>

      {/* ================= SERVICES ================= */}
<section id="services"  className="  pt-10 pb-20">
 <h2 className="mx-auto mb-10  flex items-center justify-center w-44 h-12 
bg-indigo-500 text-white font-bold text-lg rounded-xl 
border-b-4 border-amber-400 shadow-lg 
hover:bg-indigo-700 transition">
  Xizmatlar
</h2>

<h3 className="max-w-3xl mx-auto text-center  text-lg leading-relaxed mt-4 px-4 font-medium">
  Xonadoningizda <span className="text-indigo-600 font-semibold">poklik</span>  
      va <span className="text-amber-500 font-semibold">qulaylik</span> ni ta’minlash uchun 
  tajribali jamoamiz tomonidan professional xizmatlar ko‘rsatamiz.
</h3>
<div className="max-w-7xl mx-auto mt-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 px-4">

  {services.map((service, index) => {
    const colors = [
      "bg-blue-200",
      "bg-indigo-300",
      "bg-cyan-200"
    ];

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
 
      <CarpetComparison  />
<div>
  <h2 className=" text-3xl p-3  text-center">bizdan   doyimi so'yardigan  sovolar</h2>
<div className="w-full   flex items-center justify-center px-4 sm:px-6 lg:px-8 p-10">

  <div className="w-full max-w-6xl space-y-4 sm:space-y-5">

    {data.map((item, i) => (
      <div
        key={i}
        onClick={() => setActive(i === active ? null : i)}
        className={`group relative rounded-xl sm:rounded-2xl transition duration-300 ${
          active === i
            ? "bg-white"
            : "bg-white"
        } border border-gray-200 hover:border-indigo-400`}
      >

        {/* glow */}
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-lg bg-indigo-100"></div>

        <div className="relative p-4 sm:p-5">

          {/* HEADER */}
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-gray-800 text-sm sm:text-base md:text-lg font-semibold leading-snug">
              {item.q}
            </h3>

            {/* ICON */}
            <div
              className={` w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border transition duration-300 ${
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
              active === i ? "max-h-40 sm:max-h-52 mt-3 sm:mt-4" : "max-h-0"
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
          Bizning haqiqiy 
        </h2>
        <p className=" mt-2">
       tozalash natijalarimizni ko‘ring
        </p>
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
              className="w-full aspect-9  group-hover:scale-105 transition duration-300"
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
            Mijozlarimiz biz haqimizda 💬
          </h2>
          <p className=" mt-3">
            1000+ mijozlar bizni tanladi va mamnun bo‘ldi
          </p>
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
              className="min-w-[280px] max-w-[280px] bg-black p-6 rounded-2xl shadow-md hover:shadow-2xl transition duration-300"
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
</div>
    </div>
    
  );
}

export default Home;
