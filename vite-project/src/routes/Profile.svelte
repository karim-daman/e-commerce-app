<script>
  import { app_user } from "$stores/dataStore";
</script>

<section class="text-gray-600 body-font relative">
  <div class="container px-5 mx-auto">
    <div class="ml-20 max-w-screen-xl bg-slate-100 overflow-auto">
      <pre class="">
        <p class="rounded-md p-2">user: {JSON.stringify($app_user)}</p>
      </pre>
    </div>
  </div>
</section>
