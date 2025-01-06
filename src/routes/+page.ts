import { fetchMovies } from "$lib/api"
import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"

export const prerender = true

export const ssr = false

const appVersion: string = __APP_VERSION__

export const load: PageLoad = async ({
	fetch,
}: { fetch: typeof globalThis.fetch }) => {
	console.log(appVersion)
	try {
		const movies = await fetchMovies(fetch)
		return { movies }
	} catch (e) {
		console.error("Movie loading error:", e)

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
