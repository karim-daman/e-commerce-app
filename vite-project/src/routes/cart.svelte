<script lang="ts">
  import ProgressBar from "@components/cart/cart-progress-bar.svelte";
  import AddressIcon from "@components/cart/cart-address-icon.svelte";
  import PaymentIcon from "@components/cart/cart-payment-icon.svelte";
  import ConfirmationIcon from "@components/cart/cart-confirmation-icon.svelte";
  import CartIcon from "@components/cart/cart-cart-icon.svelte";

  import CartPreviewStep from "@components/cart/cart-preview-step.svelte";
  import CartShippingStep from "@components/cart/cart-shipping-step.svelte";
  import CartPaymentStep from "@components/cart/cart-payment-step.svelte";
  import CartConfirmationStep from "@components/cart/cart-confirmation-step.svelte";

  let handleProgress: (arg0: number) => void;

  let steps = [
    { title: "Cart", icon: CartIcon },
    { title: "Shipping", icon: AddressIcon },
    { title: "Payment", icon: PaymentIcon },
    { title: "Confirmation", icon: ConfirmationIcon },
  ];

  let currentActive: number = 1;
</script>

<div class="grid place-items-center max-h-[35px] my-20">
  <ProgressBar {steps} bind:currentActive bind:handleProgress />
</div>

{#if steps[currentActive - 1].title == "Cart"}
  <CartPreviewStep {handleProgress} />
{:else if steps[currentActive - 1].title == "Shipping"}
  <CartShippingStep title={steps[currentActive - 1].title} />
{:else if steps[currentActive - 1].title == "Payment"}
  <CartPaymentStep title={steps[currentActive - 1].title} />
{:else if steps[currentActive - 1].title == "Confirmation"}
  <CartConfirmationStep title={steps[currentActive - 1].title} />
{/if}

{#if steps[currentActive - 1].title != "Cart"}
  <div class="w-full grid-container flex justify-end my-5">
    <button class="bg-blue-600 w-40 h-10 py-1 rounded-btn-shadow text-white" on:click={() => handleProgress(-1)} disabled={currentActive == 1}>Previous</button>
    <button class="bg-blue-600 w-40 h-10 py-1 rounded-btn-shadow text-white" on:click={() => handleProgress(+1)} disabled={currentActive == steps.length}>Next</button>
  </div>
{/if}
