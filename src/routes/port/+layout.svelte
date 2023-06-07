<script lang="ts">
	import { user, lists } from '$lib/stores.js'
	import type { LayoutData } from './$types'
	import Tabs from './Tabs.svelte'

	export let data: LayoutData
	$: $lists = data.lists
	// $: console.log('/port/+layout.svelte $page:', { page: JSON.stringify($page, null, 2) })
	// $: console.log('/port/+layout.svelte:', { $user })
</script>

{#if $user}
	<h1>Portfolio</h1>

	<p>Create and analyse portfolios using data from Yahoo Finance.</p>

	<Tabs />

	<slot />
{:else}
	<p>You need to <a href="/login">Login</a></p>
{/if}
