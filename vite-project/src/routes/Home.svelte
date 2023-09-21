<script>
  let carts = [
    {
      id: 1,
      name: "Cart 1",
      items: [
        { id: 1, name: "Item 1", price: 10 },
        { id: 2, name: "Item 2", price: 20 },
        { id: 3, name: "Item 3", price: 15 },
        { id: 2, name: "Item 6", price: 28 },
        { id: 2, name: "Item 5", price: 88 },
        { id: 2, name: "Item 5", price: 88 },
        { id: 2, name: "Item 5", price: 88 },
        { id: 2, name: "Item 5", price: 88 },
      ],
    },
    {
      id: 2,
      name: "Cart 2",
      items: [
        { id: 4, name: "Item 4", price: 12 },
        { id: 5, name: "Item 5", price: 18 },
      ],
    },
    {
      id: 3,
      name: "Cart 3",
      items: [
        { id: 7, name: "Item 7", price: 8 },
        { id: 8, name: "Item 8", price: 16 },
        { id: 9, name: "Item 10", price: 2 },
        { id: 9, name: "Item 9", price: 22 },
      ],
    },
  ];

  let states = [false, false, false];
</script>

<br />
<br />
<br />

<div class="grid grid-rows-[max-content,1fr,max-content] min-h-screen">
  <main class="max-w-[1320px] px-5 lg:px-0 w-full grid grid-cols-[minmax(1,308px),1fr] grid-rows-[auto,1fr] my-10 gap-4 justify-self-center">
    <div class="grid grid-cols-5 gap-1 border p-2 sm:rounded-lg">
      {#each carts as cart, i}
        <div class="">{cart.id}</div>
        <div class="">{cart.name}</div>
        <div class="">{cart.name}</div>
        <div class="">{cart.name}</div>
        <div class="">
          <button
            on:click={() => {
              states[i] = !states[i];
            }}
            class="transition hover:-translate-y-1 active:transform active:translate-y-0">
            <div class="flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
          </button>
        </div>
        <div class="col-start-1 col-span-5 bg-slate-50 transition-all duration-500 ease-in-out {states[i] ? 'h-0' : 'h-32'} overflow-hidden">
          <div class="grid grid-cols-4 gap-1 p-4 rounded-md border max-h-32 overflow-y-auto">
            {#each cart.items as item}
              <div class="">{item.id}</div>
              <div class="">{item.name}</div>
              <div class="">qty</div>
              <div class="">{item.price}</div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </main>
</div>

<!-- 
 <button class="  transition hover:-translate-y-1 active:transform active:translate-y-0" on:click={() => {}}>
              <div class="flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-3">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008z" />
                </svg>
              </div>
            </button>
            <button class=" text-red-600 transition hover:-translate-y-1 active:transform active:translate-y-0" on:click={() => {}}>
              <div class="flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-5 h-5 mr-3">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </div>
            </button>
 -->
