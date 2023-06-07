import type { SearchResult } from '$lib/types'
import type { RequestHandler } from './$types'

import { json, error } from '@sveltejs/kit'
import yahooFinance from 'yahoo-finance2'

export const GET: RequestHandler = async ({ url }) => {
	const searchString = url.searchParams.get('searchString')
	if (!searchString) throw error(400, 'searchParams searchString is missing')

	const opts = { quotesCount: 16, newsCount: 0 }
	const result = await yahooFinance.search(searchString, opts)

	const searchQuotes = result.quotes
	// console.log({ searchQuotes })

	const searchResults: SearchResult[] = searchQuotes
		.filter((quote) => quote.symbol)
		.map((quote) => ({
			id: quote.symbol,
			name: quote.longname || quote.shortname || quote.name || 'unknown name'
		}))

	// console.log({ searchResults })

	return json(searchResults)
}
