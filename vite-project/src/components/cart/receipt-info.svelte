<script lang="ts">
	export let title: string;
	export let value: number;

	const formater = new Intl.NumberFormat("en-GB", {
		currency: "USD",
		style: "currency",
		maximumFractionDigits: 2,
		currencyDisplay: "narrowSymbol",
	});
</script>

<dl class="w-full flex items-center justify-between">
	<dt>{title}:</dt>
	<dd class={$$props.class}>{formater.format(value)}</dd>
</dl>
