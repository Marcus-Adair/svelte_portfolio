<script lang="ts">
	import { toggleMode } from "mode-watcher";
	import { Moon, Sun } from 'lucide-svelte';
	import Button from "./ui/button.svelte";
	import gsap from "gsap";
	import { mode } from "mode-watcher";
	import { onMount } from "svelte";

	let sunIcon: HTMLElement;
	let moonIcon: HTMLElement;

	const EASE = "power2.out";
	const DURATION = 0.3;
	function switchToDark(noDuration?: boolean) {
		gsap.to(moonIcon, { x: 20, duration: noDuration ? 0 : DURATION, ease: EASE });
		gsap.to(sunIcon, { x: 0, duration: noDuration ? 0 : DURATION, ease: EASE });
	}
	function switchToLight(noDuration?: boolean) {
		gsap.to(moonIcon, { x: 0, duration: noDuration ? 0 : DURATION, ease: EASE });
		gsap.to(sunIcon, { x: -20, duration: noDuration ? 0 : DURATION, ease: EASE });
	}

	onMount(() => {
		if (mode.current === "light") {
			switchToDark(true);
		} else { 
			switchToLight(true);
		}
	})
	function onclick() {
		toggleMode();
		if (mode.current === "light") {
			switchToDark();
		} else { 
			switchToLight();
		}
	}
</script>

<Button
	{onclick}
	variant="outline"
	size="icon"
	title="Toggle theme"
	class="p-4"
>
	<div class="relative w-4.5 h-4.5 overflow-clip">
		<div bind:this={moonIcon}>
			<Moon class="size-4.5" />
		</div>
		<div bind:this={sunIcon} class="absolute top-0 left-0 translate-x-[-20px]">
			<Sun class="size-4.5" />
		</div>
	</div>
</Button>
