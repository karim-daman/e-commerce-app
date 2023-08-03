<script>
  import { app_user, getProducts, app_user_cart, getCartById, removeFromCart, clearCart } from "$stores/dataStore";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  let cartItemList = [];

  onMount(async () => {
    await getProducts();
    await getCartById($app_user?.cart?.id);

    cartItemList = $app_user_cart?.cartItems;
  });

  async function handleREmoveFromCart(item) {
    await removeFromCart(item._id);
    await getCartById($app_user?.cart?.id);
    cartItemList = $app_user_cart?.cartItems;
  }

  async function handleClearCart() {
    await clearCart($app_user?.cart?.id);
  }
</script>

<!-- <pre class="text-xs">
    {JSON.stringify($app_user, null, 2)}
</pre> -->

<div class="grid grid-rows-[max-content,1fr,max-content] min-h-screen">
  <main class="max-w-[1320px] px-5 lg:px-0 w-full grid grid-cols-[minmax(1,308px),1fr] grid-rows-[auto,1fr] my-10 gap-4 justify-self-center">
    <ol class="border flex-col sm:flex-row justify-between p-2 rounded-md items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0">
      <li class="flex items-center text-blue-600 dark:text-blue-500 space-x-2.5">
        <span class="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500"> 1 </span>
        <span>
          <h3 class="font-medium leading-tight">Manage cart items</h3>
          <p class="text-sm">Step details here</p>
        </span>
      </li>
      <li class="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5">
        <span class="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400"> 2 </span>
        <span>
          <h3 class="font-medium leading-tight">Customer info</h3>
          <p class="text-sm">Step details here</p>
        </span>
      </li>
      <li class="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5">
        <span class="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400"> 3 </span>
        <span>
          <h3 class="font-medium leading-tight">Shipping details</h3>
          <p class="text-sm">Step details here</p>
        </span>
      </li>
      <li class="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5">
        <span class="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400"> 4 </span>
        <span>
          <h3 class="font-medium leading-tight">Payment info</h3>
          <p class="text-sm">Step details here</p>
        </span>
      </li>
      <li class="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5">
        <span class="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400"> 5 </span>
        <span>
          <h3 class="font-medium leading-tight">Confirmation</h3>
          <p class="text-sm">Step details here</p>
        </span>
      </li>
    </ol>

    <main class="w-full grid-container px-5 lg:px-0 grid lg:grid-cols-[1fr,minmax(0,308px)] lg:grid-rows-[110px,1fr] my-10 gap-x-5 gap-y-4">
      <!--  in:fly={{ x: 100, duration: 100 }}
        out:fly={{ x: -100, duration: 100 }} -->
      <section
        class="  row-start-2 h-max row-end-3 lg:row-start-1 lg:row-end-3 border rounded-[.25rem] grid gap-x-5 sm:gap-x-10 gap-y-2 sm:gap-y-4 grid-cols-[minmax(0,1fr),minmax(0,max-content)] sm:grid-cols-[2fr,minmax(100px,20ch),1fr,max-content] grid-flow-row auto-rows-max p-4">
        <h1 class="sr-only">Cart Items</h1>

        <h2 class="item-header hidden sm:block">Product</h2>
        <h2 class="item-header hidden sm:block">Quantity</h2>
        <h2 class="item-header hidden sm:block">Price</h2>
        <button
          on:click={handleClearCart}
          class=" transition hover:-translate-y-1 active:transform active:translate-y-0 self-start col-span-full sm:col-auto justify-self-end sm:py-1 sm:px-2 py-2 px-3 rounded-[.25rem] bg-red-500 text-white">
          <!-- <img class="w-7 sm:w-5 h-7 sm:h-5" src="" alt="" /> -->

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>

        <!-- {#each Array.from({ length: 5 }) as _} -->

        {#each cartItemList as item}
          <div class="  grid gap-x-2 col-span-full sm:col-auto grid-cols-1 sm:grid-cols-[max-content,1fr]">
            <img src={item.product.image} class="border rounded-md sm:row-span-full justify-self-center sm:w-[72px] sm:h-[72px]" alt="product" />
            <div class="grid grid-cols-[minmax(0,1fr),minmax(0,max-content)] sm:grid-cols-none grid-flow-row auto-rows-max self-center">
              <a class="underline font-normal text-[1rem] text-black" href="#/ProductDetails/{item.product.id}">{item.product.name}</a>

              <button class="grid sm:hidden close-button">
                <!-- <CartClose class="w-5 h-5" /> -->
              </button>
              <p class="sm-desc col-span-full">by {item.product.brand}</p>
            </div>
          </div>

          <div class="w-full h-min grid grid-cols-[minmax(0,max-content),minmax(0,1fr),minmax(0,max-content)] gap-2 self-center">
            <button class="transition hover:-translate-y-1 active:transform active:translate-y-0 rounded-btn-shadow text-left p-1 border hover:text-blue-primary rounded-[.25rem]">
              <!-- <Minus /> -->

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
              </svg>
            </button>
            <input class="border self-center sm:self-start border-black rounded-[.25rem] h-full sm:h-min p-1 px-3 transition-colors" type="number" value={item.quantity} />
            <button class="transition hover:-translate-y-1 active:transform active:translate-y-0 rounded-btn-shadow text-left hover:text-blue-primary p-1 border rounded-[.25rem]">
              <!-- <Plus /> -->

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>

          <div class="self-center">
            <h3 class="font-bold text-green-500">$ {item.product.price * item.quantity}</h3>
            <p class=" text-[.85rem] text-green-400">$ {item.product.price} each</p>
          </div>

          <button
            on:click={handleREmoveFromCart(item)}
            class=" transition hover:-translate-y-1 active:transform active:translate-y-0 self-center col-span-full sm:col-auto sm:py-1 sm:px-2 py-2 px-3 rounded-[.25rem] bg-red-500 text-white">
            <!-- <img class="w-7 sm:w-5 h-7 sm:h-5" src="" alt="" /> -->

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentcolor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          <!-- <button class=" rounded-btn-shadow hidden sm:grid close-button">
            <CartClose class="w-5 h-5" />
          </button> -->
        {/each}
      </section>
      <!-- <Coupon />
        

        <Receipt bind:receipt bind:handleProgress /> -->

      <section class="rounded-[.25rem] border p-5">
        <h1 class="sr-only">Coupon Area</h1>

        <label for="coupon" class="text-grey-secondary">Have a coupon</label>
        <div class="flex mt-1 w-full">
          <input
            id="coupon"
            placeholder="Coupon Code"
            class="border bg-[#f9f9f9] text-grey-secondary transition-colors focus:outline-none focus:bg-white hover:border-[#6ea8fe] focus:border-[#6ea8fe] placeholder:text-[#9da1a7] px-[14px] py-[6px] w-full border-r-0 rounded-l"
            type="text" />
          <button class="border text-grey-secondary font-normal px-[14px] py-[6px] rounded-r">Apply</button>
        </div>
      </section>

      <section id="receipt" class="p-5 self-start flex h-max text-grey-secondary leading-[1.5] flex-col gap-[5px] rounded-[.25rem] border">
        <dl class="w-full flex items-center justify-between">
          <dt>Total Price:</dt>
          <dd class={$$props.class}>{$app_user_cart.totalPrice}</dd>
        </dl>

        <dl class="w-full flex items-center justify-between">
          <dt>Discount:</dt>
          <dd class={$$props.class}>%15</dd>
        </dl>

        <dl class="w-full flex items-center justify-between">
          <dt>Tax:</dt>
          <dd class={$$props.class}>$ -5</dd>
        </dl>

        <!-- <ReceiptInfo title="Total Price" value={total_price} />
        <ReceiptInfo class="text-[#00a524]" title="Discount" value={discount} />
        <ReceiptInfo title="" value={tax} /> -->
        <hr class="my-[11px]" />
        <!-- <ReceiptInfo class="font-bold text-[#212529] text-[1.25rem]" title="Total" value={total} /> -->

        <dl class=" flex font-bold text-[#212529] text-[1.25rem]">
          <dd class=" justify-start">Total:</dd>

          <dd class="text-xl w-full text-green-500 flex justify-end">$ {$app_user_cart.totalPrice}</dd>
        </dl>

        <button class="transition hover:-translate-y-1 active:transform active:translate-y-0 rounded-btn-shadow text-white px-[14px] mt-[11px] mb-4 py-[7px] bg-[#0b5ed7] rounded-[.25rem]"
          >Make Purchase</button>

        <!-- on:click={() => {
            handleProgress(+1);
          }} -->
      </section>

      <button class="sm:hidden text-white bg-blue-primary p-3 rounded-full fixed z-20 border border-black bottom-10 left-5">
        <!-- <ReceiptIcon /> -->
      </button>
    </main>
  </main>
</div>

<pre class="text-xs">
  {JSON.stringify($app_user_cart, null, 2)}
</pre>
