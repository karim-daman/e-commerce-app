<script lang="ts">
	export let src: string;
	export let title: string;
</script>

<div
	class="grid gap-y-2 gap-x-4 text-[15px] grid-cols-[max-content,1fr] grid-rows-[max-content,1fr]"
>
	<span
		class="w-12 h-12 row-span-2 font-bold grid place-content-center rounded-full bg-[color:var(--bg)]"
	>
		<img {src} alt="" />
	</span>

	<h1>{title}</h1>
	<p class="text-black/60">
		<slot />
	</p>
</div>
