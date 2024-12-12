import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"
import packageJson from "./package.json"

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		__APP_VERSION__: JSON.stringify(packageJson.version),
	},
})
