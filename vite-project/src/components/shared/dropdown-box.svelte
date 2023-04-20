<script lang="ts">
	export let choices: { [key: string]: string } = {};
	$: keys = Object.keys(choices);

	export let selected = keys[0] ?? null;
	const onClick = (key: string) => () => (selected = key);
</script>

<div
	class="absolute z-10 top-[calc(100%+var(--dropdown-offset,0px))] bg-white left-[var(--left,0)] right-[var(--right,auto)] min-w-max w-full max-w-full translate-x-[var(--translate-x,0)] py-1 rounded-[.25rem] grid grid-flow-row border border-black/[.15]"
>
	{#each keys as key}
		<button
			class="px-4 text-[#1e2125] w-full min-w-max font-normal hover:bg-[#e9ecef] py-1 text-[15px] text-left"
			class:isSelected={selected === key}
			on:click={onClick(key)}
			type="button">{choices[key]}</button
		>
	{/each}
</div>

<style lang="scss">
	div {
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.175);
	}

	.isSelected,
	.isSelected:hover {
		@apply bg-[#0b5ed7] text-white;
	}
</style>
