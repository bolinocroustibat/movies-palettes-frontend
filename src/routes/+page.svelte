<script lang="ts">
import MovieCard from "$lib/components/MovieCard.svelte"
import type { PageData } from "./$types"

export let data: PageData

$: validMovies = data.movies.filter(
	(movie) => movie.status === "Movie file found" && movie.palettes.length > 0,
)
</script>

<div class="min-h-screen bg-neutral-950 py-8">
	<div class="container mx-auto px-4">
		<h1 class="text-4xl font-bold mb-12 text-center text-neutral-200/90">Movie Color Palettes</h1>
		
		{#if validMovies.length > 0}
			<div class="space-y-8">
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
