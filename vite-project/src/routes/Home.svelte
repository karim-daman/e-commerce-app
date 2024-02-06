<script>
  import { app_products } from "$stores/dataStore";
</script>

<!--
// v0 by Vercel.
// https://v0.dev/t/QPTM8apmS6F
-->
<div class="flex flex-col min-h-screen">
  <!-- <header class="px-4 lg:px-6 h-16 flex items-center">
    <a class="flex items-center justify-center" href="#"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-6 w-6"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg
      ><span class="sr-only">E-Shop</span></a>
    <nav class="ml-auto flex gap-4 sm:gap-6">
      <a class="text-sm font-medium hover:underline underline-offset-4" href="#"> Home </a><a class="text-sm font-medium hover:underline underline-offset-4" href="#"> Shop </a><a
        class="text-sm font-medium hover:underline underline-offset-4"
        href="#">
        About
      </a><a class="text-sm font-medium hover:underline underline-offset-4" href="#"> Contact </a>
    </nav>
  </header> -->
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
            <img src={$app_products[0].image} width="300" height="300" alt="Product " class="mx-auto border aspect-square overflow-hidden rounded-xl object-cover" />
            <h3 class="text-lg font-bold">Product 2</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">$79.99</p>
            <a
              class="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="#">
              Shop Now
            </a>
          </div>
          <div class="grid gap-1">
            <img src={$app_products[0].image} width="300" height="300" alt="Product " class="mx-auto border aspect-square overflow-hidden rounded-xl object-cover" />
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
  <footer class="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
    <p class="text-xs text-gray-500 dark:text-gray-400">© 2024 E-Shop. All rights reserved.</p>
    <nav class="sm:ml-auto flex gap-4 sm:gap-6">
      <a class="text-xs hover:underline underline-offset-4" href="#"> Terms of Service </a><a class="text-xs hover:underline underline-offset-4" href="#"> Privacy </a>
    </nav>
  </footer>
</div>
