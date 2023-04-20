<script>
	import MarketCarousel from "./market-carousel.svelte";
	import MarketCategories from "./market-categories.svelte";
	import MarketItems from "./market-items.svelte";
</script>

<section
	class="grid-container my-4 border border-[#ebecf0] p-5 gap-x-4 gap-y-4 w-full grid grid-cols-1 grid-rows-[max-content,1fr] md:grid-cols-[minmax(0,250px),1fr,minmax(0,275px)] md:grid-rows-[342px]"
>
	<h1 class="sr-only">Market</h1>

	<MarketItems />
	<MarketCarousel />
	<MarketCategories />
</section>
