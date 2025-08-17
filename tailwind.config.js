/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'bg-[#2188FF]',
    'text-[#2188FF]',
    'border-[#2188FF]',
    'bg-[#52C41A]',
    'bg-[#ED3833]',
    'text-[#24292F]',
    'text-[#77818C]',
    'text-[#88929C]',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
