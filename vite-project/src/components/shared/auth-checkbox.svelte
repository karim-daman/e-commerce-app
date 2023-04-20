<script lang="ts">
	export let value: boolean;
</script>

<div class="flex flex-row items-center gap-2">
	<input id="remember" bind:checked={value} type="checkbox" />
	<label for="remember" class="text-gray-900 select-none text-sm"
		>Remember Me</label
	>
</div>
