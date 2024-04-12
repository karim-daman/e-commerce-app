<script>
  //@ts-nocheck
  import { app_brand_list, app_products, filteredProducts, getUniqueBrands } from "$stores/dataStore";
  import { AccordionItem } from "flowbite-svelte";
  import { onMount } from "svelte";

  let brandTextFilter = "";

  onMount(async () => {
    await getUniqueBrands();
  });

  function applybrandTextFilter() {
    $filteredProducts = $app_products.filter((product) => {
      const brandFilter = product.brand.toLowerCase().includes(brandTextFilter.toLowerCase());
      return brandFilter;
    });
  }
</script>

<AccordionItem open="true">
  <span slot="header" class="text-base flex gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>

    <span class="text-xs"> Brands</span>
  </span>

  <div class="relative">
    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 ml-1 h-4 mt-1">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
      </svg>
    </div>
    <input
      type="text"
      id="input-group-search"
      class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Filter by brand.."
      bind:value={brandTextFilter}
      on:input={applybrandTextFilter} />
  </div>

  <div class="relative h-64 overflow-y-auto overflow-x-clip border rounded-lg mt-2 p-4">
    <div class="grid gap-2 items-center grid-cols-[repeat(2,max-content),1fr]">
      <input class="w-[1rem] h-[1rem] border rounded-none" id="brands-All" type="checkbox" checked={"true"} />
      <label class="text-[#51585e]" for="brands-All">Select All</label>
    </div>
    {#each $app_brand_list as item}
      <!-- {JSON.stringify(item)} -->
      <div class="grid gap-2 items-center grid-cols-[repeat(2,max-content),1fr]">
        <input class="w-[1rem] h-[1rem] border rounded-none" id="brands-{item.brand}" checked={"true"} type="checkbox" />
        <label class="text-[#51585e]" for="brands-{item.brand}">{item.brand}</label>

        <p class="justify-self-end text-white bg-[#9da1a7] text-[.83rem] px-[10px] rounded-full">
          {item.count}
        </p>
      </div>
    {/each}
  </div>
</AccordionItem>
