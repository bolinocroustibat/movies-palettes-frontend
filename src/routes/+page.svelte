<script lang="ts">
import type { PageData } from "./$types"
import MovieCard from "./MovieCard.svelte"
import "../app.css"

const { data }: { data: PageData } = $props()

const validMovies = $derived(
	data.movies.filter((movie) => movie.palettes.length > 0),
)
</script>

<div class="min-h-screen bg-[#231C2E] py-8">
	<div class="container mx-auto px-4">
		<h1 class="text-4xl font-bold mb-12 text-center text-neutral-200/90 font-windsor">Movie Color Palettes</h1>
		{#if validMovies.length > 0}
			<div class="flex flex-wrap gap-8">
				{#each validMovies as movie}
					<MovieCard {movie} />
				{/each}
			</div>
		{:else}
			<div class="text-center text-neutral-400">
				<p>No movies found with color palettes.</p>
			</div>
		{/if}
	</div>
</div>
