<script lang="ts">
	import { fade } from "svelte/transition";
	export let transIn: (node: Element, options: any) => any = fade;
	export let transOut: (node: Element, options: any) => any = fade;
</script>

<form
	class="place-self-center bg-blue-100 container mx-auto rounded-md max-w-sm m-10 {$$props.class}"
	on:submit|preventDefault
	in:transIn
	out:transOut
>
	<slot />
</form>
