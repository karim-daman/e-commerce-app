<script lang="ts">
	import FilterAccordian from "./filter-accordian.svelte";
</script>

<FilterAccordian class="rounded-t-[.25rem] " title="Related Items">
	<div class="w-full h-full flex gap-1 flex-col">
		<a href="/">Electronics</a>
		<a href="/">Home items</a>
		<a href="/">Books, Magazines</a>
		<a href="/">Men's clothing</a>
		<a href="/">Interiors items</a>
		<a href="/">Underwears</a>
		<a href="/">Shoes for men</a>
		<a href="/">Accessories</a>
	</div>
</FilterAccordian>

<style lang="scss">
	a {
		@apply text-[#51585e];

		&:hover {
			@apply text-[#0d6efd];
		}
	}
</style>
