<script lang="ts">
	import FooterAddress from "./footer-address.svelte";
	import FooterMainList from "./footer-main-list.svelte";

	const about = {
		"About Us": "/",
		Services: "/",
		"Rules and terms": "/",
		Blogs: "/",
	};

	const services = {
		"Help Center": "/",
		"Money Refund": "/",
		"Terms and policy": "/",
		Disputes: "/",
	};

	const social = {
		Facebook: { href: "/", icn: "/facebook.svg" },
		Twitter: { href: "/", icn: "/twitter.svg" },
		Instgram: { href: "/", icn: "/instagram-icon.svg" },
		Youtube: { href: "/", icn: "/youtube-icon.svg" },
	};
</script>

<div class="md:flex md:justify-between mt-10 mb-5 px-5 md:px-20">
	<FooterAddress />

	<div
		class="grid grid-cols-[minmax(0,max-content)] justify-center gap-8 sm:gap-6 md:grid-cols-4"
	>
		<FooterMainList title="About" items={about} />
		<FooterMainList title="Services" items={services} />
		<FooterMainList title="Social" items={social} />

		<div class="flex flex-col items-center md:items-start">
			<h2
				class="mb-6 text-sm font-semibold text-center md:text-left text-gray-900 uppercase"
			>
				Our App
			</h2>

			<img class="w-28" src="/google-play.svg" alt="google play" />
			<img class="w-28" src="/app-store.svg" alt="app store" />
		</div>
	</div>
</div>
