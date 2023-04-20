<script lang="ts">
	import { notifcations } from "$lib/store/notifcations";
	import { flip } from "svelte/animate";
	import { fly, fade } from "svelte/transition";
	import { swiper, type Options } from "$lib/action/swiper";
	import { isMobile } from "$lib/store";

	const onRemoveNotification = (uid: string) => () =>
		notifcations.remove(uid);
	const pauseOrPlay = (uid: string) => () => notifcations.pauseOrPlay(uid);
	const swiperOptions: (uid: string) => Partial<Options> = uid => ({
		onSwipped: onRemoveNotification(uid),
	});
</script>

<div class="fixed max-w-[360px] z-20 top-5 right-5 flex flex-col-reverse">
	{#each $notifcations as notification (notification.uid)}
		<div
			class="will-change-transform"
			use:swiper={{
				...swiperOptions(notification.uid),
				totalDistance: $isMobile ? 200 : undefined,
			}}
			animate:flip={{ duration: 500 }}
			in:fly={{ x: -112 - 16 }}
		>
			<svelte:component
				this={notification.notifcation}
				{...notification.props}
				onRemoveNotification={onRemoveNotification(notification.uid)}
				pauseOrPlay={pauseOrPlay(notification.uid)}
				progress={notification.progress}
			/>
		</div>
	{/each}
</div>
