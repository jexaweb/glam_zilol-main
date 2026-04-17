import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayouts from "./layouts/MainLayouts";
import Home from "./pages/Home";
import About from "./pages/About";


import { LanguageProvider } from "./components/LanguageContext";

// Xizmat sahifalari
import Gilam from "./pages/services/Gilam";
import Parda from "./pages/services/Parda";
import Korpa from "./pages/services/Korpa";
import Yakkandoz from "./pages/services/Yakkandoz";
import Mebel from "./pages/services/Mebel";
import Matras from "./pages/services/Matras";
import Kovrolin from "./pages/services/Kovrolin";
import Ofis from "./pages/services/Ofis";
import Antiseptik from "./pages/services/Antiseptik";
import Avto from "./pages/services/Avto";

import Services from "./components/Services";



function App() {
  const [loading, setLoading] = useState(true);

  // Router
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayouts />,
      errorElement: <div>Marshrut xatosi</div>,
      children: [
        { index: true, element: <Home /> },

        { path: "gilam", element: <Gilam /> },
        { path: "parda", element: <Parda /> },
        { path: "korpa", element: <Korpa /> },
        { path: "yakkandoz", element: <Yakkandoz /> },
        { path: "mebel", element: <Mebel /> },
        { path: "matras", element: <Matras /> },
        { path: "kovrolin", element: <Kovrolin /> },
        { path: "ofis", element: <Ofis /> },
        { path: "antiseptik", element: <Antiseptik /> },
        { path: "avto", element: <Avto /> },
      
        { path: "about", element: <About /> },
      

   
      ],
    },
  ]);

  // Loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
<div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-white to-amber-50 z-50">
  
  <div className="loader-wrapper">
    
    {/* rangli animatsiya */}
    <div className="loader"></div>
<img src="/logo1.png" className="w-54 " />
    {/* TEXT */}
    {"Zilol Gilam Yuvish".split("").map((char, i) => (
      <span key={i} className="loader-letter">
        {char === " " ? "\u00A0" : char}
      </span>
    ))}

  </div>

</div>
    );
  }

  return (
    <>

      <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
    </>
  
  );
}

export default App;