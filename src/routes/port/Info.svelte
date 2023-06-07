<script lang="ts">
	import type { Quote } from '$lib/types'

	export let quote: Quote
	// console.log('Info.svelte', { quote })
</script>

<div class="flex flex-col space-y-2 p-4 bg-neutral-focus rounded-lg">
	<div class="flex flex-col">
		<div class="name">{@html quote.symbol.name}</div>
		<div class="symbol">{quote.symbol.id}</div>
	</div>

	<div>
		<div class="flex flex-row space-x-4">
			<!-- <div class='price'>{new Intl.NumberFormat(undefined, { style: 'currency', currency: quote.currency, currencyDisplay: null }).format(quote.regularMarketPrice)}</div> <div>{quote.regularMarketChange}</div> <div>({quote.regularMarketChangePercent})</div> -->
			<div class="flex flex-row space-x-2">
				<div class="regularMarketPrice">{quote.regularMarketPrice.toLocaleString('en')}</div>
				<div class="currency">{quote.symbol.currency}</div>
			</div>
			<div class="flex flex-row space-x-2 items-end">
				<div
					class="regularMarketChangePercent"
					class:negative={quote.regularMarketChangePercent < 0}
				>
					{quote.regularMarketChangePercent.toFixed(2)}%
				</div>
			</div>
		</div>

		<div class="regularMarketTime">
			@ {new Date(quote.regularMarketTime).toLocaleString('en-GB')}
		</div>
	</div>

	<div class="flex space-x-2">
		<div>fiftyDayAverage</div>
		<div>{quote.fiftyDayAverage.toLocaleString('en')}</div>
		<div>{(100 * (quote.regularMarketPrice / quote.fiftyDayAverage - 1)).toFixed(2)}%</div>
	</div>

	<div class="flex space-x-2">
		<div>twoHundredDayAverage</div>
		<div>{quote.twoHundredDayAverage.toLocaleString('en')}</div>
		<div>{(100 * (quote.regularMarketPrice / quote.twoHundredDayAverage - 1)).toFixed(2)}%</div>
	</div>
</div>

<!-- <pre class='my-0'>
  {JSON.stringify(quote, null, 2)}
</pre> -->
<style>

	.name {
		@apply font-bold text-2xl;
	}

	.symbol {
		@apply font-light leading-none;
	}

	.regularMarketPrice {
		@apply font-bold text-4xl;
	}

	.currency {
		@apply font-light uppercase;
	}

	.regularMarketChangePercent {
		@apply text-green-500 text-3xl font-light;
	}

	.regularMarketTime {
		@apply text-[12px] font-extralight;
	}

	.negative {
		@apply text-red-500;
	}
</style>
