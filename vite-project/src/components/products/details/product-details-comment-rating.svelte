<script>
  import Star from "@components/products/details/product-details-star.svelte";
  export let rating = 0;
  let hoverRating = 0;

  let stars = [
    { id: 1, title: "One Star" },
    { id: 2, title: "Two Stars" },
    { id: 3, title: "Three Stars" },
    { id: 4, title: "Four Stars" },
    { id: 5, title: "Five Stars" },
  ];
</script>

<div class="flex items-center">
  {#each stars as star (star.id)}
    <Star class="h-5 w-5" filled={hoverRating ? hoverRating >= star.id : rating >= star.id} starId={star.id} />
  {/each}
</div>
