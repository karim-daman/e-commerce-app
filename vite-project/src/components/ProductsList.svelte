<script>
  import { filteredProducts } from "$stores/dataStore";
</script>

<div class="grid gap-4 w-full">
  {#each $filteredProducts as product}
    <div class="flex border flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 rounded-lg">
      <img src={product.image} alt="Product 1" class="  rounded-lg m-1 overflow-hidden object-cover w-1/3" style="aspect-ratio: 60 / 60; object-fit: cover;" />
      <div class="grid gap-1">
        <h3 class="font-bold text-sm md:text-base">{product.name}</h3>
        <!-- <p class="text-xs text-gray-500 w-1/3">{product.description}</p> -->
        <h4 class="font-semibold text-xs md:text-sm">${product.price}</h4>
      </div>
    </div>
  {/each}
</div>
