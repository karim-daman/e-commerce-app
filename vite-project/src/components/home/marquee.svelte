<script lang="ts">
	import { marquee } from "$lib/action/marquee";
</script>

<section
	class="relative parent-marquee w-full grid grid-flow-col auto-cols-[max-content] justify-self-center transition-transform overflow-hidden my-6"
	use:marquee={{ duration: 10 * 1000, direction: "rightToLeft", fill: true }}
>
	<div
		class="grid overflow-hidden grid-flow-col auto-cols-max will-change-transform place-items-center"
	>
		<img draggable="false" src="/github.svg" alt="" />
		<img draggable="false" src="/pnpm.svg" alt="" />
		<img draggable="false" src="/svelte-icon.svg" alt="" />
		<img draggable="false" src="/tailwindcss-icon.svg" alt="" />
		<img draggable="false" src="/tsnode.svg" alt="" />
	</div>
</section>

<style lang="scss">
	img {
		@apply mx-10 w-20 select-none pointer-events-none;
	}

	.parent-marquee::before,
	.parent-marquee::after {
		width: 100px;
		@apply h-full content-[''] absolute top-1/2 -translate-y-1/2;

		@media (min-width: 768px) {
			width: 300px;
		}
	}

	.parent-marquee::before {
		background: linear-gradient(
			-90deg,
			rgba(255, 255, 255, 0),
			rgba(255, 255, 255, 1)
		);
		@apply left-0 z-10;
	}

	.parent-marquee::after {
		background: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0),
			rgba(255, 255, 255, 1)
		);
		@apply right-0 z-10;
	}
</style>
