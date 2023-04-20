<script lang="ts">
	export let href: string;
	export let src: string;
</script>

<div
	class="grid grid-cols-[1fr,max-content] gap-2 mt-4 grid-rows-[max-content,1fr]"
>
	<h1 class="tracking-tighter font-bold text-black text-[16px]">
		<slot />
	</h1>
	<a
		class="text-white text-[15px] justify-self-start py-[2px] px-3 rounded-[.25rem] self-start bg-blue-primary hover:bg-blue-700 transition-colors"
		{href}>Source</a
	>
	<img
		draggable="false"
		class="col-start-2 col-end-3 row-start-1 row-end-[-1] w-20 h-20"
		{src}
		alt=""
	/>
</div>
