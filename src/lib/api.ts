import type { Movie } from "./types"
import { sortColorsByProximity } from "./utils"

// Use the proxy route instead of the original MOVIES_JSON_URL
const PROXY_API_URL = "/api/movies"

export async function fetchMovies(
	customFetch: typeof fetch = fetch,
): Promise<Movie[]> {
	console.log("Fetching movies from proxy API", PROXY_API_URL)
	try {
		// Fetch from the proxy route
		const response = await customFetch(PROXY_API_URL)
		if (!response.ok) {
			const errorData = await response.text()
			const errorMessage = `HTTP error! Status: ${response.status}\nURL: ${PROXY_API_URL}\nResponse: ${errorData}`
			console.error(errorMessage)
			throw new Error(errorMessage)
		}
		const data = await response.json()
		return organizeMovieData(data as Movie[])
	} catch (error) {
		const errorMessage = `Failed to fetch movies: ${
			error instanceof Error ? error.message : "Unknown error"
		}\nAPI URL: ${PROXY_API_URL}`
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
