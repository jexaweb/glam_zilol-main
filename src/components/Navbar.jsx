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

  // Sticky navbar
  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  // Click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isSticky ? "bg-white/95 shadow-md backdrop-blur" : "bg-stone-600/50"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 ">
          {/* Logo (desktop) */}
          <Link to="/" className="hidden md:block">
            <img
              src="/logo.jpg"
              alt="ZILOL logo"
              className="w-36 h-auto object-contain"
            />
          </Link>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center gap-8 uppercase font-medium text-gray-700">
            {[t.home, t.about, t.services, t.news, t.contact].map(
              (label, i) => (
                <Link
                  key={i}
                  to={["/", "/about", "/services", "/news", "/contact"][i]}
                  className="hover:text-amber-500 transition text-1xl"
                >
                  {label}
                </Link>
              )
            )}

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 hover:text-amber-500"
            >
              <img
                src={language === "uz" ? "/uzb.jpg" : "/ru.jpg"}
                alt="lang"
                className="w-5 h-5"
              />
              {t.switch}
            </button>
          </nav>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full hover:bg-amber-400"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <button
              onClick={() => {
                toggleLanguage();
                setIsOpen(false);
              }}
              className="text-sm font-semibold px-3 py-1 rounded-full hover:bg-amber-400 transition"
            >
              {t.switch}
            </button>
          </div>

          {/* Logo (mobile) */}
          <Link to="/" className="md:hidden mx-auto">
            <img
              src="/logo.jpg"
              alt="ZILOL logo"
              className="w-28 h-auto object-contain"
            />
          </Link>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 left-0 h-full w-64 z-[9999] transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          backgroundImage: "url('/bg-mobil2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <ul className="mt-24 px-6 space-y-6 uppercase font-medium text-gray-800">
          {[t.home, t.about, t.services, t.news, t.contact].map((label, i) => (
            <Link
              key={i}
              to={["/", "/about", "/services", "/news", "/contact"][i]}
              onClick={() => setIsOpen(false)}
              className="block text-lg hover:text-purple-700"
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
