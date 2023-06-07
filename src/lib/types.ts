export interface SearchResult {
	id: string
	name: string
}

export interface Symbol extends SearchResult {
	currency: string
}

export interface SavedSymbol extends Symbol {
	listIds: string[]
	createdAt: Date
}

export interface List {
	id: string
	name: string
	status: string
	createdAt: Date
}

export interface Db {
	lists: List[]
	symbols: SavedSymbol[]
}

export interface Quote {
	symbol: Symbol
	regularMarketTime: Date
	regularMarketPrice: number
	regularMarketChangePercent: number
	fiftyDayAverage: number
	twoHundredDayAverage: number
}

export interface Hist {
	date: Date
	close: number
	volume: number
}

export interface AnalysisResult {
	symbol: {
		id: string
		name: string
	}
	hists: Hist[]
}

export interface Analysis {
	list: List
	analysisResults: AnalysisResult[]
}

// export interface ChartDataSet {
//   label: string,
//   data: number[],
//   borderColor: string,
//   borderWidth: number,
//   borderDash: number[],
// }

export interface TrendLineOpt {
	win: number
	col: number[]
	width: number
}
