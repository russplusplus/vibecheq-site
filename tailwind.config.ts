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
        "vblack": "#303841",
        "vwhite": "#EEEEEE",
        "vorange": "#FF5722",
        "vblue": "#00ADB5"
      }
    },
  },
  plugins: [],
};
export default config;
