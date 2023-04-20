<script lang="ts">
	export let type: "button" | "submit" = "button";
</script>

<button
	class="rounded-[.25rem] bg-indigo-500 text-sm px-4 py-2 {$$props.class}"
	{type}
>
	<slot />
</button>
