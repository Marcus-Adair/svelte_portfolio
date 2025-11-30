<script lang="ts">
	import Card from "$lib/components/ui/card/card.svelte";
	import Accordion from '$lib/components/ui/accordion/accordion.svelte';
	import AccordionItem from '$lib/components/ui/accordion/accordion-item.svelte';
	import AccordionTrigger from '$lib/components/ui/accordion/accordion-trigger.svelte';
	import AccordionContent from '$lib/components/ui/accordion/accordion-content.svelte';
	import Separator from "$lib/components/ui/separator.svelte";
    import gsap from "gsap";
	import { onMount, type Snippet } from "svelte";

    interface Props {
        url: string;
        src: any;
		srcType?: "iframe" | "img";
        alt: string;
        title: string;
        description: string | Snippet;
    }
    let { url, src, srcType = "img", alt, title, description}: Props = $props();

	const maxX = 25;
	const maxY = 15;
    let card: HTMLAnchorElement;
	onMount(() => {
		if (!card) return;

        function scale(e: MouseEvent) {
			gsap.to(card, {
				scale: 1.05,
				duration: 0.4,
				ease: "power2.out"
			});
        }
		function handleMove(e: MouseEvent) {

			const rect = card.getBoundingClientRect();
			const relX = e.clientX - rect.left;
			const relY = e.clientY - rect.top;

			// Normalize position
			const normX = (relX / rect.width) * 2 - 1;
			const normY = (relY / rect.height) * 2 - 1;

			gsap.to(card, {
				x: normX * maxX,
				y: normY * maxY,
				duration: 2,
				ease: "power2.out"
			});
		}

		function reset() {
            gsap.killTweensOf(card);
			gsap.to(card, { x: 0, y: 0, duration: 1.5, ease: "power3.out" });
			gsap.to(card, {
				scale: 1,
				duration: 0.5,
				ease: "power2.out"
			});
		}

        card.addEventListener("mouseenter", scale);
		card.addEventListener("mousemove", handleMove);
		card.addEventListener("mouseleave", reset);

		return () => {
			card.removeEventListener("mousemove", handleMove);
			card.removeEventListener("mouseleave", reset);
			card.removeEventListener("mouseenter", scale);
		};
	});
</script>

<div>
    <a bind:this={card} href={url} target={url.startsWith("/") ? "" : "_blank"} rel={url.startsWith("/") ? "" : "noreferrer"} class="flex flex-col gap-2 text-center">
        <Card class='p-1.5 hover:bg-accent/50 transition-colors'>
			{#if srcType === "iframe"}
				<iframe {title} {src} class="border-card aspect-video w-full cursor-pointer overflow-hidden rounded-md border"></iframe>
			{:else}
				<img {src} {alt} class="border-card aspect-video w-full cursor-pointer overflow-hidden rounded-md border">
			{/if}
        </Card>
    </a>

	<!-- Details -->
    <Accordion type="single" class="w-full" value={title}>
        <AccordionItem value={title}>
            <AccordionTrigger class="text-lg font-bold">{title}</AccordionTrigger>
            <AccordionContent>
                <div class="flex flex-col gap-3">
                    {#if typeof description === "string"}
                        <span class="text-sm">{description}</span>
                    {:else}
                        {@render description()}
                    {/if}
                    <Separator />
                </div>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
</div>