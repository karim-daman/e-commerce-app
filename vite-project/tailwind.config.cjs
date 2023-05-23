const colors = require("tailwindcss/colors");

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}", "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      gridTemplateColumns: {
        fluid_xl: "repeat(auto-fit, minmax(20rem, 1fr))",
        fluid_lg: "repeat(auto-fit, minmax(18rem, 1fr))",
        fluid_md: "repeat(auto-fit, minmax(16rem, 1fr))",
        fluid_sm: "repeat(auto-fit, minmax(14rem, 1fr))",
        fluid_xs: "repeat(auto-fit, minmax(12rem, 1fr))",
      },
    },
  },

  plugins: [require("flowbite/plugin")],
  darkMode: "class",
};

module.exports = config;
