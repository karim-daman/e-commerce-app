<script>
  //@ts-nocheck
  import { Accordion, AccordionItem, Button } from "flowbite-svelte";
  import BrandFilter from "./BrandFilter.svelte";
  import CategoryFilter from "./CategoryFilter.svelte";
  import ProductNameFilter from "./ProductNameFilter.svelte";
  import PriceFilter from "./PriceFilter.svelte";
  import RatingFilter from "./RatingFilter.svelte";

  const formater = Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
    currencyDisplay: "narrowSymbol",
  });

  const sizes = [
    { name: "XS", selected: false },
    { name: "SM", selected: false },
    { name: "LG", selected: false },
    { name: "XXL", selected: false },
  ];
</script>

<!-- fixed bg-slate-50 top-0 left-0 z-50 -->

<div class=" flex overflow-clip transition-all flex-col col-span-full md:col-auto row-span-full">
  <!-- <pre class="text-xs">
  {JSON.stringify($app_categories_count, null, 2)}
  </pre> -->

  <!-- <button
    on:click={() => {
      toggle = !toggle;
    }}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    </svg>
  </button> -->

  <Accordion multiple>
    <ProductNameFilter />
    <RatingFilter />
    <PriceFilter />
    <CategoryFilter />
    <BrandFilter />

    <AccordionItem open="true">
      <span slot="header" class="text-base flex gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
        </svg>

        <span class="text-xs"> Offers</span>
      </span>
      <div class="flex flex-wrap gap-2">
        {#each sizes as size}
          <div>
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
  </Accordion>
</div>

<!-- <style>
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
</style> -->
