<script lang="ts">
	import type { PageData } from './$types'

	import TrendsChart from '$lib/comp/SmasChart.svelte'
	import WidthBtns from '$lib/comp/WidthBtns.svelte'
	import type { Hist, Symbol } from '$lib/types'

	export let data: PageData
	$: lists = data.lists
	// $: allSymbolsAndHists = data.allSymbolsAndHists

	let listId: string

	let allSymbolsAndHists: {
		symbol: Symbol
		hists: Hist[]
	}[] = []
	const selectList = async () => {
		const response = await fetch(`/port/api/test?listId=${listId}`)
		allSymbolsAndHists = await response.json()
	}

	$: console.log({ allSymbolsAndHists })

	$: allSymbols = allSymbolsAndHists.map((stuff) => stuff.symbol)
	$: allHists = allSymbolsAndHists.map((stuff) => stuff.hists)

	$: console.log({ hists: allHists })

	let width = 240
	// $: console.log({ width })
</script>

<select bind:value={listId} on:change={selectList} class="select select-primary w-full">
	{#each lists as list}
		<option value={list.id}>{list.name}</option>
	{/each}
</select>

<div class="divider" />

<div class="flex-col space-y-4">
	<WidthBtns bind:width />

	<div class="grid grid-cols-3 gap-2">
		{#each allSymbolsAndHists as { symbol, hists }}
			<div class="p-2 flex flex-col space-y-4 bg-base-300 rounded shadow">
				<div
					class="h-6 flex justify-center items-center uppercase font-semibold text-primary text-sm text-center"
				>
					{@html symbol.name}
				</div>
				<TrendsChart {width} {hists} />
			</div>
		{/each}
	</div>
</div>

<!-- <pre>
  {JSON.stringify(allHists, null, 2)}
</pre> -->
