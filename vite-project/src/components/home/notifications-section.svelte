<script>
  import { notifcations } from "@lib/store/notifcations";
  import CustomNotification from "@components/shared/custom-notification.svelte";
</script>

<section class="w-full grid-container px-5 my-10 gap-5 grid grid-flow-row md:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    on:click={() =>
      notifcations.push(CustomNotification, {
        notification: {
          status: "default",
          heading: "deafult!",
          description: "Anyone with a link can now view this file",
        },
      })}>
    Add default notification
  </button>

  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    on:click={() =>
      notifcations.push(CustomNotification, {
        notification: {
          status: "success",
          heading: "success!",
          description: "Anyone with a link can now view this file",
        },
      })}>
    success notification
  </button>

  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    on:click={() =>
      notifcations.push(CustomNotification, {
        notification: {
          status: "warning",
          heading: "warning!",
          description: "Anyone with a link can now view this file",
        },
      })}>
    warning notification
  </button>

  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    on:click={() =>
      notifcations.push(CustomNotification, {
        notification: {
          status: "error",
          heading: "error!",
          description: "Anyone with a link can now view this file",
        },
      })}>
    error notification
  </button>

  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    on:click={() => {
      notifcations.push(CustomNotification, {
        notification: {
          status: "update",
          heading: "update!",
          description: "Anyone with a link can now view this file",
        },
        delay: 10000,
      });
    }}>
    update notification
  </button>
</section>
