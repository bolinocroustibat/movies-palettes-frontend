<script lang="ts">
// biome-ignore lint/correctness/noUnusedImports: Used in Svelte template
import { Moon, Sun } from "@steeze-ui/heroicons"
// biome-ignore lint/correctness/noUnusedImports: Used in Svelte template
import { Icon } from "@steeze-ui/svelte-icon"
import { onMount } from "svelte"

let isDark = true

onMount(() => {
	isDark = document.body.classList.contains("dark")
})

// biome-ignore lint/correctness/noUnusedVariables: Used in Svelte template
function toggleTheme() {
	isDark = !isDark
	document.body.classList.toggle("dark")
	localStorage.setItem("theme", isDark ? "dark" : "light")
}
</script>

<button
	on:click={toggleTheme}
	class="fixed top-4 right-4 p-2 rounded-full bg-violet-500/10 hover:bg-violet-500/20 transition-colors"
	aria-label="Toggle theme"
>
	{#if isDark}
		<Icon src={Sun} class="w-6 h-6 text-violet-300/90" />
	{:else}
		<Icon src={Moon} class="w-6 h-6 text-violet-600" />
	{/if}
</button> 
