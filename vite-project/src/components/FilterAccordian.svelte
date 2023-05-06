<script lang="ts">
  import { slide } from "svelte/transition";
  export let title: string;

  let open = false;
  const toggle = () => (open = !open);
</script>

<div class="overflow-hidden {$$props.class} border border-b-0 border-slate-300">
  <button on:click={toggle} class="flex items-center text-[15px] text-left leading-[1.5] font-normal w-full px-5 py-[10px] bg-black/5 justify-between">
    {title}
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="w-[11px] h-[10px] text-[#9da1a7]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21l-12-18h24z" />
    </svg>
  </button>

  {#if open}
    <div transition:slide|local class="p-5">
      <slot />
    </div>
  {/if}
</div>
