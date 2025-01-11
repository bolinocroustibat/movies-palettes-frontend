<script lang="ts">
import "../app.css";
import type { PageData } from "./$types"
import MovieCard from "./MovieCard.svelte"
import BackToTop from './BackToTop.svelte'

let { data } = $props<{ data: PageData }>();
const { movies } = data;

const validMovies = $derived(
	movies.filter((movie) => movie.palettes.length > 0)
);
</script>

<div class="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-900/95 py-12">
	<div class="container mx-auto px-4 animate-fade-in">
		<h1 class="text-5xl font-extrabold mb-4 text-center text-violet-300/90 font-windsor animate-slide-down">
			Movie Color Palettes
		</h1>
		<p class="text-center text-neutral-400/80 text-sm tracking-wider mb-16 font-light">
			Generated using <a 
				href="https://github.com/bolinocroustibat/movies-palettes/blob/main/movies_palettes.ipynb" 
				class="text-violet-300/80 hover:text-violet-200/90 transition-colors underline underline-offset-4 decoration-violet-400/30" 
				target="_blank" 
				rel="noopener noreferrer"
			>this algorithm</a>
		</p>
		<div class="flex flex-wrap gap-10 justify-center">
			{#each validMovies as movie, i}
				<div 
					class="opacity-0"
					style="animation: fade-in 0.5s ease-out forwards; animation-delay: {i * 150}ms"
				>
					<MovieCard {movie} />
				</div>
			{/each}
		</div>
	</div>
</div>

<BackToTop />
