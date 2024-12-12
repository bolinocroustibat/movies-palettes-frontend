import { fetchMovies } from "$lib/api"
import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"

const appVersion: string = __APP_VERSION__

export const load: PageLoad = async ({ fetch }) => {
	console.log(appVersion)
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
