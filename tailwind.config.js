/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      display: ["Inter", "sans-serif"],
      body: ["Mulish", "sans-serif"],
    },
    extend: {
      backgroundColor: {
        "main-bg": "#FAFBFB",
        "main-dark-bg": "#20232A",
        "secondary-dark-bg": "#33373E",
        "light-gray": "#F7F7F7",
        "half-transparent": "rgba(0, 0, 0, 0.5)",
      },
      colors: {
        "primary-color": "#fb7837",
        "secondary-color": "#f88349",
        disabled: "#fcbc9c",
        "color-font": "#20232A",
        "color-dark-font": "#F7F7F7",
      },
      borderWidth: {
        1: "1px",
      },
      borderColor: {
        color: "rgba(0, 0, 0, 0.1)",
      },
      backgroundImage: {
        "auth-banner":
          "linear-gradient(to top, rgb(212, 205, 212, 0.3),rgba(234, 85, 16, 0.2)),url(/images/backgroundTwo.jpg)",
      },
    },
  },
  plugins: [],
};
