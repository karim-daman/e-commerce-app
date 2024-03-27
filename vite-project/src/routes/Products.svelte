<script>
  // @ts-nocheck
  import AdminCreateProduct from "$components/Admin/CreateProductModal.svelte";
  import ProductFilter from "$components/ProductFilter.svelte";
  import { addCartItemToCart, app_categories, app_products, app_user, app_user_cart, clearCart, deleteProduct, filteredProducts, getCartById, getCategories, getProducts } from "$stores/dataStore";
  import { authModalStore } from "$stores/appStore";

  import { Badge, Button, ButtonGroup, Card, Dropdown, DropdownItem, Input, InputAddon, Label, MenuButton, Modal, Rating } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { fade, fly, scale } from "svelte/transition";
  import toast, { Toaster } from "svelte-french-toast";

  // import { page } from "$app/stores";
  import { Pagination, ChevronLeft, ChevronRight } from "flowbite-svelte";
  import ImageLoader from "$components/ImageLoader.svelte";
  import { adminProductCreateModalStore, adminProductEditModalStore } from "$stores/appStore";
  import EditProductModal from "$components/Admin/EditProductModal.svelte";

  // $: activeUrl = $page.url.searchParams.get("page");
  let pages = [
    { name: 6, href: "#/Products/page=6" },
    { name: 7, href: "#/Products/page=7" },
    { name: 8, href: "#/Products/page=8" },
    { name: 9, href: "#/Products/page=9" },
    { name: 10, href: "#/Products/page=10" },
  ];

  $: {
    pages.forEach((page) => {
      let splitUrl = page.href.split("?");
      let queryString = splitUrl.slice(1).join("?");
      const hrefParams = new URLSearchParams(queryString);
      let hrefValue = hrefParams.get("page");
      if (hrefValue === "activeUrl") {
        page.active = true;
      } else {
        page.active = false;
      }
    });
    pages = pages;
  }

  const previous = () => {
    alert("Previous btn clicked. Make a call to your server to fetch data.");
  };
  const next = () => {
    alert("Next btn clicked. Make a call to your server to fetch data.");
  };

  let search = "";

  //   import ProductsDropdown from "./products-dropdown.svelte";
  //   import ProductsHeartIcon from "./products-heart-icon.svelte";

  let popupModal = false;

  let liked = false;

  onMount(async () => {
    if ($app_products.length == 0) await getProducts();
    if ($app_categories.length == 0) await getCategories();
  });

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  let suggestedProduct;

  function initDeleteProduct(product) {
    suggestedProduct = product;
    popupModal = true;
  }

  function handleDeleteProduct() {
    const promise = new Promise((resolve, reject) => {
      deleteProduct(suggestedProduct.id).then((response) => {
        response.success == true ? resolve() : reject();
      });
    });

    toast.promise(
      promise,
      {
        loading: `Deleting product ${suggestedProduct.name}`,
        success: `Deleted successfully!`,
        error: `Could not Delete.`,
      },
      {
        position: "top-right",
      }
    );
  }

  async function handleAddToCart(product) {
    if (!$app_user) {
      $authModalStore = true;
      return;
    }

    let newCartItem = {
      quantity: 1,
      product: product.id,
    };

    const promise = new Promise((resolve, reject) => {
      addCartItemToCart($app_user?.cart?.id, newCartItem).then((response) => {
        console.log(response);

        response.success == true ? resolve() : reject();
      });
    });

    toast.promise(
      promise,
      {
        loading: `Adding ${product.name} to your cart..`,
        success: `Added successfully!`,
        error: `Could not add, Try again!.`,
      },
      {
        position: "top-right",
      }
    );
  }

  let editedProduct;
</script>

<Toaster />

