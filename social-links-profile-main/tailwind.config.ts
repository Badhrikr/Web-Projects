import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        neutral: "var(--neutral)",
        "bg-secondary": "var(--bg-secondary)",
        "bg-primary": "var(--bg-primary)",
        "bg-button": "var(--bg-button)",
      },
    },
  },
  plugins: [],
};
export default config;
