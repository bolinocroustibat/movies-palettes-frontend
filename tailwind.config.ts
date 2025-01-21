import scrollbar from "tailwind-scrollbar"
import type { Config } from "tailwindcss"

export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	darkMode: 'class',

	theme: {
		extend: {
			fontFamily: {
				sans: ["Work Sans", "system-ui", "sans-serif"],
			},
			fontSize: {
				"4xl": [
					"2.5rem",
					{
						lineHeight: "1.1",
						letterSpacing: "-0.03em",
						fontWeight: "600",
					},
				],
				"2xl": [
					"1.5rem",
					{
						lineHeight: "1.2",
						letterSpacing: "-0.02em",
						fontWeight: "500",
					},
				],
			},
			keyframes: {
				"fade-in": {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				"slide-down": {
					"0%": { transform: "translateY(-10px)", opacity: "0" },
					"100%": { transform: "translateY(0)", opacity: "1" },
				},
			},
			animation: {
				"fade-in": "fade-in 0.8s ease-out",
				"slide-down": "slide-down 0.8s ease-out",
			},
			colors: {
				'theme-bg': {
					light: '#f3f4f6',
					dark: '#09090b',
				},
				'theme-text': {
					light: '#1f2937',
					dark: '#d4d4d8',
				}
			},
		},
	},

	plugins: [scrollbar({ nocompatible: true })],
} satisfies Config
