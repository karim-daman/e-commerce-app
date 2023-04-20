<script lang="ts">
  // import { v4 } from "uuid";

  export let placeholder: string = "";
  // const id = v4();
</script>

<div class="flex flex-col gap-2">
  <label class="text-[#51585e]">
    <slot />
  </label>
  <input class="w-full bg-[#f9f9f9] focus:bg-white border border-slate-300 rounded-[.25rem] px-[14px] py-[6px]" min="0" {placeholder} type="number" />
</div>

<style>
  input {
    -moz-appearance: textfield;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>
