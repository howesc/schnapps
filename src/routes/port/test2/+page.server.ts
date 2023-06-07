import type { PageServerLoad } from './$types'
import { readFileSync } from 'fs'
import type { Hist } from '$lib/types'

import { addYears } from 'date-fns'
import yahooFinance from 'yahoo-finance2'
import type { Quote } from 'yahoo-finance2/dist/esm/src/modules/quote'
import type { HistoricalHistoryResult } from 'yahoo-finance2/dist/esm/src/modules/historical'

const makeDate = (dateString: string): Date => {
	const bits = dateString.split('/')
	return new Date(Number(bits[0]), Number(bits[1]), Number(bits[2]))
}

const readJson = (path: string) => JSON.parse(String(readFileSync(path)))

export const load: PageServerLoad = () => {
	const datas = readJson('./src/lib/data/USNAS100.json')

	interface Data {
		date: string
		close: string
	}

	const hists = datas.map((data: Data) => {
		return {
			date: makeDate(data.date),
			close: Number(data.close),
			volume: 0
		}
	})

	// console.log(data)

	return { hists }
}
