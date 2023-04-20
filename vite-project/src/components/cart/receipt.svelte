<script lang="ts">
	import ReceiptInfo from "./receipt-info.svelte";

	export let handleProgress: (arg0: number) => void;
	export let receipt: HTMLElement;
	const total_price = 329;
	const discount = -60;
	const tax = 14;

	const total = total_price + discount + tax;
</script>

<section
	bind:this={receipt}
	id="receipt"
	class="p-5 self-start flex h-max text-grey-secondary leading-[1.5] flex-col gap-[5px] rounded-[.25rem] border">
	<ReceiptInfo title="Total Price" value={total_price} />
	<ReceiptInfo class="text-[#00a524]" title="Discount" value={discount} />
	<ReceiptInfo title="TAX" value={tax} />
	<hr class="my-[11px]" />
	<ReceiptInfo
		class="font-bold text-[#212529] text-[1.25rem]"
		title="Total"
		value={total} />

	<button
		class="rounded-btn-shadow text-white px-[14px] mt-[11px] mb-4 py-[7px] bg-[#0b5ed7] rounded-[.25rem]"
		on:click={() => {
			handleProgress(+1);
		}}>Make Purchase</button>
</section>
