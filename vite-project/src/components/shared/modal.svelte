<script lang="ts">
  // import { clickOutside } from "svelte-use-click-outside";
  import fade from "@lib/transition/modal-fade";
  export let open = false;

  const onKeyUp = (event: KeyboardEvent) => {
    if (event.key === "Escape") open = false;
  };

  const handleClickOutside = () => {
    if (open === true) open = false;
  };
</script>

<svelte:window on:keyup={onKeyUp} />

{#if open}
  <div transition:fade class="w-full h-full bg-black/50 backdrop-blur-sm fixed top-0 left-0 text-white {$$props.class}">
    <!-- <div use:clickOutside={handleClickOutside} class="contents"> -->
    <slot />
    <!-- </div> -->
  </div>
{/if}
