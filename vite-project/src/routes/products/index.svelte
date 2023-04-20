<script>
  import FilterSection from "@components/products/index/filter-section.svelte";
  import ProductsView from "@components/products/index/products-view.svelte";
  import SearchHeader from "@components/products/index/search-header.svelte";
</script>

<main class="max-w-[1320px] px-5 lg:px-0 w-full grid grid-cols-[minmax(0,308px),1fr] grid-rows-[auto,1fr] my-10 gap-4 justify-self-center">
  <SearchHeader />
  <FilterSection class="col-span-full md:col-auto row-span-full" />
  <ProductsView />
</main>
