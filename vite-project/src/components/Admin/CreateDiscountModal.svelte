<script>
  import { adminDiscountCreateModalStore } from "$stores/appStore";
  import { app_categories, getCategories } from "$stores/dataStore";
  import { Button, Modal, Radio } from "flowbite-svelte";
  import { onMount } from "svelte";

  import RangeSlider from "svelte-range-slider-pips";

  let rangeValues = [0, 50000];

  let categoryOption = "Select a Category";
  let toggleCategoryDropdown = false;

  let categorySearchInput;

  let filteredCategory = [];
  $: filteredCategory = $app_categories;

  onMount(async () => {
    await getCategories();
    filteredCategory = $app_categories;
  });

  function filterCategory(e) {
    filteredCategory = $app_categories.filter((item) => item.name.includes(categorySearchInput));
    console.log(filteredCategory);
  }
</script>

<div class="mb-2 mr-2">
  <Button on:click={() => ($adminDiscountCreateModalStore = !$adminDiscountCreateModalStore)}
    >Add discount <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-2 -mr-2 w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  </Button>
</div>

<Modal title="Create New Discount" bind:open={$adminDiscountCreateModalStore}>
  <div class="p-4 md:p-5">
    <div class="grid gap-4 grid-cols-8">
      <div class="col-span-4">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount Name</label>
        <input
          type="text"
          name="discountName"
          id="discountName"
          class="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Discount name" />
      </div>

      <div class="col-span-4">
        <label for="Code" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Code</label>
        <input
          type="number"
          name="Code"
          id="Code"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Discount code" />
      </div>

      <div class="col-span-8">
        <label for="priceRange" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price Range</label>

        <div class="flex">
          <div class="relative h-min">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">$</div>
            <input
              bind:value={rangeValues[0]}
              type="number"
              id="default-search"
              class="block w-full h-8 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="0"
              required />
          </div>

          <div class="w-full mx-5">
            <RangeSlider min={0} max={50000} range pushy float pips all rest={false} prefix="$" first="label" last="label" bind:values={rangeValues} />
          </div>

          <div class="relative h-min">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">$</div>
            <input
              bind:value={rangeValues[1]}
              type="number"
              id="default-search"
              class="block w-full h-8 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="0"
              required />
          </div>
        </div>

        <div class="flex">
          <div class="w-full mr-2">
            <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a category</label>

            <button
              on:click={() => {
                toggleCategoryDropdown = !toggleCategoryDropdown;
              }}
              class=" flex justify-center w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              >{categoryOption}
              <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg
              ></button>

            <div id="dropdownSearch" class="  fixed w-[15.5rem] z-10 {toggleCategoryDropdown ? 'h-0' : 'h-44'} transition-all bg-white rounded-lg shadow dark:bg-gray-700">
              <div class="p-2 bg-slate-100 {toggleCategoryDropdown ? 'hidden' : 'block'}">
                <label for="input-group-search" class="sr-only">Search</label>
                <div class="relative {toggleCategoryDropdown ? 'hidden h-0' : 'block '}">
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
              <ul class="  {toggleCategoryDropdown ? 'hidden' : 'block'} h-auto max-h-40 overflow-y-auto px-3 pb-3 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
                <Radio class="flex mt-2 rounded-md p-1 hover:bg-slate-200" bind:group={categoryOption} value={"Select a Category"}>{"Select a Category"}</Radio>
                {#each filteredCategory as category}
                  <Radio class="flex rounded-md p-1 hover:bg-slate-200" bind:group={categoryOption} value={category.name}>{category.name}</Radio>
                {/each}
              </ul>
            </div>
          </div>
          <div class="w-full ml-2">
            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount Description</label>
            <textarea
              id="description"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write discount description here"></textarea>

            <div class="flex justify-between mt-4">
              <label for="active">Active</label>
              <input type="checkbox" id="active" name="active" checked />
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-4">
        <label for="Discount Type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount Type</label>
        <select
          id="Discount Type"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
          <option selected="">Select Discount Type</option>
          <option value="Percentage">Percentage</option>
          <option value="Fixed">Fixed Amount</option>
        </select>

        <!-- <label for="endDate">End Date:</label> -->
        <label for="startDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date</label>
        <input
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          type="date"
          id="startDate"
          name="startDate"
          required />
      </div>

      <div class="col-span-4">
        <label for="value" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount Value</label>
        <input
          type="number"
          name="value"
          id="value"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="0" />

        <label for="endDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Date</label>
        <input
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          type="date"
          id="endDate"
          name="endDate"
          required />
      </div>
    </div>
  </div>

  <svelte:fragment slot="footer">
    <Button on:click={() => alert('Handle "success"')}
      >Create Discount

      <svg class="me-1 -ms-1 w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
        ><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
    </Button>
    <Button color="alternative">Cancel</Button>
  </svelte:fragment>
</Modal>
