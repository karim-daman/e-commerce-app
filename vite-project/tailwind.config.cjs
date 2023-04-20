const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
		screens: {
			sm: "640px",
			md: "768px",
			lg: "1140px",
		},
		extend: {
			colors: {
				blue: {
					primary: "#0d6efd",
				},
				grey: {
					secondary: "#51585e",
					tertiary: "#9ca3af",
				},
			},
		},
	},
	plugins: [
		plugin(({ addComponents }) => {
			addComponents({
				".grid-container": {
					maxWidth: "1320px",
					justifySelf: "center",
				},
			});
		}),
	],
}
