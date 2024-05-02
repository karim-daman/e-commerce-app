<script>
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";
  import tilt from "svelte-tilt";

  let words = [
    "zzvtdbeqbifqheseuhzeuhz/PAGE NOT FOUND/euhzjlqpxxmwymxzzpreug",
    "xsrjrllvbqhsbrnnugtnugt/PAGE NOT FOUND/nugttiovjoxwmdlidafall",
    "zwjfhqvdhqutbhiwimuwimu/PAGE NOT FOUND/wimutsyuajsqrgmrheqylj",
    "uuqkyrltjrfziepyunvyunv/PAGE NOT FOUND/yunvxlfdhcjosnqfprfkde",
  ];

  // let words = [
  //   "zzvtdbeqbifqheseuhzeuhzeuhzjlqpxxmwymxzzpreugxsrjrllvbqhsbrnnugtnugtnugttiovjoxwmdlidafallmdlidafalmdlidafalmdlidafalfa",
  //   "xsrjrllvbqhsbrnnugtnugtnugttiovjoxwmdlidafallzwjfhqvdhqutbhiwimuwimuwimutsyuajsqrgmrheqyljrgmrheqylrgmrheqylrgmrheqylqy",
  //   "zwjfhqvdhqutbhiwimuwimuwimutsyuajsqrgmrheqyljuuqkyrltjrfziepyunvyunvyunvxlfdhcjosnqfprfkdesnqfprfkdsnqfprfkdsnqfprfkdfk",
  //   "uuqkyrltjrfziepyunvyunvyunvxlfdhcjosnqfprfkdeuuqkyrltjrfziepyunvyunvyunvxlfdhcjosnqfprfkdesnqfprfkdsnqfprfkdsnqfprfkdfk",
  // ];

  let currentIndex = 0;

  let word = words[currentIndex];

  onMount(() => {
    setInterval(() => {
      currentIndex = (currentIndex + 1) % words.length;
      word = words[currentIndex];
    }, 100);
  });
</script>

<div class="h-screen flex items-center justify-center">
  <div class="flex flex-col -mt-32">
    <p class="font-mono">https://{word}.com</p>
    <button
      class="border rounded-md hoverPress mt-20"
      on:click={() => {
        push("/");
      }}>return</button>
  </div>

  <!-- <div class="block bg-slate-300 w-40 h-40 border break-all" use:tilt>
    <div class="" style="transform: translateZ(20px); display: block;">{word}</div>
  </div> -->
</div>
