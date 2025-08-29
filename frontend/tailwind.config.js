/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode:'class',
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            keyframes: {
                rotateIn: {
                    "0%": { transform: "rotate(-360deg) scale(0)", opacity: "0" },
                    "100%": { transform: "rotate(0deg) scale(1)", opacity: "1" },
                },
                rotateOut: {
                    "0%": { transform: "rotate(0deg) scale(1)", opacity: "1" },
                    "100%": { transform: "rotate(360deg) scale(0)", opacity: "0" },
                },
            },
            animation: {
                rotateIn: "rotateIn 0.6s ease forwards",
                rotateOut: "rotateOut 0.6s ease forwards",
            },
        },
    },
    plugins: [],
}
