/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      letterSpacing: {
        default: "0.1em", // Add your custom letter spacing value
      },
      colors: {
        "wedding-blue": "#184b6e",
        "wedding-yellow": "#ffcc66",
        "wedding-red": "#FF666D",
        "wedding-pink": "#F97198",
        "wedding-purple": "#E9C5DA",
        "wedding-green": "#5DE8A5",
      },
      height: {
        "image-sm": "40px", // Small screens
        "image-md": "50px", // Medium screens
        "image-lg": "60px", // Large screens
        "image-xl": "200px", // Extra large screens
      },
    },
  },
  plugins: [],
};
