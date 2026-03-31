/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // 🔥 MUHIM
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {spacing: {
      70: '280px',
      65: '260px',
    }},
  },
  plugins: [],
};