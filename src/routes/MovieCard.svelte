<script lang="ts">
import type { Movie } from "$lib/types"
import PaletteCard from "./PaletteCard.svelte"

interface Props {
	movie: Movie
}
const { movie }: Props = $props()
</script>

<div class="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
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
		{#each movie.palettes as palette}
			<PaletteCard {palette} />
		{/each}
	</div>
</div> 