<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
	// $: console.log('+page data:', { data })
</script>

{#if data.user}
	<div class="grid">
		<a href="/port">
			<article>Port</article>
		</a>
	</div>
{:else}
	<p>You need to <a href="/login">Login</a>.</p>
{/if}
