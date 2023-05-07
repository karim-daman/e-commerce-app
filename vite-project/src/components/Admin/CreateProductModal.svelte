<script>
  export let createProductModal, createCategoryModal;
  import { Button, Dropdown, Chevron, Checkbox, Radio } from "flowbite-svelte";
  import { clickOutside } from "svelte-use-click-outside";
  import { Modal } from "flowbite-svelte";
  import { fade } from "svelte/transition";
  import Dropzone from "svelte-file-dropzone/Dropzone.svelte";
  import { onMount } from "svelte";
  import { app_categories, createCategory, createProduct, getCategories, isFetching } from "$stores/dataStore";

  let categoryOption = "Category";

  function clickOutsideHandler() {
    createProductModal = false;
  }

  onMount(async () => {
    getCategories();
  });

  let name, description, richDescription, image, images, brand, price, category, countInStock, rating, numReviews, isFeatured;

  let newCategoryName;
  async function handleCreateCategory() {
    if (newCategoryName == "" || newCategoryName == undefined) {
      alert("invalid category name");
      return;
    }

    var raw = {
      name: newCategoryName,
      icon: "icon",
      color: "color",
    };

    await createCategory(raw);
    getCategories();
  }

  async function handleCreateProduct() {
    // $isFetching = true;

    //check if fields are defined

    let selected_category_id;
    $app_categories.map((category) => {
      if (category.name == categoryOption) selected_category_id = category.id;
    });

    var raw = {
      name: name,
      description: description,
      richDescription: description,
      image: files.accepted[0],
      images: files.accepted,
      brand: brand,
      price: price,
      category: selected_category_id,
      countInStock: countInStock,
      rating: 0,
      numReviews: 0,
      isFeatured: false,
    };

    await createProduct(raw);
    // $isFetching = false;
  }

  let files = {
    accepted: [],
    rejected: [],
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  function handleFilesSelect(e) {
    files.src = [];
    const { acceptedFiles, fileRejections } = e.detail;
    files.accepted = [...files.accepted, ...acceptedFiles];
    files.rejected = [...files.rejected, ...fileRejections];
    files.accepted.forEach((element) => {
      toBase64(element);
    });
  }
  function handleRemoveFile(e, index) {
    e.stopPropagation();
    files.accepted.splice(index, 1);
    files.accepted = [...files.accepted];
  }
  function handleRemoveAll(e) {
    e.stopPropagation();
    files.accepted = [];
  }
</script>

<Modal title="Add a new product" bind:open={createProductModal}>
  <div class="" in:fade out:fade use:clickOutside={clickOutsideHandler}>
    <form>
      <div class="grid gap-4 sm:grid-cols-8 sm:gap-6">
        <div class="sm:col-span-4">
          <div class="grid grid-cols-4">
            <!--  -->
            <div class="col-span-4">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Create a Category</label>
              <div class=" flex items-center">
                <div class="relative w-full">
                  <input
                    bind:value={newCategoryName}
                    type="text"
                    id="simple-search"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter category name"
                    required />
                </div>
                <button
                  on:click={handleCreateCategory}
                  type="button"
                  class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a category</label>

          <Button on:click={() => {}} class="w-full"><Chevron>{categoryOption}</Chevron></Button>
          <Dropdown class="rounded-md w-72 overflow-y-auto py-1 h-44 overflow-auto p-3 space-y-3 text-sm">
            <li class="pt-2">
              <Radio bind:group={categoryOption} value={"none"}>none</Radio>
            </li>
            {#each $app_categories as category}
              <Radio bind:group={categoryOption} value={category.name}>{JSON.stringify(category.name)}</Radio>
            {/each}
          </Dropdown>
        </div>

        <div class="sm:col-span-4">
          <div class="flex">
            <div class="w-full m-0.5">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
              <input
                bind:value={name}
                type="text"
                name="name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product name"
                required />
            </div>

            <div class="w-full m-0.5">
              <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
              <input
                bind:value={brand}
                type="text"
                name="brand"
                id="brand"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Product brand"
                required />
            </div>
          </div>

          <div class="flex">
            <div class="w-full m-0.5">
              <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
              <input
                bind:value={price}
                type="number"
                name="price"
                id="price"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="$2999"
                required />
            </div>
            <div class="w-full m-0.5">
              <label for="item-weight" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock count</label>
              <input
                bind:value={countInStock}
                type="number"
                name="item-weight"
                id="item-weight"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="12"
                required />
            </div>
          </div>

          <div class="mt-9">
            <!-- <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Featured</label> -->
            <Checkbox bind:value={isFeatured}>Featured</Checkbox>
          </div>
        </div>

        <div class="col-span-8">
          <div class="flex flex-col m-1">
            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <textarea
              bind:value={description}
              id="description"
              rows="6"
              class=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Your description here" />
          </div>
        </div>

        <div class="sm:col-span-8 relative">
          <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product images</label>

          {#if files.accepted.length > 0}
            <button
              on:click={handleRemoveAll}
              type="button"
              class=" absolute -top-5 -right-2 focus:outline-none whitespace-normal rounded-lg focus:ring-2 p-1.5 focus:ring-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 mt-2 mr-2 transition hover:-translate-y-1 hover:shadow-lg active:shadow-none active:transform active:translate-y-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-5 h-5">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          {/if}

          <Dropzone on:drop={handleFilesSelect} accept={["image/*"]} containerClasses="custom-dropzone">
            {#if files.accepted.length > 0}
              <article class="grid grid-cols-4 grid-flow-row gap-2">
                {#each files.accepted as item, index}
                  <div class=" relative">
                    {#await toBase64(item) then data}
                      <img class="border rounded-lg w-16" alt="product" src={data} style="cursor: default;" />
                    {/await}
                    <button
                      on:click={(e) => handleRemoveFile(e, index)}
                      type="button"
                      class="z-10 absolute -top-5 -right-5 focus:outline-none whitespace-normal rounded-full p-[0.5px] bg-white dark:hover:bg-gray-600 mt-2 mr-2 transition hover:-translate-y-1 hover:shadow-lg active:shadow-none active:transform active:translate-y-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                {/each}
              </article>
            {:else}
              <button class="">Click here to upload images.</button>
              <p>or</p>
              <p>Drag and drop them here</p>
            {/if}
          </Dropzone>
          {#if files.accepted.length > 0}
            <!-- <div class="text-center">uploading file ({current_file}) of {files.accepted.length}</div>
            <Progress animated value={progress_value} /> -->
          {/if}
        </div>
      </div>
    </form>
  </div>

  <svelte:fragment slot="footer">
    <Button on:click={handleCreateProduct}>
      Add Product
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-2 -mr-2 w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </Button>
    <Button color="alternative">Cancel</Button>
  </svelte:fragment>
</Modal>

<Modal title="Terms of Service" bind:open={createCategoryModal}>
  <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
    With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
  </p>
  <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
    The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to
    notify users as soon as possible of high-risk data breaches that could personally affect them.
  </p>
</Modal>
