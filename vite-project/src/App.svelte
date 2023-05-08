<script>
  import Router, { push, location } from "svelte-spa-router";
  import routes from "./routes";
  import { onMount } from "svelte";
  import { app_user, decodeToken, getProducts } from "$stores/dataStore";
  import toast, { Toaster } from "svelte-french-toast";
  import Navbar from "./components/Navbar.svelte";

  onMount(() => {
    app_user.set(decodeToken(localStorage.getItem("token")));
  });

  let products;

  onMount(async () => {
    products = await getProducts();
  });
</script>

<Toaster />

<Navbar />

<br /><br /><br /> <br />

<main class="">
  <Router {routes} />
</main>
