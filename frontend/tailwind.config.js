/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nextralight: ["Nunito-ExtraLight", "sans-serif"],
        nlight: ["Nunito-Light", "sans-serif"],
        nregular: ["Nunito-Regular", "sans-serif"],
        nmedium: ["Nunito-Medium", "sans-serif"],
        nsemibold: ["Nunito-SemiBold", "sans-serif"],
        nbold: ["Nunito-Bold", "sans-serif"],
        nextrabold: ["Nunito-ExtraBold", "sans-serif"],
        nblack: ["Nunito-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
