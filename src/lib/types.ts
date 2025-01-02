type RGB = [number, number, number]

interface Palette {
	id: string
	clusters_nb: number
	calculation_date?: string
	calculation_duration_seconds?: number
	colors: RGB[]
	resize: number | { width: number; height: number }
	clustering_method?: string
	saturation_factor?: number
	saturation_threshold?: number
	frame_skip: number
	batch_size: number
	runtime?: string
}

interface Movie {
	title: string
	status: string
	director: string | null
	year: string | null
	path: string | null
	palettes: Palette[]
	frames: number
	length: number
}

export type { RGB, Palette, Movie }
