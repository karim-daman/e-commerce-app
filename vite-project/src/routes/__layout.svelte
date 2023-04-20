<script lang="ts">
  import Footer from "@components/shared/footer.svelte";
  import Navbar from "@components/shared/navbar.svelte";
  import NotificationPortal from "@components/shared/notification-portal.svelte";
  import "@styles/global.scss";
</script>

<NotificationPortal />
<Navbar />
<slot />
<Footer />
