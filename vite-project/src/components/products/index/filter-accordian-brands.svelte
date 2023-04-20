<script>
	import FilterAccordianBrandsItem from "./filter-accordian-brands-item.svelte";
	import FilterAccordian from "./filter-accordian.svelte";

	const items = [
		{ name: "Mercedes", length: 120, selected: false },
		{ name: "Toyota", length: 15, selected: false },
		{ name: "Mitsubishbi", length: 35, selected: false },
		{ name: "Nissan", length: 89, selected: false },
		{ name: "Honda", length: 30, selected: false },
		{ name: "Honda Accord", length: 30, selected: false },
	];
</script>

<FilterAccordian title="Brands">
	<div class="flex flex-col gap-1">
		{#each items as item}
			<FilterAccordianBrandsItem
				name={item.name}
				length={item.length}
				bind:selected={item.selected}
			/>
		{/each}
	</div>
</FilterAccordian>
