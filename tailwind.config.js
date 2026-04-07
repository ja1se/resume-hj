/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Unbounded", "sans-serif"],
        sans: ["A2Z", "sans-serif"],
      },
      colors: {
        oska: {
          DEFAULT: "#8B5CF6", // violet-500
          light: "#EDE9FE",   // violet-100
          dark: "#6D28D9",    // violet-700
        },
        neutral: {
          base: "#111827",    // slate-900
          muted: "#6B7280",   // slate-500
          surface: "#F3F4F6", // slate-100
        }
      },
      fontSize: {
        'h1': ['36px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['28px', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['20px', { lineHeight: '1.4', fontWeight: '700' }],
        'body': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '1.5', fontWeight: '500' }],
      }
    },
  },
  plugins: [],
}
