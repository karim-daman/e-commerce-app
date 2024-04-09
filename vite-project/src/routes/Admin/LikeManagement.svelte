<script>
  import { app_like_list, getLikes } from "$stores/dataStore";
  import { onMount } from "svelte";

  onMount(async () => {
    await getLikes();
  });
</script>

<pre class="text-xs">
    {JSON.stringify($app_like_list, null, 2)}
</pre>
