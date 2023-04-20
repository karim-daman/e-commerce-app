<script>
  import { onDestroy } from "svelte";
  import { authStore } from "../stores/authStore";

  let user, formatted;

  let unsubscribe = authStore.subscribe((crr) => {
    user = crr.currentUser;
    formatted = JSON.stringify(user, null, 2);
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<section class="text-gray-600 body-font relative">
  <div class="container px-5 mx-auto">
    <div class="ml-20 max-w-screen-xl bg-slate-100 overflow-auto">
      <pre class="">
        {formatted}
      </pre>
    </div>
  </div>
</section>
