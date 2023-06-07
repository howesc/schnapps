import type { ChartDataset, ChartOptions } from 'chart.js'
import type { TrendLineOpt } from '$lib/types'

import { calcRollAvgs, cols, rgb, hsla, replaceZerosWithPreviousValue } from '$lib/helpers'
import { enUS } from 'date-fns/locale'

const trendLineOpts: TrendLineOpt[] = [
	{ win: 240, col: cols.blue, width: 3 }, 
	{ win: 120, col: cols.green, width: 2 },
]

const calcTrend = (width: number, nums: number[], opt: TrendLineOpt): number[] => {
	const rollAvgs = calcRollAvgs(opt.win, replaceZerosWithPreviousValue(nums)).slice(-width)

	let trends = Array(rollAvgs.length).fill(null)
	for (let i = 1; i <= rollAvgs.length; i++) {
		if (!rollAvgs[i] || !rollAvgs[i - 1]) {
			trends[i] = null
		} else {
			trends[i] = (rollAvgs[i] || 0) / (rollAvgs[i - 1] || 1) - 1
		}
	}

	return trends
}

const makeTrendLine = (width: number, nums: number[], opt: TrendLineOpt): ChartDataset => {
	const color = hsla(opt.col)
	return {
		type: 'line',
		yAxisID: 'y',
		data: calcTrend(width, nums, opt),
		label: `SMA ${opt.win}`,
		borderColor: color,
		backgroundColor: color,
		borderWidth: opt.width
	}
}

const makeTrendLines = (width: number, nums: number[], opts: TrendLineOpt[]) => {
	return opts.map((opt) => makeTrendLine(width, nums, opt))
}

export const makeTrendDatasets = (width: number, prices: number[]): ChartDataset[] => {
	return makeTrendLines(width, prices, trendLineOpts)
}

export const makeLabels = (width: number, dates: Date[]) => {
	return dates.slice(-width)
}

export const makeChartOptions = (width: number): ChartOptions => {
	return {
		animation: { duration: 100 },
		maintainAspectRatio: false,
		elements: { point: { pointStyle: false } },
		plugins: { title: { display: false } },
		scales: {
			x: {
				type: 'timeseries',
				time: { unit: width <= 20 ? 'day' : 'month' },
				adapters: { date: { locale: enUS } },
				grid: { display: true, color: hsla(cols.greyMd) },
				ticks: {
					display: true,
					color: hsla(cols.white),
					font: { size: 10 },
					maxRotation: 90,
					minRotation: 90
				}
			},
			y: {
				position: 'left',
				grid: { display: true, color: hsla(cols.greyMd) },
				ticks: { display: true, color: hsla(cols.white), font: { size: 8 } }
			},
			y1: {
				position: 'right',
				grid: { display: false },
				ticks: { display: false }
			}
		}
	}
}
