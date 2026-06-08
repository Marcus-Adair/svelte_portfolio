<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from "mode-watcher";
	import favicon from '$lib/assets/favicon.ico';
	import HeaderNav from '$lib/components/headerNav.svelte';
	import Footer from '$lib/components/footer.svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { ScrollSmoother } from 'gsap/ScrollSmoother';
	import { cn } from '$lib/utils';
	import { onMount, tick } from 'svelte';
	import { afterNavigate, beforeNavigate, goto } from '$app/navigation';

	import { isBootComplete, markBootComplete } from '$lib/stores/boot.svelte';
	import { setPendingPath } from '$lib/stores/navigation.svelte';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	let { children } = $props();

	let smoother: ScrollSmoother;

	// Curtain reveal
	let curtain: HTMLDivElement;
	let curtainDone = $state(false);
	let isTransitioning = $state(false);

	function setMask(w: string, h: string) {
		const mask = `radial-gradient(ellipse ${w} ${h} at 50% 100%, transparent 100%, black 100%)`;
		curtain.style.maskImage = mask;
		curtain.style.webkitMaskImage = mask;
	}

	function liftCurtain(delay = 0): Promise<void> {
		return new Promise((resolve) => {
			curtainDone = false;
			setMask('80%', '0%');
			const obj = { w: 80, h: 0 };
			gsap.to(obj, {
				w: 400,
				h: 150,
				duration: 0.6,
				delay,
				ease: 'power1.out',
				onUpdate: () => setMask(`${obj.w}%`, `${obj.h}%`),
				onComplete: () => {
					curtainDone = true;
					resolve();
				}
			});
		});
	}

	async function dropCurtain(): Promise<void> {
		curtainDone = false;
		await tick(); // Wait for DOM to update (remove hidden class)
		setMask('400%', '150%');
		return new Promise((resolve) => {
			const obj = { w: 400, h: 150 };
			gsap.to(obj, {
				w: 80,
				h: 0,
				duration: 0.4,
				ease: 'power1.in',
				onUpdate: () => setMask(`${obj.w}%`, `${obj.h}%`),
				onComplete: resolve
			});
		});
	}

	// Intercept navigation for page transitions
	beforeNavigate(async ({ to, from, cancel }) => {
		// Skip if already transitioning (we triggered this via goto)
		if (isTransitioning) return;

		// Skip if no destination
		if (!to?.url) return;

		// Skip hash-only navigations (same pathname)
		if (to.url.pathname === from?.url.pathname) return;

		// Cancel navigation, animate curtain down, then navigate
		cancel();
		isTransitioning = true;
		setPendingPath(to.url.pathname); // Instantly update nav styling
		await dropCurtain();
		// eslint-disable-next-line svelte/no-navigation-without-resolve
		goto(to.url.pathname + to.url.search + to.url.hash);
	});

	// After navigation completes
	afterNavigate(() => {
		if (smoother) {
			smoother.scrollTo(0, false);
		}

		if (isTransitioning) {
			liftCurtain(0.4);
			isTransitioning = false;
			setPendingPath(null); // Clear pending path
		}
	});

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
		smoother = ScrollSmoother.create({
			wrapper: '#smooth-wrapper',
			content: '#smooth-content',
			smooth: 1.1,
			effects: false
		});

		// Initial boot animation - lift curtain
		liftCurtain(0.35).then(() => markBootComplete());
	});

	let headerElt: HTMLElement;
	let homeDiv = $state<HTMLDivElement | undefined>();
	let projectsDiv = $state<HTMLDivElement | undefined>();
	let blogDiv = $state<HTMLDivElement | undefined>();
	let resumeDiv = $state<HTMLDivElement | undefined>();

	let headerTl: gsap.core.Timeline;

	// Header animation ------------------ //
	$effect(() => {
		if (homeDiv && projectsDiv && blogDiv && resumeDiv) {
			headerTl = gsap.timeline({ paused: true });
			headerTl
				.to(headerElt, { height: 77, duration: 0.1, ease: "power1.out" })
				.from(homeDiv, { opacity: 0, y: 10, duration: 0.095, ease: "power1.inOut" })
				.from(projectsDiv, { opacity: 0, y: 10, duration: 0.095, ease: "power1.inOut" }, "-=0.05")
				.from(resumeDiv, { opacity: 0, y: 10, duration: 0.095, ease: "power1.inOut" }, "-=0.05")
				.from(blogDiv, { opacity: 0, y: 10, duration: 0.095, ease: "power1.inOut" }, "-=0.05");
		}
	});
	function onHeaderEnter() {
		headerTl?.play();
	}
	function onHeaderLeave() {
		headerTl?.reverse();
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<ModeWatcher />

<div
	bind:this={curtain}
	class={cn(
		"fixed inset-0 bg-primary pointer-events-none",
		isBootComplete() ? "z-50" : "z-[9999]"
	)}
	class:hidden={curtainDone}
></div>

<header
	bind:this={headerElt}
	class={cn(
		"fixed top-0 z-100 h-[64px] w-screen",
		"bg-header-bg backdrop-blur-xl border-b border-b-border"
	)}
	onmouseenter={() => onHeaderEnter()}
	onmouseleave={() => onHeaderLeave()}
	role="heading"
	aria-level={1}
>
	<div class={cn("grid grid-cols-3 ml-7.5 mr-2 gap-2 mb-3 mt-4 px-1 sm:px-3.5")}>
		<div class="justify-self-start">
			<a href={resolve("/")} class="hidden sm:flex text-sm tracking-wider font-bold text-muted-foreground translate-y-1 hover:text-primary active:text-primary-active hover:underline underline-offset-4 w-fit h-fit">
				MARCUS ADAIR
			</a>
		</div>

		<div class="justify-self-center"><!-- Put a middle-aligned thing here if want one--></div>

		<div class="justify-self-end gap-2 flex flex-row items-center">
			<HeaderNav
				bind:homeDiv={homeDiv!}
				bind:projectsDiv={projectsDiv!}
				bind:blogDiv={blogDiv!}
				bind:resumeDiv={resumeDiv!}
			/>
		</div>
	</div>
</header>

<div id="smooth-wrapper">
	<div id="smooth-content" class="flex flex-col min-h-screen">
		<main class={cn("flex-1 flex flex-col px-6 md:px-36", page.url.pathname !== "/" && "mt-27")}>
			{@render children?.()}
		</main>

		<Footer/>
	</div>
</div>
