<script lang="ts">
import type { Palette } from "$lib/types"
import { formatDate, rgbToCSS } from "$lib/utils"
import { fade } from 'svelte/transition';

interface Props {
	palette: Palette
	isExpanded: boolean
}
const { palette, isExpanded }: Props = $props()

let hoveredColor: string | null = null;
</script>

<div class="bg-neutral-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-neutral-800 w-[220px]">
	<div class="flex flex-col h-44 rounded-lg overflow-hidden">
		{#each palette.colors as color}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="flex-1 relative group"
				style:background-color={rgbToCSS(color)}
				onmouseenter={() => hoveredColor = rgbToCSS(color)}
				onmouseleave={() => hoveredColor = null}
			>
				{#if hoveredColor === rgbToCSS(color)}
					<div 
						class="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm"
						transition:fade={{ duration: 200 }}
					>
						{rgbToCSS(color)}
					</div>
				{/if}
			</div>
		{/each}
	</div>

	{#if isExpanded}
		<div class="px-4 py-4 grid grid-cols-2 gap-x-3 gap-y-0.5 text-sm font-light">
			<p class="text-neutral-500">ID</p>
			<p class="text-neutral-400">{palette.id}</p>
			
			<p class="text-neutral-500">Date</p>
			<p class="text-neutral-400">
				{#if palette.calculation_date}
					{formatDate(palette.calculation_date)}
				{:else}
					-
				{/if}
			</p>
			
			<p class="text-neutral-500">Duration</p>
			<p class="text-neutral-400">
				{#if palette.calculation_duration_seconds}
					{Math.round(palette.calculation_duration_seconds)}s
				{:else}
					-
				{/if}
			</p>
			
			<p class="text-neutral-500">Colors</p>
			<p class="text-neutral-400">{palette.colors.length}</p>
			
			<p class="text-neutral-500">Resolution</p>
			<p class="text-neutral-400">
				{#if typeof palette.resize === 'object'}
					{palette.resize.width}×{palette.resize.height}
				{:else if palette.resize}
					{palette.resize}×{palette.resize}
				{:else}
					-
				{/if}
			</p>

			<p class="text-neutral-500">Clustering Method</p>
			<p class="text-neutral-400">{palette.clustering_method || '-'}</p>

			<p class="text-neutral-500">Saturation factor</p>
			<p class="text-neutral-400">{palette.saturation_factor || '-'}</p>
			
			<p class="text-neutral-500">Saturation threshold</p>
			<p class="text-neutral-400">{palette.saturation_threshold || '-'}</p>

			<p class="text-neutral-500">Frame skip</p>
			<p class="text-neutral-400">{palette.frame_skip}</p>
			
			<p class="text-neutral-500">Batch size</p>
			<p class="text-neutral-400">{palette.batch_size}</p>

			<p class="text-neutral-500">Runtime type</p>
			<p class="text-neutral-400">{palette.runtime || '-'}</p>
		</div>
	{/if}
</div>