import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToSection from "../components/ScrollToSection";

function MainLayouts() {
  return (
    <>
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
