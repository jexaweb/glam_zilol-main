import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToSection from "../components/ScrollToSection";
import ScrollToTop from "../components/ScrollToTop";
import { useEffect, useState } from "react";

function MainLayouts() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <ScrollToSection />

      {/* 🔥 LOADER (tashqarida bo‘lishi kerak) */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-white to-amber-50 z-[9999]">
          <div className="loader-wrapper flex flex-col items-center justify-center">

            <div className="loader"></div>

            <img
              src="/logo1.png"
              alt="zilol gilam yuvish loader logo "
              className="w-[140px] sm:w-[180px] md:w-[220px] object-contain z-10"
            />

            <div className="mt-6 text-[30px] sm:text-[38px] md:text-[42px] flex flex-wrap justify-center">
              {"Zilol Gilam Yuvish".split("").map((char, i) => (
                <span key={i} className="loader-letter">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>

          </div>
        </div>
      )}

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default MainLayouts;