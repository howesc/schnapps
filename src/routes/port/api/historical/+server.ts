import type { RequestHandler } from './$types'
import type {
	HistoricalHistoryResult,
	HistoricalOptions
} from 'yahoo-finance2/dist/esm/src/modules/historical'
import type { Hist } from '$lib/types'

import { json, error } from '@sveltejs/kit'
import yahooFinance from 'yahoo-finance2'

export const GET: RequestHandler = async ({ url }) => {
	try {
		const symbolId = url.searchParams.get('symbolId')
		if (!symbolId) throw error(400, 'searchParam symbolId missing.')

		const period1 = url.searchParams.get('period1')
		if (!period1) throw error(400, 'searchParam period1 missing.')

		const opts: HistoricalOptions = { interval: '1d', period1 }

		const historicalResults: HistoricalHistoryResult = await yahooFinance.historical(symbolId, opts)
		const hists: Hist[] = historicalResults.map((hist) => ({
			date: hist.date,
			close: hist.adjClose || hist.close,
			volume: hist.volume
		}))
		// console.log({ hists })

		return json(hists)
	} catch (err) {
		throw error(404, String(err))
	}
}
