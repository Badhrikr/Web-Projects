/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-lighter": "hsl(148, 38%, 91%)",
        "primary-medium": "hsl(169, 82%, 27%)",
        error: "hsl(0, 66%, 54%)",
        neutral: "hsl(0, 0%, 100%)",
        "accent-pr": "hsl(186, 15%, 59%)",
        "accent-sc": "hsl(187, 24%, 22%)",
      },
      fontFamily: {
        primary: ["Karla", "sans-serif"],
      },
    },
  },
  plugins: [],
};
