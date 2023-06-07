import type { RequestHandler } from './$types'
import type { HistoricalOptions } from 'yahoo-finance2/dist/esm/src/modules/historical'
import type { Hist, Quote } from '$lib/types'

import { json, error } from '@sveltejs/kit'
import yahooFinance from 'yahoo-finance2'

export const GET: RequestHandler = async ({ url }) => {
	try {
		const symbolId = url.searchParams.get('symbolId')
		if (!symbolId) throw error(400, 'searchParam symbolId missing.')

		const result = await yahooFinance.quote(symbolId)

		const quote: Quote = {
			symbol: {
				id: result.symbol,
				name: result.displayName || result.longName || result.shortName || 'unknown name',
				currency: result.currency || 'unknown currency'
			},
			regularMarketTime: result.regularMarketTime || new Date(),
			regularMarketPrice: result.regularMarketPrice || 0,
			regularMarketChangePercent: result.regularMarketChangePercent || 0,
			fiftyDayAverage: result.fiftyDayAverage || 0,
			twoHundredDayAverage: result.twoHundredDayAverage || 0
		}
		// console.log({ quote })

		return json(quote)
	} catch (err) {
		throw error(404, String(err))
	}
}
