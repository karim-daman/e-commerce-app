<script lang="ts">
	import ProductsDropdown from "./products-dropdown.svelte";
	import ProductsHeartIcon from "./products-heart-icon.svelte";

	export let offers = false;
	export let src: string;
	export let href: string;

	export let title: string;
	export let options: string;
	export let price: number;
	export let offerPrice = 0;

	const formater = Intl.NumberFormat("en-GB", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 2,
		currencyDisplay: "narrowSymbol",
	});
</script>

<div
	class="group relative grid grid-cols-[1fr,max-content] grid-flow-row pb-5 border border-[rgba(81,88,94,.12)] rounded-[.25rem] transition-shadow"
>
	<a
		{href}
		class="col-start-1 col-end-[-1] h-[240px] overflow-hidden justify-self-center row-start-1 row-end-2"
	>
		<img
			class="w-full h-full object-cover transition-transform group-hover:scale-[1.1] duration-200"
			draggable="false"
			{src}
			alt=""
		/>
	</a>

	<hr class="col-start-1 col-end-[-1] row-start-2 row-end-3 mb-5" />
	<a
		class="col-start-1 truncate text-grey-secondary hover:text-blue-primary mx-4 col-end-2 row-start-3 row-end-4"
		{href}>{title}</a
	>
	<p
		class="col-start-1 mx-4 col-end-2 text-[#9da1a7] text-[.82rem] row-start-4 row-end-5"
	>
		{options}
	</p>
	<p class="col-start-1 mx-4 col-end-2 row-start-5 row-end-6">
		{formater.format(offers ? offerPrice : price)}

		{#if offers}
			<span class="text-[#9da1a7] line-through text-[.9em]"
				>{formater.format(price)}</span
			>
		{/if}
	</p>

	<ProductsDropdown />

	{#if offers}
		<p
			class="absolute top-[10px] left-[15px] px-1 rounded-[.25rem] bg-[#00a524] text-white text-[.83rem]"
		>
			offers
		</p>
	{/if}
</div>

<style lang="scss">
	div {
		box-shadow: 0 1px 2px rgba(51, 51, 51, 0.07);
		&:hover {
			box-shadow: 0 3px 10px rgba(51, 51, 51, 0.1);
		}
	}
</style>
