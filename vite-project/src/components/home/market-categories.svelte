<script>
	import MarketCategoriesItem from "./market-categories-item.svelte";
</script>

<div class="hidden md:block ">
	<h1
		class="bg-blue-primary text-white font-bold tracking-tight mb-4 text-center w-full py-2"
	>
		Popular categories
	</h1>
	<MarketCategoriesItem href="/" src="/market-1.jpg">
		Men clothing
	</MarketCategoriesItem>

	<MarketCategoriesItem href="/" src="/market-2.jpg">
		Winter clothing
	</MarketCategoriesItem>

	<MarketCategoriesItem href="/" src="/market-3.jpg">
		Home inventory
	</MarketCategoriesItem>
</div>
