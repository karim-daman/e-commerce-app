<script>
  import toast from "svelte-french-toast";

  import AdminCreateProduct from "$components/Admin/CreateProductModal.svelte";

  let defaultModal;

  import { app_product_details } from "$stores/dataStore";
  import { Button, Checkbox, Chevron, Dropdown, Search } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { adminSideBarToggleStore } from "$stores/appStore";
</script>

<!-- <pre class="text-xs">
  {JSON.stringify($app_product_details, null, 2)}
</pre> -->

<div class="grid grid-rows-[max-content,1fr,max-content] min-h-screen">
  <div class="text-center">
    <Button on:click={() => (defaultModal = !defaultModal)}>creatre prod</Button>
  </div>

  <AdminCreateProduct createProductModal={defaultModal} />
</div>
