<script lang="ts">
  import { slide } from "svelte/transition";
  import NavbarHeadDropdownChevron from "@components/shared/navbar-head-dropdown-chevron.svelte";
  export let title: string;

  let open = false;
  const toggle = () => (open = !open);
</script>

<div class="overflow-hidden {$$props.class} border border-b-0 border-slate-300">
  <button on:click={toggle} class="flex items-center text-[15px] text-left leading-[1.5] font-normal w-full px-5 py-[10px] bg-black/5 justify-between">
    {title}
    <NavbarHeadDropdownChevron class="w-[11px] h-[10px] text-[#9da1a7]" />
  </button>

  {#if open}
    <div transition:slide|local class="p-5">
      <slot />
    </div>
  {/if}
</div>
