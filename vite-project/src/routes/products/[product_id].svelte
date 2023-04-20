<script lang="ts">
  import ProductDetailsOptions from "@components/products/details/product-details-options.svelte";
  import ProductDetailsInformation from "@components/products/details/product-details-information.svelte";
  import ProductAsideView from "@components/products/details/product-details-aside-view.svelte";
  import MetaData from "@components/products/details/product-details-metadata.svelte";
  import RatingStats from "@components/products/details/product-details-rating-stats.svelte";
  import InformationSection from "@components/products/details/product-details-information-section.svelte";
</script>

<main class="grid-container py-[60px]">
  <section class="w-full lg:flex">
    <ProductAsideView />

    <article class="max-w-[660px] w-full px-8 pt-10 lg:pt-0">
      <h1 class="text-4xl">Go Pro Cam</h1>
      <MetaData />
      <ProductDetailsInformation quantity={1} />
      <ProductDetailsOptions />
    </article>
  </section>

  <section class="flex flex-col px-8 md:flex-row">
    <div class="flex-auto text-sm text-gray-500 pb-2 border-b border-gray-200 max-w-3xl">
      <InformationSection />
    </div>

    <div class="flex-auto lg:flex-1">
      <RatingStats />
    </div>
  </section>
</main>
