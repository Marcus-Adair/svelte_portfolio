<script lang="ts">
	import '../app.css';
    import { ModeWatcher } from "mode-watcher";
	import favicon from '$lib/assets/favicon.ico';
	import HeaderNav from '$lib/components/headerNav.svelte';
	import Footer from '$lib/components/footer.svelte';
	import ThemeToggle from '$lib/components/themeToggle.svelte';
	import gsap from 'gsap';
	import { SplitText } from 'gsap/SplitText';
	import { onMount } from 'svelte';
	import { cn } from '$lib/utils';
	import coffee_gif from '$lib/assets/hot-coffee.gif';
	import { showingBootAnimation, endBootAnimation } from '$lib/stores/boot.svelte';

	let { children } = $props();

	// svelte-ignore non_reactive_update
	let bootOverlay: HTMLDivElement;
	let bootText1: HTMLHeadingElement;
	let textHeight = $state(0);

	let headerElt: HTMLElement;
	let homeDiv = $state<HTMLDivElement | undefined>();
	let aboutDiv = $state<HTMLDivElement | undefined>();
	let projectsDiv = $state<HTMLDivElement | undefined>();
	let blogDiv = $state<HTMLDivElement | undefined>();

	let headerTl: gsap.core.Timeline;

	// === BOOT ANIMATION CONFIG ===  //
	const BOOT = {
		enter: {
			y: 600, // starts this far down
			duration: 0.2,
			ease: "power2.out"
		},
		holdBeforeRoll: 0.35,
		roll: {
			// y is set dynamically from measured text height
			duration: 0.1,
			stagger: 0.065,
		},
		holdAfterRoll: 0.15,
		exit: {
			opacity: 0,
			y: -800,
			duration: 0.25,
			ease: "power2.in"
		}
	};
	onMount(() => {
		gsap.registerPlugin(SplitText);

		const textContainer = ".main-boot-text-div";
		const b1 = ".boot-text-1";
		const b2 = ".boot-text-2";

		// Create SplitText for roll animation
		const split1 = SplitText.create(b1, { type: "chars" });
		const split2 = SplitText.create(b2, { type: "chars" });
		const chars1 = split1.chars as HTMLElement[];
		const chars2 = split2.chars as HTMLElement[];

		// Measure text height for dynamic roll offset
		textHeight = bootText1?.offsetHeight ?? 120;

		// Initial state: visible but positioned down
		gsap.set(textContainer, { opacity: 1, y: BOOT.enter.y });

		const bootTl = gsap.timeline({
			onComplete: () => { endBootAnimation(); }
		});

		// Slide up
		bootTl.to(textContainer, {
			y: 0,
			duration: BOOT.enter.duration,
			ease: BOOT.enter.ease
		});

		// Hold before roll
		bootTl.to({}, { duration: BOOT.holdBeforeRoll });

		// Roll animation
		const rollAnim = { y: -textHeight, ...BOOT.roll };
		bootTl.to(chars1, rollAnim);
		bootTl.to(chars2, rollAnim, "<");

		// Hold after roll
		bootTl.to({}, { duration: BOOT.holdAfterRoll });

		// Exit
		bootTl.to(bootOverlay, { ...BOOT.exit });

	});

	// Set up header animation AFTER boot completes (when nav divs exist)
	$effect(() => {
		if (!showingBootAnimation() && homeDiv && aboutDiv && projectsDiv && blogDiv) {
			const LABEL_ANIM = { opacity: 0, y: 10, duration: 0.095, ease: "power1.inOut" };
			const OVERLAP = "-=0.05";

			gsap.from(".anim-theme-toggle", { opacity: 0, scale: 0, duration: 0.3 });
			headerTl = gsap.timeline({ paused: true });
			headerTl
				.to(headerElt, { height: 88, duration: 0.1, ease: "power1.out" })
				.from(homeDiv, LABEL_ANIM)
				.from(aboutDiv, LABEL_ANIM, OVERLAP)
				.from(projectsDiv, LABEL_ANIM, OVERLAP)
				.from(blogDiv, LABEL_ANIM, OVERLAP);
		}
	});

	function onHeaderEnter() {
 		headerTl.play();
	}
	function onHeaderLeave() {
		headerTl.reverse();
	}

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<ModeWatcher />

{#if showingBootAnimation()}
  <div bind:this={bootOverlay} class="fixed inset-0 z-9999 bg-primary text-primary-foreground flex flex-col justify-center items-center gap-1">
	<div class="main-boot-text-div flex gap-2 md:gap-4 items-center opacity-0">
		<div class="relative text-5xl md:text-7xl lg:text-9xl font-bold overflow-clip">
			<h1 bind:this={bootText1} class="boot-text-1">Marcus Adair</h1>
			<h1
				class="boot-text-2 absolute inset-0"
				style="transform: translateY({textHeight}px)"
			>
				Marcus Adair
			</h1>
		</div>
		<img src={coffee_gif} alt="coffee_image" class="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" />
	</div>
  </div>
{/if}

<div class="flex flex-col min-h-screen">
	<!-- TODO: -->
	<!-- svelte-ignore a11y_role_has_required_aria_props -->
	<header
		bind:this={headerElt}
		class={cn(
			"fixed top-0 z-100 h-[68px] w-screen",
			"bg-header/70 backdrop-blur-xl"
		)}
		onmouseenter={() => onHeaderEnter()}
		onmouseleave={() => onHeaderLeave()}
		role="heading"
	>
		<div class={cn("grid grid-cols-3 px-4 md:px-6 gap-2 pb-3 pt-4")}>
			<div class="justify-self-start flex anim-theme-toggle">
				<ThemeToggle/>
			</div>

			<div class="justify-self-center"><!-- Put a middle-aligned thing here if want one--></div>

			<div class="justify-self-end gap-2 flex flex-row items-center">
				<!-- Desktop -->
				<HeaderNav
					bind:homeDiv={homeDiv!} bind:aboutDiv={aboutDiv!}
					bind:projectsDiv={projectsDiv!} bind:blogDiv={blogDiv!}
				/>
			</div>
		</div>
	</header>

	<main class="flex-1 px-6 md:px-36 mt-32">
		{@render children?.()}
	</main>

	<Footer/>
</div>