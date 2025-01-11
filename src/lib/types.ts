export type RGB = [number, number, number]

export interface Palette {
	id: string
	clusters_nb: number
	calculation_date?: string
	calculation_duration_seconds?: number
	colors: RGB[]
	resize_width: number
	resize_height: number
	clustering_method?: string
	saturation_factor?: number
	saturation_threshold?: number
	frame_skip: number
	batch_size: number
	runtime?: string
}

export interface Movie {
	title: string
	status: string
	director: string | null
	year: string | null
	path: string | null
	palettes: Palette[]
	frames: number
	length: number
}
