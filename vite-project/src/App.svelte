<script>
  import Router, { push, location } from "svelte-spa-router";
  import routes from "./routes";
  import { onMount } from "svelte";
  import { app_user, app_user_cart, decodeToken, getCartById, getProducts, verifyTokenExpiry } from "$stores/dataStore";
  import toast, { Toaster } from "svelte-french-toast";
  import Navbar from "./components/Navbar.svelte";
  import AdminSideBar from "$components/Admin/Sidebar.svelte";

  import Footer from "$components/Footer.svelte";

  onMount(() => {
    app_user.set(decodeToken(localStorage.getItem("token")));
  });

  onMount(async () => {
    await getProducts();

    //check if logged user has a valid jwt, if invalid log them out

    // await verifyTokenExpiry();

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

    // if (localStorage.getItem("token") != "")
    // await getCartById($app_user.cart.id);

    // console.log($app_user_cart);
  });
</script>

<Toaster />
<AdminSideBar />
<Navbar />

<br /><br /><br />

<main class="">
  <Router {routes} restoreScrollState={true} />
</main>

<Footer />
