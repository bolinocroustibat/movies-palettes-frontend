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
				`SELECT DISTINCT m.id, m.title, m.director, m.year 
				FROM movies m
				INNER JOIN palettes p ON m.id = p.movie_id
				ORDER BY m.title`,
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
