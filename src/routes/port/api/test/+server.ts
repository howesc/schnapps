import type { RequestHandler } from './$types'
import type { Hist, Symbol } from '$lib/types'

import { addYears } from 'date-fns'
import yahooFinance from 'yahoo-finance2'
import type { Quote } from 'yahoo-finance2/dist/esm/src/modules/quote'
import type { HistoricalHistoryResult } from 'yahoo-finance2/dist/esm/src/modules/historical'
import { error, json } from '@sveltejs/kit'
import { getSymbolIdsAddedToList } from '$lib/db'

// const symbolIds = ['^NDX', '^FTSE', '^STOXX50E', '^GDAXI', '^AXJO', '^HSI', '^N225']
// const symbolIds = ['BTC-USD', 'ETH-USD', 'ADA-USD']
const period1 = addYears(new Date(), -5)

export const GET: RequestHandler = async ({ url }) => {
  const listId = url.searchParams.get('listId')
	if (!listId) throw error(400, 'searchParam listId missing.')

  const symbolIds = await getSymbolIdsAddedToList(listId)

  const allRequests = Promise.all(
		symbolIds.map((symbolId) =>
			Promise.all([yahooFinance.quote(symbolId), yahooFinance.historical(symbolId, { period1 })])
		)
	)

	const allResults = await allRequests

	const allSymbolsAndHists = allResults.map((results) => {
		const quoteResult: Quote = results[0]
		const historicalResult: HistoricalHistoryResult = results[1]

		const symbol: Symbol = {
			id: quoteResult.symbol,
			name:
				quoteResult.displayName || quoteResult.longName || quoteResult.shortName || 'unknown name',
			currency: quoteResult.currency || 'unknown currency'
		}

		const hists: Hist[] = historicalResult.map((hist) => ({
			date: hist.date,
			close: hist.adjClose || hist.close,
			volume: hist.volume
		}))

		return { symbol, hists }
	})

	return json(allSymbolsAndHists)
}
