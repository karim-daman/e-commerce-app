<script>
  import { Dropdown, DropdownItem, MenuButton } from "flowbite-svelte";
  import ThumbDown from "./Icons/ThumbDown.svelte";
  import ThumbUp from "./Icons/ThumbUp.svelte";
  import Reply from "./Icons/Reply.svelte";
  import Report from "./Icons/Report.svelte";
  import DeleteReview from "./Icons/DeleteReview.svelte";
  let popupModal;
</script>

<div class="divide-y border my-2 p-2 rounded-sm">
  <!-- review - start -->
  <div class="flex gap-3 py-4 md:py-8 relative">
    <div class="flex flex-col">
      <img class="border rounded-full p-1 w-10 h-10 mr-2" src="/avatar.svg" alt="avatar" />
      <div class="flex flex-col">
        <span class="block text-sm font-bold">John McCulling</span>
        <span class="block text-sm text-gray-500">August 28, 2021</span>

        <div class="-ml-1 flex gap-0.5">
          {#each { length: 5 } as _, i}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          {/each}
        </div>
      </div>
    </div>

    <p class="text-gray-600">
      This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is random or otherwise generated. It may be used to
      display a sample of fonts or generate text for testing.
    </p>

    <div class=" flex absolute top-0 right-0">
      <button class="rounded-btn-shadow px-2 rounded-md mx-0.5 border h-8 transition hover:-translate-y-1 hover:shadow-lg active:shadow-none active:transform active:translate-y-0">
        <ThumbDown />
      </button>

      <button class="rounded-btn-shadow px-2 rounded-md mx-0.5 border h-8 transition hover:-translate-y-1 hover:shadow-lg active:shadow-none active:transform active:translate-y-0">
        <ThumbUp />
      </button>

      <MenuButton class="rounded-btn-shadow px-2 rounded-md mx-0.5  border h-8 transition hover:-translate-y-1 hover:shadow-lg active:shadow-none active:transform active:translate-y-0" />

      <Dropdown class="w-36 ">
        <DropdownItem class="flex transition hover:-translate-y-1">
          <Reply />
          <a href="#/Profile">Reply</a></DropdownItem>

        <DropdownItem class="flex transition hover:-translate-y-1">
          <Report />
          <a href="#/Profile">Report</a></DropdownItem>

        <DropdownItem class="flex transition hover:-translate-y-1">
          <DeleteReview />
          <button on:click={() => (popupModal = true)} class="text-red-600">Delete</button></DropdownItem>
      </Dropdown>
    </div>
  </div>
  <!-- review - end -->
</div>
