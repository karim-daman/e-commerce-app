<script lang="ts">
	import NavbarMainSearchDropdown from "$components/shared/navbar-main-search-dropdown.svelte";
	import NavBarSearchIcon from "$components/shared/navbar-search-icon.svelte";

	const choices = {
		all: "All type",
		special: "Special",
		only: "Only best",
		latest: "Latest",
	};

	let selected = "all" as keyof typeof choices;
</script>

<form
	class="grid grid-cols-[minmax(0,1fr),minmax(0,max-content),minmax(0,max-content)] col-span-2 lg:col-auto text-[15px]"
	on:submit|preventDefault
>
	<input
		class="rounded-l-[.25rem] border border-[#ced4da] px-3 text-black/50 placeholder:text-black/50 focus:outline focus:outline-[3px] focus:outline-[#86b7fe]/50 py-[6px]"
		placeholder="Search"
		type="text"
	/>
	<NavbarMainSearchDropdown bind:selected {choices} />
	<button
		class="text-white bg-blue-primary hover:bg-blue-700 transition-colors rounded-r-[.25rem] px-3 grid place-content-center"
	>
		<NavBarSearchIcon class="w-[15px] h-[15px]" />
	</button>
</form>
