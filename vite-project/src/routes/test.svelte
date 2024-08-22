<script>
  import { onMount } from "svelte";

  let open = [];
  let collapse = false;

  function collapseAccordions() {
    for (let i = 0; i < open.length; i++) {
      open[i] = false;
    }
  }

  onMount(() => {
    open = [false, false, false, false, false, false, false, false, false, false];
  });
</script>

<div class="flex">
  <div class=" h-full {collapse ? 'w-1/4' : 'w-1/12'} transition-all duration-200">
    <div class="flex">
      <button
        on:click={() => {
          collapse = !collapse;
        }}
        class="rounded-md border w-full">{collapse ? "Collapse" : "C"}</button>

      <button on:click={collapseAccordions} class="rounded-md border w-full">X</button>
    </div>
    {#each open as _, i}
      <div
        on:keydown={() => {}}
        on:click={() => {
          open[i] = !open[i];
        }}
        class="border {open[i] ? 'h-64' : 'h-10'} transition-all duration-200">
        {i + 1}
      </div>
    {/each}
  </div>

  <div class="w-full bg-slate-100">
    <div class="h-full w-full">
      <div class=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {#each { length: 100 } as _, i}
          <div class="border h-64 w-64">{i + 1}</div>
        {/each}
      </div>
    </div>
  </div>
</div>
