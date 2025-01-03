import type { Movie } from "./types"
import { sortColorsByProximity } from "./utils"

const MOVIES_PALETTES_SOURCE = import.meta.env.VITE_MOVIES_PALETTES_SOURCE

export async function fetchMovies(): Promise<Movie[]> {
	const response = await fetch(MOVIES_PALETTES_SOURCE)
	if (!response.ok) {
		throw new Response(`HTTP error! status: ${response.status}`, {
			status: response.status,
		})
	}
	const data = await response.json()

	if (!data?.movies) {
		throw new Error("Invalid data structure received from API")
	}

	return organizeMovieData(data.movies)
}

function organizeMovieData(movies: Movie[]): Movie[] {
	return movies.map((movie) => ({
		...movie,
		// Ensure palettes exists and is an array
		palettes: (movie.palettes || [])
			.sort((a, b) => {
				if (!a?.calculation_date) return 1
				if (!b?.calculation_date) return -1
				return (
					new Date(b.calculation_date).getTime() -
					new Date(a.calculation_date).getTime()
				)
			})
			.map((palette) => ({
				...palette,
				// Ensure colors exists and is an array
				colors: palette?.colors ? sortColorsByProximity(palette.colors) : [],
			})),
	}))
}
