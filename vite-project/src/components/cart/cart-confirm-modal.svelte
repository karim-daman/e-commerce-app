<script lang="ts">
	import { fade } from "svelte/transition";
	import Modal from "$components/shared/modal.svelte";

	export let open = false;
	export let onCancel: () => void;
	export let onDelete: () => void;
</script>

<Modal class="z-20 grid px-5 md:px-0" bind:open>
	<div
		transition:fade
		class="max-w-[500px] md:text-center h-[250px] grid grid-cols-1 grid-rows-[repeat(2,max-content),1fr] w-full place-self-center text-black p-4 pt-8 bg-white rounded-[.25rem]"
	>
		<h1 class="text-[1.1rem] md:text-[1.4rem] font-bold">
			This will Delete everything in your cart
		</h1>
		<p class="mt-1">is this really what you want to do?</p>

		<div class="self-end flex w-full gap-4 justify-end">
			<button
				class="py-[6px] px-[14px] text-white bg-blue-primary rounded-[.25rem]"
				on:click={onCancel}>Cancel</button
			>
			<button
				class="py-[6px] px-[14px] text-white bg-red-500 rounded-[.25rem]"
				on:click={onDelete}>Delete all</button
			>
		</div>
	</div>
</Modal>
