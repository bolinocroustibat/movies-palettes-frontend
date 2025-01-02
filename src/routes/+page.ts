import { fetchMovies } from "$lib/api"
import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"

const appVersion: string = __APP_VERSION__

export const load: PageLoad = async ({ fetch }) => {
	console.log(appVersion)
	try {
		const movies = await fetchMovies(fetch)
		if (!movies || !Array.isArray(movies)) {
			throw new Error(`Invalid movies data received: ${JSON.stringify(movies)}`)
		}
		return { movies }
	} catch (e) {
		// Add debug logging in catch block
		console.error("Movie loading error:", {
			error: e,
			data: await fetchMovies(fetch).catch(() => "failed to fetch again"),
		})

		if (e instanceof Response) {
			throw error(e.status, {
				message: `API Error (${e.status}): ${e.statusText}
					The server returned an error while fetching movies.`,
			})
		}

		const errorMessage =
			e instanceof Error ? e.message : "Unknown error occurred"
		throw error(500, {
			message: `Unexpected error while loading movies: ${errorMessage}`,
		})
	}
}
