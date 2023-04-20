<script lang="ts">
  import Reviews from "@components/products/details/product-details-reviews.svelte";
  import Orders from "@components/products/details/product-details-orders.svelte";
  import Rating from "@components/products/details/product-details-comment-rating.svelte";
</script>

<div class="my-3">
  <div class="flex justify-between">
    <Rating rating={3} />
    <small class=" flex">
      <Reviews />
      132 reviews</small>
    <small class="flex"
      ><Orders />
      439 orders</small>
  </div>
</div>
