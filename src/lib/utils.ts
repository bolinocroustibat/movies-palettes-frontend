import type { RGB } from "./types"

export function rgbToCSS(rgb: RGB): string {
	return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
}

export function formatDate(dateStr: string): string {
	const date = new Date(dateStr.replace("_", " "))
	return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`
}
