<script lang="ts">
	import { cn } from "$lib/utils";
	import { formatDate } from "$lib/utils/dates";
	import { ChevronRight } from "lucide-svelte";
	import type { HTMLAnchorAttributes } from "svelte/elements";
    import gsap from "gsap";
	import { onMount } from "svelte";

    type Props = {
        id: string;
        title: string;
        date: Date;
        about: string;
        href: string;
        imgSrc: any;
    } & HTMLAnchorAttributes;
    let { id, title, date, about, href, imgSrc, ...props }: Props = $props();

	const maxX = 35;
	const maxY = 20;
    let card: HTMLAnchorElement;
	onMount(() => {
		if (!card) return;

        function scale(e: MouseEvent) {
			gsap.to(card, {
				scale: 1.02,
				duration: 0.5,
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

<a bind:this={card} {id} {href} class={cn("flex flex-row gap-4 cursor-pointer p-2 rounded-md hover:bg-accent/30 transition-colors", props.class)} title="See post" {...props}>
    <img
        src={imgSrc}
        alt={title}
        class="w-36 sm:w-72 lg:w-96 h-auto rounded-md"
    />

    <div class="flex-1 flex flex-col gap-1 mt-4 ml-2">
        <span class="text-xl font-[Space_Grotesk]">{title}</span>
        <span class="font-light text-sm mt-4">{about}</span>
        <span class="text-xs text-muted-foreground">{formatDate(date)}</span>
    </div>

    <div class="flex items-center justify-center">
        <ChevronRight  />
    </div>
</a>
