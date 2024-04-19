<script>
  //@ts-nocheck
  import Router, { push, location } from "svelte-spa-router";
  import routes from "./routes";
  import { onMount } from "svelte";
  import { app_user, app_user_cart, decodeToken, getCartById, getCategories, getProducts, getUsers, verifyTokenExpiry } from "$stores/dataStore";
  import toast, { Toaster } from "svelte-french-toast";
  import Navbar from "./components/Navbar.svelte";
  import Navbar2 from "./components/Navbar/Navbar2.svelte";

  import AdminSideBar from "$components/Admin/Sidebar.svelte";
  import Footer from "$components/Footer.svelte";

  onMount(() => {
    app_user.set(decodeToken(localStorage.getItem("token")));
  });

  onMount(async () => {
    await getCategories();
    await getProducts();
    // await getUsers();

    if ($app_user != null) {
      console.log($app_user);

      await getCartById($app_user.cart._id);
    }

    // check if logged user has a valid jwt, if invalid log them out
    const promise = new Promise((resolve, reject) => {
      verifyTokenExpiry().then((response) => {
        response.success == true ? resolve() : reject();
        toast.promise(
          promise,
          {
            loading: `Loading..`,
            success: `Welcome back!`,
            error: `Please login.`,
          },
          {
            position: "top-right",
            style: "float: left; width: 500px ;background: #333; color: #fff;margin-right: 1rem; margin-top: 2rem;",
          }
        );
      });
    });
  });
</script>

<!-- <div class="fixed top-0 left-0 bg-red-500 z-50">app: {$location}</div> -->

<Toaster />
<AdminSideBar />
<!-- <Navbar /> -->
<Navbar2 />

<main>
  <Router {routes} restoreScrollState={true} />
</main>

<Footer />
