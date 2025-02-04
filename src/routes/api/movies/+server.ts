import { Database } from "bun:sqlite"
import type { Movie } from "$lib/types"
import { generateSlug } from "$lib/utils"
import { json } from "@sveltejs/kit"
import type { RequestEvent, RequestHandler } from "./$types"

const DB_PATH = "./static/movies.db"

// Add CORS headers helper
const corsHeaders = {
	"Access-Control-Allow-Origin": "https://automatons.adriencarpentier.com",
	"Access-Control-Allow-Methods": "GET",
}

export const GET: RequestHandler = async ({ params }: RequestEvent) => {
	const db = new Database(DB_PATH, { readonly: true })

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
								colors: movie.colors ? JSON.parse(movie.colors) : [],
								calculation_date: movie.calculation_date || undefined,
								clusters_nb: movie.clusters_nb!,
							},
						]
					: [],
			}),
		)

		return json({ movies: formattedMovies }, { headers: corsHeaders })
	} catch (error) {
		console.error("[API] Database error:", error)
		return new Response("Internal Server Error", {
			status: 500,
			headers: corsHeaders,
		})
	} finally {
		db.close()
	}
}
