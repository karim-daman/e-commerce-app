<script>
  // @ts-nocheck
  import { app_user_list, app_product_details, app_review_list, app_user, getProductById, getReviews, postReview } from "$stores/dataStore";
  import { Dropdown, DropdownItem, MenuButton } from "flowbite-svelte";
  import { onMount } from "svelte";
  import Drift from "drift-zoom";
  import Review from "$components/Review.svelte";
  import { random } from "yootils";
  import { authModalStore } from "$stores/appStore";
  export let params;

  let liked;
  let triggerZone;
  let displayContainer;
  let thumbnails = [];
  let selectedThumbnailIndex = 0;

  onMount(() => {
    const options = {
      handleTouch: false,
    };

    new Drift(triggerZone, {
      ...options,
      paneContainer: displayContainer,
    });
  });

  onMount(async () => {
    await getProductById(params.product_id);
    thumbnails = $app_product_details.images;

    await getReviews();
  });

  const handleChangeImage = (index) => {
    console.log("clicked on index " + index);
    selectedThumbnailIndex = index;
  };

  export let rating = 0;
  let hoverRating = 0;

  let stars = [
    { id: 1, title: "One Star" },
    { id: 2, title: "Two Stars" },
    { id: 3, title: "Three Stars" },
    { id: 4, title: "Four Stars" },
    { id: 5, title: "Five Stars" },
  ];

  function handleRating(star) {
    rating = star.id;
  }

  let title = "star";
  let filled = false;
  let starId;

  export let quantity;

  const min_qty = 1;
  const max_qty = 50;

  const qty_increment = () => {
    if (++quantity > max_qty) quantity = max_qty;
  };

  const qty_decrement = () => {
    if (--quantity < min_qty) quantity = min_qty;
  };

  const TabOptions = ["Review", "Specification", "Seller"];
  let Options = typeof TabOptions;
  let tab = "Review";
  const selectTab = (option) => (tab = option);

  let user_comment = "";
  $: char_count = user_comment.length;

  async function handleAddReview() {
    if (user_comment.length == 0) return;

    const raw = JSON.stringify({
      product_id: $app_product_details.id,
      user_id: $app_user.userId,
      heart: false,
      rating: rating,
      comment: {
        text: user_comment,
      },
    });

    // display notification that the review was posted successfully.

    await postReview(raw);
  }

  $: localReviewList = $app_review_list.filter((review) => review.product_id === $app_product_details.id);

  $: customersAverageRating = localReviewList
    .reduce((acc, review) => {
      return acc + review.rating / $app_review_list.length;
    }, 0)
    .toFixed(1);

  function countReviewsByRating() {
    const ratingCounts = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    $app_review_list.forEach((review) => {
      const { rating } = review;
      ratingCounts[rating] = (ratingCounts[rating] || 0) + 1;
    });

    return ratingCounts;
  }

  $: ratingCounts = countReviewsByRating();
</script>

<pre class="text-xs">


  <!-- {JSON.stringify(params)} -->
  <!-- {JSON.stringify($app_product_details, null, 2)} -->
</pre>

