<script>
	import CommentCard from "$components/products/details/product-details-comment-card.svelte";
	import Rating from "$components/products/details/product-details-rating.svelte";
	import { autoGrow } from "$lib/action/auto-grow";

	let user_comment = "";
	$: char_count = user_comment.length;
</script>

<form class="w-full py-4 flex flex-col ">
	<Rating />
	<div class="mb-2">
		<textarea
			use:autoGrow
			bind:value={user_comment}
			class="w-full min-h-[80px] p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
			name="comment"
			maxlength="500"
			placeholder="Add a comment"
		/>
	</div>
	{#if char_count > 499}
		<p class="text-red-600">reached max size</p>
	{/if}

	<button
		class="{char_count > 0 ? 'visible' : 'invisible'}
			px-3 transition-all  py-2 text-sm text-white bg-blue-600 rounded self-end"
	>
		Comment
	</button>
</form>

{#each Array.from({ length: 5 }) as _, i}
	<CommentCard />
{/each}
