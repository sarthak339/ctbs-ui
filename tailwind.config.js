// tailwind.config.js
const config = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          customBlue: '#1e40af',  // Custom Blue color
          customGreen: '#10b981', // Custom Green color
          customRed: '#ef4444',   // Custom Red color
        },
        backgroundColor: {
          customFooter:"#0B0B0C"
        },
      },
    },
    plugins: ["@tailwindcss/postcss"],
  };
  
  export default config;
  