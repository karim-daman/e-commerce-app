<script>
  //@ts-nocheck
  import { app_products, app_review_list, getProducts, getReviews } from "$stores/dataStore";
  import { Badge, Card, ChevronLeft, ChevronRight, Input, Pagination, Rating, Textarea } from "flowbite-svelte";
  import { onMount } from "svelte";

  onMount(async () => {
    await getProducts();
    await getReviews();
    filteredReviewList = $app_review_list;
  });

  let filteredReviewList = [];
  $: filteredReviewList = $app_review_list;

  // $: activeUrl = $page.url.searchParams.get("page");
  let pages = [
    { name: 6, href: "/components/pagination?page=6" },
    { name: 7, href: "/components/pagination?page=7" },
    { name: 8, href: "/components/pagination?page=8" },
    { name: 9, href: "/components/pagination?page=9" },
    { name: 10, href: "/components/pagination?page=10" },
  ];

  $: {
    pages.forEach((page) => {
      let splitUrl = page.href.split("?");
      let queryString = splitUrl.slice(1).join("?");
      const hrefParams = new URLSearchParams(queryString);
      let hrefValue = hrefParams.get("page");
      if (hrefValue === "activeUrl") {
        page.active = true;
      } else {
        page.active = false;
      }
    });
    pages = pages;
  }

  const previous = () => {
    alert("Previous btn clicked. Make a call to your server to fetch data.");
  };
  const next = () => {
    alert("Next btn clicked. Make a call to your server to fetch data.");
  };

  let commentIndex = 0;
</script>

<div class="grid grid-rows-[max-content,1fr,max-content] min-h-screen">
  <main class="max-w-[1320px] px-5 lg:px-0 w-full grid grid-cols-[minmax(1,308px),1fr] grid-rows-[auto,1fr] my-10 gap-4 justify-self-center">
    <div class="relative overflow-x-auto border p-2 sm:rounded-lg">
      <div class="relative overflow-x-auto sm:rounded-lg">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="p-4">
                  <div class="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checkbox-all-search" class="sr-only">checkbox</label>
                  </div>
                </th>

                <th scope="col" class="px-6 py-3"> Product </th>
                <th scope="col" class="px-6 py-3"> Heart </th>
                <th scope="col" class="px-6 py-3"> Rating </th>
                <th scope="col" class="px-6 py-3"> Comments </th>
                <th scope="col" class="px-6 py-3">
                  <button class=" text-red-600 transition hover:-translate-y-1 active:transform active:translate-y-0" on:click={() => {}}>
                    <div class="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-5 h-5 mr-3">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </div>
                  </button>
                </th>
              </tr>
            </thead>

            <!-- <pre class="text-xs">
            {JSON.stringify({ filteredReviewList }, null, 2)}
           </pre> -->

            <tbody>
              {#each filteredReviewList as review}
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td class="w-4 p-4">
                    <div class="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                    </div>
                  </td>
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <img class="border rounded-lg w-16" alt="product" src={$app_products.find((product) => product.id == review.product_id).image} style="cursor: default;" />
                  </th>
                  <td class="px-6 py-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill={review.heart ? "red" : "gray"} viewBox="0 0 24 24" stroke-width="1.5" stroke={review.heart ? "red" : "gray"} class=" w-5 h-5">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </td>
                  <td class="px-6 py-4">
                    <Rating id="example-3" total={5} rating={review.rating} />
                  </td>

                  <!-- <td>
                    <button
                      class="mx-1 border rounded-full transition hover:-translate-y-1 active:transform active:translate-y-0"
                      on:click={() => {
                        commentIndex = ++commentIndex % review.comment.length;
                      }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path
                          fill-rule="evenodd"
                          d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
                          clip-rule="evenodd" />
                      </svg>
                    </button>
                  </td> -->

                  <td class="px-6 py-4">
                    <div>
                      <!-- <Badge class="my-1 w-20" color="green">{commentIndex} / {review.comment.length}</Badge> -->
                      <Badge class="my-1" color="green">{review.created_at}</Badge>

                      <textarea
                        disabled
                        id="message"
                        rows="1"
                        class=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={review.comment.text} />
                    </div>
                  </td>

                  <!-- <td>
                    <button
                      class=" mx-1 border rounded-full transition hover:-translate-y-1 active:transform active:translate-y-0"
                      on:click={() => {
                        commentIndex = ++commentIndex % review.comment.length;
                      }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path
                          fill-rule="evenodd"
                          d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                          clip-rule="evenodd" />
                      </svg>
                    </button></td> -->

                  <td class="px-6 py-4">
                    <button class="  transition hover:-translate-y-1 active:transform active:translate-y-0" on:click={() => {}}>
                      <div class="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-3">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                      </div>
                    </button>
                    <button class="  transition hover:-translate-y-1 active:transform active:translate-y-0" on:click={() => {}}>
                      <div class="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-3">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
                          <path stroke-linecap="round" stroke-linejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008z" />
                        </svg>
                      </div>
                    </button>
                    <button class=" text-red-600 transition hover:-translate-y-1 active:transform active:translate-y-0" on:click={() => {}}>
                      <div class="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-5 h-5 mr-3">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </div>
                    </button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>

      <div class="flex justify-end my-2">
        <Pagination {pages} on:previous={previous} on:next={next} icon>
          <svelte:fragment slot="prev">
            <span class="sr-only">Previous</span>
            <ChevronLeft class="w-5 h-5" />
          </svelte:fragment>
          <svelte:fragment slot="next">
            <span class="sr-only">Next</span>
            <ChevronRight class="w-5 h-5" />
          </svelte:fragment>
        </Pagination>
      </div>
    </div>
  </main>
</div>

<pre class="text-xs">
  {JSON.stringify($app_review_list, null, 2)}
</pre>
