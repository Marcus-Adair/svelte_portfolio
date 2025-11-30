<script lang="ts">
	import Card from "$lib/components/ui/card/card.svelte";
	import { onMount, type Snippet } from "svelte";
    import gsap from "gsap";

    interface Props {
        children: Snippet;
    }
    let { children}: Props = $props();

    const maxX = 15;
	const maxY = 10;
    let card: HTMLDivElement;
	onMount(() => {
		if (!card) return;

        function scale(e: MouseEvent) {
			gsap.to(card, {
				scale: 1.025,
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


<div bind:this={card}>
	<Card>
		{@render children()}
	</Card>
</div>
