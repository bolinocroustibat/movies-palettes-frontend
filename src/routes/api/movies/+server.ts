import { corsHeaders } from "$lib/cors"
import type { Movie } from "$lib/types"
import { generateSlug, rgbToHex } from "$lib/utils"
import { Database } from "bun:sqlite"
import { json } from "@sveltejs/kit"
import type { RequestEvent, RequestHandler } from "./$types"

const DB_PATH = "./static/movies.db"

export const GET: RequestHandler = async ({ request }: RequestEvent) => {
	const db = new Database(DB_PATH, { readonly: true })
	const origin = request.headers.get("origin")

	try {
		const movies = db
			.query<Movie>(
				`SELECT 
					m.id, 
					m.title, 
					m.director, 
					m.year,
					p.id as palette_id,
					p.colors,
					p.calculation_date
				FROM movies m
				LEFT JOIN (
					SELECT p1.*
					FROM palettes p1
					LEFT JOIN palettes p2 ON p1.movie_id = p2.movie_id 
						AND p1.calculation_date < p2.calculation_date 
						AND p2.active = 1
					WHERE p1.active = 1 
						AND p2.id IS NULL
				) p ON m.id = p.movie_id
				ORDER BY m.title`,
			)
			.all()

		// Format movies with their latest palette
		const formattedMovies = movies.map(
			(movie): Movie => ({
				id: movie.id,
				title: movie.title,
				director: movie.director,
				year: movie.year,
				slug: generateSlug(movie.title),
				palettes: movie.palette_id
					? [
							{
								id: movie.palette_id,
								movie_id: movie.id,
								colors: movie.colors
									? JSON.parse(movie.colors).map(
											(rgb: [number, number, number]) => rgbToHex(rgb),
										)
									: [],
								calculation_date: movie.calculation_date || undefined,
								clusters_nb: movie.clusters_nb!,
							},
						]
					: [],
			}),
		)

		return json({ movies: formattedMovies }, { headers: corsHeaders(origin) })
	} catch (error) {
		console.error("[API] Database error:", error)
		return new Response("Internal Server Error", {
			status: 500,
			headers: corsHeaders(origin),
		})
	} finally {
		db.close()
	}
}
