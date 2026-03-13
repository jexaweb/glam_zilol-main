import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
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
        setShowModal(false);
      })
      .catch(() => setError("Xatolik yuz berdi"))
      .finally(() => setLoading(false));
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
    bgColor: "bg-blue-200"
  },

  { 
    title: language === "ru" ? "Стирка штор" : "Parda yuvish",
    image: "/parda.png",
    link: "/parda",
     bgColor: "bg-blue-200",
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
    bgColor: "bg-blue-200",
  },

  { 
    title: language === "ru" ? "Чистка матрасов" : "Matras yuvish",
    image: "/matras.png",
    link: "/matras",
      bgColor: "bg-blue-200",
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
    bgColor: "bg-blue-200"
  },

  { 
    title: language === "ru" ? "Стирка подушек" : "Yostiqlar yuvish",
    image: "/yostiq.png",
    link: "/antiseptik",
    bgColor: "bg-blue-200"
  },

  { 
    title: language === "ru" ? "Стирка авто чехлов" : "Avto chixol yuvish",
    image: "/avto.png",
    link: "/avto",
    bgColor: "bg-blue-200"
  }
];

  return (
    <div className="pt-10">

      <ErrorAlert message={error} onClose={() => setError("")} />

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 ">
          <form
            ref={formRef}
            onSubmit={sendEmail}
            className="bg-white rounded-2xl p-6 w-80 shadow-2xl text-center"
          > 
            <button
              type="button"
              onClick={() => setShowModal(false)}
            className="absolute ml-25 top-30  text-gray-500 hover:text-pink-700 bg-amber-50 text-2xl"


            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">
              Birinchi buyurtma uchun chegirma
            </h2>

            <input
              type="text"
              name="name"
              placeholder="Ismingiz"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full mb-3 px-4 py-2 border rounded-lg"
            />

            <PhoneInput
              value={formData.phone}
              onChange={(val) =>
                setFormData({ ...formData, phone: val })
              }
              name="phone"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4"
            >
              {loading ? "Yuborilmoqda..." : "Yuborish"}
            </button>
          </form>
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
<section className="pb-20 pt-20 bg-white bg-[url('/bg3.jpg')] bg-no-repeat bg-right bg-cover">
  <div className="max-w-7xl mx-auto px-1">

    {/* Title */}
    <div className="text-center mb-12">
     
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
         Nega aynan bizni tanlashadi?
      </h2>
       <div className="w-24 h-1 bg-yellow-400 mx-auto mb-4"></div>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Biz mijozlarimizga xuddi o‘zimizga xizmat ko‘rsatayotgandek yondashamiz.
        Ularning fikr-mulohazalarini qadrlaymiz va xizmat sifatini doimiy ravishda yaxshilaymiz.
      </p>
    </div>

    {/* Content */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">

      {/* Left Side */}
      <div className="space-y-8">
        <div className="flex  col-auto gap-4">
    
          <AiFillStar  className="text-white text-1xl w-30 h-30   border-2 bg-yellow-400 hover:bg-black " />

          <div>
            <h4 className="text-lg font-semibold mb-2">
                  Eng yaxshi tozalash yechimlari
            </h4>
            <p className="text-gray-600">
            Biz har bir buyurtmaga mas’uliyat bilan yondashamiz va mijozlarimiz
            mamnunligi uchun sifatni birinchi o‘ringa qo‘yamiz.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
         <FaUsersLine className="text-white text-1xl w-30 h-30   border-2 bg-yellow-400  hover:bg-black" />
          <div>
            <h4 className="text-lg font-semibold mb-2">
                Malakali mutaxassislar
            </h4>
            <p className="text-gray-600">
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
            <h4 className="text-lg font-semibold mb-2">
              Zamonaviy uskunalar
            </h4>
            <p className="text-gray-600">
                        Ekologik xavfsiz va samarali tozalash vositalaridan foydalanamiz,
            natijada mukammal tozalikka erishamiz.

            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
      <IoIosAlarm className="text-white w-15 h-29 p-2 bg-yellow-400 hover:bg-black " />
          <div>
            <h4 className="text-lg font-semibold mb-2">
            24/7 qo‘llab-quvvatlash
            </h4>
            <p className="text-gray-600">
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

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

      {/* Card 1 */}
      <div className="group border-2 border-dashed border-amber-400 rounded-2xl p-8 text-center hover:scale-105 transition duration-300 backdrop-blur-md">
        
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-400/20 group-hover:bg-yellow-400 transition ">
            <FaUsers className="text-yellow-400 group-hover:text-black w-8 h-8 transition"/>
          </div>
        </div>

        <h3 className="text-white text-4xl font-bold mb-2">
          <CountUp to={10000} duration={2} separator="," />+
        </h3>

        <p className="text-gray-300 text-3xl">
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

        <p className="text-gray-300 text-4xl">
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

        <p className="text-gray-300 text-4xl">
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

        <p className="text-gray-300 text-4xl">
           Malakali mutaxassislar
        </p>
      </div>

    </div>

  </div>
</section>

      {/* ================= SERVICES ================= */}
<section className=" bg-[url('/bg3.jpg')] bg-no-repeat bg-right bg-cover pt-10 pb-10">
 <h2 className="mx-auto mb-10  flex items-center justify-center w-44 h-12 
bg-indigo-500 text-white font-bold text-lg rounded-xl 
border-b-4 border-amber-400 shadow-lg 
hover:bg-indigo-700 transition">
  Xizmatlar
</h2> 
<h3 className="max-w-3xl mx-auto text-center text-gray-700 text-lg leading-relaxed mt-4 px-4 font-medium">
  Xonadoningizda <span className="text-indigo-600 font-semibold">poklik</span>  
      va <span className="text-amber-500 font-semibold">qulaylik</span> ni ta’minlash uchun 
  tajribali jamoamiz tomonidan professional xizmatlar ko‘rsatamiz.
</h3>
<div className="grid p-6 pt-20 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

  {services.map((service, index) => (
    <ServiceCard key={index} {...service} />
  ))}
</div></section>

      <CarpetComparison />

    </div>
  );
}

export default Home;
