<script lang="ts">
	import { PAGE_ENTER_DELAY } from "$lib/consts/style";
    import { cn } from "$lib/utils.js";
    import gsap from "gsap";
    import { onMount } from "svelte";

    type Props = {
      divClass?: string;
      slow?: boolean;
    }
    let { divClass, slow = false}: Props  = $props();

    let sep: HTMLDivElement;
    onMount(() => {
        gsap.fromTo(
            sep,
            { width: 0 },
            { width: "100%", duration: slow ? 0.55 : 0.25, ease: "power1.inOut", delay: PAGE_ENTER_DELAY }
        );
    });
</script>

<div bind:this={sep} class={cn("w-full bg-border h-px", divClass)}></div>