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

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />
<div class="flex flex-col min-h-screen">
	<header class="grid grid-cols-3 items-center px-4 md:px-6 gap-2 border-b border-border pb-3 pt-4 bg-card/50">
		<div class="justify-self-start flex">
			<ThemeToggle/>
		</div>

		<div class="justify-self-center"><!-- Put a middle-aligned thing here if want one--></div>

		<div class="justify-self-end gap-2 flex flex-row items-center">

			<!-- Mobile -->
			<Dialog.Root>
				<DialogTrigger>
					<button title="Navigation" class="flex md:hidden cursor-pointer">
						<Menu class="size-8"/>
					</button>
				
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle class="mb-1">Site Navigation</DialogTitle>
					</DialogHeader>

					<div class="flex flex-col gap-3">
						<MobileNavLink href="/" title={pageOptions.home}/>
						<Separator/>
						<MobileNavLink href="/about" title={pageOptions.about}/>
						<Separator/>
						<MobileNavLink href="/projects" title={pageOptions.projects}/>
						<Separator/>
						<MobileNavLink href="/blog" title={pageOptions.blog}/>
					</div>
				</DialogContent>
			</Dialog.Root>
			<HeaderNav navClass="hidden md:flex"/>
		</div>
	</header>

	<main class="flex-1 px-6 md:px-36 mt-10">
		{@render children?.()}
	</main>

	<Footer/>
</div>