<script>
  //@ts-nocheck

  import Login from "$components/Icons/Login.svelte";
  import Register from "$components/Icons/Register.svelte";
  import { authModalStore } from "$stores/appStore";
  import { DropdownItem, Indicator, NavLi, Spinner } from "flowbite-svelte";
  import { location, push } from "svelte-spa-router";
  import AvatarComponent from "./AvatarComponent.svelte";
  import { adminSideBarToggleStore } from "$stores/appStore";
  import AuthModal from "$components/AuthModal.svelte";
  import LanguageSelect from "$lib/LanguageSelect.svelte";

  let menuOpen;

  import { Drawer, Button, CloseButton, Label, Input, Textarea, P, A, Checkbox } from "flowbite-svelte";
  import { sineIn } from "svelte/easing";
  import { app_user_cart, app_user } from "$stores/dataStore";
  import { onMount } from "svelte";

  let contactToggle = true;
  let transitionParams = {
    x: -50,
    duration: 100,
    easing: sineIn,
  };

  let screenWidth;
  $: isMobile = screenWidth < 768 ? true : false;
</script>

<svelte:window bind:innerWidth={screenWidth} />

<div class="flex justify-end">
  <LanguageSelect />
</div>

<nav class=" border-gray-200 dark:bg-gray-900 border-b">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="#/" class="flex items-center space-x-3 rtl:space-x-reverse">
      {#if $app_user?.isAdmin}
        <Button
          on:click={() => {
            $adminSideBarToggleStore = !$adminSideBarToggleStore;
          }}
          ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-3 h-3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </Button>
      {:else}
        <img src="Logo.png" class="h-16" alt="Logo" />
        <span class="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">e-commerce</span>
      {/if}
    </a>

    <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <AvatarComponent />
      <button
        on:click={() => {
          menuOpen = !menuOpen;
        }}
        data-collapse-toggle="navbar-user"
        type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-user"
        aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
    </div>

    <div
      class=" {isMobile ? (menuOpen ? 'h-60 ' : 'h-0') : menuOpen ? 'block' : 'hidden'}  transition-all ease-in-out items-center justify-between duration-300 w-full md:flex md:w-auto md:order-1"
      id="navbar-user">
      <ul
        class="
        
        {isMobile ? (menuOpen ? 'opacity-100 ' : 'opacity-0') : 'block'} 
        
    transition-all duration-200 relative flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <NavLi href="#/" active={$location == "/" ? true : false}>Home</NavLi>
        <NavLi href="#/products" active={$location == "/products" ? true : false}>Products</NavLi>
        <NavLi href="#/FAQ" active={$location == "/FAQ" ? true : false}>FAQ</NavLi>
        <!-- <NavLi href="#/about" active={$location == "/about" ? true : false}>About</NavLi>
        <NavLi href="#/services" active={$location == "/services" ? true : false}>Services</NavLi> -->
        <NavLi on:click={() => (contactToggle = false)} active={$location == "/contact" ? true : false}>Contact</NavLi>

        {#if $app_user != null}
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
              <span class="text-white text-xs">
                {#if isNaN($app_user_cart?.cartItems?.length)}
                  <Spinner color="white" size={5} currentColor="none" />
                {:else}
                  {$app_user_cart?.cartItems?.length}
                {/if}
              </span>
            </Indicator>
          </a>
        {/if}
      </ul>
    </div>
  </div>
</nav>

<!-- <div class="text-center"></div> -->
<Drawer placement="right" transitionType="fly" {transitionParams} bind:hidden={contactToggle} id="sidebar3">
  <div class="flex items-center">
    <button id="drawer-label" class="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
      <!-- <InfoCircleSolid class="w-4 h-4 me-2.5" /> -->
      Contact
    </button>
    <CloseButton on:click={() => (contactToggle = true)} class="mb-4 dark:text-white" />
  </div>
  <form action="#" class="mb-6">
    <div class="mb-6">
      <Label for="email" class="block mb-2">Your email</Label>
      <Input id="email" name="email" required placeholder="name@company.com" />
    </div>
    <div class="mb-6">
      <Label for="subject" class="block mb-2">Subject</Label>
      <Input id="subject" name="subject" required placeholder="Let us know how we can help you" />
    </div>
    <div class="mb-6">
      <Label for="message" class="mb-2">Your message</Label>
      <Textarea id="message" placeholder="Your message..." rows="4" name="message" />
    </div>
    <Button type="submit" class="w-full">Send message</Button>
  </form>
  <P class="mb-2 text-sm text-gray-500 dark:text-gray-400">
    <A href="/" class="text-primary-600 hover:underline dark:text-primary-500">info@company.com</A>
  </P>
  <P class="text-sm text-gray-500 dark:text-gray-400">
    <A href="/" class="text-primary-600 hover:underline dark:text-primary-500">phone number</A>
  </P>
</Drawer>
