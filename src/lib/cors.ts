const ALLOWED_ORIGINS = [
	"http://localhost:5173",
	"http://localhost:3000",
	"https://automatons.adriencarpentier.com",
] as const

export const corsHeaders = (origin: string | null) => {
	const isAllowedOrigin = origin && ALLOWED_ORIGINS.includes(origin as typeof ALLOWED_ORIGINS[number])
	const allowedOrigin = isAllowedOrigin ? origin : ALLOWED_ORIGINS[0]

	return {
		"Access-Control-Allow-Origin": allowedOrigin,
		"Access-Control-Allow-Methods": "GET",
	}
}
