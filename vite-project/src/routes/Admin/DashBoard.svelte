<script>
  import AdminSideBar from "$components/Admin/Sidebar.svelte";
  import AdminCreateProduct from "$components/Admin/CreateProductModal.svelte";

  let hidden2 = true;
  let defaultModal;

  import { app_product_details } from "$stores/dataStore";
  import { Button, Checkbox, Chevron, Dropdown, Search } from "flowbite-svelte";
</script>

<pre class="text-xs">
  {JSON.stringify($app_product_details, null, 2)}
</pre>

<div class="grid grid-rows-[max-content,1fr,max-content] min-h-screen">
  <div class="text-center">
    <Button on:click={() => (hidden2 = !hidden2)}>Show navigation</Button>
    <Button on:click={() => (defaultModal = !defaultModal)}>creatre prod</Button>
  </div>

  <AdminSideBar {hidden2} />
  <AdminCreateProduct createProductModal={defaultModal} />
</div>
