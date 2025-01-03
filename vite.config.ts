import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig, searchForWorkspaceRoot } from "vite"
import packageJson from "./package.json"

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		__APP_VERSION__: JSON.stringify(packageJson.version),
	},
	server: {
		fs: {
			allow: [
				// search up for workspace root
				searchForWorkspaceRoot(process.cwd()),
				// your custom rules
				"/Users/bolino/code/perso/movies-palettes-frontend/static/",
			],
		},
	},
})
