<script lang="ts">
	export let title: string;
	export let items: {
		[item: string]: string | { href: string; icn: string }; // href
	};
</script>

<div>
	<h2
		class="mb-6 text-sm font-semibold text-center md:text-left text-gray-900 uppercase"
	>
		{title}
	</h2>
	<ul class="flex flex-col text-gray-600 text-center md:text-left">
		{#each Object.entries(items) as [item, href]}
			<li class="self-center md:self-start">
				{#if typeof href === "string"}
					<a class="hover:underline" {href}>{item}</a>
				{:else}
					<a class="hover:underline flex" href={href.href}>
						<img
							class="h-3 w-3 flex-initial self-center mx-2"
							src={href.icn}
							alt=""
						/>
						{item}
					</a>
				{/if}
			</li>
		{/each}
	</ul>
</div>
