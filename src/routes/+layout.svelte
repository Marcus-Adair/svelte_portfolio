<script lang="ts">
	import '../app.css';
    import { ModeWatcher } from "mode-watcher";
	import favicon from '$lib/assets/favicon.ico';
	import FloatingNavbar from '$lib/components/floatingNavbar.svelte';
	import Footer from '$lib/components/footer.svelte';
	import ThemeToggle from '$lib/components/themeToggle.svelte';
	import { Dialog } from 'bits-ui';
	import DialogTrigger from '$lib/components/ui/dialog/dialog-trigger.svelte';
	import DialogContent from '$lib/components/ui/dialog/dialog-content.svelte';
	import DialogHeader from '$lib/components/ui/dialog/dialog-header.svelte';
	import DialogTitle from '$lib/components/ui/dialog/dialog-title.svelte';
	import Separator from '$lib/components/ui/separator.svelte';
	import NavLink from '$lib/components/navLink.svelte';
	import { pageOptions } from '$lib/types/pageOptions';
	import Button from '$lib/components/ui/button.svelte';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


<ModeWatcher />
<div class="flex flex-col min-h-screen py-4">
	<header class="grid grid-cols-3 items-center mt-2 px-10 gap-2">
		<div class="justify-self-start">
			<!-- Put a left-aligned thing here if want one-->
		</div>

		<div class="hidden md:flex justify-self-center">
			<FloatingNavbar />
		</div>

		<!-- Helps with grid-3 formatting on different sized screens -->
		<div class="flex md:hidden justify-self-center"></div>

		<div class="justify-self-end gap-2 flex flex-row items-center">
			<Dialog.Root>
				<DialogTrigger>
					
					<Button variant="outline"  title="Navigation" class="py-5 flex md:hidden">
						Nav
						<ChevronDown />
					</Button>
				
				
				
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle class="mb-1">Site Navigation</DialogTitle>
					</DialogHeader>

					<div class="flex flex-col gap-3">
						<NavLink href="/" title={pageOptions.home}/>

						<Separator/>

						<NavLink href="/about" title={pageOptions.about}/>

						<Separator/>

						<NavLink href="/projects" title={pageOptions.projects}/>

						<Separator/>

						<NavLink href="/blog" title={pageOptions.blog}/>
					</div>
				</DialogContent>
			</Dialog.Root>

			<ThemeToggle/>
		</div>
	</header>

	<main class="flex-1 px-6 md:px-36 mt-10">
		{@render children?.()}
	</main>

	<Footer/>
</div>