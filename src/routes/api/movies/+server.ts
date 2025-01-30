import { Database } from "bun:sqlite"
import type { Movie } from "$lib/types"
import { generateSlug } from "$lib/utils"
import { json } from "@sveltejs/kit"
import type { RequestEvent, RequestHandler } from "./$types"

const DB_PATH = "./static/movies.db"

export const GET: RequestHandler = async ({ params }: RequestEvent) => {
	const db = new Database(DB_PATH, { readonly: true })

	try {
		const movies = db
			.query<Movie>(
				"SELECT id, title, director, year FROM movies ORDER BY title",
			)
			.all()

		// Add slug to each movie for easier frontend usage
		const moviesWithSlugs = movies.map((movie: Movie) => ({
			...movie,
			slug: generateSlug(movie.title),
		}))

		return json({
			movies: moviesWithSlugs,
		})
	} catch (error) {
		console.error("[API] Database error:", error)
		return new Response("Internal Server Error", { status: 500 })
	} finally {
		db.close()
	}
}
