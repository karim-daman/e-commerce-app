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

<div class="h-[284.28px] flex justify-center items-center">
  {#if !loaded}
    <Spinner color="purple" />
  {/if}
  <img class="{loaded ? 'opacity-1' : 'opacity-0'} transition ease-in duration-300" {src} {alt} class:loaded bind:this={thisImage} loading="lazy" />
</div>
