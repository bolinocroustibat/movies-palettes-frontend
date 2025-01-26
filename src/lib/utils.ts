import chroma from "chroma-js"
import type { RGB } from "./types"

export function rgbToCSS(rgb: RGB): string {
	return chroma(rgb).css()
}

export function rgbToHex(rgb: RGB): string {
	return chroma(rgb).hex()
}

export function formatDate(dateStr: string): string {
	if (!dateStr) return "-"
	// Convert "2024/11/28_21:33:16" to a valid date string
	const normalizedDate = dateStr.replace("_", " ").replace(/\//g, "-")
	const date = new Date(normalizedDate)
	return date.toLocaleString() // or any other format you prefer
}

export function rgbToHsl(rgb: RGB): [number, number, number] {
	return chroma(rgb).hsl()
}

export function sortColorsByProximity(colors: RGB[]): RGB[] {
	return [...colors].sort((a, b) => {
		const hueA = chroma(a).hsl()[0] || 0
		const hueB = chroma(b).hsl()[0] || 0
		return hueA - hueB
	})
}

export function generateSlug(title: string): string {
	return title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '')
}
