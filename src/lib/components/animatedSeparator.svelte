<script lang="ts">
    import { cn } from "$lib/utils.js";
	import { onMount } from "svelte";

    import gsap from "gsap";

    

    type Props = {
      divClass?: string;
      slow?: boolean;
    } 
    let { divClass, slow = false}: Props  = $props();

    let sep: HTMLDivElement;
    onMount(() => {
    if (slow) {
        gsap.fromTo(
            sep,
            { width: 0 },
            { width: "100%", duration: 0.55, ease: "power1.inOut" }
        );
    } else {
        gsap.fromTo(
            sep,
            { width: 0 },
            { width: "100%", duration: 0.25, ease: "power1.inOut" }
        );
    }


});
</script>

<div bind:this={sep} class={cn("w-full bg-border h-px", divClass)}></div>