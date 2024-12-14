import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        "theme-primary": {
          50: "#f1f9fa",
          100: "#dbeef2",
          200: "#bbdfe6",
          300: "#8bc7d5",
          400: "#489fb5",
          500: "#398ba1",
          600: "#327188",
          700: "#2e5d70",
          800: "#2d4f5d",
          900: "#294250",
          950: "#172b35",
        },
        "theme-secondary": {
          50: "#ecffff",
          100: "#cffdfe",
          200: "#a5f9fc",
          300: "#67f2f9",
          400: "#22e1ee",
          500: "#06c4d4",
          600: "#089db2",
          700: "#0e7d90",
          800: "#16697a",
          900: "#165363",
          950: "#083744",
        },
        "theme-accent": {
          50: "#fff8eb",
          100: "#ffecc6",
          200: "#ffd688",
          300: "#ffbb4a",
          400: "#ff9f1c",
          500: "#f97c07",
          600: "#dd5702",
          700: "#b73a06",
          800: "#942b0c",
          900: "#7a240d",
          950: "#461002",
        },

        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
