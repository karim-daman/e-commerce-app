<script>
	import SpecialSectionItem from "./special-section-item.svelte";
</script>

<section
	class="w-full grid-container px-5 my-10 gap-5 grid grid-flow-row md:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
>
	<SpecialSectionItem
		--bg="rgb(13,110,253)"
		src="/money.svg"
		title="Reasonable prices"
	>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
		tempor incididunt ut labor
	</SpecialSectionItem>

	<SpecialSectionItem
		--bg="rgb(220, 53, 69)"
		src="/chat.svg"
		title="Customer support 24/7"
	>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
		tempor incididunt ut labor
	</SpecialSectionItem>

	<SpecialSectionItem
		--bg="rgb(25, 135, 84)"
		src="/truck.svg"
		title="Quick delivery"
	>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
		tempor incididunt ut labor
	</SpecialSectionItem>
</section>
