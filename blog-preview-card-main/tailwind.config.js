/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{svelte,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(47, 88%, 63%)",
        neutral: "hsl(0, 0%, 100%)",
        accent: "hsl(0, 0%, 42%)",
        secondary: "hsl(0, 0%, 7%)",
      },
    },
  },
  plugins: [],
};
