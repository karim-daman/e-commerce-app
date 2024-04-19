<script>
  //@ts-nocheck
  import { decodeToken } from "$stores/dataStore";

  import { app_user, app_user_cart, getCartById } from "$stores/dataStore";
  import { onMount } from "svelte";

  onMount(async () => {
    await getCartById($app_user?.cart?._id);

    $app_user.cart = $app_user_cart;
  });
</script>

<section class="text-gray-600 body-font relative">
  <div class="container px-5 mx-auto">
    <div class="ml-20 max-w-screen-xl bg-slate-100 overflow-auto">
      <pre class="">

        {localStorage.getItem("token")}

        <p class="rounded-md p-2">{JSON.stringify($app_user, null, 2)}</p>
        <p class="rounded-md p-2">{JSON.stringify($app_user.isAdmin, null, 2)}</p>

        {JSON.stringify(decodeToken(localStorage.getItem("token")).isAdmin)}

      </pre>
    </div>
  </div>
</section>
