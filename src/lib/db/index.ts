import type { Db, List, Symbol, Symbol } from '../types'
import { readFileSync, writeFile } from 'fs'

export const readDb = (): Db => JSON.parse(String(readFileSync('./src/lib/db/db.json')))

export const writeDb = (db: Db) =>
	writeFile('./src/lib/db/db.json', JSON.stringify(db, null, 2), (err) => {
		if (err) throw err
	})

export const getLists = async () => {
	const db = readDb()
	const lists = db.lists
	// console.log('db.js getLists:', { lists })
	return lists
}

export const getList = async (listId: string) => {
	const db = readDb()
	// const list = db.lists[listId]
	const list = db.lists.filter((list) => list.id === listId)[0]
	return list
}

export const postList = async (listName: string): Promise<List[]> => {
	const db = readDb()
	const listId = String(db.lists.length + 1)
	db.lists.push({
		id: listId,
		name: listName,
		status: 'Active',
		createdAt: new Date()
	})
	writeDb(db)
	return db.lists
}

export const saveSymbol = async (symbol: Symbol, list: List, checked: boolean): Promise<Symbol> => {
	const db = readDb()

	const symbolId = symbol.id

	let listIds: string[]
	listIds =
		symbolId in db.symbols.map((dbSymbol) => dbSymbol.id)
			? db.symbols.filter((dbSymbol) => dbSymbol.id === symbolId)[0].listIds
			: []

	if (checked) {
		listIds = [...new Set([...listIds, ...[list.id]])]
	} else {
		listIds = listIds.filter((listId) => listId != list.id)
	}

	if (listIds.length) {
		db.symbols.push({
			id: symbol.id,
			name: symbol.name,
			listIds,
			currency: 'GBP',
			createdAt: new Date()
		})
	} else {
		db.symbols = db.symbols.filter((dbSymbol) => dbSymbol.id !== symbolId)
	}

	writeDb(db)
	return db.symbols.filter((dbSymbol) => (dbSymbol.id = symbolId))[0]
}

export const getSymbolIdsAddedToList = async (listId: string) => {
	return readDb()
		.symbols.filter((symbol) => symbol.listIds.includes(listId))
		.map((symbol) => symbol.id)
}
