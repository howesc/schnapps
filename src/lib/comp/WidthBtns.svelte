<script lang="ts">
	const nums: number[] = [960, 480, 240, 120, 60, 20, 5]
	export let width: number
	// $: console.log('WidthBtns.svelte:', { width })
</script>

<div class="w-full">
	<div class="btn-group flex">
		{#each nums as num}
			<button
				type="button"
				on:click={() => (width = num)}
				class="btn btn-sm flex-1"
				class:btn-active={width === num}
			>
				{num}
			</button>
		{/each}
	</div>
</div>
