<script lang="ts">
	import CartConfirmModal from "./cart-confirm-modal.svelte";
	import CartItem from "./cart-item.svelte";

	let confirmCartOpen = false;
	const onCartConfirmOpen = () => (confirmCartOpen = true);
	const onCartConfirmCancel = () => (confirmCartOpen = false);
	const onCartConfirmDelete = () => {
		console.log("this will clear cart at some point");
		onCartConfirmCancel();
	};
</script>

<section
	class="row-start-2 h-max row-end-3 lg:row-start-1 lg:row-end-3 border rounded-[.25rem] grid gap-x-5 sm:gap-x-10 gap-y-2 sm:gap-y-4 grid-cols-[minmax(0,1fr),minmax(0,max-content)] sm:grid-cols-[2fr,minmax(100px,20ch),1fr,max-content] grid-flow-row auto-rows-max p-4">
	<h1 class="sr-only">Cart Items</h1>

	<h2 class="item-header hidden sm:block">Product</h2>
	<h2 class="item-header hidden sm:block">Quantity</h2>
	<h2 class="item-header hidden sm:block">Price</h2>
	<button
		class="self-start col-span-full sm:col-auto justify-self-end sm:py-1 sm:px-2 py-2 px-3 rounded-[.25rem] bg-red-500 text-white"
		on:click={onCartConfirmOpen}>
		<img class="w-7 sm:w-5 h-7 sm:h-5" src="/trash.svg" alt="" />
	</button>

	{#each Array.from({ length: 5 }) as _}
		<CartItem
			src="/home-products-1.jpg"
			title="Go Pro Cam"
			options="Size: XL, Colors, Blue"
			brand="Gucci"
			price={750} />
	{/each}
</section>

<CartConfirmModal
	bind:open={confirmCartOpen}
	onCancel={onCartConfirmCancel}
	onDelete={onCartConfirmDelete} />

<style lang="scss">
	.item-header {
		@apply uppercase mb-5 self-center font-bold text-gray-500 text-[.85rem] tracking-tight;
	}
</style>
