<script lang="ts">
	import NavbarSearchIcon from "$components/shared/navbar-search-icon.svelte";
	import SearchDropdown from "./search-dropdown.svelte";

	let search = "";
</script>

<section class="col-span-full md:col-auto w-full grid">
	<form
		class="grid grid-cols-[1fr,repeat(2,max-content)]"
		on:submit|preventDefault
	>
		<input
			class="w-full rounded-l-[.25rem] border px-2 h-full"
			placeholder="Search"
			bind:value={search}
			type="text"
		/>
		<SearchDropdown />

		<button
			type="button"
			class="border rounded-r-[.25rem] bg-gray-100 text-gray-500 hover:text-blue-primary transition-colors p-2"
		>
			<NavbarSearchIcon class="w-5 h-5" />
		</button>
	</form>

	<div class="border-b px-2 py-2">
		<p class="text-[.85rem]">5 Item(s) found</p>
	</div>
</section>
