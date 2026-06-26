<script lang="ts">
	import { resolve } from "$app/paths";
	import { page } from "$app/state";
	import { pageOptions } from "$lib/types/pageOptions";
	import { cn } from "$lib/utils";
	import Separator from "./ui/separator.svelte";
	import { toggleMode, mode } from "mode-watcher";
	import resume from "$lib/assets/MarcusAdair_General_Resume.pdf";
	import { getPendingPath } from "$lib/stores/navigation.svelte";

	const currentYear: number = new Date().getFullYear();
	let currentPath = $derived(getPendingPath() ?? page.url.pathname);
</script>

<footer class={cn(
  "flex flex-col sm:flex-row justify-between items-center px-16 sm:px-8 gap-2.5 sm:gap-1 pt-2 pb-3 sm:pt-4 sm:pb-8 bg-header-bg",
  currentPath !== "/" && "mt-20"
)}>
  <ol class="flex flex-row gap-4 justify-start text-xs">
    <li>
      <a href={resolve("/")} title={pageOptions.home.toUpperCase()} class={cn(
        "transition-all duration-300 ease-out hover:text-primary active:text-primary-active font-light hover:underline underline-offset-2",
        currentPath === "/"
          ? "text-primary font-semibold"
          : "text-muted-foreground"
      )}>
        {pageOptions.home.toUpperCase()}
      </a>
    </li>

    <li>
      <a href={resolve("/projects")} title={pageOptions.projects.toUpperCase()} class={cn(
        "transition-all duration-300 ease-out hover:text-primary active:text-primary-active font-light hover:underline underline-offset-2",
        currentPath.includes("projects")
          ? "text-primary font-semibold"
          : "text-muted-foreground"
      )}>
        {pageOptions.projects.toUpperCase()}
      </a>
    </li>


    <li>
      <a 
        href={resume}
        rel="external"
        target="_blank"
        title={pageOptions.resume.toUpperCase()} class={cn(
        "transition-all duration-300 ease-out hover:text-primary active:text-primary-active font-light hover:underline underline-offset-2",
        "text-muted-foreground"
      )}>
        {pageOptions.resume.toUpperCase()}
      </a>
    </li>



    <li>
      <a href={resolve("/blog")} title="BLOG" class={cn(
        "transition-all duration-300 ease-out hover:text-primary active:text-primary-active font-light hover:underline underline-offset-2",
        currentPath.includes("blog")
          ? "text-primary font-semibold"
          : "text-muted-foreground"
      )}>
        BLOG
      </a>
    </li>

    <li>
      <button
        onclick={toggleMode}
        title={mode.current === "light" ? "GO DARK MODE" : "GO LIGHT MODE"}
        class="transition-all duration-300 ease-out hover:text-primary active:text-primary-active font-light hover:underline underline-offset-2 text-muted-foreground cursor-pointer"
      >
        {mode.current === "light" ? "DARK" : "LIGHT"}
      </button>
    </li>

  </ol>

  <Separator class="flex sm:hidden w-72"/>
  
  <span class="text-xs text-muted-foreground flex flex-col sm:flex-row gap-0.5 sm:gap-1 text-center sm:text-right">
    <span>© {currentYear} <a href={resolve("/")} class="text-primary hover:text-primary active:text-primary-active underline-offset-2 hover:underline">Marcus Adair Digital</a>.</span>
    <span>All rights reserved <span class="text-[9px]">✧✧✧</span></span>
  </span>
</footer>
  