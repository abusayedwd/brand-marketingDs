/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#F3F6F9",
          100: "#E4EAF1",
          200: "#C5D0DD",
          500: "#3D5166",
          700: "#1C2B3A",
          800: "#142230",
          900: "#0F1C2E",
        },
        accent: {
          DEFAULT: "#0F766E",
          soft: "#CCFBF1",
          strong: "#0D5C56",
        },
        surface: {
          DEFAULT: "#F5F7FA",
          card: "#FFFFFF",
          muted: "#EEF2F6",
        },
      },
      fontFamily: {
        display: ["Sora", "system-ui", "sans-serif"],
        body: ["DM Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 28, 46, 0.06)",
        lift: "0 14px 40px rgba(15, 28, 46, 0.1)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
}
