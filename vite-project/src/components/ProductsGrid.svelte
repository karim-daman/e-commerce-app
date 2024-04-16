<script>
  import { addCartItemToCart, app_like_list, app_user, deleteProduct, filteredProducts, putLike } from "$stores/dataStore";
  import { Badge, Button, Card, ChevronLeft, Dropdown, DropdownItem, MenuButton, Pagination, Rating, ChevronRight, Modal } from "flowbite-svelte";
  import { scale } from "svelte/transition";
  import ImageLoader from "./ImageLoader.svelte";
  import { authModalStore, adminProductEditModalStore } from "$stores/appStore";
  import toast from "svelte-french-toast";
  import EditProductModal from "$components/Admin/EditProductModal.svelte";
  import { push } from "svelte-spa-router";

  let popupModal = false;

  let suggestedProduct;
  let editedProduct;

  function handleEditProduct(product) {
    editedProduct = product;
    $adminProductEditModalStore = !$adminProductEditModalStore;
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

  let pages = [
    { name: 6, href: "#/Products/page=6" },
    { name: 7, href: "#/Products/page=7" },
    { name: 8, href: "#/Products/page=8" },
    { name: 9, href: "#/Products/page=9" },
    { name: 10, href: "#/Products/page=10" },
  ];

  function initDeleteProduct(product) {
    suggestedProduct = product;
    popupModal = true;
  }

  function handlePutLike(product_id, user_id) {
    if (!$app_user) {
      $authModalStore = true;
      return;
    }
    const promise = new Promise((resolve, reject) => {
      putLike(product_id, user_id).then((response) => {
        console.log(response?.updatedLike?.heart);

        app_like_list.update((list) => {
          const updatedList = list.map((element) => {
            if (response?.updatedLike?.id === element.id) {
              // Update the specific properties of the element
              return {
                ...element,
                // Update only the properties you need to change
                heart: response.updatedLike.heart,
                // Add more properties as needed
              };
            }
            return element;
          });

          return updatedList;
        });

        // console.log($app_like_list.find((item) => item.product_id == product_id && item.user_id === user_id).heart);

        response.success == true ? resolve() : reject();
      });
    });

    toast.promise(
      promise,
      {
        loading: `Adding product to your favorites!`,
        success: `Added product to your favorites!`,
        error: `Could not add to your favorites :( `,
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

  const previous = () => {
    alert("Previous btn clicked. Make a call to your server to fetch data.");
  };
  const next = () => {
    alert("Next btn clicked. Make a call to your server to fetch data.");
  };
</script>

<!-- <section class="col-span-full md:col-auto grid justify-center grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 grid-flow-row auto-rows-max"> -->
<section class="col-span-full md:col-auto grid justify-center grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-4 grid-flow-row auto-rows-max">
  {#each $filteredProducts as product}
    <!-- in:fly={{ y: randomIntFromInterval(15, 50) }} out:fly={{ y: -randomIntFromInterval(15, 50) }} -->
    <div in:scale={{ duration: 100, start: 0.95 }} out:scale={{ duration: 75, start: 0.95 }}>
      <!--  in:fly={{ y: 100 }} out:fly={{ y: -100 }} -->
      <Card padding="none">
        <div class="flex justify-end relative">
          {#if product.isFeatured}
            <div class=" absolute left-0 bg-red-600 rounded-sm p-1 text-white font-bold">new!</div>
          {/if}
          <!-- on:click={() => {
              liked = !liked;
            }} -->
          <button
            on:click={handlePutLike(product.id, $app_user?.userId)}
            type="button"
            class="focus:outline-none whitespace-normal rounded-lg focus:ring-2 p-1.5 focus:ring-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 mt-2 mr-2 transition hover:-translate-y-1 hover:shadow-lg active:shadow-none active:transform active:translate-y-0">
            <!-- 
                "product_id": "64566bf2511abc1ff1f988e2",
                "user_id": "6449f752bf8fc30222d62c72",
                "heart": true,
               -->

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={$app_like_list.find((item) => item.product_id == product.id && item.user_id === $app_user?.userId)?.heart ? "red" : "gray"}
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke={$app_like_list.find((item) => item.product_id == product.id && item.user_id === $app_user?.userId)?.heart ? "red" : "gray"}
              class=" w-5 h-5">
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
                <button
                  class=""
                  on:click={() => {
                    push("#/ProductDetails/" + product.id);
                  }}>
                  <div class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>

                    Details
                  </div>
                </button></DropdownItem>

              <DropdownItem class="flex transition hover:-translate-y-1 active:transform active:translate-y-0 ">
                <button class="" on:click={handleEditProduct(product)}>
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
          <div class="flex justify-between">
            <Rating rating={product.rating} size="14" class="mt-2 mb-5 "></Rating>

            <Badge slot="text" class="ml-3 text-xs mt-2 mb-5 ">{product.rating}/5</Badge>
          </div>

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

<EditProductModal product={editedProduct} />

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
