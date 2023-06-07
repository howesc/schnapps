<script lang="ts">
	import type { PageData } from './$types'

	import WidthBtns from '$lib/comp/WidthBtns.svelte'

	import SMAsChart from '$lib/comp/SmasChart.svelte'
	import TrendChart from '$lib/comp/TrendChart.svelte'

	let width = 480

	export let data: PageData
	$: hists = data.hists
</script>

<h1>test2</h1>

<WidthBtns bind:width />

<SMAsChart {width} {hists} />

<TrendChart {width} {hists} />

<!-- <pre>
  {JSON.stringify(hists, null, 2)}
</pre> -->
