<script lang="ts">
	import '../app.css';
    import { ModeWatcher } from "mode-watcher";
	import favicon from '$lib/assets/favicon.ico';
	import HeaderNav from '$lib/components/headerNav.svelte';
	import Footer from '$lib/components/footer.svelte';
	import ThemeToggle from '$lib/components/themeToggle.svelte';
	import { Dialog } from 'bits-ui';
	import DialogTrigger from '$lib/components/ui/dialog/dialog-trigger.svelte';
	import DialogContent from '$lib/components/ui/dialog/dialog-content.svelte';
	import DialogHeader from '$lib/components/ui/dialog/dialog-header.svelte';
	import DialogTitle from '$lib/components/ui/dialog/dialog-title.svelte';
	import Separator from '$lib/components/ui/separator.svelte';
	import MobileNavLink from '$lib/components/mobileNavLink.svelte';
	import { pageOptions } from '$lib/types/pageOptions';
	import { Menu } from 'lucide-svelte';
	import gsap from 'gsap';
	import { onMount } from 'svelte';
	import { cn } from '$lib/utils';

	let { children } = $props();



	let headerDiv: HTMLElement;
	let homeSpan = $state<HTMLSpanElement | undefined>();
	let aboutSpan = $state<HTMLSpanElement | undefined>();
	let projectsSpan = $state<HTMLSpanElement | undefined>();
	let blogSpan = $state<HTMLSpanElement | undefined>();
	let showNavLabels = $state(false);

	let headerTl: gsap.core.Timeline;

	onMount(() => {
		gsap.from(".anim-theme-toggle", {opacity: 0, scale: 0, duration: 0.3})

		const LABEL_ANIM = { opacity: 0, y: 10, duration: 0.1, ease: "power1.inOut" };
		const OVERLAP = "-=0.05";
		headerTl = gsap.timeline({ paused: true });
		headerTl
			.to(headerDiv, { height: 88, duration: 0.1, ease: "power1.out" }) // toggle open/close full header
			.from(homeSpan!, LABEL_ANIM)
			.from(aboutSpan!, LABEL_ANIM, OVERLAP)
			.from(projectsSpan!, LABEL_ANIM, OVERLAP)
			.from(blogSpan!, LABEL_ANIM, OVERLAP);
	});

	function onHeaderEnter() {
		showNavLabels = true;
		headerTl.play();
	}
	function onHeaderLeave() {
		headerTl.reverse();
		showNavLabels = false;
	}

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />
<div class="flex flex-col min-h-screen">
	<!-- TODO: -->
	<!-- svelte-ignore a11y_role_has_required_aria_props -->
	<header
		bind:this={headerDiv}
		class={cn(
			"fixed top-0 z-100 h-[68px] w-screen",
			"bg-card/70 backdrop-blur-xl"
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
					{showNavLabels}
					bind:homeSpan={homeSpan!} bind:aboutSpan={aboutSpan!}
					bind:projectsSpan={projectsSpan!} bind:blogSpan={blogSpan!}
				/>
			</div>
		</div>
	</header>

	<main class="flex-1 px-6 md:px-36 mt-32">
		{@render children?.()}
	</main>

	<Footer/>
</div>