<div class="grid grid-rows-[max-content,1fr,max-content] min-h-screen">
  <main class="max-w-[1320px] px-5 lg:px-0 w-full grid grid-cols-[minmax(0,308px),1fr] grid-rows-[auto,1fr] my-10 gap-4 justify-self-center">
    <section class="col-span-full md:col-auto w-full grid">
      {#if $app_user?.isAdmin}
        <div class="mb-2">
          <Button on:click={() => ($adminProductCreateModalStore = !$adminProductCreateModalStore)}
            >Add product <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-2 -mr-2 w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg></Button>
        </div>

        <AdminCreateProduct />
        <EditProductModal product={editedProduct} />
      {/if}

      <!-- 
        <form class="grid grid-cols-[1fr,repeat(2,max-content)]" on:submit|preventDefault>
        <input class="w-full rounded-l-[.25rem] border px-2 h-full" placeholder="Search" bind:value={search} type="text" />

        <button type="button" class="border rounded-r-[.25rem] bg-gray-100 text-gray-500 hover:text-blue-primary transition-colors p-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
      </form> -->

      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg class="w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
            ><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" /></svg>
        </div>
        <input
          type="text"
          id="input-group-search"
          class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search" />
        <button
          type="button"
          class=" absolute w-40 top-0 right-0 p-2 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Search
        </button>
      </div>

      <div class="border-b py-2 flex justify-between">
        <p class="text-xs">({$filteredProducts.length}) Item{$filteredProducts.length > 1 || $filteredProducts.length == 0 ? "s" : ""} found</p>
      </div>
    </section>

    <ProductFilter />

    <!-- <section class="col-span-full md:col-auto grid justify-center grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 grid-flow-row auto-rows-max"> -->
    <section class="col-span-full md:col-auto grid justify-center grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-4 grid-flow-row auto-rows-max">
      {#each $filteredProducts as product}
        <!-- in:fly={{ y: randomIntFromInterval(15, 50) }} out:fly={{ y: -randomIntFromInterval(15, 50) }} -->
        <div in:scale={{ duration: 100, start: 0.95 }} out:scale={{ duration: 75, start: 0.95 }}>
          <!--  in:fly={{ y: 100 }} out:fly={{ y: -100 }} -->
          <Card padding="none">
            <div class="flex justify-end">
              <button
                on:click={() => {
                  liked = !liked;
                }}
                type="button"
                class="focus:outline-none whitespace-normal rounded-lg focus:ring-2 p-1.5 focus:ring-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 mt-2 mr-2 transition hover:-translate-y-1 hover:shadow-lg active:shadow-none active:transform active:translate-y-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill={liked ? "red" : "gray"} viewBox="0 0 24 24" stroke-width="1.5" stroke={liked ? "red" : "gray"} class=" w-5 h-5">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>

              {#if $app_user?.isAdmin}
                <MenuButton class="mt-2 mr-2 transition hover:-translate-y-1 hover:shadow-lg active:shadow-none active:transform active:translate-y-0" />

                <Dropdown class="w-36 ">
                  <DropdownItem class="flex transition hover:-translate-y-1 active:transform active:translate-y-0">
                    <button class="">
                      <div class="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-3">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>

                        Details
                      </div>
                    </button></DropdownItem>

                  <DropdownItem class="flex transition hover:-translate-y-1 active:transform active:translate-y-0 ">
                    <button
                      class=""
                      on:click={() => {
                        editedProduct = product;
                        $adminProductEditModalStore = !$adminProductEditModalStore;
                      }}>
                      <div class="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-3">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
                          <path stroke-linecap="round" stroke-linejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008z" />
                        </svg>

                        Edit
                      </div>
                    </button>
                  </DropdownItem>

                  <DropdownItem class="flex transition hover:-translate-y-1 active:transform active:translate-y-0 ">
                    <button class=" text-red-600" on:click={() => initDeleteProduct(product)}>
                      <div class="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-5 h-5 mr-3">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>

                        Delete
                      </div>
                    </button></DropdownItem>
                </Dropdown>
              {/if}
            </div>

            <!-- <a href="#/ProductDetails/{product.id}">
              <img class="p-8 rounded-t-lg pointer-events-none h-[284px]" src={product.images[0]} alt="product 1" />
            </a> -->

            <a class="m-1 border-b" href="#/ProductDetails/{product.id}">
              <ImageLoader src={product.images[0]} alt={product.name} />
              <span class=" ml-4 text-xs font-bold text-green-500 dark:text-white"> $ {product.price}</span>
            </a>

            <div class="px-5 pb-5">
              <a href="#/ProductDetails/{product.id}" class="flex justify-between">
                <h5 class="text- font-semibold tracking-tight hover:text-blue-600 text-gray-900 dark:text-white truncate">{product.name}</h5>
              </a>
              <Rating rating={product.rating} size="14" class="mt-2.5 mb-5">
                <Badge slot="text" class="ml-3 text-xs">{product.rating}/5</Badge>
              </Rating>
              <div class="flex justify-between items-center">
                <!-- <span class="text-xs font-bold text-green-500 dark:text-white">${product.price}</span> -->
                <Button on:click={handleAddToCart(product)} class="w-full transition hover:-translate-y-1 hover:shadow-lg active:shadow-none active:transform active:translate-y-0">
                  add to cart

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ml-3">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      {/each}

      <div class="  col-span-full justify-self-end">
        <Pagination {pages} on:previous={previous} on:next={next} icon>
          <svelte:fragment slot="prev">
            <span class="sr-only">Previous</span>
            <ChevronLeft class="w-5 h-5" />
          </svelte:fragment>
          <svelte:fragment slot="next">
            <span class="sr-only">Next</span>
            <ChevronRight class="w-5 h-5" />
          </svelte:fragment>
        </Pagination>
      </div>
    </section>
  </main>
</div>

<Modal bind:open={popupModal} size="xs" autoclose>
  <div class="text-center">
    <svg aria-hidden="true" class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
      ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">product: {suggestedProduct.name}</h3>

    <Button
      on:click={() => {
        handleDeleteProduct();
      }}
      color="red"
      class="mr-2">Yes, I'm sure</Button>
    <Button color="alternative">No, cancel</Button>
  </div>
</Modal>

<!-- <pre class="text-xs">
  {JSON.stringify($app_products, null, 2)}
</pre> -->
