<script>
  //@ts-nocheck
  import { app_cart_list, getCarts } from "$stores/dataStore";
  import { Accordion, AccordionItem, Badge, Button, ChevronLeft, ChevronRight, Indicator, Input, Pagination, Popover } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";

  onMount(async () => {
    await getCarts();
  });

  let searchByEmail;
  function filterByEmail() {}

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

  let array = [false, false, false, false, false, false];
</script>

<div class="grid grid-rows-[max-content,1fr,max-content] min-h-screen">
  <main class="max-w-[1320px] px-5 lg:px-0 w-full grid grid-cols-[minmax(1,308px),1fr] grid-rows-[auto,1fr] my-10 gap-4 justify-self-center">
    <table class="border-collapse border rounded-md">
      <thead>
        <th>ID</th>
        <th class="font-bold">
          <Input bind:value={searchByEmail} on:input={filterByEmail} placeholder="Email" />
        </th>
        <th class="font-bold">Status</th>
        <th class="font-bold">Created Date</th>
        <th class="font-bold">Options</th>
      </thead>
      <tbody>
        {#each $app_cart_list as cart, i}
          <tr
            on:click={() => {
              array[i] = !array[i];
            }}>
            <td class="border p-4">{cart.id}</td>
            <td class="border p-4">{cart.user?.email}</td>
            <td class="border p-4"><Badge class="my-1 w-20" color="yellow">{cart.status}</Badge></td>
            <td class="border p-4"><Badge class="my-1" color="green">{cart.dateOrdered}</Badge></td>
            <td class="border p-4">
              <button
                on:click={() => {
                  array[i] = array[i];
                }}
                class="h-8 w-9 mx-4 top-2 bg-blue-600 relative border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 transition hover:-translate-y-1 hover:shadow-lg active:shadow-none active:transform active:translate-y-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-5 h-5 m-1.5">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                <Indicator color="red" border size="xl" placement="top-right">
                  <span class="text-white text-xs"> {cart.cartItems.length} </span>
                </Indicator>
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
          <tr>
            <td colspan="5">
              <div class="col-start-1 col-span-5 bg-slate-50 transition-all duration-500 ease-in-out {array[i] ? 'h-52 border rounded' : ' h-0'} overflow-hidden border-b">
                <div class="grid grid-cols-5 gap-4 p-4 rounded-md max-h-52 overflow-y-auto">
                  {#if cart.cartItems.length == 0}
                    <div class="col-span-5 col-start-3">
                      <p class="">this cart is empty!</p>
                    </div>
                  {:else}
                    <div class=" font-bold p-2 col-span-2 rounded-md">Product</div>
                    <div class=" font-bold p-2 rounded-md">Category</div>
                    <div class=" font-bold p-2 rounded-md">Quantity</div>
                    <div class=" font-bold p-2 rounded-md">Price</div>
                  {/if}

                  <!-- <img src={item.product.image} class="border rounded-md sm:row-span-full justify-self-center sm:w-[72px] sm:h-[72px]" alt="product" /> -->
                  {#each cart.cartItems as item, i}
                    <div class="flex col-span-2">
                      <img src={item.product.image} class="border rounded-md sm:row-span-full sm:w-[72px] sm:h-[72px]" alt="product" />
                      <div class="flex-col p-2">
                        <div class="font-thin underline">
                          <a class="underline font-normal text-[1rem] text-black hover:text-blue-500" href="#/ProductDetails/{item.product.id}">{item.product.name}</a>
                        </div>
                        <div>
                          by: {item.product.brand}
                        </div>
                      </div>
                    </div>
                    <div class="col-start-3">{item.product.category.name}</div>

                    <div>{item.quantity}</div>
                    <div>
                      <h3 class="font-bold text-green-500">$ {item.product.price * item.quantity}</h3>
                      <p class=" text-[.85rem] text-green-400">$ {item.product.price} each</p>
                    </div>
                  {/each}
                </div>
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>

    <div class="grid grid-cols-5 gap-4 rounded-md border p-8">
      <div>ID</div>
      <div class="font-bold">
        <Input bind:value={searchByEmail} on:input={filterByEmail} placeholder="Email" />
      </div>
      <div class="font-bold">Status</div>
      <div class="font-bold">Created Date</div>

      <div class="px-6 py-3" />

      {#each $app_cart_list as cart, i}
        <div>{cart.id}</div>
        <div>{cart.user?.email}</div>

        <div><Badge class="my-1 w-20" color="yellow">{cart.status}</Badge></div>
        <div><Badge class="my-1" color="green">{cart.dateOrdered}</Badge></div>
        <div>
          <button
            on:click={() => {
              array[i] = !array[i];
            }}
            class="h-8 w-9 mx-4 top-2 bg-blue-600 relative border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 transition hover:-translate-y-1 hover:shadow-lg active:shadow-none active:transform active:translate-y-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-5 h-5 m-1.5">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <Indicator color="red" border size="xl" placement="top-right">
              <span class="text-white text-xs"> {cart.cartItems.length} </span>
            </Indicator>
          </button>

          <!-- <button
            on:click={() => {
              array[i] = !array[i];
            }}
            class="transition hover:-translate-y-1 active:transform active:translate-y-0">
            <div class="flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
          </button> -->
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
        </div>

        <!-- <div class="col-start-1 col-span-5" /> -->

        <div class="col-start-1 col-span-5 bg-slate-50 transition-all duration-500 ease-in-out {array[i] ? 'h-52 border rounded' : ' h-0'} overflow-hidden border-b">
          <div class="grid grid-cols-5 gap-4 p-4 rounded-md max-h-52 overflow-y-auto">
            {#if cart.cartItems.length == 0}
              <div class="col-span-5 col-start-3">
                <p class="">this cart is empty!</p>
              </div>
            {:else}
              <div class=" font-bold p-2 col-span-2 rounded-md">Product</div>
              <div class=" font-bold p-2 rounded-md">Category</div>
              <div class=" font-bold p-2 rounded-md">Quantity</div>
              <div class=" font-bold p-2 rounded-md">Price</div>
            {/if}

            <!-- <img src={item.product.image} class="border rounded-md sm:row-span-full justify-self-center sm:w-[72px] sm:h-[72px]" alt="product" /> -->
            {#each cart.cartItems as item, i}
              <div class="flex col-span-2">
                <img src={item.product.image} class="border rounded-md sm:row-span-full sm:w-[72px] sm:h-[72px]" alt="product" />
                <div class="flex-col p-2">
                  <div class="font-thin underline">
                    <a class="underline font-normal text-[1rem] text-black hover:text-blue-500" href="#/ProductDetails/{item.product.id}">{item.product.name}</a>
                  </div>
                  <div>
                    by: {item.product.brand}
                  </div>
                </div>
              </div>
              <div class="col-start-3">{item.product.category.name}</div>

              <div>{item.quantity}</div>
              <div>
                <h3 class="font-bold text-green-500">$ {item.product.price * item.quantity}</h3>
                <p class=" text-[.85rem] text-green-400">$ {item.product.price} each</p>
              </div>
            {/each}
          </div>
        </div>
      {/each}
      <div class="col-start-5 bg-slate-100">
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

<!-- <pre class="text-xs">
  {JSON.stringify($app_cart_list, null, 2)}
</pre> -->
