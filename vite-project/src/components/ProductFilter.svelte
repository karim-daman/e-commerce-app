<script>
  // @ts-nocheck

  import FilterAccordian from "$components/FilterAccordian.svelte";
  import { Accordion, AccordionItem, Button } from "flowbite-svelte";
  import RangeSlider from "svelte-range-slider-pips";
  import { app_categories, app_products, filteredProducts } from "$stores/dataStore";
  import { onMount } from "svelte";

  //   export let offers = false;
  //   export let src;
  //   export let href;

  //   export let title;
  //   export let options;
  //   export let price;
  //   export let offerPrice = 0;

  let categoryArray = [];

  onMount(() => {
    $app_categories.forEach((element) => {
      categoryArray.push({ selected: true, category: element });
    });
  });

  const formater = Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
    currencyDisplay: "narrowSymbol",
  });

  const items = [
    { name: "Mercedes", length: 120, selected: false },
    { name: "Toyota", length: 15, selected: false },
    { name: "Mitsubishbi", length: 35, selected: false },
    { name: "Nissan", length: 89, selected: false },
    { name: "Honda", length: 30, selected: false },
    { name: "Honda Accord", length: 30, selected: false },
  ];

  const sizes = [
    { name: "XS", selected: false },
    { name: "SM", selected: false },
    { name: "LG", selected: false },
    { name: "XXL", selected: false },
  ];

  const ratings = [
    { rating: 5, selected: false },
    { rating: 4, selected: false },
    { rating: 3, selected: false },
    { rating: 2, selected: false },
    { rating: 1, selected: false },
  ];
  let rating = 0;

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

  function filterByCategory(category) {
    console.log(category.name);
  }

  let productTextFilter = "";
  let categoryTextFilter = "";
  let rangeValues = [0, 10000];

  function applyFilters() {
    $filteredProducts = $app_products.filter((product) => {
      const nameFilter = product.name.toLowerCase().includes(productTextFilter.toLowerCase());
      const priceFilter = product.price > rangeValues[0] && product.price < rangeValues[1];
      return nameFilter && priceFilter;
    });
  }

  function clearCategorySelection() {}
</script>

<div class=" flex flex-col col-span-full md:col-auto row-span-full">
  <Accordion multiple>
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

    <AccordionItem open="true">
      <span slot="header" class="text-base flex gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>

        <span class="text-xs"> Price</span>
      </span>

      <RangeSlider min={0} max={10000} range pushy float pips all rest={false} prefix="$" first="label" last="label" bind:values={rangeValues} on:change={applyFilters} />

      <!-- <Button class="w-full mt-5 transition hover:-translate-y-1 hover:shadow-lg active:shadow-none active:transform active:translate-y-0">Apply</Button> -->
    </AccordionItem>

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
          on:input={applyFilters} />
      </div>
      <div class="w-full border flex flex-col h-64 overflow-y-auto rounded-lg mt-2 p-4">
        {#each $app_categories as category, i}
          {#if categoryArray[i]}
            <div class="grid gap-2 items-center grid-cols-[repeat(2,max-content),1fr]">
              <input class="w-[1rem] h-[1rem] border rounded-none" id="brands-{category.name}" bind:checked={categoryArray[i].selected} type="checkbox" />
              <label class="text-[#51585e]" for="brands-{category.name}">{category.name}</label>

              <p class="justify-self-end text-white bg-[#9da1a7] text-[.83rem] px-[10px] rounded-full">
                {$app_categories.length}
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

      <Button class="w-full mt-5 transition hover:-translate-y-1 hover:shadow-lg active:shadow-none active:transform active:translate-y-0" on:click={clearCategorySelection}>Clear selection</Button>
    </AccordionItem>

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

      <div class="flex flex-col gap-1">
        {#each items as item}
          <div class="grid gap-2 items-center grid-cols-[repeat(2,max-content),1fr]">
            <input class="w-[1rem] h-[1rem] border rounded-none" id="brands-{item.name}" bind:checked={item.selected} type="checkbox" />
            <label class="text-[#51585e]" for="brands-{item.name}">{item.name}</label>

            <p class="justify-self-end text-white bg-[#9da1a7] text-[.83rem] px-[10px] rounded-full">
              {length}
            </p>
          </div>
        {/each}
      </div>
    </AccordionItem>

    <AccordionItem open="true">
      <span slot="header" class="text-base flex gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
        </svg>

        <span class="text-xs"> Size</span>
      </span>
      <div class="flex flex-wrap gap-2">
        {#each sizes as size}
          <!-- <FilterAccordianSizeCheckbox bind:checked={size.selected}>{size.name}</FilterAccordianSizeCheckbox> -->
          <div>
            <!-- <input bind:checked class="hidden peer" {id} type="checkbox" /> -->
            <label
              class="py-[7px] cursor-pointer text-[#212529] peer-checked:border-[#0d6efd] peer-checked:bg-[#e9ecef] hover:text-[#0d6efd] hover:bg-[#f9fafb] transition-colors peer-checked:text-[#0d6efd] hover:border-[#c1c9d0] border border-[#dee2e6] rounded-[.25rem] px-[14px]"
              for={"id"}>
              <slot />
              XL
            </label>
          </div>
        {/each}
      </div>
    </AccordionItem>

    <AccordionItem open="true">
      <span slot="header" class="text-base flex gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>

        <span class="text-xs"> Rating</span>
      </span>
      <div>
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

        <!-- {#each ratings as item}
          <div class="flex gap-2 flex-row">
            <input id="rating-{item.rating}" bind:checked={item.selected} type="checkbox" />

            <label for="rating-{item.rating}" class="flex gap-1 flex-row">
              {#each Array.from({ length: 5 }, (_, index) => index) as currentIndex}
                {#if currentIndex < item.rating}
                
               

                  <svg class="text-yellow-500" width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                    ><path
                      d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z"
                      fill="currentColor" /></svg>
                {:else}
                

                  <svg class="text-gray-300" width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                    ><path
                      d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z"
                      fill="currentColor" /></svg>
                {/if}
              {/each}
            </label>
          </div>
        {/each} -->
      </div>
    </AccordionItem>
  </Accordion>
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
</style>
