<script>
  import Router, { push, location } from "svelte-spa-router";
  import routes from "./routes";
  import { onMount } from "svelte";
  import { auth } from "./lib/firebase/firebase.client";
  import { authStore } from "./stores/authStore";

  import Navbar from "./components/Navbar.svelte";

  onMount(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      const prettyResponse = JSON.stringify(user, null, 2);
      console.log(prettyResponse);
      authStore.update((curr) => {
        return { ...curr, isLoading: false, currentUser: user };
      });

      if (!$authStore.currentUser && !$authStore.isLoading && $location !== "/") {
        push("/");
      }
    });
    return unsubscribe;
  });
</script>

<Navbar />

<br /><br /><br /> <br />

<main>
  <Router {routes} />
</main>
