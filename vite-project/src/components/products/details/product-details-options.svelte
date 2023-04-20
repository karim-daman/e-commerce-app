<script>
  import CartIcon from "@components/shared/navbar-cart.svelte";
  import MailIcon from "@components/products/details/product-details-mail.svelte";
</script>

<div class="flex justify-center">
  <button class="rounded-btn-shadow max-w-60 w-full items-center flex flex-row mx-px text-white px-[14px] mt-[11px] mb-4 py-[7px] bg-[#0b5ed7] rounded-[.25rem]">
    <CartIcon class="mx-2" />
    Add to cart!
  </button>

  <button class="rounded-btn-shadow max-w-60 w-full items-center flex flex-row mx-px text-white px-[14px] mt-[11px] mb-4 py-[7px] bg-[#0b5ed7] rounded-[.25rem]">
    <MailIcon class="mx-2" />
    Contact supplier
  </button>
</div>
