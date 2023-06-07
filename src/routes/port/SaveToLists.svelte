<script lang="ts">
	import type { List, Symbol } from '$lib/types'

	import { slide } from 'svelte/transition'
	import { lists } from '$lib/stores.js'

	export let showSaveToLists: boolean
	export let symbol: Symbol
	// console.log('SaveToLists.svelte:', { $lists })

	const postSymbol = async (symbol: Symbol, list: List, checked: boolean) => {
		const response = await fetch(`/port/api/symbols/${symbol.id}`, {
			method: 'POST',
			body: JSON.stringify({ symbol, list, checked })
		})
		const data = await response.json()
		console.log('SaveToLists.svelte postSymbol response:', { data })
	}

	const postList = async (listName: string) => {
		const response = await fetch(`/port/api/lists`, {
			method: 'POST',
			body: JSON.stringify({ listName })
		})
		$lists = await response.json()
		// console.log('postList:', { $lists })
	}

	let showCreate = false
	let listName = ''
</script>

<div
	class="fixed top-0 right-0 bottom-0 left-0 w-full h-full flex justify-center items-center bg-base-300 bg-opacity-90"
>
	<div class="w-96 p-8 space-y-4 bg-base-100 rounded-lg">
		<!-- header -->

		<div class="flex justify-between items-center">
			<p class="m-0 text-2xl font-bold">Save to Lists...</p>
			<button on:click={() => (showSaveToLists = false)} class="btn btn-ghost text-xl">
				<iconify-icon icon="material-symbols:close" />
			</button>
		</div>

		<!-- content -->

		<div class="divider mb-0" />

		<div>
			<!-- {#if $lists} -->
			{#each $lists as list}
				<div class="form-control">
					<label class="label cursor-pointer">
						<span>{list.name}</span>

						<input
							type="checkbox"
							checked={false}
							on:change={async (e) => postSymbol(symbol, list, e.target.checked)}
							class="checkbox checkbox-primary"
						/>
					</label>
				</div>
			{/each}
			<!-- {/if} -->
		</div>

		<div class="space-y-2">
			<button
				on:click={() => (showCreate = !showCreate)}
				class="btn btn-outline w-full flex space-x-2"
			>
				<div>Create new list</div>
				<iconify-icon icon="material-symbols:add" />
			</button>

			{#if showCreate}
				<div transition:slide>
					<form class="flex space-x-2">
						<input
							type="text"
							placeholder="Enter list name..."
							bind:value={listName}
							class="input input-bordered w-full max-w-xs"
						/>

						<button
							type="submit"
							class="btn"
							on:click={async () => {
								await postList(listName)
								showCreate = false
								listName = ''
							}}
						>
							<iconify-icon icon="material-symbols:add" />
						</button>
					</form>
				</div>
			{/if}
		</div>

		<!-- <div class='divider mt-0'></div>  -->

		<!-- footer -->

		<div class="flex space-x-4 items-center">
			<button on:click={() => (showSaveToLists = false)} class="btn text-xl w-full"> Done </button>
		</div>
	</div>
</div>
