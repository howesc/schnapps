<script lang="ts">
	import type { Hist } from '$lib/types'

	import { Chart, registerables } from 'chart.js'
	import 'chartjs-adapter-date-fns'
	import {
		makeChartOptions,
		makeLabels,
		makeTrendDatasets as makeTrendDatasets
	} from '$lib/comp/trendChart'

	Chart.register(...registerables)
	Chart.defaults.plugins.legend.display = false
	// Chart.defaults.elements.line.cubicInterpolationMode = 'monotone'

	export let width: number
	export let hists: Hist[] = []

	let chartElement: HTMLCanvasElement
	let chart: Chart

	$: labels = makeLabels(
		width,
		hists.map((hist) => hist.date)
	)

	$: trendDatasets = makeTrendDatasets(
		width,
		hists.map((hist) => hist.close)
	)

	$: chartOptions = makeChartOptions(width)

	$: {
		try {
			chart.destroy()
		} catch {}

		chart = new Chart(chartElement, {
			type: 'line',
			data: {
				labels: labels,
				datasets: [
					...trendDatasets,
					{
						type: 'line',
						yAxisID: 'y',
						data: hists.map((hist) => 0),
						label: `${0}`,
						borderColor: 'white',
						backgroundColor: 'white',
						borderWidth: 1
					}
				]
			},
			options: chartOptions
		})
	}
</script>

<div class="h-96">
	<canvas bind:this={chartElement} />
</div>
