import type { Action } from "svelte/action";
import { tweened, spring } from "svelte/motion";

type onSwipped = () => void;
export interface Options {
	totalDistance: number;
	onSwipped: onSwipped;
}

export const swiper: Action<HTMLElement, Partial<Options>> = (
	node,
	options,
) => {
	const startPos = { x: 0 };
	const currentPos = { x: 0 };
	const translateX = spring(0, { stiffness: 0.5, damping: 0.2 });
	const opacity = tweened(1, { duration: 100 });
	const TOTAL_DISTANCE = options?.totalDistance ?? 600;
	let hasOnSwippedBeenCalled = false;

	const unsubTranslation = translateX.subscribe($translateX => {
		node.style.transform = `translate3d(${$translateX}px,0,0)`;
	});

	const unSubOpacity = opacity.subscribe($opacity => {
		node.style.opacity = `${$opacity}`;
	});

	const onMove = (event: MouseEvent | TouchEvent) => {
		event.preventDefault();
		currentPos.x =
			event instanceof MouseEvent ? event.x : event.touches[0].pageX;
		const distance = currentPos.x - startPos.x;
		translateX.set(distance * 0.1);
		opacity.set(1 - Math.abs(distance) / TOTAL_DISTANCE);

		if (Math.abs(distance) > TOTAL_DISTANCE && options?.onSwipped) {
			hasOnSwippedBeenCalled = true;
			options?.onSwipped();
		}
	};

	const onDown = (event: MouseEvent | TouchEvent) => {
		event.preventDefault();
		startPos.x =
			event instanceof MouseEvent ? event.x : event.touches[0].pageX;
		window.addEventListener("mouseup", onUp);
		window.addEventListener("touchend", onUp);
		window.addEventListener("mousemove", onMove);
		window.addEventListener("touchmove", onMove);
	};

	const onUp = (event: MouseEvent | TouchEvent) => {
		event.preventDefault();
		window.removeEventListener("mouseup", onUp);
		window.removeEventListener("touchend", onUp);
		window.removeEventListener("mousemove", onMove);
		window.removeEventListener("touchmove", onMove);
		if (hasOnSwippedBeenCalled) return;
		translateX.set(0);
		opacity.set(1);
	};

	node.addEventListener("mousedown", onDown);
	node.addEventListener("touchstart", onDown);
	return {
		destroy: () => {
			node.removeEventListener("mousedown", onDown);
			node.removeEventListener("touchstart", onDown);
			unsubTranslation();
			unSubOpacity();
		},
	};
};
