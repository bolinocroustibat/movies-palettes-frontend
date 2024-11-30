import { fetchMovies } from "$lib/api"
import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ fetch }) => {
	try {
		const movies = await fetchMovies(fetch)
		return {
			movies,
		}
	} catch (e) {
		throw error(500, {
			message: "Error loading movies data",
		})
	}
}
