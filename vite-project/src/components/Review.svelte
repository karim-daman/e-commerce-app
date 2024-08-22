<script>
  //@ts-nocheck
  import { fade, fly, scale } from "svelte/transition";
  import { Dropdown, DropdownItem, MenuButton } from "flowbite-svelte";
  import ThumbDown from "./Icons/ThumbDown.svelte";
  import ThumbUp from "./Icons/ThumbUp.svelte";
  import Reply from "./Icons/Reply.svelte";
  import Report from "./Icons/Report.svelte";
  import DeleteReviewIcon from "./Icons/DeleteReview.svelte";
  import { app_user, app_user_list, deleteReview } from "$stores/dataStore";
  import { Button, Modal } from "flowbite-svelte";

  let popupModal;

  export let review;

  function formatDate(inputDate) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const date = new Date(inputDate);
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    const formattedDate = `${month} ${day}, ${year}`;

    return formattedDate;
  }

  function getUserNameById(usersArray, userId) {
    const user = usersArray.find((user) => user.id === userId);
    if (user) {
      return user.name;
    } else {
      return "User not found";
    }
  }

  async function handleDeleteReview() {
    // alert(review._id);
    await deleteReview(review._id);
  }
</script>

<div in:scale={{ duration: 100, start: 0.95 }} out:scale={{ duration: 75, start: 0.95 }} class="divide-y border my-2 p-2 rounded-sm">
  <!-- review - start -->

  <div class="flex">
    <div class="w-max h-max m-2">
      <div class="flex flex-col">
        <img class="border rounded-full p-1 w-10 h-max mr-2" src="/avatar.svg" alt="avatar" />
        <!-- <span class="block text-sm font-bold">
          {getUserNameById($app_user_list, review.user_id)}
        </span> -->

        <!-- <div class=" flex">
          {#each { length: 5 } as _, i}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 {review.rating > i ? 'text-yellow-400' : 'text-gray-400'}" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          {/each}
        </div> -->
      </div>
    </div>
    <div class="w-full h-max flex flex-col">
      <div class="">
        <div class="flex justify-between">
          <span class="block text-sm font-bold">
            <div class="flex">
              <!-- <div class="mr-3">{getUserNameById($app_user_list, review.user_id)}</div> -->
              <div class="mr-3">{review.user_name}</div>

              <div class="text-gray-400 text-xs mt-0.5">
                on

                {#if review.comment.updated_at != review.created_at}
                  {formatDate(review.comment.updated_at)}
                {:else}
                  {formatDate(review.created_at)}
                {/if}
              </div>
            </div>

            <span class="block text-xs text-gray-500">
              <!-- August 28, 2021 -->
            </span>

            <div class=" flex">
              {#each { length: 5 } as _, i}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 {review.rating > i ? 'text-yellow-400' : 'text-gray-400'}" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              {/each}
            </div>
          </span>

          <MenuButton class="rounded-btn-shadow rounded-md border h-8 transition hover:-translate-y-1 hover:shadow-lg active:shadow-none active:transform active:translate-y-0" />

          <Dropdown class="">
            <DropdownItem class=" flex transition hover:-translate-y-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-2">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
              <a class="text-xs" href="#/Profile">Edit</a>
            </DropdownItem>

            <DropdownItem class="flex transition hover:-translate-y-1">
              <!-- <Reply /> -->

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-2">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
              </svg>

              <a class="text-xs" href="#/Profile">Reply</a></DropdownItem>

            <DropdownItem class="flex transition hover:-translate-y-1">
              <!-- <Report /> -->

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-2">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
              </svg>

              <a class="text-xs" href="#/Profile">Report</a></DropdownItem>

            {#if review?.user_id == $app_user?.userId}
              <DropdownItem class="flex transition hover:-translate-y-1">
                <!-- <DeleteReviewIcon /> -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-4 h-4 mr-2">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>

                <button on:click={() => (popupModal = true)} class="text-red-600 text-xs">Delete</button></DropdownItem>
            {/if}
          </Dropdown>
        </div>
      </div>
      <p class="text-gray-600">
        <!-- <input class="w-full h-full rounded-sm" type="text" readonly value={review.comment.text} /> -->
        {review.comment.text}
        <!-- {review.comment.text} -->
      </p>
      <div class="mt-2">
        <button class="rounded-btn-shadow px-2 rounded-md mx-0.5 border h-6 transition hover:-translate-y-1 hover:shadow-lg active:shadow-none active:transform active:translate-y-0">
          <ThumbDown />
        </button>

        <button class="rounded-btn-shadow px-2 rounded-md mx-0.5 border h-6 transition hover:-translate-y-1 hover:shadow-lg active:shadow-none active:transform active:translate-y-0">
          <ThumbUp />
        </button>

        <button class="rounded-btn-shadow px-2 rounded-md mx-0.5 border h-6 transition hover:-translate-y-1 hover:shadow-lg active:shadow-none active:transform active:translate-y-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>

<Modal bind:open={popupModal} size="xs" autoclose>
  <div class="text-center">
    <!-- <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" /> -->

    <h1 class="text-red-500 text-xl">Delete review?</h1>

    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this review?</h3>
    <Button on:click={handleDeleteReview} color="red" class="me-2">Yes, I'm sure</Button>
    <Button color="alternative">No, cancel</Button>
  </div>
</Modal>
