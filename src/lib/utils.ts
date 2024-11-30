import chroma from 'chroma-js';
import type { RGB } from "./types"

export function rgbToCSS(rgb: RGB): string {
	return chroma(rgb).css();
}

export function formatDate(dateStr: string): string {
	const date = new Date(dateStr.replace("_", " "))
	return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`
}

export function rgbToHsl(rgb: RGB): [number, number, number] {
	return chroma(rgb).hsl();
}

export function sortColorsByProximity(colors: RGB[]): RGB[] {
	return [...colors].sort((a, b) => {
		const hueA = chroma(a).hsl()[0] || 0;
		const hueB = chroma(b).hsl()[0] || 0;
		return hueA - hueB;
	});
}
