<script lang="ts">
	import '../app.css'
	import { user } from '$lib/stores.js'
	import type { PageData } from './$types'

	export let data: PageData
	$: $user = data.user
</script>

<div>
	<div>
		<nav class="navbar">
			<div class="flex-1">
				<a class="link link-hover link-primary text-2xl" href="/">
					<span style="color: white;">schn</span>apps
				</a>
			</div>
			<ul class="menu menu-horizontal px-1">
				{#if $user}
					<li><a class="link-hover" href="/logout">Logout</a></li>
				{:else}
					<li><a class="link-jover" href="/login">Login</a></li>
				{/if}
			</ul>
		</nav>
	</div>

	<slot />
</div>
