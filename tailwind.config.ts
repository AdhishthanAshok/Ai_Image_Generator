/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // New colors added or existing colors customized
        newColor: "#f5a623", // Example new color
        customBlue: "#1e40af", // Example new color
      },
      borderRadius: {
        // Retain existing borderRadius settings
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        // Add new border radius if needed
        xl: "1.5rem",
      },
      // Add any additional custom settings if needed
    },
  },
  plugins: [require("tailwindcss-animate")],
  darkMode: "class",
};
