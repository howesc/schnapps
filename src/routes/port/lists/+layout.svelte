<script lang="ts">
	import type { LayoutData } from './$types'

	import { page } from '$app/stores'
	import { lists } from '$lib/stores'

	export let data: LayoutData
	$: $lists = data.lists
	$: console.log({ $lists })

	$: paths = $page.url.pathname.split('/')

	$: console.log({ paths })

	$: listId = paths && paths.length == 4 ? paths[3] : undefined
	$: console.log({ listId })

</script>

<!-- LISTS -->

<details class="dropdown w-full relative">
	<summary class="btn btn-primary w-full">Choose a List</summary>
	<ul class="menu dropdown-content w-full">
		{#each Object.values($lists) as list, i}
			<li
				class:selected={paths.length === 4 && paths[3] === encodeURI(list.id)}
				class="flex flex-row row border-l-8 border-l-neutral"
			>
				<a href="/port/lists/{list.id}" data-sveltekit-noscroll class="flex-1 py-2">
					<!-- <div class='w-8'>{list.id}</div> -->
					<div>{@html list.name}</div>
				</a>
			</li>
		{/each}
	</ul>
</details>

<div class="divider" />

<slot />

<style>
	.menu {
		@apply shadow;
	}
	.row:nth-child(odd) {
		@apply bg-base-300;
	}
	.row:nth-child(even) {
		@apply bg-base-100;
	}
	.selected {
		@apply text-primary border-l-8 border-l-primary;
	}
</style>
