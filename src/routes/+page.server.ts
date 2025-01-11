import type { PageServerLoad } from "./$types"
import { sortColorsByProximity } from "$lib/utils"
import { Database } from "npm:sqlite3"

const DB_PATH = process.env.VITE_DB_PATH

export const load: PageServerLoad = async () => {
	const db = new Database(DB_PATH)

	try {
		const movies = db.queryEntries<any>(
			`SELECT id, title, director, year FROM movies ORDER BY title`,
		)
		const palettes = db.queryEntries<any>(`SELECT * FROM palettes ORDER BY calculation_date DESC`)

		const palettesMap = new Map()
		palettes.forEach((palette) => {
			if (!palettesMap.has(palette.movie_id)) {
				palettesMap.set(palette.movie_id, [])
			}
			palettesMap.get(palette.movie_id).push({
				...palette,
				colors: palette.colors ? JSON.parse(palette.colors) : [],
			})
		})

		const moviesWithPalettes = movies.map((movie) => ({
			...movie,
			palettes: (palettesMap.get(movie.id) || []).map((palette: any) => ({
				...palette,
				colors: sortColorsByProximity(palette.colors),
			})),
		}))

		db.close()
		return {
			movies: moviesWithPalettes,
		}
	} catch (error) {
		db.close()
		console.error("Database error:", error)
		return {
			movies: [],
		}
	}
}
