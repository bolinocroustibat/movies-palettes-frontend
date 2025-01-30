import { Database } from "bun:sqlite"
import type { Movie, Palette } from "$lib/types"
import { generateSlug } from "$lib/utils"
import { json } from "@sveltejs/kit"
import type { RequestEvent, RequestHandler } from "./$types"

const DB_PATH = "./static/movies.db"

export const GET: RequestHandler = async ({ params }: RequestEvent) => {
	const { movieName } = params
	const db = new Database(DB_PATH, { readonly: true })

	try {
		// First find the movie by matching the slug
		const movies = db
			.query<Movie>(
				"SELECT id, title, director, year FROM movies ORDER BY title",
			)
			.all()

		const movie = movies.find((m: Movie) => generateSlug(m.title) === movieName)

		if (!movie) {
			return new Response("Movie not found", { status: 404 })
		}

		// Then get its palettes
		const palettes = db
			.query<Palette>(
				"SELECT * FROM palettes WHERE movie_id = ? AND active = 1 ORDER BY calculation_date DESC",
			)
			.all(movie.id)

		const formattedPalettes = palettes.map((palette) => ({
			...palette,
			colors: palette.colors ? JSON.parse(palette.colors) : [],
		}))

		return json({
			movie,
			palettes: formattedPalettes,
		})
	} catch (error) {
		console.error("[API] Database error:", error)
		return new Response("Internal Server Error", { status: 500 })
	} finally {
		db.close()
	}
}
