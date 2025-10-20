<script lang="ts">
	import '../app.css';
    import { ModeWatcher, toggleMode } from "mode-watcher";
	import favicon from '$lib/assets/favicon.svg';
	import FloatingNavbar from '$lib/components/floatingNavbar.svelte';
	import Switch from '$lib/components/ui/switch.svelte';
	import { Moon, Sun } from 'lucide-svelte';
	import Footer from '$lib/components/footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>




<ModeWatcher />
<div class="flex flex-col min-h-screen py-4">
	<header class="grid grid-cols-3 items-center mb-8 px-10">
		<div class="justify-self-start">
			<!-- TODO put something here -->
		</div>

		<div class="justify-self-center sticky top-0 z-50">
			<FloatingNavbar />
		</div>

		<div class="hidden md:flex flex-row items-center justify-self-end gap-2">
			<Moon size={20} />
			<Switch onclick={() => toggleMode()} />
			<Sun size={20} />
		</div>
	</header>

	<main class="flex-1 px-8">
		{@render children?.()}
	</main>


	<div class="border-t border-t-muted mt-8 pt-8 pb-4">
		<Footer/>
	</div>
	
</div>