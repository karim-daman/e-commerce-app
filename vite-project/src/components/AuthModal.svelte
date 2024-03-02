<script>
  import { authModalStore, isPasswordLost } from "$stores/appStore";
  import { Alert, Spinner, Button, Modal, Label, Input, Checkbox, Popover } from "flowbite-svelte";
  import { push } from "svelte-spa-router";
  import { fade, fly, scale } from "svelte/transition";
  import { clickOutside } from "svelte-use-click-outside";
  import { loginHandler, isFetching, registerHanlder } from "$stores/dataStore";
  import toast, { Toaster } from "svelte-french-toast";

  let passesFirstPasswordCheck, passesSecondPasswordCheck, passesThirdPasswordCheck, passesFourthPasswordCheck;
  let passwordStrength = "gray";
  let passwordStrengthLevel = 0;
  let passwordMatch = false;

  function checkPassword() {
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    passesFirstPasswordCheck = /[A-Z]/.test(password) ? true : false;
    passesSecondPasswordCheck = format.test(password) ? true : false;
    passesThirdPasswordCheck = password.length > 5 ? true : false;
    passesFourthPasswordCheck = /\d/.test(password) ? true : false;

    const arr = [passesFirstPasswordCheck, passesSecondPasswordCheck, passesThirdPasswordCheck, passesFourthPasswordCheck];
    passwordStrengthLevel = arr.filter(Boolean).length;

    if (passwordStrengthLevel == 1) passwordStrength = "red";
    else if (passwordStrengthLevel == 2) passwordStrength = "orange";
    else if (passwordStrengthLevel == 3) passwordStrength = "yellow";
    else if (passwordStrengthLevel == 4) passwordStrength = "green";
    else passwordStrength = "gray";
  }

  let passwordFieldColor = "base",
    confirmPasswordFieldColor = "base";

  function checkMatch() {
    if (!authType) return;
    passwordMatch = password == confirmPassword ? true : false;
    passwordFieldColor = passwordMatch ? "green" : "base";
    confirmPasswordFieldColor = passwordMatch ? "green" : "base";
  }

  function clickOutsideHandler() {
    closeAuthModal();
  }

  export let authType = false;

  $: if (!$authModalStore) closeAuthModal();

  let usermail;

  let email = "";
  let password = "";
  let confirmPassword = "";
  let errorMessage = "";
  let successMessage = "";

  let invalidPassword = false;
  let invalidConfirmPassword = false;
  let invalidEmail = false;
  // let isLoading = false;

  let showPass = false;
  let showConfirmPass = false;

  function closeAuthModal() {
    email = password = confirmPassword = "";
    $authModalStore = $isPasswordLost = false;
  }

  // authStore.subscribe((curr) => {
  //   usermail = curr?.currentUser?.email;
  // });

  function googleSignIn() {
    // authHandlers.googleSignIn();
  }
  function gitHubSignIn() {
    // authHandlers.gitHubSignIn();
  }

  function handleSubmit() {
    if (!email || !password) {
      toast.error(" Email and Password are manadatory!", {
        position: "top-right",
        style: "float: left; width: 500px ;background: #333; color: #fff;margin-right: 1rem; margin-top: 2rem;",
      });
      return;
    }
    // message = email = password = "";

    if (authType) signup();
    else login();
  }

  async function lostPassword() {
    $isFetching = false;
  }

  async function login() {
    try {
      await loginHandler({ email: email, password: password });
      push("/Profile");
      $isFetching = false;
      closeAuthModal();
    } catch (error) {
      errorMessage = error;
      setTimeout(() => {
        errorMessage = email = password = "";
      }, 3000);
      closeAuthModal();
    }

    // try {
    //   isLoading = true;
    //   await authHandlers.login(email, password);
    //   push("/Profile");
    //   closeAuthModal();
    //   successMessage = "Login successful!";
    //   setTimeout(function () {
    //     successMessage = "";
    //   }, 3000);
    // } catch (error) {
    //   console.log(error);
    //   errorMessage = error;
    //   if (error == "FirebaseError: Firebase: Error (auth/wrong-password).") {
    //     invalidPassword = true;
    //     setTimeout(function () {
    //       invalidPassword = false;
    //       errorMessage = "";
    //     }, 3000);
    //   } else if (error == "FirebaseError: Firebase: Error (auth/user-not-found).") {
    //     invalidEmail = true;
    //     setTimeout(function () {
    //       invalidEmail = false;
    //       errorMessage = "";
    //     }, 3000);
    //   } else {
    //     setTimeout(function () {
    //       errorMessage = email = password = "";
    //     }, 3000);
    //   }
    //   isLoading = false;
    // }
  }

  function clearInputs() {
    email = password = confirmPassword = "";
  }

  async function signup() {
    if (!passwordMatch) {
      passwordFieldColor = confirmPasswordFieldColor = "red";

      toast.error("Password mismatch!", {
        position: "top-right",
        style: "float: left; width: 500px ;background: #333; color: #fff;margin-right: 1rem; margin-top: 2rem;",
      });

      setTimeout(function () {
        passwordFieldColor = "base";
        confirmPasswordFieldColor = "base";
      }, 3000);

      return;
    }

    let raw = {
      name: undefined,
      email: email,
      password: password,
      phone: undefined,
      isAdmin: "false",
      street: undefined,
      apartment: undefined,
      zip: undefined,
      city: undefined,
      country: undefined,
    };

    try {
      await registerHanlder(raw);
      clearInputs();
      closeAuthModal();
    } catch (error) {
      errorMessage = error;
      setTimeout(() => {
        errorMessage = email = password = "";
      }, 3000);
      closeAuthModal();
    }

    // if (password != confirmPassword) {
    //   invalidPassword = invalidConfirmPassword = true;
    //   errorMessage = "Password mismatch";
    //   setTimeout(function () {
    //     invalidPassword = invalidConfirmPassword = false;
    //     errorMessage = "";
    //   }, 3000);
    //   return;
    // }
    // try {
    //   isLoading = true;
    //   await authHandlers.signup(email, password);
    //   push("/Profile");
    //   closeAuthModal();
    //   successMessage = "Account created!";
    //   setTimeout(function () {
    //     successMessage = "";
    //   }, 3000);
    // } catch (error) {
    //   console.log(error);
    //   errorMessage = error;
    //   if (error == "FirebaseError: Firebase: Error (auth/email-already-in-use).") {
    //     invalidEmail = true;
    //   } else {
    //     setTimeout(function () {
    //       errorMessage = email = password = confirmPassword = "";
    //     }, 3000);
    //   }
    //   setTimeout(function () {
    //     invalidEmail = false;
    //     errorMessage = "";
    //   }, 3000);
    //   isLoading = false;
    // }
  }
