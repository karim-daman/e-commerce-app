<script lang="ts">
	import FooterCopyright from "./footer-copyright.svelte";
	import FooterHeader from "./footer-header.svelte";
	import FooterMain from "./footer-main.svelte";
</script>

<footer class="bg-white w-full">
	<FooterHeader />
	<FooterMain />
	<hr class="my-4 border-gray-200 sm:mx-auto" />
	<FooterCopyright />
</footer>
