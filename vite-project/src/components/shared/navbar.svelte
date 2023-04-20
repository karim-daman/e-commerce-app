<script lang="ts">
  import NavbarHeadDropdown from "./navbar-head-dropdown.svelte";
  import NavbarMainCategories from "@components/shared/navbar-main-categories.svelte";
  import NavBarMainSearch from "@components/shared/navbar-main-search.svelte";
  import NavbarCart from "./navbar-cart.svelte";
  import { slide } from "svelte/transition";

  import Modal from "@components/shared/modal.svelte";
  import Signin from "@components/shared/auth-sign-in.svelte";
  import Register from "@components/shared/auth-register.svelte";
  import { tick } from "svelte";
  //   import { session } from "@app/stores";

  let modalSigninToggle: boolean;
  let modalRegisterToggle: boolean;
  let modalSignInFly: number;

  $: innerWidth = 0;
  $: if (innerWidth > 768) isDrawerOpen = false;

  const handleModalSigninToggle = async () => {
    if (modalRegisterToggle) {
      modalSignInFly = 0;
    } else {
      modalSignInFly = -150;
    }
    await tick();
    modalRegisterToggle = false;
    modalSigninToggle = true;
  };

  const handleModalRegisterToggle = () => {
    modalSigninToggle = false;
    modalRegisterToggle = true;
  };

  const handleSignout = async () => {
    const res = await fetch("http://localhost:5000/auth/logout", {
      method: "DELETE",
      credentials: "include",
    });

    if (res.status < 400) {
      //   $session.user = undefined;
    }

    modalSigninToggle = false;
    modalRegisterToggle = false;
  };

  const languages = {
    en: "English",
    ar: "Arabic",
    ru: "Russion",
  };

  const currency = {
    usd: "USD",
    eur: "EUR",
    aed: "AED",
    rubl: "RUBL",
  };

  const categories = {
    tools: "Machinery / Mechanical Parts / Tools",
    electronics: "Consumer Electronics / Home Appliances",
    auto: "Auto / Transportation",
    timepeices: "Apparel / Textiles / Timepieces",
    garden: "Home & Garden / Construction / Lights",
    beauty: "Beauty & Personal Care / Health",
  };

  const selected = {
    languages: "en" as keyof typeof languages,
    currency: "usd" as keyof typeof currency,
    category: "tools" as keyof typeof categories,
  };

  let isDrawerOpen = false;
  const burgerClick = () => (isDrawerOpen = !isDrawerOpen);
</script>

<svelte:window bind:innerWidth />

<nav class="grid grid-flow-rows auto-rows-max w-full">
  <div class="w-full px-5 lg:px-20 bg-[#f8f9fa] grid">
    <div class="grid justify-self-center max-w-[1320px] grid-cols-[max-content,1fr,repeat(5,max-content)] w-full gap-[15px] py-2 grid-rows-1">
      <NavbarHeadDropdown choices={languages} bind:selected={selected.languages}>Language</NavbarHeadDropdown>
      <NavbarHeadDropdown class="justify-self-start" choices={currency} bind:selected={selected.currency}>
        {currency[selected.currency]}
      </NavbarHeadDropdown>

      <!-- {#if !$session.user} -->
      <button on:click={handleModalSigninToggle} class="!hidden md:!block">Authenication</button>
      <!-- {/if} -->

      <Modal bind:open={modalSigninToggle} class="z-20 grid ">
        <Signin bind:flyY={modalSignInFly} handleSignUp={handleModalRegisterToggle} />
      </Modal>

      <Modal bind:open={modalRegisterToggle} class="z-20 grid">
        <Register handleRegister={handleModalSigninToggle} />
      </Modal>

      <button class="!hidden md:!block">Live Chat</button>
      <button class="!hidden md:!block">Call us</button>

      <!-- {#if $session.user} -->
      <button on:click={handleSignout} class="!hidden md:!block">Sign out</button>
      <!-- {:else} -->
      <button on:click={handleModalSigninToggle} class="!hidden md:!block">Sign in</button>
      <button on:click={handleModalRegisterToggle} class="!hidden md:!block" href="/"> Register </button>
      <!-- {/if} -->

      <button on:click={burgerClick} class="col-start-[-2] col-end-[-1] md:!hidden">
        <img class="w-6 h-6" src="/hamburger-menu.svg" alt="" />
      </button>
    </div>
  </div>

  {#if isDrawerOpen}
    <div transition:slide class="w-full px-5">
      <!-- {#if !$session.user} -->
      <button class="mt-[15px]" on:click={handleModalSigninToggle}> Authenication </button>
      <!-- {/if} -->

      <button>Live Chat</button>
      <button>Call us</button>
      <button>Cart</button>

      <!-- {#if $session.user} -->
      <button class="my-[15px]" on:click={handleSignout}>Sign out</button>
      <!-- {:else} -->
      <button on:click={handleModalSigninToggle} class="mt-[15px]"> Sign in </button>
      <button on:click={handleModalRegisterToggle} class="mb-[15px]"> Register </button>
      <!-- {/if} -->
    </div>
  {/if}

  <div class="w-full px-5 lg:px-20 grid border border-[#dee2e6]">
    <div class="grid items-center gap-5 grid-cols-2 lg:grid-rows-1 lg:grid-cols-[repeat(2,minmax(0,max-content)),minmax(0,590px),minmax(0,1fr)] py-[15px] justify-self-center w-full max-w-[1320px]">
      <a href="/">
        <img class="w-[160px]" src="/logo.png" alt="" />
      </a>

      <NavbarMainCategories bind:selected={selected.category} choices={categories} />
      <NavBarMainSearch />

      <a class="relative !hidden p-[10px] lg:!grid text-black/50 place-items-center rounded-full border border-black/50 justify-self-end bg-blue-primary hover:bg-blue-700" href="/cart">
        <span class="absolute -top-1 left-[26px] bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">+99</span>
        <NavbarCart class="translate-y-[3px] " />
      </a>
    </div>
  </div>

  <div class="w-full lg:px-20 hidden lg:grid border-b border-[#dee2e6]">
    <div class="w-full max-w-[1320px] grid grid-flow-col gap-4 py-[15px] auto-cols-max justify-self-center">
      <a class="!text-[15px] !text-black/80 hover:underline" href="/products">Products</a>
      <a class="!text-[15px] !text-black/80 hover:underline" href="/">Testing page</a>
      <a class="!text-[15px] !text-black/80 hover:underline" href="/">Admin Dash</a>
    </div>
  </div>
</nav>

<style lang="scss">
  button,
  a {
    @apply text-[13px] font-normal text-left text-black/50 transition-colors flex items-center;
  }

  button:hover,
  a:hover {
    @apply text-black/80;
  }
</style>
