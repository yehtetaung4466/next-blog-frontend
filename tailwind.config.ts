import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme:{
    extend:{
      screens:{
        "xs" : "380px",
        "xsm": "530px",
      },
      aspectRatio:{
        "190/127":"190/127"
      }
    }
  },
  plugins: [require('daisyui'), require('@tailwindcss/forms'),require('tailwind-scrollbar-hide')],
};
export default config;
