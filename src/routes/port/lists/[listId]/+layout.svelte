<script lang="ts">
	import type { LayoutData } from './$types'
	import type { Hist } from '$lib/types'

	import { page } from '$app/stores'
	import Indicator from './Indicator.svelte'

	const WINS = [240, 120, 60, 20]
	$: offset = 0

	export let data: LayoutData
	$: analysis = data.analysis
	$: list = analysis.list
	$: allSymbolsAndHists = analysis ? analysis.allSymbolsAndHists : null
	$: analysiss = allSymbolsAndHists
		? allSymbolsAndHists.map((stuff) => {
				return {
					symbol: stuff.symbol,
					indicators: WINS.map((win) => calcIndicators(win, offset, stuff.hists))
				}
		  })
		: []

	// $: console.log({ analysiss })

	const applyOffset = (offset: number = 0, arr: any[] = []) => {
		if (offset == 0) return arr
		return arr.slice(0, -offset)
	}

	const calcAvg = (win: number, arr: number[]) => {
		if (win > arr.length) return 0
		return arr.slice(-win).reduce((sum, x) => sum + x, 0) / win
	}

	const calcIndicators = (win: number, offset: number, hists: Hist[]) => {
		let closes = hists.map((hist) => hist.close)
		let dates = hists.map((hist) => hist.date)

		let close = applyOffset(offset, closes).slice(-1)[0]
		let date = applyOffset(offset, dates).slice(-1)[0]

		let chg = 100.0 * (close / closes.slice(-win)[0] - 1)

		let avg_0 = calcAvg(win, applyOffset(offset, closes))

		let rel = 100.0 * (close / avg_0 - 1)

		let avg_1 = calcAvg(win, applyOffset(offset + 1, closes))
		let trd = 100.0 * (avg_0 / avg_1 - 1) * Math.sqrt(win)

		return { close, date, win, chg, rel, trd }
	}
</script>

<!-- TABLE OF ALL SEARCH RESULTS SAVED TO SELECTED LIST -->
<!-- HEADER -->
<div class="flex justify-between items-center">
	<h2>{list.name}</h2>

	<div class="flex space-x-2">
		<button class="btn btn-sm btn-outline btn-primary text-lg"
			><iconify-icon icon="material-symbols:drive-file-rename-outline" /></button
		>
		<button class="btn btn-sm btn-outline btn-error text-lg"
			><iconify-icon icon="material-symbols:delete" /></button
		>
	</div>
</div>

<button class="btn btn-sm btn-info" on:click={() => (offset = Math.max(0, offset - 5))}>-</button>
<button class="btn btn-sm btn-info" on:click={() => (offset += 5)}>+</button>
<div>offset: {offset}</div>

<!-- <pre>
  {JSON.stringify(analysiss, null, 2)}
</pre> -->

<!-- TABLE OF ANALYSIS RESULTS -->
<ul class="menu">
	{#each analysiss as analysis}
		<li
			class:selected={$page.url.pathname ===
				encodeURI(`/port/lists/${list.id}/${analysis.symbol.id}`)}
			class="row border-l-8 border-l-neutral"
		>
			<a href="/port/lists/{list.id}/{analysis.symbol.id}" data-sveltekit-noscroll class="py-0">
				<div class="flex-1">
					{@html analysis.symbol.name}
				</div>
				<div class="flex flex-col">
					<div class="flex flex-row">
						{#each analysis.indicators as indicator}
							<Indicator label={`win${indicator.win}.rel`} value={indicator.rel} />
						{/each}
					</div>
					<div class="flex flex-row">
						{#each analysis.indicators as indicator}
							<Indicator label={`win${indicator.win}.trend`} value={indicator.trd} />
						{/each}
					</div>
				</div>
			</a>
		</li>
	{/each}
</ul>

<div class="divider" />

<slot />

<style>
	.menu {
		@apply shadow;
	}
	.row:nth-child(odd) {
		@apply bg-base-300;
	}
	.row:nth-child(even) {
		@apply bg-base-100;
	}
	.selected {
		@apply text-primary border-l-8 border-l-primary;
	}
</style>
