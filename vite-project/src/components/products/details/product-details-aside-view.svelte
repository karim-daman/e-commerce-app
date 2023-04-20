<script lang="ts">
	import Heart from "$components/products/details/product-details-heart.svelte";
	import Drift from "drift-zoom";
	import { onMount } from "svelte";

	let triggerZone: HTMLImageElement;
	let displayContainer: HTMLDivElement;

	onMount(() => {
		const options = {
			handleTouch: false,
		};

		new Drift(triggerZone, {
			...options,
			paneContainer: displayContainer,
		});
	});

	const handleChangeImage = (index: number) => {
		console.log("clicked on index " + index);
	};
</script>

<article
	id="detail"
	class=" flex justify-center max-w-[660px] w-full px-5 md:px-0"
>
	<div
		class="thumbs-wrap  w-[100px] h-[500px] overflow-x-auto grid gap-[0.3rem]"
	>
		{#each Array.from({ length: 12 }) as _, i}
			<button on:click={() => handleChangeImage(i)}>
				<img
					draggable="false"
					src="/home-products-2.jpg"
					class="border rounded-sm object-cover"
					alt="thumbnail"
				/>
			</button>
		{/each}
	</div>

	<div class="relative" bind:this={displayContainer}>
		<img
			draggable="false"
			class=" h-[500px] w-[500px]  border rounded object-cover"
			src="/home-products-2.jpg"
			alt="product"
		/>

		<img
			bind:this={triggerZone}
			src="/home-products-2.jpg"
			data-zoom="/home-products-2.jpg"
			draggable="false"
			class="hidden sm:block absolute right-0 top-0 h-[500px] w-[500px]  border rounded object-cover"
			alt="temp"
		/>

		<div class="absolute top-0 right-4 z-10">
			<button
				class="rounded-btn-shadow bg-white flex flex-row mx-px text-white px-2.5 mt-[11px] mb-4 py-[7px] rounded-[.25rem] border"
			>
				<Heart class="text-red-600 z-10" />
			</button>
		</div>
	</div>
</article>

<style>
	::-webkit-scrollbar {
		width: 5px;
	}

	::-webkit-scrollbar-track {
		background: rgb(255, 255, 255);
	}

	::-webkit-scrollbar-thumb {
		background: rgb(74, 74, 74);
		border-radius: 50px;
	}

	::-webkit-scrollbar-thumb:hover {
		background: rgb(0, 100, 187);
	}

	:global(.drift-zoom-pane) {
		height: 500px;
		width: 500px;
	}

	:global(.drift-zoom-pane) img {
		object-fit: cover;
	}
</style>
