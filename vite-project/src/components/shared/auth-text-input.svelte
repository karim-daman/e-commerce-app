<script lang="ts">
  import "@styles/auth-input.scss";
  export let placeholder = "";
  export let value: string;
  export let isInvalid = false;
</script>

<div class="auth_input {$$props.class}" class:error={isInvalid}>
  <input {placeholder} bind:value type="text" />
  {#if $$slots.default}
    <slot />
  {/if}
</div>
