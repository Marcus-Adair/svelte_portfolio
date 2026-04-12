<script lang="ts">
    import { cn } from "$lib/utils.js";

    import gsap from "gsap";
	import { showingBootAnimation } from "$lib/stores/boot.svelte";

    type Props = {
      divClass?: string;
      slow?: boolean;
    } 
    let { divClass, slow = false}: Props  = $props();

    // svelte-ignore non_reactive_update
    let sep: HTMLDivElement;
    $effect(() => {
        if (!showingBootAnimation()) {
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
        }
    });
</script>

{#if !showingBootAnimation()}
    <div bind:this={sep} class={cn("w-full bg-border h-px", divClass)}></div>
{/if}