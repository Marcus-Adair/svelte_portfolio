<script lang="ts">
	import '../app.css';
    import { ModeWatcher } from "mode-watcher";
	import favicon from '$lib/assets/favicon.ico';
	import FloatingNavbar from '$lib/components/floatingNavbar.svelte';
	import Footer from '$lib/components/footer.svelte';
	import ThemeToggle from '$lib/components/themeToggle.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


<ModeWatcher />
<div class="flex flex-col min-h-screen py-4">
	<header class="grid grid-cols-3 items-center mb-8 px-10">
		<div class="justify-self-start">
			<!-- Put a left-aligned thing here -->
		</div>

		<div class="justify-self-center">
			<FloatingNavbar />
		</div>

		<div class="hidden md:flex justify-self-end">
			<ThemeToggle/>
		</div>
		
	</header>

	<main class="flex-1  mt-4 px-6 sm:px-28">
		{@render children?.()}
	</main>


	<div class="border-t border-t-muted mt-20 pt-8 pb-4">
		<Footer/>
	</div>
</div>