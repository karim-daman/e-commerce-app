<script lang="ts">
  import Marquee from "@components/home/marquee.svelte";
  import Market from "@components/home/market.svelte";
  import Offers from "@components/home/offers.svelte";
  import ProductsSection from "@components/home/products-section.svelte";
  import SpecialSection from "@components/home/special-section.svelte";
  import NotificationsSection from "@components/home/notifications-section.svelte";
</script>

<main class="grid grid-flow-row auto-rows-max">
  <Market />
  <Offers />
  <SpecialSection />
  <ProductsSection />
  <Marquee />
  <NotificationsSection />
</main>
