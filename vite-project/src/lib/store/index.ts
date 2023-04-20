import { writable } from "svelte/store";
// import { browser } from "$app/env";

function createMobile() {
	const { subscribe, set } = writable(false);

	// if (browser) {
		set(window.matchMedia("(max-width: 768px)").matches);
		window.addEventListener("resize", () => {
			set(window.matchMedia("(max-width: 768px)").matches);
		});
	// }

	return {
		subscribe,
	};
}

export const isMobile = createMobile();
