<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from "mode-watcher";
	import favicon from '$lib/assets/favicon.ico';
	import HeaderNav from '$lib/components/headerNav.svelte';
	import Footer from '$lib/components/footer.svelte';
	import gsap from 'gsap';
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';
	import { markBootComplete } from '$lib/stores/boot.svelte';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	let { children } = $props();

	// Curtain reveal
	let curtain: HTMLDivElement;
	let curtainDone = $state(false);
	onMount(() => {
		// Lift curtain
		gsap.fromTo(curtain,
			{ '--mask-h': '0%', '--mask-w': '80%' },
			{
				'--mask-h': '150%',
				'--mask-w': '400%',
				duration: 0.6,
				delay: 0.35,
				ease: 'power1.out',
				onComplete: () => { markBootComplete(); curtainDone = true; }
			}
		);
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
				.from(blogDiv, { opacity: 0, y: 10, duration: 0.095, ease: "power1.inOut" }, "-=0.05")
				.from(resumeDiv, { opacity: 0, y: 10, duration: 0.095, ease: "power1.inOut" }, "-=0.05");
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
	class="fixed inset-0 z-[9999] bg-primary pointer-events-none"
	class:hidden={curtainDone}
	style="--mask-w: 80%; --mask-h: 0%; mask-image: radial-gradient(ellipse var(--mask-w) var(--mask-h) at 50% 100%, transparent 100%, black 100%);"
></div>

<div class="flex flex-col min-h-screen">
	<header
		bind:this={headerElt}
		class={cn(
			"fixed top-0 z-100 h-[64px] w-screen",
			"bg-header/70 backdrop-blur-xl border-b border-b-border/60"
		)}
		onmouseenter={() => onHeaderEnter()}
		onmouseleave={() => onHeaderLeave()}
		role="heading"
		aria-level={1}
	>
		<div class={cn("grid grid-cols-3 ml-7.5 mr-2 gap-2 mb-3 mt-4")}>
			<div class="justify-self-start">
				<a href={resolve("/")} class="hidden sm:flex text-sm tracking-wider font-bold text-muted-foreground translate-y-1 hover:text-primary active:text-primary/80 w-fit h-fit">
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

	<main class={cn("flex-1 flex flex-col px-6 md:px-36", page.url.pathname !== "/" && "mt-27")}>
		{@render children?.()}
	</main>

	<Footer/>
</div>
