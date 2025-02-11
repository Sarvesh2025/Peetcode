module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        input: "var(--input)",
        ring: "var(--ring)",
        border: "var(--border)",
      },
    },
  },
  plugins: [],
}