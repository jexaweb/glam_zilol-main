import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayouts from "./layouts/MainLayouts";
import Home from "./pages/Home";
import About from "./pages/about";


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
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="text-center">
          <img
            src="/lowding.gif"
            alt="Loading"
            className="w-full mx-auto mb-4"
          />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
}

export default App;