import type { Movie } from "./types"
import { sortColorsByProximity } from "./utils"

const MOVIES_JSON_URL = import.meta.env.VITE_API_URL

export async function fetchMovies(
	customFetch: typeof fetch = fetch,
): Promise<Movie[]> {
	try {
		const response = await customFetch(`${MOVIES_JSON_URL}`)
		if (!response.ok) {
			const errorData = await response.text()
			const errorMessage = `HTTP error! Status: ${response.status}\nURL: ${MOVIES_JSON_URL}\nResponse: ${errorData}`
			console.error(errorMessage)
			throw new Error(errorMessage)
		}
		const data = await response.json()
		return processMovieData(data as Movie[])
	} catch (error) {
		const errorMessage = `Failed to fetch movies: ${error instanceof Error ? error.message : "Unknown error"}\nAPI URL: ${MOVIES_JSON_URL}`
		console.error(errorMessage)
		throw new Error(errorMessage)
	}
}

function processMovieData(movies: Movie[]): Movie[] {
	return movies.map((movie) => ({
		...movie,
		palettes: movie.palettes.map((palette) => ({
			...palette,
			colors: sortColorsByProximity(palette.colors),
		})),
	}))
}
