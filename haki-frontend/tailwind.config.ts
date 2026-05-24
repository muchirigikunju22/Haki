import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'haki-bg': '#0d0d0d',
        'haki-surface': '#1a1a1a',
        'haki-surface2': '#222222',
        'haki-green': '#1D9E75',
        'haki-green-light': '#5DCAA5',
        'haki-text': '#f0f0f0',
        'haki-muted': '#a0a0a0',
        'haki-dim': '#666666',
      },
      fontFamily: {
        serif: ['DM Serif Display', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        'lg': '14px',
        'xl': '100px',
      },
    },
  },
  plugins: [],
};

export default config;
