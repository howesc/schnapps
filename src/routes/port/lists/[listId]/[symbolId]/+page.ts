import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params, fetch }) => {
	const symbolId = params.symbolId

	// console.log('/port/lists/[listId]/[symbolId] +page.ts:', symbolId)

	return { symbolId }
}
