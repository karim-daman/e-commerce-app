<script>
	import FilterAccordian from "./filter-accordian.svelte";
	import FilterStar from "./filter-star.svelte";

	const ratings = [
		{ rating: 5, selected: false },
		{ rating: 4, selected: false },
		{ rating: 3, selected: false },
		{ rating: 2, selected: false },
		{ rating: 1, selected: false },
	];
</script>

<FilterAccordian class="!border-b rounded-b-[.25rem]" title="Ratings">
	<div>
		{#each ratings as item}
			<div class="flex gap-2 flex-row">
				<input
					id="rating-{item.rating}"
					bind:checked={item.selected}
					type="checkbox"
				/>

				<label for="rating-{item.rating}" class="flex gap-1 flex-row">
					{#each Array.from({ length: 5 }, (_, index) => index) as currentIndex}
						{#if currentIndex < item.rating}
							<!-- gold start -->
							<FilterStar class="text-yellow-500" />
						{:else}
							<!-- grey start -->
							<FilterStar class="text-gray-300" />
						{/if}
					{/each}
				</label>
			</div>
		{/each}
	</div>
</FilterAccordian>