</script>

<Toaster />

<!-- {#if successMessage}
  <Alert border color="green" class="m-4 w-80 absolute z-50 ">
    <span slot="icon">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    </span>
    <span class="font-medium">Success!</span> <br />
    <p class="text-xs">{successMessage}</p>
  </Alert>
{/if} -->

{#if $isFetching}
  <div in:scale={{ duration: 100, start: 0.95 }} out:scale={{ duration: 75, start: 0.95 }} class="fixed inset-0 w-full h-full backdrop-blur-sm overflow-auto">
    <!-- in:fade out:fade -->
    <div class="grid h-screen place-items-center">
      <Button disabled color="alternative">
        <Spinner class="mr-3" size="4" />Loading ...
      </Button>
    </div>
  </div>
{:else}
  <Modal bind:open={$authModalStore} size="xs" autoclose={false} class="w-full" backdropClasses="backdrop-blur-sm bg-gray-900 bg-opacity-50 dark:bg-opacity-80">
    <div in:scale={{ duration: 100, start: 0.95 }} out:scale={{ duration: 75, start: 0.95 }} use:clickOutside={clickOutsideHandler}>
      <!-- in:fade out:fade -->
      {#if errorMessage}
        <div out:fade in:fade class=" absolute left-0 -top-20">
          <Alert color="red" dismissable>
            <span slot="icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </span>
            {errorMessage}
          </Alert>
        </div>
      {/if}

      {#if $isPasswordLost}
        <h1 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Forgot your password?</h1>
        <p class="font-light text-gray-500 dark:text-gray-400">Don't fret! Just type in your email and we will send you a code to reset your password!</p>
        <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input
              bind:value={email}
              type="email"
              name="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required />
          </div>
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="terms"
                aria-describedby="terms"
                type="checkbox"
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                required />
            </div>
            <div class="ml-3 text-sm">
              <label for="terms" class="font-light text-gray-500 dark:text-gray-300"
                >I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
            </div>
          </div>

          <button
            class="w-full transition hover:-translate-y-1 hover:shadow-lg active:shadow-none active:transform active:translate-y-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded drop-shadow-lg active:drop-shadow-none"
            on:click={lostPassword}>
            Reset password
          </button>
        </form>
      {:else}
        <form class="flex flex-col space-y-6" action="#">
          <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">{authType ? "Sign up" : "Login"}</h3>

          <Label class="space-y-2">
            <span>Your email</span>
            <Input type="email" placeholder="name@Company.com" color={invalidEmail ? "red" : "base"} required bind:value={email}>
              <svg slot="left" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </Input>
          </Label>

          <Label class="space-y-2">
            <span>Your password</span>
            <Input
              on:input={checkPassword}
              id="password"
              type={showPass ? "text" : "password"}
              color={authType ? (confirmPassword.length != password.length && confirmPassword.length != 0 && password.length != 0 ? "base" : passwordFieldColor) : "base"}
              name="password"
              placeholder="••••••••"
              required
              bind:value={password}>
              <svg slot="left" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>

              <svg
                on:keydown={() => {}}
                on:click={() => {
                  showPass = !showPass;
                }}
                slot="right"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 transition hover:-translate-y-1 active:transform active:translate-y-0">
                {#if showPass}
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                {:else}
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                {/if}
              </svg>
            </Input>

            {#if authType}
              <Popover class="text-sm" triggeredBy="#password" placement="right">
                <h3 class="font-semibold text-gray-900 dark:text-white">Password must have :</h3>

                <ul>
                  <li class="flex items-center mb-1">
                    {#if passesFirstPasswordCheck}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-2 w-4 h-4 text-green-400 dark:text-green-500"
                        ><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    {:else}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-2 w-4 h-4 text-gray-300 dark:text-gray-400"
                        ><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    {/if}

                    Upper &amp; lower case letters
                  </li>
                  <li class="flex items-center mb-1">
                    {#if passesSecondPasswordCheck}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-2 w-4 h-4 text-green-400 dark:text-green-500"
                        ><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    {:else}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-2 w-4 h-4 text-gray-300 dark:text-gray-400"
                        ><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    {/if} Symbol(s) '#$&amp;...'
                  </li>
                  <li class="flex items-center mb-1">
                    {#if passesThirdPasswordCheck}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-2 w-4 h-4 text-green-400 dark:text-green-500"
                        ><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    {:else}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-2 w-4 h-4 text-gray-300 dark:text-gray-400"
                        ><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    {/if}
                    At least 6 characters
                  </li>

                  <li class="flex items-center mb-1">
                    {#if passesFourthPasswordCheck}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-2 w-4 h-4 text-green-400 dark:text-green-500"
                        ><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    {:else}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-2 w-4 h-4 text-gray-300 dark:text-gray-400"
                        ><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    {/if}
                    Number(s)
                  </li>
                </ul>

                <h3 class="font-semibold text-gray-900 dark:text-white">Password strength</h3>
                <div class="mt-4 grid grid-cols-4 gap-2">
                  <div class="rounded-md h-1 {passwordStrengthLevel > 0 ? `bg-${passwordStrength}-300` : 'bg-gray-300'} " />
                  <div class="rounded-md h-1 {passwordStrengthLevel > 1 ? `bg-${passwordStrength}-300` : 'bg-gray-300'} " />
                  <div class="rounded-md h-1 {passwordStrengthLevel > 2 ? `bg-${passwordStrength}-300` : 'bg-gray-300'} " />
                  <div class="rounded-md h-1 {passwordStrengthLevel > 3 ? `bg-${passwordStrength}-300` : 'bg-gray-300'} " />
                </div>
              </Popover>
            {/if}
          </Label>

          {#if authType}
            <Label class="space-y-2">
              <span>Confirm your password</span>
              <Input
                on:input={checkMatch}
                color={confirmPassword.length != password.length ? "base" : passwordFieldColor}
                type={showConfirmPass ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                required
                bind:value={confirmPassword}>
                <svg slot="left" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>

                <svg
                  on:keydown={() => {}}
                  on:click={() => {
                    showConfirmPass = !showConfirmPass;
                  }}
                  slot="right"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 transition hover:-translate-y-1 active:transform active:translate-y-0">
                  {#if showConfirmPass}
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  {:else}
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  {/if}
                </svg>
              </Input>
            </Label>
          {/if}

          <div class="flex items-start">
            <Checkbox>Remember me</Checkbox>
            {#if !authType}
              <button
                on:click={() => {
                  $isPasswordLost = true;
                }}
                class="  ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost password?</button>
            {/if}
          </div>
          <button
            type="button"
            class=" transition hover:-translate-y-1 hover:shadow-lg active:shadow-none active:transform active:translate-y-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded drop-shadow-lg active:drop-shadow-none"
            on:click={handleSubmit}>
            {authType ? "Register a new account" : "Login to your account"}
          </button>
          <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            {#if authType}
              Have an account? <button
                class="text-blue-700 hover:underline dark:text-blue-500"
                on:click={() => {
                  authType = false;
                }}>Login</button>
            {:else}
              Not registered? <button
                class="text-blue-700 hover:underline dark:text-blue-500"
                on:click={() => {
                  authType = true;
                }}>Create account</button>
            {/if}
          </div>
          <br />
        </form>

        <div class="relative flex items-center justify-center">
          <span class="absolute inset-x-0 h-px bg-gray-300" />
          <span class="relative bg-white px-4 text-sm text-gray-400">{authType ? "Signup" : "Log"} in with social</span>
        </div>
        <div class="flex">
          <button
            type="button"
            on:click={googleSignIn}
            aria-label="Continue with google"
            class="transition hover:-translate-y-1 hover:shadow-lg active:shadow-none active:transform active:translate-y-0 m-1 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-4">
            <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg2.svg" alt="google" />
            <p class="text-base font-medium ml-4 text-gray-700">Google</p>
          </button>
          <button
            type="button"
            on:click={gitHubSignIn}
            aria-label="Continue with github"
            class="transition hover:-translate-y-1 hover:shadow-lg active:shadow-none active:transform active:translate-y-0 m-1 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-4">
            <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg3.svg" alt="github" />
            <p class="text-base font-medium ml-4 text-gray-700">Github</p>
          </button>
          <button
            type="button"
            aria-label="Continue with twitter"
            class="transition hover:-translate-y-1 hover:shadow-lg active:shadow-none active:transform active:translate-y-0 m-1 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-4">
            <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg4.svg" alt="twitter" />
            <p class="text-base font-medium ml-4 text-gray-700">Twitter</p>
          </button>
        </div>
      {/if}
    </div>
  </Modal>
{/if}

<!-- 

make sure to use this password strength measurement:


<script>
  import { Popover, Label, Input, Checkbox, Button } from 'flowbite-svelte'
</script>

<form on:submit|preventDefault class="mb-8">
  <div class="mb-6">
    <Label for="email" class="mb-2">Your email</Label>
    <Input type="email" id="email" placeholder="name@flowbite.com" required="" />
  </div>
  <div class="mb-6">
    <Label for="password" class="mb-2">Your password</Label>
    <Input type="password" id="password" required="" />
  </div>
  <Checkbox class="mb-6">Remember me</Checkbox>
  <Button type="submit">Submit</Button>
</form>
<Popover class="text-sm" triggeredBy="#password" placement="bottom">
  <h3 class="font-semibold text-gray-900 dark:text-white">Must have at least 6 characters</h3>
  <div class="grid grid-cols-4 gap-2">
      <div class="h-1 bg-orange-300 dark:bg-orange-400"></div>
      <div class="h-1 bg-orange-300 dark:bg-orange-400"></div>
      <div class="h-1 bg-gray-200 dark:bg-gray-600"></div>
      <div class="h-1 bg-gray-200 dark:bg-gray-600"></div>
  </div>
  <p class="py-2">It’s better to have:</p>
  <ul>
      <li class="flex items-center mb-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-2 w-4 h-4 text-green-400 dark:text-green-500"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
Upper &amp; lower case letters 
      </li>
      <li class="flex items-center mb-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-2 w-4 h-4 text-gray-300 dark:text-gray-400"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          A symbol (#$&amp;) 
      </li>
      <li class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-2 w-4 h-4 text-gray-300 dark:text-gray-400"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>A longer password (min. 12 chars.)
      </li>
  </ul>
</Popover>


 -->
