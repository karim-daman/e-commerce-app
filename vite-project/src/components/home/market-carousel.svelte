<script lang="ts">
	import embla from "svelte-embla";
	import { writable } from "svelte/store";
	import type { EmblaCarouselType } from "embla-carousel";
	import AutoPlay from "embla-carousel-autoplay";

	const carousel = writable<EmblaCarouselType>();
	const autoplay = AutoPlay({ delay: 4000 });
	const onSettle = () => {
		autoplay.reset();
	};

	const onLeft = () => $carousel?.canScrollPrev() && $carousel?.scrollPrev();
	const onRight = () => $carousel?.canScrollNext() && $carousel?.scrollNext();

	const onKeyUp = (event: KeyboardEvent) => {
		if (event.key === "ArrowLeft") onLeft();
		if (event.key === "ArrowRight") onRight();
	};

	const onMouseEnter = () => {
		window.addEventListener("keyup", onKeyUp);
	};

	const onMouseLeave = () => {
		window.removeEventListener("keyup", onKeyUp);
	};
</script>

<div class="relative" on:mouseenter={onMouseEnter} on:mouseleave={onMouseLeave}>
	<div
		class="overflow-hidden h-full"
		on:e-settle={onSettle}
		use:embla={{ store: carousel, loop: true, plugins: [autoplay] }}
	>
		<div class="grid grid-flow-col auto-cols-[100%] h-full grid-rows-1">
			<div class="relative w-full h-full">
				<img
					class="w-full h-full object-cover"
					src="/slide1.jpg"
					alt=""
				/>
			</div>
			<div class="relative w-full h-full">
				<img
					class="w-full h-full object-cover"
					src="/slide2.jpg"
					alt=""
				/>
			</div>
			<div class="relative w-full h-full">
				<img
					class="w-full h-full object-cover"
					src="/slide3.jpg"
					alt=""
				/>
			</div>
		</div>
	</div>

	<button on:click={onLeft} class="absolute top-1/2 left-10">
		<img
			src="/double-arrow-left.svg"
			class="w-5 h-5"
			draggable="false"
			alt=""
		/>
	</button>
	<button on:click={onRight} class="absolute top-1/2 right-10">
		<img
			src="/double-arrow-right.svg"
			class="w-5 h-5"
			draggable={false}
			alt=""
		/>
	</button>
</div>
