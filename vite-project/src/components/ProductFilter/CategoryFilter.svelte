<script>
  //@ts-nocheck

  import { app_categories, app_categories_count, app_products, filteredProducts, getUniqueCategories } from "$stores/dataStore";
  import { onMount } from "svelte";
  import { AccordionItem } from "flowbite-svelte";

  let categoryArray = [];
  let categoryTextFilter = "";

  onMount(async () => {
    await getUniqueCategories();
    $app_categories_count.forEach((element) => {
      categoryArray.push({ selected: true, category: element });
    });
  });

  function applyCategoryTextFilter() {
    $filteredProducts = $app_products.filter((product) => {
      console.log(product);
      const categoryFilter = product.category.name.toLowerCase().includes(categoryTextFilter.toLowerCase());
      return categoryFilter;
    });
  }
</script>

<AccordionItem open="true">
  <span slot="header" class="text-base flex gap-1">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
    </svg>
    <span class="text-xs"> Categories </span>
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
      placeholder="Filter by category.."
      bind:value={categoryTextFilter}
      on:input={applyCategoryTextFilter} />
  </div>
  <div class="w-full border flex flex-col h-64 overflow-y-auto rounded-lg mt-2 p-4">
    <div class="grid gap-2 items-center grid-cols-[repeat(2,max-content),1fr]">
      <input class="w-[1rem] h-[1rem] border rounded-none" id="brands-" checked="true" type="checkbox" />
      <label class="text-[#51585e]" for="brands-">Select All</label>
    </div>
    {#each $app_categories as category, i}
      <!-- {category.name}
    {JSON.stringify(categoryArray[i])} -->
      {#if categoryArray[i]}
        <div class="grid gap-2 items-center grid-cols-[repeat(2,max-content),1fr]">
          <input class="w-[1rem] h-[1rem] border rounded-none" id="brands-{categoryArray[i].category.category}" bind:checked={categoryArray[i].selected} type="checkbox" />
          <label class="text-[#51585e]" for="brands-{categoryArray[i].category.category}">{categoryArray[i].category.category}</label>

          <p class="justify-self-end text-white bg-[#9da1a7] text-[.83rem] px-[10px] rounded-full">
            {categoryArray[i].category.count}
          </p>
        </div>
      {:else}
        <div role="status">
          <svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor" />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill" />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      {/if}
    {/each}
  </div>
</AccordionItem>
