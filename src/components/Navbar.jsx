import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "./LanguageContext";
import MobileFab from "./MobileFab";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const mobileMenuRef = useRef(null);
  const { language, toggleLanguage } = useLanguage();

  const translations = {
    uz: {
      home: "Asosiy",
      about: "Biz haqimizda",
      services: "Xizmatlar",
      news: "Yangiliklar",
      contact: "Aloqa",
      switch: "UZ",
    },
    ru: {
      home: "Главная",
      about: "О нас",
      services: "Услуги",
      news: "Новости",
      contact: "Контакты",
      switch: "RU",
    },
  };

  const t = translations[language] || translations.uz;

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isSticky
            ? "bg-white/90 backdrop-blur-md shadow-xl"
            : "bg-white backdrop-blur-md"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">

          {/* Logo Desktop */}
          <Link to="/" className="hidden md:block">
            <img
              src="/logo.jpg"
              alt="ZILOL logo"
              className="w-36 transition-transform duration-300 hover:scale-105"
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-1 uppercase font-semibold text-gray-800">
            {[t.home, t.about, t.services, t.news, t.contact].map(
              (label, i) => (
                <Link
                  key={i}
                  to={["/", "/about", "/services", "/news", "/contact"][i]}
                  className="relative px-4 py-2 rounded-full bg-white/70 hover:bg-amber-400/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  {label}
                </Link>
              )
            )}

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 hover:bg-amber-400/20 transition"
            >
              <img
                src={language === "uz" ? "/uzb.jpg" : "/ru.jpg"}
                alt="lang"
                className="w-5 h-5 rounded-full"
              />
              {t.switch}
            </button>

            <Link
              to="/ariza"
              className="bg-amber-500 text-white px-5 py-2 rounded-full shadow-lg hover:shadow-amber-400/50 hover:-translate-y-1 transition-all duration-300"
            >
              Bururtma qoldirish
            </Link>
          </nav>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full bg-white/70 hover:bg-amber-400/30 transition"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <button
              onClick={() => {
                toggleLanguage();
                setIsOpen(false);
              }}
              className="text-sm font-semibold px-3 py-1 rounded-full bg-white/70 hover:bg-amber-400/30 transition"
            >
              {t.switch}
            </button>
          </div>

          {/* Logo Mobile */}
          <Link to="/" className="md:hidden mx-auto">
            <img
              src="/logo.jpg"
              alt="ZILOL logo"
              className="w-28 transition-transform duration-300 hover:scale-105"
            />
          </Link>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 left-0 h-full w-72 z-[9999] transform transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white/95 backdrop-blur-xl shadow-2xl`}
      >
        <ul className="mt-24 px-8 space-y-6 uppercase font-semibold text-gray-800">
          {[t.home, t.about, t.services, t.news, t.contact].map((label, i) => (
            <Link
              key={i}
              to={["/", "/about", "/services", "/news", "/contact"][i]}
              onClick={() => setIsOpen(false)}
              className="block text-lg hover:text-amber-500 transition-all duration-300 hover:translate-x-2"
            >
              {label}
            </Link>
          ))}
        </ul>
      </div>

      <MobileFab />
    </>
  );
}