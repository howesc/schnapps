import type { List } from '$lib/types'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async ({ fetch }) => {
	const response = await fetch('/port/api/lists')
	const lists: List[] = await response.json()

	return { lists }
}
