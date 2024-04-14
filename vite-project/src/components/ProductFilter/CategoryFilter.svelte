<script>
  //@ts-nocheck

  import { app_categories, app_categories_count, app_products, filteredProducts, getUniqueCategories } from "$stores/dataStore";
  import { onMount } from "svelte";
  import { AccordionItem } from "flowbite-svelte";

  let categoryArray = [];
  let categoryTextFilter = "";

  $: allSelected = categoryArray.length === selected.length;
  let selected = [...categoryArray];

  onMount(async () => {
    await getUniqueCategories();
    $app_categories_count.forEach((element) => {
      categoryArray.push({ selected: true, category: element });
    });

    toggleAll();
    selected = [...categoryArray];
    console.log(selected);
  });

  function applyCategoryTextFilter() {
    let filteredCatergories;

    filteredCatergories = categoryArray.filter((item) => {
      return item.category.category.toLowerCase().includes(categoryTextFilter.toLowerCase());
    });

    if (categoryTextFilter) categoryArray = filteredCatergories;
    else {
      $app_categories_count.forEach((element) => {
        // Check if the element already exists in categoryArray
        const exists = categoryArray.some((item) => item.category === element);

        // Only push the element if it doesn't already exist
        if (!exists) {
          categoryArray.push({ selected: true, category: element });
        }
      });

      selected = [...categoryArray];
    }

    console.log(filteredCatergories);
  }

  function toggleAll() {
    selected = allSelected ? [] : [...categoryArray];
    console.log(selected);

    $filteredProducts = selected.length == 0 ? [] : $app_products;
  }

  function toggleOne() {
    $filteredProducts = $app_products.filter((product) => {
      return selected.some((item) => item.category.name === product.category.name);
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

  <div class="text-xs">
    {selected.length} Selected
  </div>

  <div class="w-full border flex flex-col h-64 overflow-y-auto rounded-lg mt-2 p-4">
    <div>
      <input type="checkbox" on:change={toggleAll} checked={allSelected} />
      <strong>Select All</strong>
    </div>
    {#each categoryArray as item}
      <div class="flex justify-between">
        <div class="">
          <input class="w-[1rem] h-[1rem]" type="checkbox" bind:group={selected} name={item} value={item} on:change={toggleOne} />
          {item.category.name}
        </div>
        <p class="justify-self-end text-white mb-1 bg-[#9da1a7] text-[.83rem] px-[10px] rounded-full">
          {item.category.count}
        </p>
      </div>
    {/each}
  </div>
</AccordionItem>
