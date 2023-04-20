<script>
	import FilterAccordianBrands from "./filter-accordian-brands.svelte";
	import FilterAccordianRelated from "./filter-accordian-related.svelte";
	import FilterAccordianSize from "./filter-accordian-size.svelte";
	import FilterAccordianRating from "./fitler-accordian-rating.svelte";
	import FilterAccordianPricing from "./filter-accordian-pricing.svelte";
</script>

<section class="flex flex-col {$$props.class}">
	<FilterAccordianRelated />
	<FilterAccordianBrands />
	<FilterAccordianPricing />
	<FilterAccordianSize />
	<FilterAccordianRating />
</section>
