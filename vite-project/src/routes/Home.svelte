<script>
  import { app_products, getProducts } from "$stores/dataStore";
  import { onMount } from "svelte";

  onMount(async () => {
    await getProducts();
  });
</script>

<!--
// v0 by Vercel.
// https://v0.dev/t/QPTM8apmS6F
-->
<div class="flex flex-col min-h-screen">
  <main class="flex-1">
    <section class="w-full pt-12 md:pt-24 lg:pt-32 border-y">
      <div class="px-4 md:px-6 space-y-10 xl:space-y-16">
        <div class="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
          <div><h1 class="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">Discover Your Next Favorite Product</h1></div>
          <div class="flex flex-col items-start space-y-4">
            <p class="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">Explore our collection of top-rated products. Shop now and enjoy the best deals!</p>
            <div class="space-x-4">
              <a
                class="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="#">
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="w-full py-12 md:py-24 lg:py-32">
      <div class="container space-y-12 px-4 md:px-6">
        <div class="flex flex-col items-center justify-center space-y-4 text-center">
          <div class="space-y-2">
            <div class="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Featured Products</div>
            <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">Top Picks For You</h2>
          </div>
        </div>
        <div class="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
          <div class="grid gap-1">
            <img src={$app_products[0].image} width="300" height="300" alt="Product " class="mx-auto border aspect-square overflow-hidden rounded-xl object-cover" />
            <h3 class="text-lg font-bold">Product 1</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">$99.99</p>
            <a
              class="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="#">
              Shop Now
            </a>
          </div>
          <div class="grid gap-1">
            <img src={$app_products[1].image} width="300" height="300" alt="Product " class="mx-auto border aspect-square overflow-hidden rounded-xl object-cover" />
            <h3 class="text-lg font-bold">Product 2</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">$79.99</p>
            <a
              class="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="#">
              Shop Now
            </a>
          </div>
          <div class="grid gap-1">
            <img src={$app_products[2].image} width="300" height="300" alt="Product " class="mx-auto border aspect-square overflow-hidden rounded-xl object-cover" />
            <h3 class="text-lg font-bold">Product 3</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">$59.99</p>
            <a
              class="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="#">
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </section>
    <section class="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div class="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div class="space-y-3">
          <h2 class="text-3xl font-bold tracking-tighter md:text-4xl/tight">Special Offers</h2>
          <p class="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">Check out our latest deals and discounts.</p>
        </div>
        <div class="mx-auto w-full max-w-sm space-y-2">
          <button
            class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8"
            >View Offers</button>
        </div>
      </div>
    </section>
  </main>
</div>
