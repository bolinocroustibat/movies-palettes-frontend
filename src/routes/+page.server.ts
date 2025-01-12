import { Database } from "bun:sqlite"
import { sortColorsByProximity } from "$lib/utils"
import type { PageServerLoad } from "./$types"

const DB_PATH = "./static/movies.db"

export const load: PageServerLoad = async () => {
	const db = new Database(DB_PATH, { readonly: true })
	try {
		const movies = db
			.query("SELECT id, title, director, year FROM movies ORDER BY title")
			.all()
		const palettes = db
			.query("SELECT * FROM palettes ORDER BY calculation_date DESC")
			.all()

		const palettesMap = new Map()
		for (const palette of palettes) {
			if (!palettesMap.has(palette.movie_id)) {
				palettesMap.set(palette.movie_id, [])
			}
			palettesMap.get(palette.movie_id).push({
				...palette,
				colors: palette.colors ? JSON.parse(palette.colors) : [],
			})
		}

		const moviesWithPalettes = movies.map((movie) => ({
			...movie,
			palettes: (palettesMap.get(movie.id) || []).map(
				(palette: { colors: string[] }) => ({
					...palette,
					colors: sortColorsByProximity(palette.colors),
				}),
			),
		}))

		db.close()
		return {
			movies: moviesWithPalettes,
		}
	} catch (error) {
		db.close()
		console.error("[Server] Database error:", error)
		console.error("[Server] Stack trace:", error.stack)
		return {
			movies: [],
		}
	}
}
