<script>
	import RatingStats from "$components/products/details/product-details-comment-rating.svelte";
</script>

<div class="border rounded p-5">
	<div class="flex items-center mb-3">
		<RatingStats rating={4} />

		<p class="ml-2 text-sm font-medium text-gray-900 dark:text-white">
			4.95 out of 5
		</p>
	</div>
	<p class="text-sm font-medium text-gray-500 dark:text-gray-400">
		1,745 global ratings
	</p>
	<div class="flex items-center mt-4">
		<span class="text-sm font-medium text-blue-600 dark:text-blue-500"
			>5 star</span
		>
		<div class="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
			<div class="h-5 bg-yellow-400 rounded" style="width: 70%" />
		</div>
		<span class="text-sm font-medium text-blue-600 dark:text-blue-500"
			>70%</span
		>
	</div>
	<div class="flex items-center mt-4">
		<span class="text-sm font-medium text-blue-600 dark:text-blue-500"
			>4 star</span
		>
		<div class="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
			<div class="h-5 bg-yellow-400 rounded" style="width: 17%" />
		</div>
		<span class="text-sm font-medium text-blue-600 dark:text-blue-500"
			>17%</span
		>
	</div>
	<div class="flex items-center mt-4">
		<span class="text-sm font-medium text-blue-600 dark:text-blue-500"
			>3 star</span
		>
		<div class="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
			<div class="h-5 bg-yellow-400 rounded" style="width: 8%" />
		</div>
		<span class="text-sm font-medium text-blue-600 dark:text-blue-500"
			>8%</span
		>
	</div>
	<div class="flex items-center mt-4">
		<span class="text-sm font-medium text-blue-600 dark:text-blue-500"
			>2 star</span
		>
		<div class="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
			<div class="h-5 bg-yellow-400 rounded" style="width: 4%" />
		</div>
		<span class="text-sm font-medium text-blue-600 dark:text-blue-500"
			>4%</span
		>
	</div>
	<div class="flex items-center mt-4">
		<span class="text-sm font-medium text-blue-600 dark:text-blue-500"
			>1 star</span
		>
		<div class="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
			<div class="h-5 bg-yellow-400 rounded" style="width: 1%" />
		</div>
		<span class="text-sm font-medium text-blue-600 dark:text-blue-500"
			>1%</span
		>
	</div>
</div>
