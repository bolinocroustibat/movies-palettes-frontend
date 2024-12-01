<script lang="ts">
import type { Palette } from "$lib/types"
import { formatDate, rgbToCSS } from "$lib/utils"

interface Props {
	palette: Palette
}
const { palette }: Props = $props()
let isInfoVisible: boolean = $state(false)
</script>

<div class="bg-neutral-900 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow border border-neutral-800 shrink-0 w-[220px]">
	<div class="flex flex-col h-36 rounded-md overflow-hidden mb-3">
		{#each palette.colors as color}
			<div
				class="flex-1"
				style:background-color={rgbToCSS(color)}
				title={rgbToCSS(color)}
			/>
		{/each}
	</div>
	
	<button 
		class="w-full text-neutral-500 hover:text-neutral-400 text-sm mb-2"
		onclick={() => isInfoVisible = !isInfoVisible}
	>
		{isInfoVisible ? 'Hide Details ▼' : 'Show Details ▶'}
	</button>

	{#if isInfoVisible}
		<div class="grid grid-cols-2 gap-x-3 gap-y-0.5 text-sm font-light">
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
			
			<p class="text-neutral-500">Saturation factor</p>
			<p class="text-neutral-400">{palette.saturation_factor || '-'}</p>
			
			<p class="text-neutral-500">Sauration threshold</p>
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