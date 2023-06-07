import type { List, Symbol, Symbol } from '$lib/types'
import type { RequestHandler } from './$types'

import { json } from '@sveltejs/kit'
import { saveSymbol } from '$lib/db'

export const POST: RequestHandler = async ({ params, request }) => {
	const symbolId = params.symbolId
	console.log('/port/api/symbols/[symbolId] +server.js:', { symbolId })
	const result = await request.json()
	console.log({ result })

	const symbol: Symbol = result.symbol
	const list: List = result.list
	const checked: boolean = result.checked

	console.log('/api/symbols/[symbolId] POST:', { symbol, list, checked })

	const savedSymbol: Symbol = await saveSymbol(symbol, list, checked)
	return json(savedSymbol)
}
