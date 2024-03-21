<script>
  import AuthModal from "$components/AuthModal.svelte";
  import Login from "$components/Icons/Login.svelte";
  import Register from "$components/Icons/Register.svelte";
  import { authModalStore } from "$stores/appStore";
  import { app_user } from "$stores/dataStore";
  import { DropdownDivider, DropdownHeader, DropdownItem, Indicator } from "flowbite-svelte";
  import { push } from "svelte-spa-router";
  import { clickOutside } from "svelte-use-click-outside";

  let menuOpen = false;

  function logout() {
    $app_user = null;
    localStorage.clear();
    push("/");
  }

  let authType = false;

  function openAuthModal(bool) {
    if (bool) authType = true;
    else authType = false;
    $authModalStore = true;
  }
</script>

<AuthModal {authType} />

<div use:clickOutside class="relative">
  <button
    on:click={() => {
      menuOpen = !menuOpen;
    }}
    type="button"
    class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
    id="user-menu-button"
    aria-expanded={menuOpen ? "true" : "false"}
    aria-haspopup="true"
    data-dropdown-toggle="user-dropdown"
    data-dropdown-placement="bottom">
    <span class="sr-only">Open user menu</span>
    <img class="transition hover:scale-110 h-10 bg-slate-300 rounded-full border border-gray-100 shadow-sm" src={"/avatar.svg"} alt="avatar" id="avatar-menu" />
  </button>

  <div
    class="absolute z-50 right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
    id="user-dropdown"
    style={menuOpen ? "display: block;" : "display: none;"}>
    <ul class="py-2" aria-labelledby="user-menu-button">
      {#if $app_user}
        <DropdownHeader>
          <span class="block text-sm"> user: </span>
          <span class="block truncate text-sm font-medium"> {localStorage.getItem("user")} </span>
        </DropdownHeader>

        <DropdownItem class="flex transition hover:-translate-y-1">
          <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-3">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg> -->

          <a
            href="#/cart"
            class="h-8 w-9 bg-blue-600 relative border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 transition hover:-translate-y-1 hover:shadow-lg active:shadow-none active:transform active:translate-y-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="white" class="w-5 h-5 m-1.5">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <Indicator color="red" border size="xl" placement="top-right">
              <span class="text-white text-xs"> 0 </span>
              <!-- // $app_user?.cart?.cartItems?.length -->
            </Indicator>
          </a>

          <a href="#/Cart" class="ml-2">My cart</a>
        </DropdownItem>

        <DropdownItem class="flex transition hover:-translate-y-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-3">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>

          <a href="#/Profile">Profile</a></DropdownItem>

        <DropdownItem class="flex transition hover:-translate-y-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-3">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>

          Settings</DropdownItem>

        <DropdownDivider />

        <DropdownItem class="flex transition hover:-translate-y-1" on:click={logout}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-5 h-5 mr-3">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          <p class="text-red-600">Sign out</p>
        </DropdownItem>
      {:else}
        <div class="flex">
          <button
            on:click={() => openAuthModal(false)}
            class="flex justify-center mx-2 border w-24 rounded-md p-1 text-xs transition hover:-translate-y-1 hover:shadow-lg active:shadow-none active:transform active:translate-y-0">
            <Login />
            Login
          </button>
          <button
            on:click={() => openAuthModal(true)}
            class="flex justify-center mx-2 border w-24 rounded-md p-1 text-xs transition hover:-translate-y-1 hover:shadow-lg active:shadow-none active:transform active:translate-y-0">
            <Register />
            Register
          </button>
        </div>
      {/if}
    </ul>
  </div>
</div>
