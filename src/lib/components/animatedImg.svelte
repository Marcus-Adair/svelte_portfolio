
<script lang="ts">
	import { cn } from "$lib/utils";
	import { onMount } from "svelte";
	import type { HTMLImgAttributes } from "svelte/elements";
    import gsap from "gsap";
	import { ScrollTrigger } from "gsap/ScrollTrigger";

	type Props = {
		src: string,
	} & HTMLImgAttributes;
    let { src, ...props }: Props = $props();

	const maxX = 35;
	const maxY = 20;
    let image = $state<HTMLImageElement | undefined>();
	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		if (!image) return;

		gsap.from(image, 
			{
				scale: 0,
				opacity: 0,
				duration: 0.4,
				ease: "power2.out",
				scrollTrigger: image
			}
		);

        function scale(e: MouseEvent) {
			gsap.to(image!, {
				scale: 1.02,
				duration: 0.5,
				ease: "power2.out"
			});
        }
		function handleMove(e: MouseEvent) {
			const rect = image!.getBoundingClientRect();
			const relX = e.clientX - rect.left;
			const relY = e.clientY - rect.top;

			// Normalize position
			const normX = (relX / rect.width) * 2 - 1;
			const normY = (relY / rect.height) * 2 - 1;

			gsap.to(image!, {
				x: normX * maxX,
				y: normY * maxY,
				duration: 2,
				ease: "power2.out"
			});
		}

		function reset() {
            gsap.killTweensOf(image!);
			gsap.to(image!, { x: 0, y: 0, duration: 1.5, ease: "power3.out" });
			gsap.to(image!, {
				scale: 1,
				duration: 0.5,
				ease: "power2.out"
			});
		}

        image.addEventListener("mouseenter", scale);
		image.addEventListener("mousemove", handleMove);
		image.addEventListener("mouseleave", reset);

		return () => {
			image?.removeEventListener("mousemove", handleMove);
			image?.removeEventListener("mouseleave", reset);
			image?.removeEventListener("mouseenter", scale);
		};
	});

</script>

<enhanced:img bind:this={image} src={src} alt={props.alt} class={cn("rounded-md", props.class)} />
