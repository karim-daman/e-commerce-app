<script>
	import FilterAccordianSizeCheckbox from "./filter-accordian-size-checkbox.svelte";
	import FilterAccordian from "./filter-accordian.svelte";

	const sizes = [
		{ name: "XS", selected: false },
		{ name: "SM", selected: false },
		{ name: "LG", selected: false },
		{ name: "XXL", selected: false },
	];
</script>

<FilterAccordian title="Size">
	<div class="flex flex-wrap gap-2">
		{#each sizes as size}
			<FilterAccordianSizeCheckbox bind:checked={size.selected}
				>{size.name}</FilterAccordianSizeCheckbox
			>
		{/each}
	</div>
</FilterAccordian>
