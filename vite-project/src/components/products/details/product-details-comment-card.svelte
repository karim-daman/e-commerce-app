<script lang="ts">
  import RatingStar from "@components/products/details/product-details-comment-rating.svelte";
  import CommentOptions from "@components/products/details/product-details-comment-options.svelte";
</script>

<div class="flex flex-col border rounded shadow-sm mb-2">
  <div class="relative flex px-3 pt-4">
    <img class="border rounded-full p-1 w-10 h-10 mr-2" src="/avatar.svg" alt="avatar" />

    <div class="place-self-center flex-col mb-2">
      <div class="mx-1">username</div>
      <div class="flex place-self-center">
        <RatingStar rating={3} />
      </div>
    </div>

    <div class="absolute right-0 px-2">
      <CommentOptions />
    </div>
  </div>

  <div class="px-3 mx-2 mb-2">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis rerum aliquam magnam earum. Harum aliquam a magnam, quae laudantium consequatur voluptate possimus culpa explicabo ex blanditiis
    voluptas dolore aperiam est.
  </div>
</div>
