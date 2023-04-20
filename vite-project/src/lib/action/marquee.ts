import type { Action } from "svelte/action";
import { tweened } from "svelte/motion";

interface Options {
	duration?: number;
	direction?: "leftToRight" | "rightToLeft";
	fill?: boolean;
}

const DEFAULT_OPTIONS: Options = {
	duration: 1000,
	direction: "rightToLeft",
	fill: false,
};

export const marquee: Action<HTMLElement, Options | undefined> = (
	node,
	options = DEFAULT_OPTIONS,
) => {
	const original = node.firstChild;
	if (!original || !(original instanceof HTMLElement))
		throw Error("Marquee expect a direct child element");

	const nodeStyles = window.getComputedStyle(node);
	let gapX = parseFloat(nodeStyles.columnGap);
	if (isNaN(gapX)) gapX = 0;

	const originalStyles = window.getComputedStyle(original);
	const marginLeft = parseFloat(originalStyles.marginLeft);
	const marginRight = parseFloat(originalStyles.marginRight);
	const marginX = marginLeft + marginRight;

	const getCloneOptions = () => ({
		length:
			options.fill ?? DEFAULT_OPTIONS.fill
				? node.clientWidth / original.clientWidth + 1
				: 2,
	});
	let clones: HTMLElement[] = Array.from(
		getCloneOptions(),
		() => original.cloneNode(true) as HTMLElement,
	);

	const direction = options.direction ?? DEFAULT_OPTIONS.direction;
	let translateX =
		((node.clientWidth + marginX + gapX) / node.clientWidth) * 100;
	let start = direction === "rightToLeft" ? 0 : translateX;
	let finish = direction === "rightToLeft" ? translateX : 0;

	const onResize = () => {
		clones.forEach(el => el.remove());
		clones = Array.from(
			getCloneOptions(),
			() => original.cloneNode(true) as HTMLElement,
		);
		clones.forEach(el => {
			if (el != null) node.appendChild(el);
		});

		translateX =
			((node.clientWidth + marginX + gapX) / node.clientWidth) * 100;
		start = direction === "rightToLeft" ? 0 : translateX;
		finish = direction === "rightToLeft" ? translateX : 0;
	};
	window.addEventListener("resize", onResize);

	const shift = tweened(start, {
		duration: options.duration ?? DEFAULT_OPTIONS.duration,
	});
	const unsub = shift.subscribe($shift => {
		original.style.transform = `translate3d(-${$shift}%,0,0)`;
		clones.forEach(el => {
			el.style.transform = `translate3d(-${$shift}%,0,0)`;
		});

		if ($shift === finish) {
			shift.set(start, { duration: 0 });
			shift.set(finish);
		}
	});

	shift.set(finish);
	clones.forEach(el => {
		if (el != null) node.appendChild(el);
	});

	return {
		update: () => {
			unsub();
		},
		destroy: () => {
			unsub();
		},
	};
};
