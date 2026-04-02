import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToSection from "../components/ScrollToSection";
import ScrollToTop from "../components/ScrollToTop";

function MainLayouts() {
  return (
    <>
    <ScrollToTop/>
      <Navbar />
      <ScrollToSection/>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayouts;
