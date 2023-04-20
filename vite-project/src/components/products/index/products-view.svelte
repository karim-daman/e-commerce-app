<script>
	import ProductsItem from "$components/shared/products-item.svelte";
</script>

<section
	class="col-span-full md:col-auto grid justify-center grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 grid-flow-row auto-rows-max"
>
	<ProductsItem
		offers
		src="home-products-1.jpg"
		href="/products/1"
		title="Blue T-shirt for Men"
		options="Sizes: S, M, L"
		price={20}
		offerPrice={15.9}
	/>

	<ProductsItem
		src="home-products-2.jpg"
		href="/products/1"
		title="Warm Winter Jacket"
		options="Sizes: S, M, L"
		price={72.9}
	/>

	<ProductsItem
		src="home-products-3.jpg"
		href="/products/1"
		title="Mens T-shirt Cotton Base"
		options="Blue, White, Black"
		price={29.98}
	/>

	<ProductsItem
		src="home-products-4.jpg"
		href="/products/1"
		title="Men's Denim Shorts Jeans"
		options="Blue, White, Black"
		price={75.5}
	/>

	<ProductsItem
		src="home-products-5.jpg"
		href="/products/1"
		title="Apple Watch Series 1 Sport Case 38mm Black"
		options="5GB, 10GB, 24GB"
		price={75.5}
	/>
</section>
