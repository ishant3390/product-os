import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#ffffff",
        surface: {
          soft: "#f8f9fa",
          card: "#f5f5f5",
          strong: "#e5e7eb",
          dark: "#101010",
        },
        hairline: {
          DEFAULT: "#e5e7eb",
          soft: "#f3f4f6",
          focus: "#111111",
        },
        ink: {
          DEFAULT: "#111111",
          body: "#374151",
          muted: "#6b7280",
          soft: "#898989",
        },
        cal: {
          blue: "#3b82f6",
          emerald: "#10b981",
          amber: "#f59e0b",
          rose: "#ef4444",
          violet: "#8b5cf6",
        }
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
