<script lang="ts">
  import "@styles/auth-input.scss";
  export let placeholder = "";
  export let value: string;
  export let isInvalid = false;

  let isPasswordHidden = true;
</script>

<div class="auth_input {$$props.class}" class:error={isInvalid}>
  <input id="check-{placeholder}" bind:checked={isPasswordHidden} class="hidden" type="checkbox" />
  <label for="check-{placeholder}" />
  {#if isPasswordHidden}
    <input {placeholder} bind:value type="password" />
  {:else}
    <input {placeholder} bind:value type="text" />
  {/if}
  {#if $$slots.default}
    <slot />
  {/if}
</div>
