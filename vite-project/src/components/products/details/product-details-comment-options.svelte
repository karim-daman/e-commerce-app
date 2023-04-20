<script>
	import ThumbsDown from "$components/products/details/product-details-comment-options-thumbsdown.svelte";
	import ThumbsUp from "$components/products/details/product-details-comment-options-thumbsup.svelte";
	import HamburgerOptions from "$components/products/details/product-details-comment-options-hamburger.svelte";
</script>

<div>
	<button class="rounded-btn-shadow px-2 rounded border h-10">
		<ThumbsDown />
	</button>

	<button class="rounded-btn-shadow px-2 rounded border h-10">
		<ThumbsUp />
	</button>

	<button class="rounded-btn-shadow px-2 rounded border h-10">
		<HamburgerOptions />
	</button>
</div>
