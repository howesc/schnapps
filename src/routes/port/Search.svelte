<script lang="ts">
	import type { Symbol } from '$lib/types'

	import { createEventDispatcher } from 'svelte'
	import { searchString, selectedSearchResult } from '$lib/stores.js'

	// https://stackoverflow.com/questions/64087782/svelte-event-parameter-type-for-typescript
	const dispatch = createEventDispatcher<{ selectSearchResult: Symbol }>()

	$: $searchString = $selectedSearchResult ? $selectedSearchResult.id : ''
	// $: console.log($searchString)
  
	let searchResults: Symbol[] = []
	const getSearchResults = async () => {
		const response = await fetch(`/port/api/search/?searchString=${$searchString}`)
		searchResults = await response.json()
	}

	const selectSearchResult = (searchResult: Symbol) => {
		$selectedSearchResult = searchResult
		$searchString = searchResult.id
		searchResults = []
		dispatch('selectSearchResult', searchResult)
	}
</script>

<div class="flex">
	<div class="w-full flex flex-row space-x-2">
		<div class="relative flex-1">
			<div class="relative">
				<input
					id="searchInput"
					placeholder="Eg. gold..."
					bind:value={$searchString}
					on:input={() => getSearchResults()}
					class="input input-bordered w-full pl-12 focus:bg-neutral-focus"
				/>
				<div class="absolute top-3 left-3 text-2xl text-zinc-500">
					<iconify-icon icon="material-symbols:search" />
				</div>
			</div>

			<div
				id="searchResults"
				class:hideSearchResults={!searchResults.length}
				class="absolute top-12 w-full bg-base-300"
			>
				<ul class="menu menu-compact p-0 m-0 space-y-1">
					{#each searchResults as searchResult, i}
						<li
							on:click={() => selectSearchResult(searchResults[i])}
							on:keydown={() => {}}
							class="m-0 p-0"
						>
							<div class="flex flex-col items-start gap-0 px-2 py-1 m-0">
								<div class="text-lg font-semibold p-0 m-0">{searchResult.id}</div>
								<div class="text-xs p-0 m-0">{@html searchResult.name}</div>
							</div>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</div>

<style>
	.hideSearchResults {
		@apply hidden;
	}

	ul li:hover {
		@apply hover-bordered;
	}

	input::placeholder {
		color: gray;
	}
</style>
