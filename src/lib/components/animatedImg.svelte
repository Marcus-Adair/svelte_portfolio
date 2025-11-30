
<script lang="ts">
	import { cn } from "$lib/utils";
	import { onMount } from "svelte";
	import type { HTMLImgAttributes } from "svelte/elements";
    import gsap from "gsap";

    let { ...props }: HTMLImgAttributes = $props();

	const maxX = 35;
	const maxY = 20;
    let image: HTMLImageElement;
	onMount(() => {
		if (!image) return;

        function scale(e: MouseEvent) {
			gsap.to(image, {
				scale: 1.02,
				duration: 0.5,
				ease: "power2.out"
			});
        }
		function handleMove(e: MouseEvent) {

			const rect = image.getBoundingClientRect();
			const relX = e.clientX - rect.left;
			const relY = e.clientY - rect.top;

			// Normalize position
			const normX = (relX / rect.width) * 2 - 1;
			const normY = (relY / rect.height) * 2 - 1;

			gsap.to(image, {
				x: normX * maxX,
				y: normY * maxY,
				duration: 2,
				ease: "power2.out"
			});
		}

		function reset() {
            gsap.killTweensOf(image);
			gsap.to(image, { x: 0, y: 0, duration: 1.5, ease: "power3.out" });
			gsap.to(image, {
				scale: 1,
				duration: 0.5,
				ease: "power2.out"
			});
		}

        image.addEventListener("mouseenter", scale);
		image.addEventListener("mousemove", handleMove);
		image.addEventListener("mouseleave", reset);

		return () => {
			image.removeEventListener("mousemove", handleMove);
			image.removeEventListener("mouseleave", reset);
			image.removeEventListener("mouseenter", scale);
		};
	});

</script>

<img bind:this={image} src={props.src} alt={props.alt} class={cn("rounded-md", props.class)} >
