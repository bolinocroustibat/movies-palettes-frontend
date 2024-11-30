import { browser } from "$app/environment"
import localMoviesData from "../data/movies_palettes.json"
import type { Movie } from "./types"

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

export async function fetchMovies(): Promise<Movie[]> {
	// If we're not in the browser, return local data immediately
	if (!browser) {
		return localMoviesData as Movie[]
	}

	try {
		const response = await fetch(`${API_BASE_URL}/movies`)
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}
		const data = await response.json()
		return data as Movie[]
	} catch (error) {
		console.warn("Failed to fetch from API, falling back to local data:", error)
		return localMoviesData as Movie[]
	}
}
