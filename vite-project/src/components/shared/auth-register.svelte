<script lang="ts">
  import { fade } from "svelte/transition";
  // import { field, form } from "svelte-forms";
  // import {
  // 	email as emailVal,
  // 	matchField,
  // 	min,
  // 	required,
  // } from "svelte-forms/validators";

  import AuthButton from "./auth-button.svelte";
  import AuthCard from "./auth-card.svelte";
  import AuthCheckbox from "./auth-checkbox.svelte";
  import AuthPadlock from "./auth-padlock.svelte";
  import AuthPasswordInput from "./auth-password-input.svelte";
  import AuthTextInput from "./auth-text-input.svelte";
  // import { session } from "$app/stores";

  export let handleRegister: () => void;
  // let email = field("email", "", [required(), emailVal()]);
  // let password = field("password", "", [required(), min(8)]);
  // let confirm = field("confirm", "", [required(), matchField(password)]);
  // const validation = form(email, password, confirm);
  let error: string[] = [];
  let remember = false;

  // $: {
  // 	$email.value;
  // 	$password.value;
  // 	$confirm.value;

  // 	error = [];
  // }

  const submission = async () => {
    // await validation.validate();
    // if (!$validation.valid) return;
    // const res = await fetch("http://localhost:5000/auth/register", {
    // 	method: "POST",
    // 	credentials: "include",
    // 	headers: {
    // 		"Content-Type": "application/json",
    // 	},
    // 	body: JSON.stringify({
    // 		email: $email.value,
    // 		password: $password.value,
    // 		confirm_password: $confirm.value,
    // 	}),
    // });
    // if (res.status !== 201) {
    // 	const errorRes = await res.json();
    // 	error =
    // 		typeof errorRes.message === "string"
    // 			? [errorRes.message]
    // 			: errorRes.message;
    // } else {
    // 	const user = await res.json();
    // 	$session.user = user;
    // }
  };

  const customFadeIn = (node: Element, options = undefined) => fade(node, { delay: 300, duration: 300 });
  const customFadeOut = (node: Element, options = undefined) => fade(node, { duration: 300 });
</script>

<AuthCard class="py-12 px-8 grid grid-cols-2 grid-flow-row gap-x-4 auto-rows-max" on:submit={submission} transIn={customFadeIn} transOut={customFadeOut}>
  <h1 class="text-gray-600 text-lg col-span-2 text-center">Sign up</h1>
  <p class="text-sm text-gray-600 col-span-2 text-center">or</p>

  <AuthButton class="grid items-center grid-cols-[max-content,1fr]">
    <img class="w-5 pointer-events-none" src="/google-icon.svg" alt="" />
    Google
  </AuthButton>

  <AuthButton class="grid items-center grid-cols-[max-content,1fr]">
    <img class="w-5 pointer-events-none" src="/twitter.svg" alt="" />
    Twitter
  </AuthButton>

  {#each error as err, index}
    <p class="col-span-full text-red-500 text-sm" class:mt-8={index === 0}>
      {err}
    </p>
  {/each}

  <div class="col-span-2 {error.length > 0 ? 'mt-2' : 'mt-8'}">
    {#if $validation.hasError("email.not_an_email") || $validation.hasError("email.required")}
      <p class="text-[.8rem] mb-2 text-red-500">Must be a valid email (eg johndoe@example.com)</p>
    {/if}
    <AuthTextInput bind:value={$email.value} isInvalid={$email.invalid} placeholder="Email">
      <img class="pointer-events-none" src="/person.svg" alt="" />
    </AuthTextInput>
  </div>

  <div class="col-span-full mt-3">
    {#if $validation.hasError("password.required") || $validation.hasError("password.min")}
      <p class="text-red-500 text-[.8rem] mb-1">Password field must contain atleast 8 characters</p>
    {/if}
    {#if $validation.hasError("confirm.required") || $validation.hasError("confirm.match_field")}
      <p class="text-red-500 text-[.8rem]">Confirm pasword field must be filled & matching</p>
    {/if}
  </div>

  <AuthPasswordInput class="mt-3" bind:value={$password.value} isInvalid={$password.invalid} placeholder="Password">
    <img class="pointer-events-none" src="/lock.svg" alt="" />
  </AuthPasswordInput>

  <AuthPasswordInput class="mt-3" bind:value={$confirm.value} isInvalid={$confirm.invalid} placeholder="Confirm">
    <img class="pointer-events-none" src="/lock.svg" alt="" />
  </AuthPasswordInput>

  <AuthButton type="submit" class="col-span-2 bg-indigo-600 mt-6 grid items-center grid-cols-[max-content,1fr]">
    <AuthPadlock />
    Sign Up
  </AuthButton>

  <div class="flex justify-between col-span-2 mt-6">
    <AuthCheckbox bind:value={remember} />
    <a class="text-indigo-600 text-sm font-medium" href="/">Forgot your password?</a>
  </div>

  <p class="col-span-2 text-center text-gray-600 text-sm mt-7">Have an account?</p>
  <button on:click={handleRegister} type="button" class="col-span-2 text-center text-gray-600 text-sm">Sign In</button>
</AuthCard>
