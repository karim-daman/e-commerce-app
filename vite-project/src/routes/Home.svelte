<script>
  // @ts-nocheck

  import { app_products, getProducts } from "$stores/dataStore";
  import { onMount } from "svelte";
  import tilt from "svelte-tilt";
  import Carousel from "svelte-carousel";
  import { push } from "svelte-spa-router";
  let ready = false;
  onMount(async () => {
    await getProducts();
    ready = true;
  });

  let carousel;

  let categories = ["Interior items", "Sport and travel", "Jewellery", "Accessories", "Automobiles", "Home items", "Music", "Book, reading", "Kid's toys", "Smartphones"];
</script>

<svelte:head>
  <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.1.1/model-viewer.min.js"></script>
</svelte:head>

<div class="h-screen flex items-center justify-center">
  <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
    <section class="mb-8 flex flex-col justify-between gap-6 sm:gap-10 md:mb-16 md:gap-16 lg:flex-row">
      <!-- content - start -->
      <div class="flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12">
        <p class="mb-4 font-semibold text-indigo-500 md:mb-6 md:text-lg xl:text-xl">Your Online Shopping Experiance</p>

        <h1 class="mb-8 text-4xl font-bold text-black sm:text-5xl md:mb-12 md:text-6xl">Discover Your Next Favorite Product</h1>

        <div class=" z-10 gap-2.5 sm:flex-row sm:justify-center lg:justify-start">
          <div class="space-x-4">
            <a
              class=" inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-5 text-2xl sm:text-7xl w-full font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="#/products">
              Start Shopping
            </a>
          </div>
        </div>
      </div>
      <!-- content - end -->

      <div class="flex flex-row h-[300px] sm:min-h-screen justify-center items-center">
        <!-- Use it like any other HTML element -->
        <model-viewer
          auto-rotate
          min-camera-orbit="auto auto 100%"
          max-camera-orbit="auto auto 100%"
          disable-zoom
          class=" h-screen w-[300px] sm:w-[800px]"
          alt="3DCart"
          src="3DCart/scene.gltf"
          ar
          shadow-intensity="1"
          camera-controls
          touch-action="pan-y" />
      </div>
    </section>
  </div>
</div>

<div class="bg-white pb-6 sm:pb-8 lg:pb-12">
  <section class="mx-auto max-w-screen-2xl px-4 md:px-8">
    <div class="mb-8 flex flex-wrap justify-between md:mb-16">
      <div class="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
        <h1 class="mb-4 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl">Find your<br />style online</h1>

        <p class="max-w-md leading-relaxed text-gray-500 xl:text-lg">This is a section of some simple filler text, also known as placeholder text. It shares characteristics of real text.</p>
      </div>

      <div class="mb-12 flex w-full md:mb-16 lg:w-2/3">
        <div class="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">
          <img src="https://images.unsplash.com/photo-1542340916-951bb72c8f74?auto=format&q=75&fit=crop&w=550&h=550" loading="lazy" alt="splash" class="h-full w-full object-cover object-center" />
        </div>

        <div class="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
          <img src="https://images.unsplash.com/photo-1586295166487-b265f7e83a7f?auto=format&q=75&fit=crop&w=550&h=550" loading="lazy" alt="splash" class="h-full w-full object-cover object-center" />
        </div>
      </div>
    </div>
  </section>
</div>

