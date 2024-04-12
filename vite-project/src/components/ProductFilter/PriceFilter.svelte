<script>
  import { filteredProducts, app_products } from "$stores/dataStore";
  import { AccordionItem } from "flowbite-svelte";
  import RangeSlider from "svelte-range-slider-pips";

  let rangeValues = [0, 10000];

  function applyFilters() {
    $filteredProducts = $app_products.filter((product) => {
      const priceFilter = product.price > rangeValues[0] && product.price < rangeValues[1];
      return priceFilter;
    });
  }
</script>

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
