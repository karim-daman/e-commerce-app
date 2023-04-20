<script lang="ts">
  // import { clickOutside } from "svelte-use-click-outside";
  import DropdownBox from "./dropdown-box.svelte";

  export let choices: { [key: string]: string };
  export let selected: string;

  let open = false;
  $: {
    selected;
    open = false;
  }

  const onClick = () => (open = !open);
  const onEscape = () => (open = false);
  const onKeyUp = (event: KeyboardEvent) => {
    if (event.key === "Escape") onEscape();
  };
</script>

<svelte:window on:keyup={onKeyUp} />

<div class="relative min-w-[120px] border border-l-0 border-[#ced4da]">
  <button class="font-normal grid grid-flow-col items-center justify-center text-left text-black/80 text-[15px] w-full h-full" type="button" on:click={onClick}>
    {choices[selected]}
    <img src="/caret-sort.svg" alt="" />
  </button>
  {#if open}
    <DropdownBox --left="50%" --translate-x="-50%" bind:selected {choices} />
  {/if}
</div>
