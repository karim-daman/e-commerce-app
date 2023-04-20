<script lang="ts">
	import type { Slots } from "$lib/types/type";
	import type { SvelteComponentDev } from "svelte/internal";

	export let steps: Slots<SvelteComponentDev>[] = [];
	export let currentActive: number = 1;
	let circles: NodeListOf<HTMLDivElement>;
	let progress: HTMLDivElement;

	export const handleProgress = (stepIncrement: number) => {
		circles = document.querySelectorAll(".circle");
		if (stepIncrement == 1) {
			currentActive++;

			if (currentActive > circles.length) {
				currentActive = circles.length;
			}
		} else {
			currentActive--;

			if (currentActive < 1) {
				currentActive = 1;
			}
		}
		update();
	};

	function update() {
		circles.forEach((circle, idx) => {
			if (idx < currentActive) {
				circle.classList.add("active");
			} else {
				circle.classList.remove("active");
			}
		});

		const actives = document.querySelectorAll(".active");

		progress.style.width =
			((actives.length - 1) / (circles.length - 1)) * 100 + "%";
	}
</script>

<div class="progress-container ">
	<div class="progress " bind:this={progress} />
	{#each steps as step, i}
		<div class="circle {i == 0 ? 'active' : ''}" data-title={step.title}>
			<svelte:component
				this={step.icon}
				class={i > currentActive - 1 ? "" : "text-green-400"} />
		</div>
	{/each}
</div>

<style>
	.progress-container {
		display: flex;
		justify-content: space-between;
		position: relative;
		max-width: 100%;
		width: 80%;
	}

	.progress-container::before {
		content: "";
		background-color: #e0e0e0;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		height: 4px;
		width: 100%;
		z-index: -1;
	}

	.progress {
		background-color: #50c878;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		height: 4px;
		width: 0%;
		z-index: -1;
		transition: 0.4s ease;
	}

	.circle {
		background-color: #fff;
		color: #999;
		border-radius: 50%;
		height: 35px;
		width: 35px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 3px solid #e0e0e0;
		transition: 0.4s ease;
		cursor: pointer;
	}

	.circle::after {
		content: attr(data-title) " ";
		position: absolute;
		bottom: 35px;
		color: #999;
		transition: 0.4s ease;
	}

	.circle.active::after {
		color: #50c878;
	}

	.circle.active {
		border-color: #50c878;
	}
</style>
