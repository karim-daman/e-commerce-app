<script>
  // @ts-nocheck

  import { Button, Dropdown, Chevron, Checkbox, Radio, Toast, Listgroup, DropdownItem, Avatar, Search, SpeedDialButton, SpeedDial, Popover } from "flowbite-svelte";
  import { clickOutside } from "svelte-use-click-outside";
  import { Modal } from "flowbite-svelte";
  import { fade, slide } from "svelte/transition";
  // import Dropzone from "svelte-file-dropzone/Dropzone.svelte";

  import Dropzone from "svelte-file-dropzone";

  import { onMount } from "svelte";
  import { app_categories, deleteCategory, createCategory, createProduct, getCategories, isFetching, getProducts } from "$stores/dataStore";
  import toast, { Toaster } from "svelte-french-toast";
  import { adminProductCreateModalStore } from "$stores/appStore";

  let categoryOption = "Select a Category";

  // function clickOutsideHandler() {
  //   $adminProductCreateModalStore = false;
  // }

  let filteredCategory = [];
  $: filteredCategory = $app_categories;
  let toggleCategoryDropdown = false;

  onMount(async () => {
    await getCategories();
    filteredCategory = $app_categories;
  });

  let name, description, richDescription, image, images, brand, price, category, countInStock, rating, numReviews, isFeatured;

  async function handleDeleteCategory() {
    let category = $app_categories.filter((item) => item.name == categoryOption)[0];

    if (!category) {
      displayInvalidToast(Object.keys({ category })[0]);
      return;
    }
    let category_id = category.id;

    const promise = new Promise((resolve, reject) => {
      deleteCategory(category_id).then((response) => {
        response.success == true ? resolve() : reject();
        toast.promise(
          promise,
          {
            loading: `Deleting ${category.name} category..`,
            success: `${category.name} Deleted successfully!`,
            error: `Could not create category \n ${response.message} \n please try again.`,
          },
          {
            position: "top-right",
            style: "float: left; width: 500px ;background: #333; color: #fff;margin-right: 1rem; margin-top: 2rem;",
          }
        );
      });
    });
  }

  let newCategoryName;
  async function handleCreateCategory() {
    if (newCategoryName == undefined || newCategoryName == "") {
      toast.error("Invalid field: \n " + Object.keys({ newCategoryName })[0], {
        position: "top-right",
        style: "float: left; width: 500px ;background: #333; color: #fff;margin-right: 1rem;",
      });
      return;
    }

    var raw = {
      name: newCategoryName,
      icon: "icon",
      color: "color",
    };

    const promise = new Promise((resolve, reject) => {
      createCategory(raw).then((response) => {
        response.success == true ? resolve() : reject();
        getCategories();

        toast.promise(
          promise,
          {
            loading: `Creating a new category..`,
            success: `Created successfully!`,
            error: `Could not create category \n ${response.message} \n please try again.`,
          },
          {
            position: "top-right",
            style: "float: left; width: 500px ;background: #333; color: #fff;margin-right: 1rem; margin-top: 2rem;",
          }
        );
      });
    });
  }

  function displayInvalidToast(fieldName) {
    toast.error("Invalid field: \n " + fieldName, {
      position: "top-right",
      style: "float: left; width: 500px ;background: #333; color: #fff;margin-right: 1rem;",
    });
  }

  async function handleCreateProduct() {
    let selected_category_id;
    $app_categories.map((category) => {
      if (category.name == categoryOption) selected_category_id = category.id;
    });

    if (selected_category_id == undefined || description == undefined || name == undefined || brand == undefined || price == undefined || countInStock == undefined) {
      if (!selected_category_id) displayInvalidToast(Object.keys({ selected_category_id })[0]);
      if (!description) displayInvalidToast(Object.keys({ description })[0]);
      if (!name) displayInvalidToast(Object.keys({ name })[0]);
      if (!brand) displayInvalidToast(Object.keys({ brand })[0]);
      if (!price) displayInvalidToast(Object.keys({ price })[0]);
      if (!countInStock) displayInvalidToast(Object.keys({ countInStock })[0]);
      return;
    }

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

    const promise = new Promise((resolve, reject) => {
      createProduct(raw).then((response) => {
        response.success == true ? resolve() : reject();
        getProducts();
      });
    });

    toast.promise(
      promise,
      {
        loading: `Creating a new product..`,
        success: `Created successfully!`,
        error: `Could not create product, try again.`,
      },
      {
        position: "top-right",
      }
    );
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

  let categorySearchInput;

  function filterCategory(e) {
    filteredCategory = $app_categories.filter((item) => item.name.includes(categorySearchInput));
    console.log(filteredCategory);
  }
</script>

<div class="mb-2 mr-2">
  <Button on:click={() => ($adminProductCreateModalStore = !$adminProductCreateModalStore)}
    >Add product <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-2 -mr-2 w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  </Button>
</div>

<Modal class=" max-h-[778px]" title="Add a new product" bind:open={$adminProductCreateModalStore}>
  <div in:fade out:fade>
    <!-- use:clickOutside={clickOutsideHandler} -->
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
                class=" transition hover:-translate-y-1 hover:shadow-lg active:shadow-none active:transform active:translate-y-0 p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a category</label>

        <button
          on:click={() => {
            toggleCategoryDropdown = !toggleCategoryDropdown;
          }}
          id="dropdownSearchButton"
          data-dropdown-toggle="dropdownSearch"
          data-dropdown-placement="bottom"
          class=" flex justify-center w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          >{categoryOption}
          <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
            ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg
          ></button>

        <div id="dropdownSearch" class="   w-full z-10 {toggleCategoryDropdown ? 'hidden' : 'block'} bg-white rounded-lg shadow dark:bg-gray-700">
          <div class="p-3 bg-slate-200">
            <label for="input-group-search" class="sr-only">Search</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                  ><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" /></svg>
              </div>
              <input
                bind:value={categorySearchInput}
                on:input={filterCategory}
                type="text"
                id="input-group-search"
                class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search category" />
            </div>
          </div>
          <ul class="h-40 overflow-y-auto border px-3 pb-3 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
            <Radio class="flex rounded-md p-1 hover:bg-slate-200" bind:group={categoryOption} value={"Select a Category"}>{"Select a Category"}</Radio>
            {#each filteredCategory as category}
              <Radio class="flex rounded-md p-1 hover:bg-slate-200" bind:group={categoryOption} value={category.name}>{category.name}</Radio>
            {/each}
          </ul>
          <button
            on:click={handleDeleteCategory}
            class="flex justify-center w-full items-center p-3 text-sm font-medium text-red-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500">
            Delete category
          </button>
        </div>
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
        </div>

        <div class="flex">
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
              min="1"
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
            <article class="grid grid-cols-6 grid-flow-row gap-2">
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
  </div>

  <svelte:fragment slot="footer">
    <Button on:click={handleCreateProduct}>
      Add Product
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-2 -mr-2 w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </Button>
    <Button
      on:click={() => {
        $adminProductCreateModalStore = false;
      }}
      color="alternative">Cancel</Button>
  </svelte:fragment>
</Modal>
