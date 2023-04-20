export const hold = (node: HTMLElement, option: () => void) => {
	let intervalID: number;

	const onUp = () => {
		window.clearInterval(intervalID);
		window.removeEventListener("mouseup", onUp);
		window.removeEventListener("touchend", onUp);
	};

	const onDown = (event: MouseEvent | TouchEvent) => {
		event.preventDefault();

		option();
		intervalID = window.setInterval(option, 100);
		window.addEventListener("mouseup", onUp);
		window.addEventListener("touchend", onUp);
	};

	node.addEventListener("mousedown", onDown);
	node.addEventListener("touchstart", onDown);
};