<div class="grid grid-rows-[max-content,1fr,max-content] min-h-screen">
  <main class="max-w-[1320px] justify-self-center py-[60px]">
    <section class="w-full lg:flex">
      <!-- <ProductAsideView />
     -->

      <article id="detail" class=" flex justify-center max-w-[660px] w-full px-5 md:px-0">
        <div class="flex flex-col mr-2 w-[100px] h-[500px] overflow-x-auto">
          {#each thumbnails as thumbnail, i}
            <button class="mb-2 mr-2 border rounded-md hover:border-black hover:border-2" on:mouseenter={() => handleChangeImage(i)}>
              <img draggable="false" src={thumbnail} class="border rounded-sm object-cover" alt="thumbnail" />
            </button>
          {/each}
        </div>

        <div class="relative" bind:this={displayContainer}>
          <img draggable="false" class="border h-[500px] w-[500px] rounded object-cover" src={thumbnails[selectedThumbnailIndex]} alt="product" />

          <img
            bind:this={triggerZone}
            src={thumbnails[selectedThumbnailIndex]}
            data-zoom={thumbnails[selectedThumbnailIndex]}
            draggable="false"
            class="hidden sm:block absolute right-0 top-0 h-[500px] w-[500px] border rounded object-cover"
            alt="temp" />

          <div class="absolute top-0 right-4 z-10">
            <button
              on:click={() => (liked = !liked)}
              type="button"
              class=" hover:outline-none whitespace-normal rounded-lg hover:ring-2 p-1.5 hover:ring-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 mt-2 mr-2 transition hover:-translate-y-1 hover:shadow-lg active:shadow-none active:transform active:translate-y-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill={liked ? "red" : "gray"} viewBox="0 0 24 24" stroke-width="1.5" stroke={liked ? "red" : "gray"} class=" w-5 h-5">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
          </div>
        </div>
      </article>

      <article class="max-w-[660px] w-full px-8 pt-10 lg:pt-0">
        <h1 class="text-4xl">{$app_product_details.name}</h1>
        <!-- <MetaData /> -->

        <div class="my-3">
          <div class="flex justify-between">
            <small class="flex">
              <svg xmlns="http://www.w3.org/2000/svg" class="{$$props.class} h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
              {localReviewList.length} reviews</small>
            <small class="flex">
              <!-- <Orders /> -->
              <svg class="{$$props.class} h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              439 orders</small>
          </div>
        </div>

        <!-- <ProductDetailsInformation quantity={1} /> -->

        <div class="mb-3 flex flex-col">
          <div class="text-3xl font-extrabold text-green-500">$ {$app_product_details.price}</div>
          <!-- <div class="text-xl">USD 787.5 incl. VAT</div> -->
        </div>

        <p>
          {$app_product_details?.description}
        </p>

        <hr class="my-4" />

        <table class="grid grid-cols-[max-content,1fr] items-center gap-2 my-2">
          <th class="text-left"> Article ID </th>
          <td class="justify-self-end"> {$app_product_details.id} </td>

          <th class="text-left"> Brand </th>
          <a class="justify-self-end" href="/">
            <td class="hover:underline hover:text-blue-500"> {$app_product_details.brand} </td>
          </a>

          <th class="text-left"> Category </th>
          <td class="justify-self-end"> {$app_product_details.category?.name}</td>

          <th class="text-left"> Garantee </th>
          <td class="justify-self-end">2 years</td>

          <th class="text-left"> Delivary time </th>
          <td class="justify-self-end"> 3-4 days </td>

          <th class="text-left"> Availability </th>
          <td class="justify-self-end">
            <dd class="col-sm-9 text-green-600">{$app_product_details.countInStock} item(s) In Stock!</dd>
          </td>

          <th class="text-left">Quantity</th>
          <td class="justify-self-end">
            <dd class="flex h-10">
              <button class=" shadow-xl active:shadow-none h-10 w-10 flex flex-row mx-px text-black px-[10px] mb-4 py-[7px] rounded-[.25rem] border">
                <!-- ^ use:hold={qty_decrement} -->
                <!-- <Minus class="self-center" /> -->
                <svg class="self-center h-5 w-5" width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg"
                  ><path
                    d="M2.25 7.5C2.25 7.22386 2.47386 7 2.75 7H12.25C12.5261 7 12.75 7.22386 12.75 7.5C12.75 7.77614 12.5261 8 12.25 8H2.75C2.47386 8 2.25 7.77614 2.25 7.5Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd" /></svg>
              </button>
              <input type="number" class="border rounded w-20 mx-2 h-10 px-2" min="1" placeholder="Quantity" bind:value={quantity} />
              <button class="shadow-xl active:shadow-none h-10 w-10 flex flex-row mx-px text-black px-[10px] mb-4 py-[7px] rounded-[.25rem] border">
                <!-- ^  use:hold={qty_increment} -->
                <!-- <Plus class="self-center" /> -->

                <svg class="self-center h-5 w-5" width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg"
                  ><path
                    d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd" /></svg>
              </button>
            </dd>
          </td>
        </table>

        <!-- <ProductDetailsOptions /> -->
        <button
          class="bg-yellow-300 transition hover:-translate-y-1 active:transform active:translate-y-0 flex justify-center rounded-btn-shadow max-w-60 w-full items-center flex-row mx-px text-white px-[14px] mt-[11px] mb-4 py-[7px] rounded-[.25rem]">
          <!-- <CartIcon class="mx-2" /> -->
          <svg xmlns="http://www.w3.org/2000/svg" class="mx-2 h-5 w-5" viewBox="0 0 20 20" fill="black">
            <path
              d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>

          <p class="text-black text-xl">Add to cart!</p>
        </button>
      </article>
    </section>

    <div class="bg-white py-6 sm:py-8 lg:py-12">
      <div class="mx-auto max-w-screen px-4 md:px-8">
        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <!-- overview - start -->
          <div>
            <div class="rounded-md border p-4">
              <h2 class="mb-3 text-lg font-bold text-gray-800 lg:text-xl">Customer Reviews</h2>

              <div class="mb-0.5 flex items-center gap-2">
                <div class="-ml-1 flex gap-0.5">
                  {#each { length: 5 } as _, i}
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 {customersAverageRating > i ? 'text-yellow-400' : 'text-gray-400'} " viewBox="0 0 20 20" fill="currentColor">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  {/each}
                </div>

                <span class="text-sm font-semibold">
                  {customersAverageRating}
                </span>
              </div>

              <span class="block text-sm text-gray-500">Based on {localReviewList.length} reviews</span>

              <div class="my-5 flex flex-col gap-2 border-t py-5">
                {#each { length: 6 } as _, i}
                  <div class="flex items-center gap-3">
                    <span class="w-10 whitespace-nowrap text-right text-sm text-gray-600">{i} Star</span>

                    <div class="flex h-4 flex-1 overflow-hidden rounded bg-gray-200">
                      <span style="width: {JSON.stringify((ratingCounts[i] / localReviewList.length) * 100)}%;" class="transition-all h-full rounded bg-yellow-400"></span>
                    </div>

                    <!-- //fix  -->

                    {ratingCounts[i]}
                    .
                    {localReviewList.length}

                    <p class="w-14 text-xs">{JSON.stringify((ratingCounts[i] / localReviewList.length) * 100)} %</p>
                    <!--  / totalReviews) * 100; -->
                  </div>
                {/each}

                <!-- <pre class="text-xs">
                  {JSON.stringify(ratingCounts, null, 2)}
                </pre> -->
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
          <!-- overview - end -->

          <!-- reviews - start -->
          <div class="lg:col-span-2">
            <!-- <div class="border-b pb-4 md:pb-6">
              <h2 class="text-lg font-bold text-gray-800 lg:text-xl">Top Reviews</h2>
            </div> -->

            <!-- <pre class="text-xs">
              {JSON.stringify($app_user_list, null, 2)}
            </pre> -->

            {#if $app_user}
              <div class="w-full flex flex-col">
                <!-- <Rating /> -->

                <div class="mb-2 relative">
                  <textarea
                    bind:value={user_comment}
                    class="w-full min-h-[80px] p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                    name="comment"
                    maxlength="500"
                    placeholder="Add a comment" />
                  <!-- ^ use:autoGrow -->
                </div>
                {#if char_count > 499}
                  <p class="text-red-600 text-xs">reached max size</p>
                {/if}

                <div class="flex justify-between w-full">
                  <div class="w-52">
                    {#each stars as star (star.id)}
                      <button
                        on:click={() => {
                          handleRating(star);
                        }}
                        type="button"
                        class=" transition hover:-translate-y-1 active:transform active:translate-y-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="{rating >= star.id ? 'orange' : 'lightgray'}  " viewBox="0 0 24 24" stroke-width="0.5" stroke="none" class="w-6 h-6">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                      </button>
                    {/each}
                    <button
                      on:click={() => {
                        rating = 0;
                      }}
                      type="button"
                      class=" transition hover:-translate-y-1 active:transform active:translate-y-0">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" class="w-5 h-5">
                        <path
                          fill-rule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                          clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>

                  <button
                    on:click={handleAddReview}
                    class="{char_count > 0 ? '' : 'opacity-30'} disabled:{char_count > 0 ? 'false' : 'true'} 
                px-3 transition-all py-2 text-sm text-white bg-blue-600 rounded self-end">
                    Comment
                  </button>
                </div>
              </div>
            {/if}

            <div class=" p-2">
              <small class="flex">
                <!-- <Reviews /> -->
                <svg xmlns="http://www.w3.org/2000/svg" class="{$$props.class} h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                {localReviewList.length} reviews</small>

              <!-- {#each { length: 1 } as _, i}
                <Review />
              {/each} -->

              {#each localReviewList.reverse() as review}
                <!-- <pre class="text-xs">
                 {JSON.stringify(review, null, 1)}
                </pre> -->
                <Review {review} />
              {/each}

              <!-- <pre class="text-xs">
                {JSON.stringify($app_review_list, null, 2)}
              </pre> -->

              <div class=" pt-6">
                <a href="#" class="flex items-center gap-0.5 font-semibold text-indigo-400 transition duration-100 hover:text-indigo-500 active:text-indigo-600">Read all reviews</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>

<style>
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: rgb(255, 255, 255);
  }

  ::-webkit-scrollbar-thumb {
    background: rgb(74, 74, 74);
    border-radius: 50px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgb(0, 100, 187);
  }

  :global(.drift-zoom-pane) {
    height: 500px;
    width: 500px;
  }

  :global(.drift-zoom-pane) img {
    object-fit: cover;
  }

  .starPath {
    fill: rgb(221, 221, 221);
  }
  .filled {
    fill: #facc15;
  }
</style>
