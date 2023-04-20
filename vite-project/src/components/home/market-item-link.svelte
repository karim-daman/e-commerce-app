<script lang="ts">
	export let href: string;
</script>

<a
	class="pb-[10px] border-b font-normal text-[15px] text-black/80 hover:text-blue-primary transition-colors mt-[10px] border-[#e5e7ea]"
	{href}
>
	<slot />
</a>
