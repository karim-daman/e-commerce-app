<script>
  import { app_user } from "$stores/dataStore";
</script>

<section class="text-gray-600 body-font relative">
  <div class="container px-5 mx-auto">
    <div class="ml-20 max-w-screen-xl bg-slate-100 overflow-auto">
      <pre class="">

        {localStorage.getItem("token")}

        <p class="rounded-md p-2">{JSON.stringify($app_user, null, 2)}</p>
      </pre>
    </div>
  </div>
</section>
