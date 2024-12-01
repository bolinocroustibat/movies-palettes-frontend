import { json } from "@sveltejs/kit"
import fetch from "node-fetch"

export async function GET() {
	const apiUrl =
		"https://drive.google.com/uc?export=download&id=11MwfgGp3efkeTnNiY8E-7ss1bvVQqr5e"
	try {
		const response = await fetch(apiUrl)
		if (!response.ok) throw new Error("Failed to fetch data")
		const data = await response.json()
		return json(data, {
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		})
	} catch (error) {
		return json({ error: "Failed to fetch movies" }, { status: 500 })
	}
}
