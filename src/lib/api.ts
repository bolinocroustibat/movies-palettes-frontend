import type { Movie } from "./types"
import { sortColorsByProximity } from "./utils"

export async function fetchMovies(): Promise<Movie[]> {
	try {
		// Dynamically import the local JSON file
		const data = await import("../data/movies_palettes.json")
		return organizeMovieData(data.default as Movie[])
	} catch (error) {
		const errorMessage = `Failed to fetch movies: ${error instanceof Error ? error.message : "Unknown error"}`
		console.error(errorMessage)
		throw new Error(errorMessage)
	}
}

function organizeMovieData(movies: Movie[]): Movie[] {
	return movies.map((movie) => ({
		...movie,
		palettes: movie.palettes
			.sort((a, b) => {
				if (!a.calculation_date) return 1
				if (!b.calculation_date) return -1
				return (
					new Date(b.calculation_date).getTime() -
					new Date(a.calculation_date).getTime()
				)
			})
			.map((palette) => ({
				...palette,
				colors: sortColorsByProximity(palette.colors),
			})),
	}))
}
