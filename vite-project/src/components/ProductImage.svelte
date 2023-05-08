<script>
  import { Spinner } from "flowbite-svelte";
  export let src;
  export let alt;
  import { onMount } from "svelte";
  let loaded = false;
  let thisImage;
  onMount(() => {
    thisImage.onload = () => {
      loaded = true;
    };
  });
</script>

{#if !loaded}
  <div class="flex items-center justify-center h-[284.28px]">
    <Spinner color="purple" />
  </div>
{/if}

<img class="{loaded ? 'opacity-1' : 'opacity-0'} transition ease-in duration-300" {src} {alt} class:loaded bind:this={thisImage} loading="lazy" />
