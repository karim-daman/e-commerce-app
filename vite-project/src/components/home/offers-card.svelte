<script lang="ts">
  export let title: string;
  export let href: string;
</script>

<div class="flex flex-col p-5 rounded-[.25rem] {$$props.class}">
  <h1 class="text-[1.24rem] mb-[5px] text-white font-bold">{title}</h1>
  <p class="text-white/50 mb-4">
    <slot />
  </p>

  <slot name="link">
    <a class="px-2 py-1 hover:bg-white hover:text-black transition-colors self-start border border-white rounded-[.25rem] text-white" {href}>Learn more</a>
  </slot>
</div>
