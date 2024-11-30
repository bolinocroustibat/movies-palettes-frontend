import { fetchMovies } from "$lib/api"
import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"

export const load: PageLoad = async () => {
	try {
		const movies = await fetchMovies()
		return {
			movies,
		}
	} catch (e) {
		throw error(500, {
			message: "Error loading movies data",
		})
	}
}
