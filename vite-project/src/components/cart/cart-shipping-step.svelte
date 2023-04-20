<script lang="ts">
	export let title: string;
</script>

<main
	class="  w-full grid-container px-5 lg:px-0 grid lg:grid-cols-[1fr] lg:grid-rows-[1fr] my-10 gap-x-5 gap-y-4 ">
	<!-- {title} -->

	Contact Info

	<div class="flex mx-2 ">
		<div class="flex flex-col w-1/2">
			<label class="form-label py-2" for="fn">First name</label>
			<input
				id="fn"
				type="text"
				class="form-control rounded p-1  border border-gray-300"
				placeholder="Type here" />

			<label class="form-label py-2" for="ln">Last name</label>
			<input
				id="ln"
				type="text"
				class="form-control rounded p-1  border border-gray-300"
				placeholder="Type here" />
		</div>

		<div class="flex flex-col mx-2 w-1/2">
			<label class="form-label py-2" for="phone">Phone</label>
			<input
				id="phone"
				type="text"
				value="+998"
				class="form-control rounded p-1  border border-gray-300"
				placeholder="" />

			<label class="form-label py-2" for="email">Email</label>
			<input
				id="email"
				type="text"
				class="form-control rounded p-1  border border-gray-300"
				placeholder="example@gmail.com" />
		</div>
	</div>

	<hr class="my-10" />

	<div class="flex">
		<button
			class="w-1/3 bg-blue-200 rounded m-2 h-40 text-black text-xl focus:ring-2 focus:ring-blue-700">
			Express Delivary
			<div class="text-gray-400 pt-2">3-4 days via fedex</div>
		</button>
		<button
			class="w-1/3 bg-blue-200 rounded m-2 h-40 text-black text-xl focus:ring-2 focus:ring-blue-700">
			Post Office
			<div class="text-gray-400 pt-2">10-15 days via post</div>
		</button>
		<button
			class="w-1/3 bg-blue-200 rounded m-2 h-40 text-black text-xl focus:ring-2 focus:ring-blue-700">
			Self Pickup
			<div class="text-gray-400 pt-2">In Shop Pickup</div>
		</button>
	</div>

	<div class="mt-2 mx-2  flex">
		<div class="w-2/3 flex flex-col">
			<label class="form-label  py-2" for="fn">Address</label>
			<input
				id="fn"
				type="text"
				class="form-control rounded p-1 border border-gray-300"
				placeholder="Type here" />
		</div>
		<div class="w-1/3 flex ml-2 flex-col">
			<label class="form-label py-2" for="fn">City</label>
			<input
				id="fn"
				type="text"
				class="form-control rounded p-1 border border-gray-300"
				placeholder="Type here" />
		</div>
	</div>
	<div class="mt-2 flex">
		<div class="w-1/3 flex mx-2 flex-col">
			<label class="form-label py-2" for="fn">House</label>
			<input
				id="fn"
				type="text"
				class="form-control rounded p-1 border border-gray-300"
				placeholder="Type here" />
		</div>
		<div class="w-1/3 flex flex-col">
			<label class="form-label py-2" for="fn">Postal Code</label>
			<input
				id="fn"
				type="text"
				class="form-control rounded p-1 border border-gray-300"
				placeholder="Type here" />
		</div>
		<div class="w-1/3 flex mx-2 flex-col">
			<label class="form-label py-2" for="fn">ZIP</label>
			<input
				id="fn"
				type="text"
				class="form-control rounded p-1 border border-gray-300"
				placeholder="Type here" />
		</div>
	</div>
</main>
