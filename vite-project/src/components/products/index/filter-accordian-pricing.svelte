<script>
	import NumberInput from "./filter-accordian-pricing-number-input.svelte";
	import FilterAccordian from "./filter-accordian.svelte";
</script>

<FilterAccordian title="Price">
	<div class="w-full grid grid-cols-2 gap-x-4 grid-flow-row auto-rows-max">
		<input class="styled-slider w-full col-span-2 mb-2" type="range" />
		<NumberInput placeholder="$0">Min</NumberInput>
		<NumberInput placeholder="$1000">Max</NumberInput>

		<button
			class="mt-4 px-[14px] py-[6px] col-span-2 rounded-[.25rem] text-white bg-[#0d6efd] hover:bg-[#0d6efd]/90"
		>
			Apply
		</button>
	</div>
</FilterAccordian>

<style lang="scss">
	/*generated with Input range slider CSS style generator (version 20211225)
	  https://toughengineer.github.io/demo/slider-styler*/
	input[type="range"].styled-slider {
		height: 8px;
		-webkit-appearance: none;
	}

	input[type="range"].styled-slider:focus {
		outline: none;
	}

	/*webkit*/
	input[type="range"].styled-slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 20px;
		height: 20px;
		border-radius: 1em;
		background: #0d6efd;
		border: 1px solid #ffffff;
		box-shadow: 0 0 2px black;
		margin-top: calc(8px * 0.5 - max(20px * 0.5, 1px));
	}

	input[type="range"].styled-slider::-webkit-slider-runnable-track {
		height: 8px;
		border: none;
		border-radius: 0.5em;
		background: #dee2e6;
		box-shadow: none;
	}

	/*mozilla*/
	input[type="range"].styled-slider::-moz-range-thumb {
		width: max(calc(20px - 1px - 1px), 0px);
		height: max(calc(20px - 1px - 1px), 0px);
		border-radius: 1em;
		background: #0d6efd;
		border: 1px solid #ffffff;
		box-shadow: 0 0 2px black;
	}

	input[type="range"].styled-slider::-moz-range-track {
		height: 8px;
		border: none;
		border-radius: 0.5em;
		background: #dee2e6;
		box-shadow: none;
	}

	/*ms*/
	input[type="range"].styled-slider::-ms-fill-upper {
		background: transparent;
		border-color: transparent;
	}

	input[type="range"].styled-slider::-ms-fill-lower {
		background: transparent;
		border-color: transparent;
	}

	input[type="range"].styled-slider::-ms-thumb {
		width: 20px;
		height: 20px;
		border-radius: 1em;
		background: #0d6efd;
		border: 1px solid #ffffff;
		box-shadow: 0 0 2px black;
		margin-top: 0;
		box-sizing: border-box;
	}

	input[type="range"].styled-slider::-ms-track {
		height: 8px;
		border-radius: 0.5em;
		background: #dee2e6;
		border: none;
		box-shadow: none;
		box-sizing: border-box;
	}
</style>
