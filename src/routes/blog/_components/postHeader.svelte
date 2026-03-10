<script lang="ts">
	import AnimatedSeparator from "$lib/components/animatedSeparator.svelte";
	import Button from "$lib/components/ui/button.svelte";
	import Separator from "$lib/components/ui/separator.svelte";
	import { formatDate } from "$lib/utils/dates";
	import { ChevronLeft } from "lucide-svelte";
	import { onMount } from "svelte";
    import gsap from "gsap";

    interface Props {
        date: Date,
        postNum: number,
        title: string,
    }
    const { date, postNum, title}: Props = $props();

    let titleSpan: HTMLSpanElement;
    let dateDiv: HTMLDivElement;
    onMount(() => {
        gsap.from(titleSpan, { x: 600, duration: 0.35, ease: "power2.out"});
        gsap.from(dateDiv, { opacity: 0, duration: 0.35, ease: "power2.out"});

    });
</script>

<div class="flex flex-row gap-6 items-center">
    <Button variant="ghost" size="icon-lg" href="/blog">
        <ChevronLeft class="size-8"/>
    </Button>
    <div class="flex flex-col gap-2 flex-1">
        <h1 bind:this={titleSpan} class="text-4xl font-normal">{title}</h1>

        <div bind:this={dateDiv} class="flex flex-row justify-between items-center">
            <div class="flex flex-row items-center gap-2 h-4">
                <Separator orientation="vertical" class="data-[orientation=vertical]:w-[3px]"/>
                <span class="text-sm text-muted-foreground tracking-wide">{formatDate(date)}</span>
            </div>
            <span class="text-sm text-muted-foreground tracking-wider">#{postNum}</span>
        </div>
    </div>
</div>

<AnimatedSeparator/>