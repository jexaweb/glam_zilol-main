// Theme.js
import { useState, useEffect } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState("light");

  const changeTheme = () => setTheme(theme === "light" ? "dark" : "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return { theme, changeTheme };
};
