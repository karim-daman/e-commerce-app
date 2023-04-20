<script lang="ts">
	import ProductsItem from "$components/shared/products-item.svelte";
</script>

<section
	class="grid grid-container gap-5 grid-cols-[repeat(auto-fit,minmax(0,308px))] my-10 px-5 md:px-0 grid-flow-row w-full justify-center lg:justify-start"
>
	<h1
		class="col-span-full text-center md:text-left w-full text-[1.75rem] font-bold mb-4"
	>
		New Products
	</h1>

	<ProductsItem
		offers
		src="home-products-1.jpg"
		href="/"
		title="Blue T-shirt for Men"
		options="Sizes: S, M, L"
		price={20}
		offerPrice={15.9}
	/>

	<ProductsItem
		src="home-products-2.jpg"
		href="/"
		title="Warm Winter Jacket"
		options="Sizes: S, M, L"
		price={72.9}
	/>

	<ProductsItem
		src="home-products-3.jpg"
		href="/"
		title="Mens T-shirt Cotton Base"
		options="Blue, White, Black"
		price={29.98}
	/>

	<ProductsItem
		src="home-products-4.jpg"
		href="/"
		title="Men's Denim Shorts Jeans"
		options="Blue, White, Black"
		price={75.5}
	/>

	<ProductsItem
		src="home-products-5.jpg"
		href="/"
		title="Apple Watch Series 1 Sport Case 38mm Black"
		options="5GB, 10GB, 24GB"
		price={75.5}
	/>
</section>
