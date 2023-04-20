<script lang="ts">
	import type { Tweened } from "svelte/motion";
	import { tweened } from "svelte/motion";

	interface NotificationType {
		status?: string;
		heading?: string;
		description?: string;
	}

	export let notification: NotificationType = {};
	export let progress: Tweened<number> = tweened(0);

	// `onRemove` function will be passed into your component.
	export let onRemoveNotification: (() => void) | null = null;
	export let pauseOrPlay: (() => void) | null = null;
	const handleButtonClick = () => {
		if (!onRemoveNotification) return;
		onRemoveNotification();
	};

	const onMouseUp = (event: MouseEvent | TouchEvent) => {
		event.preventDefault();
		if (!pauseOrPlay) return;
		pauseOrPlay();
		window.removeEventListener("mouseup", onMouseUp);
		window.removeEventListener("touchend", onMouseUp);
	};
	const onMouseDown = () => {
		if (!pauseOrPlay) return;
		pauseOrPlay();
		window.addEventListener("mouseup", onMouseUp);
		window.addEventListener("touchend", onMouseUp);
	};
</script>

<div class="m-auto select-none">
	<div
		on:touchstart|preventDefault={onMouseDown}
		on:mousedown={onMouseDown}
		class="bg-white relative rounded-sm border-gray-300 border p-3 shadow-lg m-5"
	>
		<div class="flex flex-row items-start">
			<div class="px-2">
				{#if notification.status != "default"}
					<img
						src="/{notification.status}.svg"
						alt="{notification.status} status"
						class="w-5 h-5"
					/>
				{/if}
			</div>
			<div class="ml-2 mr-6">
				<span class="font-semibold">{notification.heading}</span>
				<span class="block text-gray-500"
					>{notification.description}</span
				>
			</div>

			<button on:click={handleButtonClick}>
				<img class="h-5" src="/close.svg" alt="close" />
			</button>
		</div>

		<hr
			style:--progress="{$progress * 100}%"
			class="absolute rounded-sm bottom-0 w-full will-change-transform [transform:scale3d(var(--progress,0),1,1)] origin-left left-0 text-black border-y-[2px] border-black"
		/>
	</div>
</div>
