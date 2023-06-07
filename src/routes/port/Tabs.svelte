<script lang="ts">
	import { page } from '$app/stores'

	$: paths = $page.url.pathname.split('/')
</script>

<div class="tabs mb-6">
	<a class:selected={paths.length === 2 && paths[1] === encodeURI('port')} href="/port">Search</a>
	<a class:selected={paths.length === 3 && paths[2] === encodeURI('lists')} href="/port/lists"
		>Lists</a
	>
	<a class:selected={paths.length === 3 && paths[2] === encodeURI('test')} href="/port/test">Test</a
	>
</div>

<div class="divider" />

<style>
	a {
		@apply flex-1 tab tab-bordered uppercase;
	}
	.selected {
		@apply bg-neutral text-primary rounded-t-lg font-semibold;
	}
</style>
