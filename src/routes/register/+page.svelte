<script lang="ts">
	import { enhance } from '$app/forms'
	import type { ActionData } from './$types'

	export let form: ActionData
</script>

<h1>Register</h1>

<form method="POST" use:enhance class="flex flex-col space-y-2">
	<input
		name="username"
		type="text"
		placeholder="Username"
		value={form?.username || ''}
		class="input input-bordered w-full"
	/>

	<input
		name="password"
		type="password"
		placeholder="Password"
		value={''}
		class="input input-bordered w-full"
	/>

	<button type="submit" class="btn btn-primary w-full">Register</button>
</form>

{#if form?.missingUsername}
	<p style="color: red;">Username is missing.</p>
{/if}

{#if form?.missingPassword}
	<p style="color: red;">Password is missing.</p>
{/if}
