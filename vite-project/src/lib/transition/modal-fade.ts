interface Options {
	duration: number;
}

export default (
	node: HTMLElement,
	options: Partial<Options> = { duration: 250 },
) => {
	return {
		duration: options.duration,
		css: (t: number) => `
			background: rgba(0, 0, 0, ${t * 0.5});
		`,
	};
};
