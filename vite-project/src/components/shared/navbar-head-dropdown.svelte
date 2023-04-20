<script lang="ts">
	import DropdownBox from "./dropdown-box.svelte";
	import { clickOutside } from "svelte-use-click-outside";
	import NavbarHeadDropdownCaret from "./navbar-head-dropdown-chevron.svelte";

	export let choices: { [key: string]: string } = {};
	export let selected: string;

	let open = false;
	$: {
		selected;
		open = false;
	}
	const onClick = () => (open = !open);
	const onEscape = () => (open = false);

	const onKeyUp = (event: KeyboardEvent) => {
		if (event.key === "Escape") onEscape();
	};
</script>

<svelte:window on:keyup={onKeyUp} />

<div
	use:clickOutside={onEscape}
	class="relative text-black/50 hover:text-black/80 transition-colors {$$props.class}"
>
	<button
		class="font-normal text-[15px] flex items-center gap-1 justify-items-center"
		type="button"
		on:click={onClick}
	>
		<slot />
		<NavbarHeadDropdownCaret
			class="w-2 h-[6px] translate-y-1/4 transition-transform -rotate-90 {open &&
				'!-rotate-0'}"
		/>
	</button>
	{#if open}
		<DropdownBox --dropdown-offset="6px" bind:selected {choices} />
	{/if}
</div>
