<script lang="ts">
	import type { Hist } from '$lib/types'

	import { Chart, registerables } from 'chart.js'
	import 'chartjs-adapter-date-fns'
	import {
		makeChartOptions,
		makeLabels,
		makeSmaDatasets as makeSmaDatasets,
		makeVolumeDataset
	} from '$lib/comp/smasChart'

	Chart.register(...registerables)
	Chart.defaults.plugins.legend.display = false
	// Chart.defaults.elements.line.cubicInterpolationMode = 'monotone'

	export let width: number
	export let hists: Hist[] = []

	let chartElement: HTMLCanvasElement
	let chart: Chart

	$: labels = makeLabels(hists.map((hist) => hist.date))
	$: smaDatasets = makeSmaDatasets(hists.map((hist) => hist.close))
	$: volumeDataset = makeVolumeDataset(hists.map((hist) => hist.volume))

	$: viewLabels = labels.slice(-width)
	$: viewSmaDatasets = smaDatasets.map((smaDataset) => {
		return {
			...smaDataset,
			data: smaDataset.data.slice(-width)
		}
	})
	$: viewVolumeDataset = {
		...volumeDataset,
		data: volumeDataset.data.slice(-width)
	}

	$: chartOptions = makeChartOptions(width)

	$: {
		try {
			chart.destroy()
		} catch {}

		chart = new Chart(chartElement, {
			type: 'line',
			data: {
				labels: viewLabels,
				datasets: [...viewSmaDatasets, viewVolumeDataset]
			},
			options: chartOptions
		})
	}
</script>

<div class="h-96">
	<canvas bind:this={chartElement} />
</div>
