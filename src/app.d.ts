/// <reference types="vite/client" />

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			message: string
		}
		interface PageData {
			movies: import("./lib/types").Movie[]
		}
	}
	const __APP_VERSION__: string
}

export {}
