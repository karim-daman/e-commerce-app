<script lang="ts">
	import Receipt from "$components/cart/receipt.svelte";
	import Coupon from "$components/cart/coupon.svelte";
	import CartList from "$components/cart/cart-list.svelte";
	import ReceiptIcon from "$components/cart/receipt-icon.svelte";

	let receipt: HTMLElement;
	export let handleProgress: (arg0: number) => void;

	const scrollToReceipt = () => {
		const rect = receipt.getBoundingClientRect();
		const top = rect.top - window.innerHeight / 2 + rect.height / 2;
		window.scrollBy({
			top,
			behavior: "smooth",
		});
	};
</script>

<main
	class="w-full grid-container px-5 lg:px-0 grid lg:grid-cols-[1fr,minmax(0,308px)] lg:grid-rows-[110px,1fr] my-10 gap-x-5 gap-y-4">
	<CartList />
	<Coupon />
	<Receipt bind:receipt bind:handleProgress />

	<button
		class="sm:hidden text-white bg-blue-primary p-3 rounded-full fixed z-20 border border-black bottom-10 left-5 "
		on:click={scrollToReceipt}>
		<ReceiptIcon />
	</button>
</main>
