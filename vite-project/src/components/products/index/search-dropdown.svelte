<script lang="ts">
	import DropdownBox from "$components/shared/dropdown-box.svelte";
	import { clickOutside } from "svelte-use-click-outside";
	import { browser } from "$app/env";
	import { isMobile } from "$lib/store/index";
	let open = false;

	const options = {
		electronics: "Electronics",
		automoties: "Automotive Parts & Accessories",
		grocieries: "Groceries",
		arts: "Arts, Crafts & Sewing",
		home: "Home & Kitchen",
		office: "Office supplies",
		pet: "Pet supplies",
		books: "Books",
		clothing: "Clothing",
		beauty: "Beauty & Personal Care",
		toys: "Toys & Games",
		garden: "Garden & Outdoor",
		excerise: "Exercise/Fitness supplies",
		mediccine: "Over-the-counter medicine",
		cleaning: "Cleaning supplies",
		vitamins: "Vitamins & Dietary Supplements",
		furniture: "Furniture",
		jewerly: "Jewelry",
		watches: "Watches",
		sports: "Sports",
		tools: "Tools",
		music: "Music",
		cars: "Cars",
	};

	let selected = "electronics" as keyof typeof options;
	const toggle = () => (open = !open);
	const onEscape = () => (open = false);
	const onKeyUp = (event: KeyboardEvent) => {
		if (event.key === "Escape") onEscape();
	};

	let dropdownButton: HTMLButtonElement;
	let width = options[selected].length;

	$: if (browser && selected && dropdownButton) {
		width = options[selected].length;
	}

	$: shouldRightAlign = $isMobile || width < 10;
</script>

<svelte:window on:keyup={onKeyUp} />

<div use:clickOutside={onEscape} class="w-full relative">
	<button
		type="button"
		on:click={toggle}
		style:--width="{width + 2}ch"
		class="font-normal text-xs md:text-base w-[15ch] sm:w-[var(--width,89px)] transition-all text-grey-secondary border-y h-full truncate capitalize p-1"
		bind:this={dropdownButton}
	>
		{options[selected] ?? "Select a Category"}
	</button>

	{#if open}
		<DropdownBox
			--left={shouldRightAlign && "auto"}
			--right={shouldRightAlign && "0px"}
			choices={options}
			bind:selected
		/>
	{/if}
</div>
