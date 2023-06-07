import type { Symbol, Hist, List } from '$lib/types'
import type { LayoutLoad } from './$types'

interface Analysis {
	list: List
	allSymbolsAndHists: {
		symbol: Symbol
		hists: Hist[]
	}[]
}

export const load: LayoutLoad = async ({ params, fetch }) => {
	const response = await fetch(`/port/api/analysis?listId=${params.listId}`)
	const analysis: Analysis = await response.json()

	// console.log('/port/lists/[listId] +layout.ts', { analysis })

	return { analysis }
}
