/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontSize: {
        'h1': '48px',
        'h2': '36px',
        'h3': '30px',
        'h4': '24px',
        'h5': '20px',
        'h6': '16px',
      },
    },
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Alla JavaScript och TypeScript filer i din src katalog
    // Lägg till eventuella andra filer eller sökvägar som kan innehålla Tailwind-klasser
  ],
  // Resten av din Tailwind-konfiguration...
};
