<script lang="ts">
	import { hold } from "$lib/action/hold";
	import CartClose from "./cart-close.svelte";
	import Minus from "$components/products/details/product-details-minus.svelte";
	import Plus from "$components/products/details/product-details-plus.svelte";

	export let src: string;
	export let title: string;
	export let options: string;
	export let brand: string;
	export let price: number;
	export let quantity = 1;

	const min = 1;
	$: totalItemPrice = price * quantity;
	const formater = new Intl.NumberFormat("en-GB", {
		currency: "USD",
		style: "currency",
		maximumFractionDigits: 2,
		currencyDisplay: "narrowSymbol",
	});

	const dec = () => quantity > min && quantity--;
	const inc = () => quantity++;
</script>

<div
	class="grid gap-x-2 col-span-full sm:col-auto grid-cols-1 sm:grid-cols-[max-content,1fr]"
>
	<img
		class="sm:row-span-full justify-self-center sm:w-[72px] sm:h-[72px]"
		{src}
		alt=""
	/>
	<div
		class="grid grid-cols-[minmax(0,1fr),minmax(0,max-content)] sm:grid-cols-none grid-flow-row auto-rows-max"
	>
		<a class="underline font-normal text-[1rem] text-black" href="/"
			>{title}</a
		>
		<button class="grid sm:hidden close-button">
			<CartClose class="w-5 h-5" />
		</button>
		<p class="sm-desc mt-1">{options}</p>
		<p class="sm-desc col-span-full">{brand}</p>
	</div>
</div>

<div
	class="w-full h-min grid grid-cols-[minmax(0,max-content),minmax(0,1fr),minmax(0,max-content)] gap-2"
>
	<button
		use:hold={dec}
		class="rounded-btn-shadow text-left p-1 border hover:text-blue-primary rounded-[.25rem]"
	>
		<Minus />
	</button>
	<input
		class="border self-center sm:self-start border-black rounded-[.25rem] h-full sm:h-min p-1 px-3 transition-colors"
		bind:value={quantity}
		type="number"
		{min}
	/>
	<button
		use:hold={inc}
		class="rounded-btn-shadow text-left hover:text-blue-primary p-1 border rounded-[.25rem] transition-colors"
	>
		<Plus />
	</button>
</div>

<div>
	<h3 class="font-bold">{formater.format(totalItemPrice)}</h3>
	<p class="text-gray-500 text-[.85rem]">{formater.format(price)} each</p>
</div>

<button class=" rounded-btn-shadow hidden sm:grid close-button">
	<CartClose class="w-5 h-5" />
</button>

<style lang="scss">
	.sm-desc {
		@apply text-[.75rem] text-gray-500;
	}

	input[type="number"] {
		-moz-appearance: textfield;
	}

	input[type="number"]::-webkit-inner-spin-button,
	input[type="number"]::-webkit-outer-spin-button {
		-webkit-appearance: none;
	}

	.close-button {
		@apply bg-red-500 place-items-center px-2 py-1 self-start text-white rounded-[.25rem];
	}
</style>
