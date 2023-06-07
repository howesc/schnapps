<script>
	export let label = ''
	export let value = 0.0
</script>

<div class="tooltip" data-tip={label}>
	<div class="ind" class:green={value > 0} class:red={value < 0}>
		<span class="units">{Math.abs(value).toFixed(1).split('.')[0]}</span>
		<span class="decimals">.{value.toFixed(1).split('.')[1]}</span>
	</div>
</div>

<style>
	.ind {
		@apply h-6 w-10 flex items-center rounded-full border-base-300;
	}
	.units {
		font-size: 1.125rem;
		line-height: 1.125rem;
		font-weight: bold;
	}
	.decimals {
		font-size: 0.75rem;
		line-height: 0.75rem;
		font-weight: light;
	}
	.green {
		color: green;
	}
	.red {
		color: red;
	}
</style>
