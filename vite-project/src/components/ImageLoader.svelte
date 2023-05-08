<script>
  export let src;
  export let alt;
  import IntersectionObserver from "./IntersectionObserver.svelte";
  import ProductImage from "./ProductImage.svelte";
  let nativeLoading = false;
</script>

<IntersectionObserver once={true} let:intersecting>
  {#if intersecting || nativeLoading}
    <ProductImage {alt} {src} />
  {/if}
</IntersectionObserver>
