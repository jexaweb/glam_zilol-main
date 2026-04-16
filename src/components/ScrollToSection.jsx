import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ScrollToSection() {
  const { hash, pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);

      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });

          // 🔥 HASHNI TOZALAYDI
          setTimeout(() => {
            navigate(pathname, { replace: true });
          }, 500);
        }, 100);
      }
    }
  }, [hash, pathname, navigate]);

  return null;
}

export default ScrollToSection;
