import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function LoaderWrapper({ children }) {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-white to-amber-50 z-50">
        <div className="loader-wrapper">
          <div className="loader"></div>

          <img src="/logo1.png" className="w-40 z-10" />

          {"Zilol Gilam Yuvish".split("").map((char, i) => (
            <span key={i} className="loader-letter">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return children;
}