import type { Action } from "svelte/action";

export const autoGrow: Action<HTMLElement> = node => {
	const rect = window.getComputedStyle(node);
	const paddingY =
		parseFloat(rect.paddingTop) + parseFloat(rect.paddingBottom);
	const onInput = () => {
		node.style.height = rect.minHeight;
		node.style.height = `${node.scrollHeight + paddingY}px`;
		if (parseFloat(node.style.height) > parseFloat(rect.maxHeight))
			node.style.height = rect.maxHeight;
	};

	onInput();
	node.addEventListener("input", onInput);
	return {
		destroy: () => {
			node.removeEventListener("input", onInput);
		},
	};
};
