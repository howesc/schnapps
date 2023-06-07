import { writable } from 'svelte/store'
import type { List, SearchResult } from '$lib/types'

// AUTH STORES
export const user = writable()

// DB STORES
export const lists = writable<List[]>()
export const symbols = writable()

// UI STORES
interface UI {
	searchString: string
	selectedSearchResult: SearchResult | undefined
	selectedList: List | undefined
}

export const searchString = writable<string>('')
export const selectedSearchResult = writable<SearchResult>()
// export const selectedList =  writable()
