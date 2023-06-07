<script lang="ts">
	import type { PageData } from './$types'

	import TrendsChart from '$lib/comp/SmasChart.svelte'
	import WidthBtns from '$lib/comp/WidthBtns.svelte'
	import SmasChart from '$lib/comp/SmasChart.svelte'
	import TrendChart from '$lib/comp/TrendChart.svelte'

	export let data: PageData
	$: symbolId = data.symbolId
	$: stuff = data.analysis.allSymbolsAndHists.filter((stuff) => stuff.symbol.id === symbolId)[0]
	// console.log('/port/lists/[listId]/[symbolId] +page.svelte:', { stuff })

	$: symbol = stuff.symbol
	$: hists = stuff.hists

	let width = 240
</script>

<div class="flex-col space-y-4">
	<h2>{symbol.name}</h2>
	<WidthBtns bind:width />
	<SmasChart {width} {hists} />
  <TrendChart {width} {hists} />
</div>
