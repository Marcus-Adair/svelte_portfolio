<script lang="ts">
	import '../app.css';
    import { ModeWatcher } from "mode-watcher";
	import favicon from '$lib/assets/favicon.ico';
	import FloatingNavbar from '$lib/components/floatingNavbar.svelte';
	import Footer from '$lib/components/footer.svelte';
	import ThemeToggle from '$lib/components/themeToggle.svelte';
	import Button from '$lib/components/ui/button.svelte';
	import { ChevronDown } from 'lucide-svelte';
	import DropdownMenuTrigger from '$lib/components/ui/dropdown-menu/dropdown-menu-trigger.svelte';
	import DropdownMenuContent from '$lib/components/ui/dropdown-menu/dropdown-menu-content.svelte';
	import DropdownMenuGroup from '$lib/components/ui/dropdown-menu/dropdown-menu-group.svelte';
	import DropdownMenuSeparator from '$lib/components/ui/dropdown-menu/dropdown-menu-separator.svelte';
	import DropdownMenuCheckboxItem from '$lib/components/ui/dropdown-menu/dropdown-menu-checkbox-item.svelte';
	import { DropdownMenu } from 'bits-ui';
	import DropdownMenuLabel from '$lib/components/ui/dropdown-menu/dropdown-menu-label.svelte';
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
			<!-- Mobile/small-screen navigation menu -->
			<DropdownMenu.Root>
				<DropdownMenuTrigger>
					<Button variant="outline"  title="Navigation" class="py-5 flex md:hidden">
						Menu
						<ChevronDown/>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent class=" flex md:hidden" align="end">
				  <DropdownMenuGroup class="mt-1">
					<!-- <DropdownMenuLabel class="text-lg">Navigation</DropdownMenuLabel> -->
					<span class="text-lg font-bold ml-4">Navigation</span>
					<DropdownMenuSeparator class="w-58"/>

					<a class="cursor-pointer  flex text-lg rounded-sm py-2 hover:bg-accent hover:text-accent-foreground transition-all" href="/">
						<span class="ml-4">Home</span>
					</a>

					<a class="cursor-pointer  flex text-lg rounded-sm py-2 hover:bg-accent hover:text-accent-foreground transition-all" href="/about">
						<span class="ml-4">Projects</span>
					</a>

					<a class="cursor-pointer  flex text-lg rounded-sm py-2 hover:bg-accent hover:text-accent-foreground transition-all" href="/projects">
						<span class="ml-4">Home</span>
					</a>

					<a class="cursor-pointer  flex text-lg rounded-sm py-2 hover:bg-accent hover:text-accent-foreground transition-all" href="/blog">
						<span class="ml-4">Blog</span>
					</a>


					<!-- <DropdownMenuCheckboxItem class="cursor-pointer flex-1" navMenuItem href="/about">
						About
					</DropdownMenuCheckboxItem>

					<DropdownMenuCheckboxItem class="cursor-pointer flex-1" navMenuItem href="/projects">
						Projects
					</DropdownMenuCheckboxItem>

					<DropdownMenuCheckboxItem class="cursor-pointer flex-1" navMenuItem  href="/blog">
						Blog
					</DropdownMenuCheckboxItem> -->
				  </DropdownMenuGroup>
				</DropdownMenuContent>
			  </DropdownMenu.Root>

			<ThemeToggle/>
		</div>
	</header>

	<main class="flex-1 px-6 md:px-36 mt-10">
		{@render children?.()}
	</main>

	<div class="border-t border-t-muted mt-20 pt-8 pb-4">
		<Footer/>
	</div>
</div>



