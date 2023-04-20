<script lang="ts">
	import Reviews from "$components/products/details/product-details-information-section-review.svelte";
	import Specifications from "$components/products/details/product-details-information-section-specifications.svelte";
	import SellerDetails from "$components/products/details/product-details-information-section-seller-details.svelte";

	const TabOptions = ["Review", "Specification", "Seller"] as const;
	type Options = typeof TabOptions[number];
	let tab: Options = "Review";
	const selectTab = (option: Options) => (tab = option);
</script>

<ul class="flex flex-wrap mb-px">
	{#each TabOptions as option}
		<li class="mr-2">
			<button
				href="#"
				class="inline-block p-4  rounded-t-lg border-b-2 border-transparent {tab ===
				option
					? 'border-blue-600 text-blue-600 active'
					: 'hover:text-gray-600 hover:border-gray-300 '}"
				aria-current="page"
				on:click={() => selectTab(option)}
			>
				{option}
			</button>
		</li>
	{/each}
</ul>

<div class="flex md:pr-4 flex-col">
	{#if tab === "Review"}
		<Reviews />
	{:else if tab === "Seller"}
		<SellerDetails />
	{:else if tab === "Specification"}
		<Specifications />
	{/if}
</div>
