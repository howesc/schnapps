<script lang="ts">
	import { goto } from '$app/navigation'
	import type { ActionData } from './$types'

	export let form: ActionData

	// $: if (form?.success) goto('/login')
</script>

<h1>Logout</h1>

<p>Are you sure you want to logout?</p>

<form method="POST">
	<button type="submit" class="btn btn-primary w-full">Logout</button>
</form>

{#if form?.success}
	<p style="color: green;">Logout success.</p>
	<a href="/login" class="link">Go to Login</a>
{/if}
