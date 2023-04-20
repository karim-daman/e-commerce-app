<script lang="ts">
	import DropdownBox from "./dropdown-box.svelte";
	import ProductsHamburger from "./products-hamburger.svelte";
	import { clickOutside } from "svelte-use-click-outside";
	import { isMobile } from "$lib/store/index";

	let open = false;
	const toggle = () => (open = !open);
	const onEscape = () => (open = false);
	const onKeyUp = (event: KeyboardEvent) => {
		if (event.key === "Escape") onEscape();
	};

	const choices = {
		none: "None",
		cart: "Add to Cart",
		watch: "Add to Watch list",
	};

	let selected = "none" as keyof typeof choices;

	$: {
		selected;
		open = false;
	}
</script>

<svelte:window on:keyup={onKeyUp} />

<div class="col-start-2 col-end-3 relative" use:clickOutside={onEscape}>
	<button
		class="text-grey-secondary p-[6px] py-2 grid place-content-center rounded-[.25rem] border border-[rgba(81,88,94,.12)] hover:text-blue-primary mr-4"
		on:click={toggle}
	>
		<ProductsHamburger class="h-4 transform translate-y-[-3px]" />
	</button>

	{#if open}
		<DropdownBox
			--left={$isMobile && "auto"}
			--right={$isMobile && "16px"}
			{choices}
			bind:selected
		/>
	{/if}
</div>
