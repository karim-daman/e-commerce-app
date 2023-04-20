<section class="rounded-[.25rem] border p-5">
	<h1 class="sr-only">Coupon Area</h1>

	<label for="coupon" class="text-grey-secondary">Have a coupon</label>
	<div class="flex mt-1 w-full">
		<input
			id="coupon"
			placeholder="Coupon Code"
			class="border bg-[#f9f9f9] text-grey-secondary transition-colors focus:outline-none focus:bg-white hover:border-[#6ea8fe] focus:border-[#6ea8fe] placeholder:text-[#9da1a7] px-[14px] py-[6px] w-full border-r-0 rounded-l"
			type="text"
		/>
		<button
			class="border text-grey-secondary font-normal px-[14px] py-[6px] rounded-r"
			>Apply</button
		>
	</div>
</section>

<style>
	input:focus,
	input:hover {
		box-shadow: 0 0 0 0.2rem rgba(231, 241, 255, 0.7);
	}
</style>
