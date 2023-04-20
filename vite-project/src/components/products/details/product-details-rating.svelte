<script lang="ts">
	import Star from "$components/products/details/product-details-star.svelte";
	import CancelRating from "$components/products/details/product-details-cancel-raiting.svelte";
	export let rating: number = 0;
	let hoverRating = 0;

	let stars = [
		{ id: 1, title: "One Star" },
		{ id: 2, title: "Two Stars" },
		{ id: 3, title: "Three Stars" },
		{ id: 4, title: "Four Stars" },
		{ id: 5, title: "Five Stars" },
	];

	const handleHover = (id: number) => () => {
		hoverRating = id;
	};
	const handleRate = (id: number) => (event: MouseEvent) => {
		if (
			rating &&
			event.target instanceof HTMLElement &&
			rating.toString() === event.target.dataset.starid
		) {
			return;
		}
		rating = id;
	};
</script>

<div class="flex items-center my-2 ">
	{#each stars as star (star.id)}
		<Star
			class="h-10 w-10 "
			filled={hoverRating ? hoverRating >= star.id : rating >= star.id}
			starId={star.id}
			on:mouseover={handleHover(star.id)}
			on:mouseleave={() => (hoverRating = 0)}
			on:click={handleRate(star.id)}
		/>
	{/each}
	<p class="ml-2 text-sm font-medium text-gray-500 ">
		{rating} out of 5
	</p>
	<button
		on:click={() => (rating = 0)}
		type="button"
		class="rounded-btn-shadow bg-red-500 text-white mx-2 rounded border-2 border-black"
	>
		<CancelRating />
	</button>
</div>
