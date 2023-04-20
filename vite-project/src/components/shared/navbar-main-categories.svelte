<script lang="ts">
  import DropdownBox from "./dropdown-box.svelte";
  import NavbarHeadDropdownCaret from "./navbar-head-dropdown-chevron.svelte";
  // import { clickOutside } from "svelte-use-click-outside";
  import { isMobile } from "@lib/store";
  export let choices: { [key: string]: string };
  export let selected: string;

  let open = false;
  $: {
    selected;
    open = false;
  }

  const toggle = () => (open = !open);
  const onEscape = () => (open = false);
  const onKeyUp = (event: KeyboardEvent) => {
    if (event.key === "Escape") onEscape();
  };
</script>

<svelte:window on:keyup={onKeyUp} />

<div class="relative justify-self-end lg:justify-self-start">
  <button
    class="bg-blue-primary hover:bg-blue-700 transition-colors border rounded-[.25rem] text-[15px] text-white px-3 py-[6px] border-blue-300 flex items-center gap-1"
    class:bg-blue-700={open}
    on:click={toggle}>
    {$isMobile ? "Categories" : "All Categories"}
    <NavbarHeadDropdownCaret class="w-2 h-[6px] translate-y-1/4 transition-transform -rotate-90 {open && '!-rotate-0'}" />
  </button>
  {#if open}
    <DropdownBox --left={$isMobile && "-190%"} bind:selected {choices} />
  {/if}
</div>
