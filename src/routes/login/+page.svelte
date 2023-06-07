<script lang="ts">
	import { enhance } from '$app/forms'
	import { goto } from '$app/navigation'
	import type { ActionData } from './$types'

	export let form: ActionData

	// $: if (form?.success) goto('/port/lists')
</script>

<h1>Login</h1>

<form method="POST" use:enhance class="flex flex-col space-y-2">
	<input
		name="username"
		type="text"
		placeholder="Username"
		value={form?.username || 'chrishowes'}
		class="input input-bordered w-full"
	/>

	<input
		name="password"
		type="password"
		placeholder="Password"
		value={'password'}
		class="input input-bordered w-full"
	/>

	<button type="submit" class="btn btn-primary w-full">Login</button>
</form>

{#if form?.missingUsername}
	<p style="color: red;">Username is missing.</p>
{/if}

{#if form?.missingPassword}
	<p style="color: red;">Password is missing.</p>
{/if}

{#if form?.incorrect}
	<p style="color: red;">Incorrect username or password.</p>
{/if}

{#if form?.success}
	<p style="color: green;">Login success.</p>
	<a href="/port/lists" class="link">Go to Lists</a>
{/if}
