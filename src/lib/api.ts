import type { Movie } from "./types"
import { sortColorsByProximity } from "./utils"

export async function fetchMovies(): Promise<Movie[]> {
	const response = await fetch(
		"https://adriencarpentier.com/movies-palettes/movies_palettes.json",
	)
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
