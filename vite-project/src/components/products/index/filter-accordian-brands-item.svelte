<script lang="ts">
	export let name: string;
	export let length: number;
	export let selected: boolean;
</script>

<div class="grid gap-2 items-center grid-cols-[repeat(2,max-content),1fr]">
	<input
		class="w-[1rem] h-[1rem] border rounded-none"
		id="brands-{name}"
		bind:checked={selected}
		type="checkbox"
	/>
	<label class="text-[#51585e]" for="brands-{name}">{name}</label>

	<p
		class="justify-self-end text-white bg-[#9da1a7] text-[.83rem] px-[10px] rounded-full"
	>
		{length}
	</p>
</div>
