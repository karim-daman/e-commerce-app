<script>
  import { adminSideBarToggleStore, authModalStore } from "$stores/appStore";
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Avatar, Dropdown, DropdownItem, DropdownHeader, DropdownDivider, Button, Indicator } from "flowbite-svelte";
  import { app_user } from "$stores/dataStore";
  import { onDestroy, onMount } from "svelte";
  import { location, push } from "svelte-spa-router";

  import AuthModal from "./AuthModal.svelte";

  let authType = false;

  function openAuthModal(bool) {
    if (bool) authType = true;
    else authType = false;
    $authModalStore = true;
  }

  let user;
  let unsubscribe = app_user.subscribe((current) => {
    user = current;
  });

  function logout() {
    $app_user = null;
    localStorage.clear();
    push("/");
  }

  onDestroy(() => {
    unsubscribe();
  });
</script>

<AuthModal {authType} />

<Navbar class="fixed border bg-teal-500 backdrop-blur-sm bg-opacity-40 z-10" let:hidden let:toggle>
  {#if $app_user?.isAdmin}
    <button
      on:click={() => {
        $adminSideBarToggleStore = !$adminSideBarToggleStore;
      }}
      type="button"
      class=" transition hover:-translate-y-1 hover:shadow-lg active:shadow-none active:transform active:translate-y-0 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </button>
  {/if}

  <NavBrand href="/">
    <img src="vite.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
  </NavBrand>

  <button class="flex items-center md:order-2">
    <img class=" transition hover:scale-110 h-10 bg-slate-300 rounded-full border border-gray-100 shadow-sm" src={"/avatar.svg"} alt="avatar" id="avatar-menu" />
    <NavHamburger on:click={toggle} class1="w-full md:flex md:w-auto md:order-1" />
  </button>

  <Dropdown placement="bottom" triggeredBy="#avatar-menu">
    {#if user}
      <DropdownHeader>
        <span class="block text-sm"> user: </span>
        <span class="block truncate text-sm font-medium"> {localStorage.getItem("user")} </span>

        <!-- <span class="block truncate text-sm font-medium"> {user?.displayName == null ? user?.email : user.displayName} </span> -->
      </DropdownHeader>
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
      <DropdownItem on:click={() => openAuthModal(false)} class="flex transition hover:-translate-y-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-3">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
        </svg>
        Login</DropdownItem>
      <DropdownItem on:click={() => openAuthModal(true)} class="flex transition hover:-translate-y-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-3">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
        </svg>
        Signup</DropdownItem>

      <DropdownItem class="flex transition hover:-translate-y-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-3">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Settings</DropdownItem>
    {/if}
  </Dropdown>

  <NavUl>
    {#if $app_user?.isAdmin}
      <!-- <NavLi>
        <button
          on:click={() => {}}
          type="button"
          class=" transition hover:-translate-y-1 hover:shadow-lg active:shadow-none active:transform active:translate-y-0 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </NavLi> -->

      <NavLi href="#/Dashboard" active={$location == "/Dashboard" ? true : false}>Dashboard</NavLi>
    {/if}

    <NavLi href="#/" active={$location == "/" ? true : false}>Home</NavLi>
    <NavLi href="#/products" active={$location == "/products" ? true : false}>Products</NavLi>
    <NavLi href="#/about" active={$location == "/about" ? true : false}>About</NavLi>
    <NavLi href="#/services" active={$location == "/services" ? true : false}>Services</NavLi>
    <NavLi href="#/pricing" active={$location == "/pricing" ? true : false}>Pricing</NavLi>
    <NavLi href="#/contact" active={$location == "/contact" ? true : false}>Contact</NavLi>
  </NavUl>

  {#if user}
    <button
      class="h-8 w-9 bg-blue-600 relative border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 transition hover:-translate-y-1 hover:shadow-lg active:shadow-none active:transform active:translate-y-0">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-5 h-5 ml-1.5">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
      <Indicator color="red" border size="xl" placement="top-right">
        <span class="text-white text-xs">99</span>
      </Indicator>
    </button>
  {/if}
</Navbar>
