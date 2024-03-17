<script>
  import { app_product_details, getProductById } from "$stores/dataStore";
  import { Dropdown, DropdownItem, MenuButton } from "flowbite-svelte";
  import { onMount } from "svelte";
  import Drift from "drift-zoom";
  import Review from "$components/Review.svelte";
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
            <!-- <Rating rating={3} /> -->

            <div class="flex items-center">
              {#each stars as star (star.id)}
                <button
                  on:click={() => {
                    handleRating(star);
                  }}
                  type="button"
                  class=" transition hover:-translate-y-1 active:transform active:translate-y-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="{rating >= star.id ? 'orange' : 'none'}  " viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
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

            <small class=" flex">
              <!-- <Reviews /> -->
              <svg xmlns="http://www.w3.org/2000/svg" class="{$$props.class} h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
              132 reviews</small>
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
              <input type="number" class="border rounded w-20 mx-2 h-10 px-2" placeholder="Quantity" bind:value={quantity} />
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
      <div class="mx-auto max-w-screen-xl px-4 md:px-8">
        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <!-- overview - start -->
          <div>
            <div class="rounded-lg border p-4">
              <h2 class="mb-3 text-lg font-bold text-gray-800 lg:text-xl">Customer Reviews</h2>

              <div class="mb-0.5 flex items-center gap-2">
                <!-- stars - start -->
                <div class="-ml-1 flex gap-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>

                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>

                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>

                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>

                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <!-- stars - end -->

                <span class="text-sm font-semibold">4/5</span>
              </div>

              <span class="block text-sm text-gray-500">Bases on 27 reviews</span>

              <div class="my-5 flex flex-col gap-2 border-t py-5">
                <!-- star - start -->
                <div class="flex items-center gap-3">
                  <span class="w-10 whitespace-nowrap text-right text-sm text-gray-600">5 Star</span>

                  <div class="flex h-4 flex-1 overflow-hidden rounded bg-gray-200">
                    <span class="h-full w-3/4 rounded bg-yellow-400"></span>
                  </div>
                </div>
                <!-- star - end -->

                <!-- star - start -->
                <div class="flex items-center gap-3">
                  <span class="w-10 whitespace-nowrap text-right text-sm text-gray-600">4 Star</span>

                  <div class="flex h-4 flex-1 overflow-hidden rounded bg-gray-200">
                    <span class="h-full w-1/2 rounded bg-yellow-400"></span>
                  </div>
                </div>
                <!-- star - end -->

                <!-- star - start -->
                <div class="flex items-center gap-3">
                  <span class="w-10 whitespace-nowrap text-right text-sm text-gray-600">3 Star</span>

                  <div class="flex h-4 flex-1 overflow-hidden rounded bg-gray-200">
                    <span class="h-full w-1/6 rounded bg-yellow-400"></span>
                  </div>
                </div>
                <!-- star - end -->

                <!-- star - start -->
                <div class="flex items-center gap-3">
                  <span class="w-10 whitespace-nowrap text-right text-sm text-gray-600">2 Star</span>

                  <div class="flex h-4 flex-1 overflow-hidden rounded bg-gray-200">
                    <span class="h-full w-1/4 rounded bg-yellow-400"></span>
                  </div>
                </div>
                <!-- star - end -->

                <!-- star - start -->
                <div class="flex items-center gap-3">
                  <span class="w-10 whitespace-nowrap text-right text-sm text-gray-600">1 Star</span>

                  <div class="flex h-4 flex-1 overflow-hidden rounded bg-gray-200">
                    <span class="h-full w-1/12 rounded bg-yellow-400"></span>
                  </div>
                </div>
                <!-- star - end -->
              </div>

              <!-- <a
                href="#"
                class="block rounded-lg border bg-white px-4 py-2 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:px-8 md:py-3 md:text-base"
                >Write a review</a> -->
            </div>
          </div>
          <!-- overview - end -->

          <!-- reviews - start -->
          <div class="lg:col-span-2">
            <!-- <div class="border-b pb-4 md:pb-6">
              <h2 class="text-lg font-bold text-gray-800 lg:text-xl">Top Reviews</h2>
            </div> -->

            <form class="w-full py-4 flex flex-col">
              <!-- <Rating /> -->

              <div class="mb-2">
                <textarea
                  bind:value={user_comment}
                  class="w-full min-h-[80px] p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                  name="comment"
                  maxlength="500"
                  placeholder="Add a comment" />
                <!-- ^ use:autoGrow -->
              </div>
              {#if char_count > 499}
                <p class="text-red-600">reached max size</p>
              {/if}

              <button
                class="{char_count > 0 ? 'visible' : 'invisible'}
                px-3 transition-all py-2 text-sm text-white bg-blue-600 rounded self-end">
                Comment
              </button>
            </form>

            {#each { length: 5 } as _, i}
              <Review />
            {/each}

            <div class="border-t pt-6">
              <a href="#" class="flex items-center gap-0.5 font-semibold text-indigo-400 transition duration-100 hover:text-indigo-500 active:text-indigo-600">Read all reviews</a>
            </div>
            <!-- reviews - end -->
          </div>
        </div>
      </div>

      <section class="flex flex-col px-8 md:flex-row">
        <div class="flex-auto text-sm text-gray-500 pb-2 border-b border-gray-200 max-w-3xl">
          <!-- <InformationSection /> -->

          <ul class="flex flex-wrap mb-px">
            {#each TabOptions as option}
              <li class="mr-2">
                <button
                  class="inline-block p-4 rounded-t-lg border-b-2 border-transparent {tab === option ? 'border-blue-600 text-blue-600 active' : 'hover:text-gray-600 hover:border-gray-300 '}"
                  aria-current="page"
                  on:click={() => selectTab(option)}>
                  {option}
                </button>
              </li>
            {/each}
          </ul>

          <div class="flex md:pr-4 flex-col">
            {#if tab === "Review"}
              <!-- <Reviews /> -->

              <form class="w-full py-4 flex flex-col">
                <!-- <Rating /> -->

                <div class="mb-2">
                  <textarea
                    bind:value={user_comment}
                    class="w-full min-h-[80px] p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                    name="comment"
                    maxlength="500"
                    placeholder="Add a comment" />
                  <!-- ^ use:autoGrow -->
                </div>
                {#if char_count > 499}
                  <p class="text-red-600">reached max size</p>
                {/if}

                <button
                  class="{char_count > 0 ? 'visible' : 'invisible'}
                px-3 transition-all py-2 text-sm text-white bg-blue-600 rounded self-end">
                  Comment
                </button>
              </form>

              {#each Array.from({ length: 5 }) as _, i}
                <!-- <CommentCard /> -->

                <div class="flex flex-col border rounded shadow-sm mb-2">
                  <div class="relative flex px-3 pt-4">
                    <img class="border rounded-full p-1 w-10 h-10 mr-2" src="/avatar.svg" alt="avatar" />

                    <div class="place-self-center flex-col mb-2">
                      <div class="mx-1">username</div>
                      <div class="flex place-self-center">
                        <!-- <RatingStar rating={3} /> -->

                        <div class="flex items-center">
                          {#each stars as star (star.id)}
                            <!-- <Star class="h-5 w-5" filled={hoverRating ? hoverRating >= star.id : rating >= star.id} starId={star.id} /> -->
                          {/each}
                        </div>
                      </div>
                    </div>

                    <div class="absolute right-0 px-2">
                      <!-- <CommentOptions /> -->
                      <div>
                        <button class="rounded-btn-shadow px-2 rounded border h-10 transition hover:-translate-y-1 hover:shadow-lg active:shadow-none active:transform active:translate-y-0">
                          <!-- <ThumbsDown /> -->
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                          </svg>
                        </button>

                        <button class="rounded-btn-shadow px-2 rounded border h-10 transition hover:-translate-y-1 hover:shadow-lg active:shadow-none active:transform active:translate-y-0">
                          <!-- <ThumbsUp /> -->
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                        </button>

                        <MenuButton class="rounded-btn-shadow px-2 rounded border h-10 transition hover:-translate-y-1 hover:shadow-lg active:shadow-none active:transform active:translate-y-0" />

                        <Dropdown class="w-36 ">
                          <DropdownItem class="flex transition hover:-translate-y-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-3">
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                            </svg>

                            <a href="#/Profile">reply</a></DropdownItem>
                          <DropdownItem class="flex transition hover:-translate-y-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-3">
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
                            </svg>

                            <a href="#/Profile">report</a></DropdownItem>

                          <DropdownItem class="flex transition hover:-translate-y-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-5 h-5 mr-3">
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>

                            <button on:click={() => (popupModal = true)} class="text-red-600">Delete</button></DropdownItem>
                        </Dropdown>
                        <!-- </button> -->
                      </div>
                    </div>
                  </div>

                  <div class="px-3 mx-2 mb-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis rerum aliquam magnam earum. Harum aliquam a magnam, quae laudantium consequatur voluptate possimus culpa explicabo ex
                    blanditiis voluptas dolore aperiam est.
                  </div>
                </div>
              {/each}
            {:else if tab === "Seller"}
              <!-- <SellerDetails /> -->
              <div class="w-full mt-4 flex flex-col">
                <ul>
                  <li>Some great feature name here</li>
                  <li>Some great feature name here</li>
                  <li>Some great feature name here</li>
                  <li>Some great feature name here</li>
                  <li>Some great feature name here</li>
                  <li>Some great feature name here</li>
                  <li>Some great feature name here</li>
                  <li>Some great feature name here</li>
                </ul>

                <hr class="my-2" />

                <p class="max-w-md">
                  With supporting text below as a natural lead-in to additional content. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                  esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>
            {:else if tab === "Specification"}
              <!-- <Specifications /> -->
              <div class="w-full mt-4 flex flex-col">
                <p class="max-w-md">
                  With supporting text below as a natural lead-in to additional content. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                  esse cillum dolore eu fugiat nulla pariatur.
                </p>

                <hr class="my-2" />

                <div class="flex">
                  <div class="flex-auto">
                    <ul>
                      <li>Some great feature name here</li>
                      <li>Some great feature name here</li>
                      <li>Some great feature name here</li>
                      <li>Some great feature name here</li>
                    </ul>
                  </div>
                  <div class="flex-auto">
                    <ul>
                      <li>Some great feature name here</li>
                      <li>Some great feature name here</li>
                      <li>Some great feature name here</li>
                      <li>Some great feature name here</li>
                    </ul>
                  </div>
                </div>

                <hr class="my-2" />

                <table class="grid grid-cols-[max-content,1fr] items-center gap-2 my-2">
                  <th class="text-left"> Brand </th>
                  <a class="justify-self-end" href="/">
                    <td class="hover:underline hover:text-blue-500"> Nike </td>
                  </a>

                  <th class="text-left"> Article number </th>
                  <td class="justify-self-end"> 527378 </td>

                  <th class="text-left"> Garantee </th>
                  <td class="justify-self-end">2 years</td>

                  <th class="text-left"> Delivary time </th>
                  <td class="justify-self-end"> 3-4 days </td>

                  <th class="text-left"> Availability </th>
                  <td class="justify-self-end">
                    <dd class="col-sm-9 text-green-600">In Stock!</dd>
                  </td>
                </table>
              </div>
            {/if}
          </div>
        </div>

        <div class="flex-auto lg:flex-1">
          <!-- <RatingStats /> -->

          <div class="border rounded p-5">
            <div class="flex items-center mb-3">
              <!-- <RatingStats rating={4} /> -->

              <div class="flex items-center">
                {#each stars as star (star.id)}
                  <!-- <Star
                class="h-5 w-5"
                filled={hoverRating ? hoverRating >= star.id : rating >= star.id}
                starId={star.id}
              /> -->
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" on:mouseover on:mouseleave on:click on:focus data-starid={starId} class="{$$props.class} ">
                    <title>{title}</title>
                    <path
                      class:filled
                      data-starid={starId}
                      class="starPath"
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                {/each}
              </div>

              <p class="ml-2 text-sm font-medium text-gray-900 dark:text-white">4.95 out of 5</p>
            </div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">1,745 global ratings</p>
            <div class="flex items-center mt-4">
              <span class="text-sm font-medium text-blue-600 dark:text-blue-500">5 star</span>
              <div class="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                <div class="h-5 bg-yellow-400 rounded" style="width: 70%" />
              </div>
              <span class="text-sm font-medium text-blue-600 dark:text-blue-500">70%</span>
            </div>
            <div class="flex items-center mt-4">
              <span class="text-sm font-medium text-blue-600 dark:text-blue-500">4 star</span>
              <div class="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                <div class="h-5 bg-yellow-400 rounded" style="width: 17%" />
              </div>
              <span class="text-sm font-medium text-blue-600 dark:text-blue-500">17%</span>
            </div>
            <div class="flex items-center mt-4">
              <span class="text-sm font-medium text-blue-600 dark:text-blue-500">3 star</span>
              <div class="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                <div class="h-5 bg-yellow-400 rounded" style="width: 8%" />
              </div>
              <span class="text-sm font-medium text-blue-600 dark:text-blue-500">8%</span>
            </div>
            <div class="flex items-center mt-4">
              <span class="text-sm font-medium text-blue-600 dark:text-blue-500">2 star</span>
              <div class="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                <div class="h-5 bg-yellow-400 rounded" style="width: 4%" />
              </div>
              <span class="text-sm font-medium text-blue-600 dark:text-blue-500">4%</span>
            </div>
            <div class="flex items-center mt-4">
              <span class="text-sm font-medium text-blue-600 dark:text-blue-500">1 star</span>
              <div class="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                <div class="h-5 bg-yellow-400 rounded" style="width: 1%" />
              </div>
              <span class="text-sm font-medium text-blue-600 dark:text-blue-500">1%</span>
            </div>
          </div>
        </div>
      </section>
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