<div class="h-screen flex justify-center items-center rounded-md mx-5">
  <div class="w-full my-20">
    <div class="border rounded-lg">
      {#if ready}
        <Carousel autoplay autoplayDuration={3000} pauseOnFocus particlesToShow={5} particlesToScroll={4} bind:this={carousel}>
          {#each $app_products as item}
            <div class="relative group">
              <img class="group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all" draggable="false" src={item.image} alt="" />
              <div class="group-hover:opacity-100 opacity-0 absolute inset-0 flex items-end justify-center">
                <span
                  on:click={() => {
                    push("#/ProductDetails/" + item.id);
                  }}
                  class="border hover:cursor-pointer text-emerald-400 text-lg font-extrabold font-mono backdrop-blur-sm px-4 rounded-md">
                  $ {item.price}</span>
              </div>
            </div>
          {/each}
        </Carousel>
      {/if}
    </div>

    <div class=" py-6 sm:py-8 lg:py-12">
      <div class=" max-w-screen-3xl">
        <div class="flex flex-col overflow-hidden rounded-lg bg-gray-900 sm:flex-row md:h-80">
          <div class="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-2/5">
            <h2 class="mb-4 text-xl font-bold text-white md:text-2xl lg:text-4xl">Summer Sale<br />Up to 70% off.</h2>
            <p class="mb-8 max-w-md text-gray-400">This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text.</p>
            <div class="mt-auto">
              <!-- sends to best deals using query string -->
              <!--   href="#/products?query=hello+world&sort=title" -->
              <a
                href="#/products?query=sort&sort=Price+ascending"
                class="w-full inline-block rounded-lg bg-white px-8 py-3 text-center text-sm font-semibold text-gray-800 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:text-base"
                >Save now</a>
            </div>
          </div>

          <div class="order-first h-48 w-full bg-gray-700 sm:order-none sm:h-auto sm:w-1/2 lg:w-3/5">
            <img
              src="https://images.unsplash.com/photo-1505846951821-e25bacf2eccd?auto=format&q=75&fit=crop&crop=top&w=1000&h=500"
              loading="lazy"
              alt=" by Dom Hill"
              class="h-full w-full object-cover object-center" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- <div class="grid grid-cols-5 grid-rows-5 gap-4 mx-20">
  {#each categories as item}
    <button class="hoverPress border rounded-lg h-20">
      <div class="flex justify-evenly">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
        </svg>
      </div>

      <p class="flex justify-evenly">{item}</p>
    </button>
  {/each}
</div> -->

<div class="bg-white border py-6 sm:py-8 lg:py-12">
  <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
    <div class="mb-6 flex items-end justify-between gap-4">
      <h2 class="text-2xl font-bold text-gray-800 lg:text-3xl">Shoe Collections</h2>

      <a
        href="#/products"
        class="inline-block rounded-lg border bg-white px-4 py-2 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:px-8 md:py-3 md:text-base"
        >Show more</a>
    </div>

    <div class="grid gap-x-4 gap-y-6 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
      <!-- product - start -->
      <div>
        {#if $app_products.length > 0}
          <!-- Ensure $app_products[0] is defined and has an image property -->
          {#if $app_products[6].image}
            <a href="#/ProductDetails/{$app_products[6].id}" class="group mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3">
              <img src={$app_products[6].image} width="300" height="300" alt="Product" loading="lazy" class="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
            </a>
          {:else}
            <!-- If $app_products[0] is undefined or has no image, display a placeholder or default image -->

            <div class="relative items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white opacity-20">Noteworthy technology acquisitions 2021</h5>
              <p class="font-normal text-gray-700 dark:text-gray-400 opacity-20">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
              <div role="status" class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"
                  ><path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor" /><path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill" /></svg>
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          {/if}
        {/if}

        <div class="flex flex-col">
          <span class="text-gray-500">Men</span>
          <a href="#" class="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl">Business Causual</a>
        </div>
      </div>
      <!-- product - end -->

      <!-- product - start -->
      {#if $app_products.length > 0}
        <div>
          <!-- Ensure $app_products[0] is defined and has an image property -->
          {#if $app_products[4].image}
            <a href="#/ProductDetails/{$app_products[4].id}" class="group mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3">
              <img src={$app_products[4].image} width="300" height="300" alt="Product" loading="lazy" class="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
            </a>
          {:else}
            <!-- If $app_products[0] is undefined or has no image, display a placeholder or default image -->

            <div class="relative items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white opacity-20">Noteworthy technology acquisitions 2021</h5>
              <p class="font-normal text-gray-700 dark:text-gray-400 opacity-20">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
              <div role="status" class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"
                  ><path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor" /><path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill" /></svg>
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          {/if}

          <div class="flex flex-col">
            <span class="text-gray-500">Women</span>
            <a href="#" class="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl">Summer Season</a>
          </div>
        </div>
        <!-- product - end -->

        <!-- product - start -->
        <div>
          {#if $app_products.length > 0}
            <!-- Ensure $app_products[0] is defined and has an image property -->
            {#if $app_products[2].image}
              <a href="#/ProductDetails/{$app_products[2].id}" class="group mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3">
                <img
                  src={$app_products[2].image}
                  width="300"
                  height="300"
                  alt="Product"
                  loading="lazy"
                  class="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
              </a>
            {:else}
              <!-- If $app_products[0] is undefined or has no image, display a placeholder or default image -->

              <div class="relative items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white opacity-20">Noteworthy technology acquisitions 2021</h5>
                <p class="font-normal text-gray-700 dark:text-gray-400 opacity-20">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                <div role="status" class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                  <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"
                    ><path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor" /><path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill" /></svg>
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            {/if}
          {/if}

          <div class="flex flex-col">
            <span class="text-gray-500">Men</span>
            <a href="#" class="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl">Streetwear</a>
          </div>
        </div>
        <!-- product - end -->

        <!-- product - start -->
        <div>
          {#if $app_products.length > 0}
            <!-- Ensure $app_products[0] is defined and has an image property -->
            {#if $app_products[3].image}
              <a href="#/ProductDetails/{$app_products[3].id}" class="group mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3">
                <img
                  src={$app_products[3].image}
                  width="300"
                  height="300"
                  alt="Product"
                  loading="lazy"
                  class="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
              </a>
            {:else}
              <!-- If $app_products[0] is undefined or has no image, display a placeholder or default image -->

              <div class="relative items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white opacity-20">Noteworthy technology acquisitions 2021</h5>
                <p class="font-normal text-gray-700 dark:text-gray-400 opacity-20">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                <div role="status" class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                  <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"
                    ><path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor" /><path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill" /></svg>
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            {/if}
          {/if}

          <div class="flex flex-col">
            <span class="text-gray-500">Women</span>
            <a href="#" class="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl">Sale</a>
          </div>
        </div>
        <!-- product - end -->
      {/if}
    </div>
  </div>
</div>

<!--
// v0 by Vercel.
// https://v0.dev/t/QPTM8apmS6F
-->

<!--  -->
