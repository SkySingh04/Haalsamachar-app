import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
      gt: {
        text: '#D7E4C0',
        lightbg: '#C6DCBA',
        darkbg: '#BBC3A4',
        DEFAULT: '#B3A398',
      },
      bt:{
        navy: '#265073',
        teal:'#2D9596',
        sage:'#9AD0C2',
        peach: '#F1FADA'
        
      }
    },
      
    },
  },
  plugins: [],
};
export default config;
