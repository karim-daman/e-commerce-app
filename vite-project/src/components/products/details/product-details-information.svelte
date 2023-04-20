<script lang="ts">
	import Plus from "$components/products/details/product-details-plus.svelte";
	import Minus from "$components/products/details/product-details-minus.svelte";
	import { hold } from "$lib/action/hold";

	export let quantity: number;

	const min_qty = 1;
	const max_qty = 50;

	const qty_increment = () => {
		if (++quantity > max_qty) quantity = max_qty;
	};

	const qty_decrement = () => {
		if (--quantity < min_qty) quantity = min_qty;
	};
</script>

<div class="mb-3 flex flex-col">
	<div class="text-xl">USD 750,00</div>
	<div class="text-xl">USD 787.5 incl. VAT</div>
</div>

<p>
	Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
	eiusmod tempor incididunt ut labore et dolore magna aliqua. ipsum dolor sit
	amet, consectetur adipiscing elit.
</p>

<hr class="my-4" />

<table class="grid grid-cols-[max-content,1fr] items-center gap-2 my-2">
	<th class="text-left"> Brand </th>
	<a class="justify-self-end" href="/">
		<td class="hover:underline hover:text-blue-500"> Nike </td>
	</a>

	<th class="text-left"> Article number </th>
	<td class="justify-self-end"> 527378 </td>

	<th class="text-left"> Garantee </th>
	<td class="justify-self-end">2 years</td>

	<th class="text-left"> Delivary time </th>
	<td class="justify-self-end"> 3-4 days </td>

	<th class="text-left"> Availability </th>
	<td class="justify-self-end">
		<dd class="col-sm-9 text-green-600">In Stock!</dd>
	</td>

	<th class="text-left">Quantity</th>
	<td class="justify-self-end ">
		<dd class="flex h-10">
			<button
				class=" shadow-xl active:shadow-none h-10 w-10 flex flex-row mx-px text-black px-[10px]  mb-4 py-[7px]  rounded-[.25rem] border"
				use:hold={qty_decrement}
			>
				<Minus class="self-center" />
			</button>
			<input
				type="number"
				class="border rounded w-20 mx-2 h-10 px-2"
				placeholder="Quantity"
				bind:value={quantity}
			/>
			<button
				class="shadow-xl active:shadow-none h-10 w-10 flex flex-row mx-px text-black px-[10px] mb-4 py-[7px]  rounded-[.25rem] border"
				use:hold={qty_increment}
			>
				<Plus class="self-center" />
			</button>
		</dd>
	</td>
</table>

<hr />

<style lang="scss">
	input[type="number"] {
		-moz-appearance: textfield;
	}

	input[type="number"]::-webkit-inner-spin-button,
	input[type="number"]::-webkit-outer-spin-button {
		-webkit-appearance: none;
	}
</style>
