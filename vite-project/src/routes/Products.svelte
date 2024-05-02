<script>
  // @ts-nocheck
  import AdminCreateProduct from "$components/Admin/CreateProductModal.svelte";
  import AdminCreateDiscount from "$components/Admin/CreateDiscountModal.svelte";

  import ProductFilter from "$components/ProductFilter/ProductFilter.svelte";
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import { push, location, querystring } from "svelte-spa-router";
  import { parse } from "qs";
  import { app_categories, app_products, app_user, filteredProducts, getCategories, getLikes, getProducts } from "$stores/dataStore";
  import { onMount } from "svelte";
  import { fade, fly, scale } from "svelte/transition";
  import { Toaster } from "svelte-french-toast";
  import { adminProductCreateModalStore, adminProductEditModalStore } from "$stores/appStore";
  import ProductsGrid from "$components/ProductsGrid.svelte";
  import ProductsList from "$components/ProductsList.svelte";

  let gridView = true;

  // $: activeUrl = $page.url.searchParams.get("page");
  let pages = [
    { name: 6, href: "#/Products/page=6" },
    { name: 7, href: "#/Products/page=7" },
    { name: 8, href: "#/Products/page=8" },
    { name: 9, href: "#/Products/page=9" },
    { name: 10, href: "#/Products/page=10" },
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

  onMount(async () => {
    await getLikes();
    if ($app_products.length == 0) await getProducts();
    if ($app_categories.length == 0) await getCategories();
  });

  function onSortChange(sortType) {
    sortBy = sortType;

    if (sortType == "Price ascending") {
      const sorted = $app_products.sort((a, b) => a.price - b.price);
      $filteredProducts = [...sorted];
    } else if (sortType == "Price descending") {
      const sorted = $app_products.sort((a, b) => b.price - a.price);
      $filteredProducts = [...sorted];
    } else if (sortType == "Best sellers") {
    } else if (sortType == "Date newest") {
      const sorted = $app_products.sort((a, b) => {
        const dateA = new Date(a.dateCreated);
        const dateB = new Date(b.dateCreated);
        return dateB - dateA;
      });
      $filteredProducts = [...sorted];
    } else if (sortType == "Date oldest") {
      const sorted = $app_products.sort((a, b) => {
        const dateA = new Date(a.dateCreated);
        const dateB = new Date(b.dateCreated);
        return dateA - dateB;
      });
      $filteredProducts = [...sorted];
    } else {
      // $filteredProducts = [...$app_products];
    }
  }
  // Use a reactive statement to ensure parsed
  // is updated every time $querystring changes
  $: parsedQuery = parse($querystring);
  let sortBy;

  onMount(() => {
    onSortChange(JSON.stringify(parsedQuery) == "" ? "Relevance" : parsedQuery.sort);
  });
</script>

<!-- <p>The current page is: {$location}</p>
<p>The querystring is: {$querystring}</p>
<code>{JSON.stringify(parsed)}</code> -->

<!-- <Toaster /> -->

<div class="grid grid-rows-[max-content,1fr,max-content] min-h-screen">
  <main class="max-w-[1320px] px-5 lg:px-0 w-full grid grid-cols-[minmax(0,308px),1fr] grid-rows-[auto,1fr] my-10 gap-4 justify-self-center">
    <!-- col-span-full md:col-auto w-full grid -->
    <section class="col-span-full md:col-auto w-full grid">
      {#if $app_user?.isAdmin}
        <div class="flex">
          <AdminCreateProduct />
          <AdminCreateDiscount />
        </div>
      {/if}

      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg class="w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
            ><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" /></svg>
        </div>
        <input
          type="text"
          id="input-group-search"
          class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search" />
        <button
          type="button"
          class=" absolute w-40 top-0 right-0 p-2 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Search
        </button>
      </div>

      <div class="border-b py-2 flex justify-between">
        <p class="text-xs">({$filteredProducts.length}) Item{$filteredProducts.length > 1 || $filteredProducts.length == 0 ? "s" : ""} found</p>

        <div class="flex rounded-lg">
          <div class="mx-2">
            <button class="flex text-xs border px-1 rounded-md">
              Sort : {sortBy}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
              </svg>
            </button>
            <Dropdown>
              <DropdownItem>
                <div class="flex">
                  <input
                    checked={sortBy === "Relavence"}
                    on:change={() => {
                      onSortChange("Relavence");
                    }}
                    type="radio"
                    value="Relavence" />
                  <p class="text-xs ml-2">Relavence</p>
                </div>
              </DropdownItem>
              <DropdownItem>
                <div class="flex">
                  <input
                    checked={sortBy === "Date newest"}
                    on:change={() => {
                      onSortChange("Date newest");
                    }}
                    type="radio"
                    value="Date newest" />
                  <p class="text-xs ml-2">Date newest</p>
                </div>
              </DropdownItem>

              <DropdownItem>
                <div class="flex">
                  <input
                    checked={sortBy === "Date oldest"}
                    on:change={() => {
                      onSortChange("Date oldest");
                    }}
                    type="radio"
                    value="Date oldest" />
                  <p class="text-xs ml-2">Date oldest</p>
                </div>
              </DropdownItem>
              <DropdownItem>
                <div class="flex">
                  <input
                    checked={sortBy === "Price ascending"}
                    on:change={() => {
                      onSortChange("Price ascending");
                    }}
                    type="radio"
                    value="Price ascending" />
                  <p class="text-xs ml-2">Price ascending</p>
                </div>
              </DropdownItem>
              <DropdownItem>
                <div class="flex">
                  <input
                    checked={sortBy === "Price descending"}
                    on:change={() => {
                      onSortChange("Price descending");
                    }}
                    type="radio"
                    value="Price descending" />
                  <p class="text-xs ml-2">Price descending</p>
                </div>
              </DropdownItem>
              <DropdownItem>
                <div class="flex">
                  <input
                    checked={sortBy === "Best sellers"}
                    on:change={() => {
                      onSortChange("Best sellers");
                    }}
                    type="radio"
                    value="Best sellers" />
                  <p class="text-xs ml-2">Best sellers</p>
                </div>
              </DropdownItem>
            </Dropdown>
          </div>

          <button
            on:click={() => {
              gridView = true;
            }}
            class="{gridView ? 'bg-slate-200' : ''}  rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mx-1">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
            </svg>
          </button>

          <button
            on:click={() => {
              gridView = false;
            }}
            class=" {gridView ? '' : 'bg-slate-200'}  rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mx-1">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </button>
        </div>
      </div>
    </section>

    {#if gridView}
      <ProductsGrid />
    {:else}
      <ProductsList />
    {/if}

    <ProductFilter />
  </main>
</div>
