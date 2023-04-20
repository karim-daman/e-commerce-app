import { writable } from "svelte/store";
// import { browser } from "$app/env";
// import { v4 } from "uuid";
import type { SvelteComponent } from "svelte";
import type { Type } from "@lib/types/type";
import { tweened } from "svelte/motion";
import type { Tweened } from "svelte/motion";

interface NotifcationItem<T extends SvelteComponent> {
	uid: string;
	notifcation: Type<T>;
	props: T["$$prop_def"];
	progress: Tweened<number>;
}

interface NotifcationPauseTracker {
	isPaused: boolean;
	timeoutID: number | null;
	start: number;
	total: number;
	counter: Tweened<number>;
	progress: Tweened<number>;
}

const notifcationPauseTracker: { [uid: string]: NotifcationPauseTracker } = {};
function createNotifcationStore(options: { delay: number }) {
	const { subscribe, update } = writable<NotifcationItem<any>[]>([]);

	return {
		subscribe,
		remove: (uid: string) => {
			update($notifcation => {
				return $notifcation.filter(component => {
					return component.uid !== uid;
				});
			});
		},
		pauseOrPlay: (uid: string) => {
			const info = notifcationPauseTracker[uid];
			if (!info) return;

			if (info.isPaused) {
				const unsub = info.counter.subscribe($counter => {
					const remaining = info.total - $counter;
					// if (browser) {
						info.timeoutID = window.setTimeout(() => {
							update($notifcation => {
								delete notifcationPauseTracker[uid];
								return $notifcation.filter(component => {
									return component.uid !== uid;
								});
							});
						}, remaining);
					// }

					info.progress.set(1, { duration: remaining });
					info.counter.set(info.total, { duration: remaining });
				});
				unsub();

				info.isPaused = false;
			} else {
				let unsub = info.counter.subscribe($counter => {
					info.counter.set($counter);
				});
				unsub();

				unsub = info.progress.subscribe($progress => {
					info.progress.set($progress);
				});
				unsub();

				info.timeoutID && window.clearTimeout(info.timeoutID);
				info.timeoutID = null;
				info.isPaused = true;
			}
		},
		push: <T extends SvelteComponent>(
			notifcation: Type<T>,
			props: T["$$prop_def"] | { delay?: number },
		) => {
			const progress = tweened(0);
			// const item: NotifcationItem<T> = {
			// 	uid: v4(),
			// 	notifcation,
			// 	props,
			// 	progress,
			// };

			update($notifcation => {
				// $notifcation.push(item);
				return $notifcation;
			});

			// if (browser) {
				const duration = props.delay ? props.delay : options.delay;
				progress.set(1, {
					duration,
				});

				const counter = tweened(0);
				counter.set(duration, { duration });
				const id = window.setTimeout(() => {
					update($notifcation => {
						delete notifcationPauseTracker[item.uid];
						return $notifcation.filter(component => {
							return component.uid !== item.uid;
						});
					});
				}, duration);

				const info: NotifcationPauseTracker = {
					isPaused: false,
					timeoutID: id,
					progress,
					counter,
					start: Date.now(),
					total: duration,
				};

				notifcationPauseTracker[item.uid] = info;
			// }
		},
	};
}

export const notifcations = createNotifcationStore({ delay: 3000 });
