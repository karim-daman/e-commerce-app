<script lang="ts">
	import { v4 } from "uuid";

	let id = v4();
	export let checked: boolean;
</script>

<div>
	<input bind:checked class="hidden peer" {id} type="checkbox" />
	<label
		class="py-[7px] cursor-pointer text-[#212529] peer-checked:border-[#0d6efd] peer-checked:bg-[#e9ecef] hover:text-[#0d6efd] hover:bg-[#f9fafb] transition-colors peer-checked:text-[#0d6efd] hover:border-[#c1c9d0] border border-[#dee2e6] rounded-[.25rem] px-[14px]"
		for={id}
	>
		<slot />
	</label>
</div>
