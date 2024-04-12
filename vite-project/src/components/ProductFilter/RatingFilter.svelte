<script>
  import { app_products, filteredProducts } from "$stores/dataStore";
  import { AccordionItem } from "flowbite-svelte";
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
    $filteredProducts = $app_products.filter((product) => product.rating == rating);
  }
</script>

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
  </div>
</AccordionItem>
