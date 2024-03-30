<script>
  //@ts-nocheck

  import { app_product_details, app_review_list, app_user } from "$stores/dataStore";
  import { authModalStore } from "$stores/appStore";

  $: localReviewList = $app_review_list.filter((review) => review.product_id === $app_product_details.id);

  $: ratings = localReviewList.map((rev) => rev.rating);

  function organizeRatingsByPercentage(ratings) {
    // Create an object to store the count and percentage of each rating
    const ratingStats = {
      0: { count: 0, percentage: 0 },
      1: { count: 0, percentage: 0 },
      2: { count: 0, percentage: 0 },
      3: { count: 0, percentage: 0 },
      4: { count: 0, percentage: 0 },
      5: { count: 0, percentage: 0 },
    };

    // Calculate the count of each rating
    for (const rating of ratings) {
      if (rating >= 0 && rating <= 5) {
        ratingStats[rating].count++;
      }
    }

    // Calculate the total number of ratings
    const totalRatings = ratings.length;

    // Calculate the percentage of each rating
    for (let i = 0; i <= 5; i++) {
      const count = ratingStats[i].count;
      ratingStats[i].percentage = count > 0 ? (count / totalRatings) * 100 : 0;
      ratingStats[i].percentage = ratingStats[i].percentage.toFixed(0);
    }

    return ratingStats;
  }

  $: ratingStats = organizeRatingsByPercentage(ratings);

  $: sum = ratings.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
</script>

<div>
  <div class="rounded-md border p-4">
    <!-- {JSON.stringify(ratings.reverse(), null, 2)} -->

    <!-- <pre class="text-xs">
        {#each localReviewList.reverse() as rev, i}
        {JSON.stringify(rev.rating, null, 2)}
      {/each}
    </pre> -->

    <!-- <pre class="text-xs">
        {JSON.stringify(ratingStats, null, 2)}
    </pre> -->

    <h2 class="mb-3 text-lg font-bold text-gray-800 lg:text-xl">Customer Reviews</h2>

    <div class="mb-0.5 flex items-center gap-2">
      <div class="-ml-1 flex gap-0.5">
        {#each { length: 5 } as _, i}
          <!-- {customersAverageRating > i ? 'text-yellow-400' : 'text-gray-400'} -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 {(sum / localReviewList.length).toFixed(2) > i ? 'text-yellow-400' : 'text-gray-400'} " viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        {/each}
      </div>

      <span class="text-sm font-semibold">
        {(sum / localReviewList.length).toFixed(2)}
      </span>
    </div>

    <span class="block text-sm text-gray-500">Based on {localReviewList.length} reviews</span>

    <div class="my-5 flex flex-col gap-2 border-t py-5">
      {#each { length: 6 } as _, i}
        <div class="flex items-center gap-3">
          <span class="w-10 whitespace-nowrap text-right text-sm text-gray-600">{i} Star</span>

          <div class="flex h-4 flex-1 overflow-hidden rounded bg-gray-200">
            <!-- {JSON.stringify((ratingCounts[i] / localReviewList.length) * 100)} -->

            <span style="width: {ratingStats[i].percentage}%;" class="transition-all h-full rounded bg-yellow-400"></span>
          </div>

          <!-- {localReviewList.length} -->

          <p class="w-14 text-xs">{ratingStats[i].percentage} %</p>
        </div>
      {/each}
    </div>

    {#if !$app_user}
      <button
        on:click={() => {
          if (!$app_user) {
            $authModalStore = true;
          }
        }}
        class=" w-full rounded-lg border bg-white px-4 py-2 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:px-8 md:py-3 md:text-base"
        >Write a review</button>
    {/if}
  </div>
</div>
