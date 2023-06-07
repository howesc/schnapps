import type { RequestHandler } from './$types'

import { getLists, postList } from '$lib/db/index.js'
import { json } from '@sveltejs/kit'
import type { List } from 'postcss/lib/list'

export const GET: RequestHandler = async () => {
	const lists = await getLists()
	// console.log('/api/lists GET:', { lists })
	return json(lists)
}

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json()
	const listName = data.listName
	const lists = await postList(listName)
	// console.log('/api/lists POST:', { lists })
	return json(lists)
}
