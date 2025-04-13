/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        yellow: '#FFD344',
        blue: '#334CCA',
        purple: '#9853D7',
        textPurple: '#6A3D93',
      }
    },
  },
  plugins: [],
}