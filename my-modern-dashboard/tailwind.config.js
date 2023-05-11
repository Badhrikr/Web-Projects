/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./modules/**/*.{ts,tsx}",
    "./layouts/**/*.{ts,tsx}",
    "./ui-components/**/*.{ts,tsx}",
    "./shared/**/*.{ts,tsx}",
    "./helpers/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Poppins"],
        secondary: ["Montserrat"],
      },
      backgroundColor: {
        theme: {
          "background-primary": "var(--background-primary)",
          "background-secondary": "var(--background-secondary)",

          "background-popup": "var(--background-popup)",
          "background-elevate": "var(--background-elevate)",

          "background-input": "var(--background-input)",
          "background-nav": "var(--background-nav)",
          "background-body": "var(--background-body)",

          "loading-color": "var(--loading-color)",

          "zebra-table": "var(--zebra-bg)",

          ...include("button-elevate", "--background-button-elevate"),
          ...include("primary", "--primary"),
          ...include("secondary", "--secondary"),
        },
      },
      backgroundImage: {
        "demo-request-image": "var(--demo-request-image)",
      },
      textColor: {
        theme: {
          ...include("primary", "--text-primary"),
          ...include("secondary", "--text-secondary"),
        },
      },
      fill: {
        theme: {
          ...include("primary", "--svg-primary"),
          ...include("secondary", "--svg-secondary"),
        },
      },
      stroke: {
        theme: {
          ...include("primary", "--svg-primary"),
          ...include("secondary", "--svg-secondary"),
        },
      },
      borderColor: {
        theme: {
          ...include("primary", "--border-primary"),
          ...include("secondary", "--border-secondary"),
          "gray-border": "var(--gray-border)",
        },
      },
      accentColor: {
        theme: {
          ...include("primary", "--primary"),
          ...include("secondary", "--secondary"),
        },
      },
      animation: {
        spin: "spin 300ms linear infinite",
        battery_low_blink: "batter_low_blink 3s ease-out",
        blink: "blink 2s linear alternate",
      },
      keyframes: {
        spin: {
          from: { transform: "rotate(0)" },
          to: { transform: "rotate(360deg)" },
        },
        batter_low_blink: {
          0: { opacity: 1 },
          "16%": { opacity: 0 },
          "32%": { opacity: 1 },
          "48%": { opacity: 0 },
          "64%": { opacity: 1 },
          "80%": { opacity: 0 },
          "96%": { opacity: 1 },
        },
        blink: {
          0: { opacity: 1 },
          "32%": { opacity: 0 },
          "64%": { opacity: 1 },
          "96%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};

function include(key, cssVar) {
  let alphaObject = {};
  const start = 50,
    end = 900,
    inc = start;

  alphaObject[key] = `var(${cssVar})`;

  for (let i = start; i <= end; i += inc)
    alphaObject[`${key}-${i}`] = `var(${cssVar}-${i})`;

  return alphaObject;
}
