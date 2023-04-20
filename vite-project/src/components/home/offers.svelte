<script>
  import OffersCard from "./offers-card.svelte";
</script>

<section class="grid-container px-5 md:px-0 w-full my-10 grid grid-flow-row lg:grid-cols-[minmax(0,640px),1fr,1fr] lg:grid-rows-[repeat(2,198px)] gap-x-5 gap-y-6">
  <h1 class="sr-only">Offfers</h1>

  <OffersCard class="lg:row-span-2 bg-[#ccd1d6] bg-watch" title="Best products & brands in our store at 80% off" href="">
    That's true but not always

    <a draggable="false" class="p-2 text-white rounded-[.25rem] bg-blue-primary hover:bg-blue-700 transition-colors self-start" slot="link" href="/"> Claim offer </a>
  </OffersCard>

  <OffersCard class="bg-blue-primary" title="Gaming toolset" href="">Technology for cyber sport</OffersCard>

  <OffersCard class="bg-blue-primary" title="Quality sound" href="">All you need for music</OffersCard>

  <OffersCard class="lg:col-span-2 bg-green-500" title="Buy 2 items, With special gift" href="">
    Buy one, get one free marketing strategy helps your business improves the brand by sharing the profits
  </OffersCard>
</section>

<style lang="scss" global>
  .bg-watch {
    background-image: url("/offers-watch.jpg");
    background-position: 50% 50%;
    background-position: bottom right;
    @apply bg-blend-multiply bg-no-repeat;

    @screen lg {
      background-size: 75% 90%;
    }

    & h1 {
      @apply text-[#212529] text-[1.75rem] max-w-[25ch];
    }

    & p {
      @apply text-grey-secondary;
    }
  }
</style>
