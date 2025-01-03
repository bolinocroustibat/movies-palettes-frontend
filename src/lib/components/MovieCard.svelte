<script lang="ts">
import type { Movie } from "$lib/types"
import PaletteCard from "./PaletteCard.svelte"

interface Props {
	movie: Movie
}
const { movie }: Props = $props()
let isExpanded = $state(false) 

const latestPalette = $derived(movie.palettes.reduce((latest, current) => {
	if (!latest.calculation_date || !current.calculation_date) return current
	return new Date(current.calculation_date) > new Date(latest.calculation_date) 
		? current 
		: latest
}))
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div 
	class="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800 cursor-pointer transition-all duration-300"
	class:pb-4={!isExpanded}
	onclick={() => isExpanded = !isExpanded}
>
	<div class="mb-6">
		<h2 class="text-2xl font-semibold text-neutral-200/90 tracking-tight">
			{movie.title}
		</h2>
		<div class="text-sm font-light text-neutral-400 mt-2 space-y-0.5">
			{#if movie.director}
				<p>Director: {movie.director}</p>
			{/if}
			{#if movie.year}
				<p>Year: {movie.year}</p>
			{/if}
		</div>
	</div>

	<div class="flex flex-nowrap gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-track-neutral-800 scrollbar-thumb-neutral-600 hover:scrollbar-thumb-neutral-500 transition-colors">
		<PaletteCard palette={latestPalette} />
		
		{#if isExpanded}
			{#each movie.palettes.filter(p => p.id !== latestPalette.id) as palette}
				<PaletteCard {palette} />
			{/each}
		{/if}
	</div>
</div> 