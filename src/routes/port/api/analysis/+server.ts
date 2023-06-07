import type { RequestHandler } from './$types'
import type { AnalysisResult, Hist, List, Symbol } from '$lib/types'

import yahooFinance from 'yahoo-finance2'
import { json, error } from '@sveltejs/kit'
import { getSymbolIdsAddedToList, getList } from '$lib/db/index.js'
import { addYears } from 'date-fns'
import type { HistoricalHistoryResult } from 'yahoo-finance2/dist/esm/src/modules/historical'
import type { Quote } from 'yahoo-finance2/dist/esm/src/modules/quote'

export const GET: RequestHandler = async ({ url }) => {
	let listId = url.searchParams.get('listId')
	if (!listId) throw error(400, 'searchParam missing.')

	const list: List = await getList(listId)
	const symbolIds: string[] = await getSymbolIdsAddedToList(listId)
	// console.log('/port/api/analysis +server.js:', { symbolIds })

	const allRequests = Promise.all(
		symbolIds.map((symbolId) =>
			Promise.all([
				yahooFinance.quote(symbolId),
				yahooFinance.historical(symbolId, { period1: addYears(new Date(), -5) })
			])
		)
	)

	// results[quote, hists[]]
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

	// console.log('/port/api/analysis +server.ts:', { allHists })
	return json({ list, allSymbolsAndHists })
}
