<script lang="ts">
	import DropdownBox from "$components/shared/dropdown-box.svelte";
	import MarketItemLink from "./market-item-link.svelte";
	import { clickOutside } from "svelte-use-click-outside";
	import NavbarHeadDropdownCaret from "$components/shared/navbar-head-dropdown-chevron.svelte";

	let open = false;
	const onClick = () => (open = !open);
	const onEscape = () => (open = false);
	const onKeyUp = (event: KeyboardEvent) => {
		if (event.key === "Escape") onEscape();
	};

	const items = [
		"Fashion and clothes",
		"Automobile and motors",
		"Gardening and agriculture",
		"Electronics and tech",
		"Packaginf and printing",
		"Home and kitchen",
		"Digital goods",
		"Fashion and clothes",
		"Automobile and motors",
		"Gardening and agriculture",
		"Electronics and tech",
		"Packaginf and printing",
		"Home and kitchen",
		"Digital goods",
	];

	const itemsChoices = Object.fromEntries(items.entries());
	let selected = "0";

	$: {
		selected;
		open = false;
	}
</script>

<svelte:window on:keyup={onKeyUp} />

<!--Mobile Dropdown -->
<div use:clickOutside={onEscape} class="md:hidden relative">
	<button
		class="flex justify-between items-center w-full rounded-[.25rem] border border- p-[10px]"
		on:click={onClick}
	>
		My Markets
		<NavbarHeadDropdownCaret class="w-[13px] h-[15px]" />
	</button>
	{#if open}
		<DropdownBox bind:selected choices={itemsChoices} />
	{/if}
</div>

<!-- Tabelt/Dekstop Scrollable -->
<div
	class="tablet-scroll hidden md:grid overflow-y-scroll max-h-full  grid-flow-row auto-rows-max"
>
	<h1 class="font-bold uppercase tracking-tight mb-1 text-black/90">
		My Markets
	</h1>

	{#each items as item}
		<MarketItemLink href="/">{item}</MarketItemLink>
	{/each}
</div>

<style>
	div.md\:hidden {
		box-shadow: 0px 2px 3px rgba(102, 102, 102, 0.1);
	}

	.tablet-scroll,
	.tablet-scroll:hover {
		scrollbar-color: rgb(74, 74, 74) white;
		scrollbar-width: 50px;
	}

	::-webkit-scrollbar {
		@apply w-[5px];
	}

	::-webkit-scrollbar-track {
		@apply bg-white;
	}

	::-webkit-scrollbar-thumb {
		@apply rounded-[50px] bg-[rgb(74,74,74)];
	}

	::-webkit-scrollbar-thumb:hover {
		@apply bg-[rgb(0,100,187)];
	}
</style>
