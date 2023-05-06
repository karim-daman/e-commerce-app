<script>
  import FilterAccordian from "$components/FilterAccordian.svelte";
  import { Accordion, AccordionItem } from "flowbite-svelte";
  import DoubleRangeSlider from "./DoubleRangeSlider.svelte";

  //   export let offers = false;
  //   export let src;
  //   export let href;

  //   export let title;
  //   export let options;
  //   export let price;
  //   export let offerPrice = 0;

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

  let start;
  let end;
  const nice = (d) => {
    if (!d && d !== 0) return "";
    return d.toFixed(2);
  };
</script>

<div class=" flex flex-col col-span-full md:col-auto row-span-full">
  <Accordion multiple>
    <AccordionItem>
      <span slot="header" class="text-base flex gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
        </svg> Categories
      </span>
      <div class="w-full h-full flex gap-1 flex-col">
        <a href="/">Electronics</a>
        <a href="/">Home items</a>
        <a href="/">Books, Magazines</a>
        <a href="/">Men's clothing</a>
        <a href="/">Interiors items</a>
        <a href="/">Underwears</a>
        <a href="/">Shoes for men</a>
        <a href="/">Accessories</a>
      </div>
    </AccordionItem>
    <AccordionItem>
      <span slot="header" class="text-base flex gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>

        <span> Brands</span>
      </span>

      <div class="flex flex-col gap-1">
        {#each items as item}
          <div class="grid gap-2 items-center grid-cols-[repeat(2,max-content),1fr]">
            <input class="w-[1rem] h-[1rem] border rounded-none" id="brands-{item.name}" bind:checked={item.selected} type="checkbox" />
            <label class="text-[#51585e]" for="brands-{name}">{name}</label>

            <p class="justify-self-end text-white bg-[#9da1a7] text-[.83rem] px-[10px] rounded-full">
              {length}
            </p>
          </div>
        {/each}
      </div>
    </AccordionItem>

    <AccordionItem>
      <span slot="header" class="text-base flex gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>

        <span> Price</span>
      </span>
      <div class="w-full grid grid-cols-2 gap-x-4 grid-flow-row auto-rows-max">
        <!-- <input class="styled-slider w-full col-span-2 mb-2" type="range" /> -->
        <!-- <NumberInput placeholder="$0">Min</NumberInput>
            <NumberInput placeholder="$1000">Max</NumberInput> -->

        <DoubleRangeSlider bind:start bind:end />
        <div class="labels">
          <div class="label">{nice(start)}</div>
          <div class="label">{nice(end)}</div>
        </div>

        <button class="mt-4 px-[14px] py-[6px] col-span-2 rounded-[.25rem] text-white bg-[#0d6efd] hover:bg-[#0d6efd]/90"> Apply </button>
      </div>
    </AccordionItem>

    <AccordionItem>
      <span slot="header" class="text-base flex gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
        </svg>

        <span> Size</span>
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
            </label>
          </div>
        {/each}
      </div>
    </AccordionItem>

    <AccordionItem>
      <span slot="header" class="text-base flex gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>

        <span> Rating</span>
      </span>
      <div>
        {#each ratings as item}
          <div class="flex gap-2 flex-row">
            <input id="rating-{item.rating}" bind:checked={item.selected} type="checkbox" />

            <label for="rating-{item.rating}" class="flex gap-1 flex-row">
              {#each Array.from({ length: 5 }, (_, index) => index) as currentIndex}
                {#if currentIndex < item.rating}
                  <!-- gold start -->
                  <!-- <FilterStar class="text-yellow-500" /> -->

                  <svg class="text-yellow-500" width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                    ><path
                      d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z"
                      fill="currentColor" /></svg>
                {:else}
                  <!-- grey start -->
                  <!-- <FilterStar class="" /> -->

                  <svg class="text-gray-300" width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                    ><path
                      d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z"
                      fill="currentColor" /></svg>
                {/if}
              {/each}
            </label>
          </div>
        {/each}
      </div>
    </AccordionItem>
  </Accordion>
</div>
