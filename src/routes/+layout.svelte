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

	let { children } = $props();

	// Curtain reveal
	let curtainVisible = $state(true);
	let curtain: HTMLDivElement;

	onMount(() => {
		// 
		

		gsap.fromTo(curtain,
			{ '--mask-h': '0%', '--mask-w': '80%' },
			{
				'--mask-h': '150%',
				'--mask-w': '400%',
				duration: 0.6,
				delay: 0.35,
				ease: 'power1.out',
				onComplete: () => { curtainVisible = false; markBootComplete(); }
			}
		);
	});

	let headerElt: HTMLElement;
	let homeDiv = $state<HTMLDivElement | undefined>();
	let projectsDiv = $state<HTMLDivElement | undefined>();
	let blogDiv = $state<HTMLDivElement | undefined>();

	let headerTl: gsap.core.Timeline;

	$effect(() => {
		if (homeDiv && projectsDiv && blogDiv) {
			headerTl = gsap.timeline({ paused: true });
			headerTl
				.to(headerElt, { height: 86, duration: 0.1, ease: "power1.out" })
				.from(homeDiv, { opacity: 0, y: 10, duration: 0.095, ease: "power1.inOut" })
				.from(projectsDiv, { opacity: 0, y: 10, duration: 0.095, ease: "power1.inOut" }, "-=0.05")
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

<!-- Curtain reveal -->
{#if curtainVisible}
	<div
		bind:this={curtain}
		class="fixed inset-0 z-[9999] bg-primary"
		style="--mask-w: 80%; --mask-h: 0%; mask-image: radial-gradient(ellipse var(--mask-w) var(--mask-h) at 50% 100%, transparent 99%, black 100%);"
	></div>
{/if}

<div class="flex flex-col min-h-screen">
	<!-- svelte-ignore a11y_role_has_required_aria_props -->
	<header
		bind:this={headerElt}
		class={cn(
			"fixed top-0 z-100 h-[64px] w-screen",
			"bg-header/70 backdrop-blur-xl border-b border-b-border/60"
		)}
		onmouseenter={() => onHeaderEnter()}
		onmouseleave={() => onHeaderLeave()}
		role="heading"
	>
		<div class={cn("grid grid-cols-3 px-4 md:px-6 gap-2 pb-3 pt-4")}>
			<span class="text-sm translate-y-1">MARCUS ADAIR</span>

			<div class="justify-self-center"><!-- Put a middle-aligned thing here if want one--></div>

			<div class="justify-self-end gap-2 flex flex-row items-center">
				<HeaderNav
					bind:homeDiv={homeDiv!}
					bind:projectsDiv={projectsDiv!} bind:blogDiv={blogDiv!}
				/>
			</div>
		</div>
	</header>


		<main class="flex-1 px-6 md:px-36 mt-27">
			{@render children?.()}
		</main>
	<Footer/>
</div>
