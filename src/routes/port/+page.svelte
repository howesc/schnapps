<script lang="ts">
	import type { Hist, Quote, Symbol } from '$lib/types'
	import type { ChartDataset } from 'chart.js'

	import { fade } from 'svelte/transition'
	import { selectedSearchResult } from '$lib/stores.js'
	import Search from './Search.svelte'
	import Info from './Info.svelte'
	import TrendsChart from '$lib/comp/SmasChart.svelte'
	import SaveToLists from './SaveToLists.svelte'
	import { makeLabels, makeSmaDatasets, makeVolumeDataset } from '$lib/comp/smasChart'
	import { addYears } from 'date-fns'
	import WidthBtns from '$lib/comp/WidthBtns.svelte'
	import SmasChart from '$lib/comp/SmasChart.svelte'
	import TrendChart from '$lib/comp/TrendChart.svelte'

	let showSaveToLists: boolean
	// $: console.log({ showSaveToLists })

	const period1 = addYears(new Date(), -5)

	let hists: Hist[]
	let quote: Quote
	let symbol: Symbol
	let width = 240

	const selectSearchResult = () => {
		// console.log('/port +page.svelte:', 'if ($selectedSearchResult)')
		let symbolId = $selectedSearchResult.id

		fetch(`/port/api/historical?symbolId=${symbolId}&period1=${period1}`)
			.then((response) => response.json())
			.then((data) => (hists = data))

		fetch(`/port/api/quote?symbolId=${symbolId}`)
			.then((response) => response.json())
			.then((data) => {
				quote = data
				symbol = { ...$selectedSearchResult, currency: quote.symbol.currency }
			})
	}
</script>

<form class="space-y-4">
	<!-- SEARCH INPUT BOX -->
	<Search on:selectSearchResult={selectSearchResult} />

	<div class="divider" />

	<!-- SELECTED SEARCH RESULT -->
	{#if quote && hists}
		<div class="flex flex-col space-y-4">
			<!-- QUOTE -->
			<div class="flex-1 justify-center items-center">
				<Info {quote} />
			</div>

			<!-- HISTORICAL -->
			<div class="flex-1 justify-center items-center">
				<div class="flex-col space-y-8">
					<WidthBtns bind:width />
					<SmasChart {width} {hists} />
          <TrendChart {width} {hists} />
				</div>
			</div>
		</div>

		<!-- SAVE TO LISTS BUTTON -->
		<button
			type="button"
			on:click={() => (showSaveToLists = true)}
			class="btn btn-sm btn-info w-full flex space-x-2"
		>
			<div>Save to Lists</div>
			<iconify-icon icon="material-symbols:playlist-add" class="text-2xl" />
		</button>
	{/if}
</form>

<!-- ADD TO LISTS MODAL -->
{#if showSaveToLists}
	<div transition:fade={{ duration: 100 }}>
		<SaveToLists bind:showSaveToLists {symbol} />
	</div>
{/if}
