<script>
  //@ts-nocheck
  import { app_products, filteredProducts } from "$stores/dataStore";

  import { AccordionItem } from "flowbite-svelte";
  let productTextFilter = "";

  function applyFilters() {
    $filteredProducts = $app_products.filter((product) => {
      const nameFilter = product.name.toLowerCase().includes(productTextFilter.toLowerCase());
      return nameFilter;
    });
  }
</script>

<AccordionItem open="true">
  <span slot="header" class="text-base flex gap-1">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 ml-1 h-4 mt-1">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
    </svg>
    <span class="text-xs"> Filter </span>
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
      placeholder="Filter by name.."
      bind:value={productTextFilter}
      on:input={applyFilters} />
  </div>

  <!-- <div class="bg-slate-300 text-xs">
      {#each $filteredProducts as prod}
        {console.log(prod)} <br />
      {/each}
    </div> -->
</AccordionItem>
