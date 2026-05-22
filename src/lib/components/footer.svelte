<script lang="ts">
	import { resolve } from "$app/paths";
	import { page } from "$app/state";
	import { pageOptions } from "$lib/types/pageOptions";
	import { cn } from "$lib/utils";
	import Separator from "./ui/separator.svelte";
	import { toggleMode, mode } from "mode-watcher";
  import resume from "$lib/assets/Marcus_Adair_Portfolio_Resume.pdf";

  const currentYear: number = new Date().getFullYear();
</script>

<footer class={cn(
  "flex flex-col sm:flex-row justify-between items-center px-14 gap-2.5 sm:gap-6 border-t border-t-border/60 pt-2 pb-3 sm:pt-4 sm:pb-8 bg-header/70",
  page.url.pathname === "/" ? "mt-8" : "mt-20"
)}>
    <ol class="flex flex-row gap-4 justify-start text-xs">
      <li>
        <a href={resolve("/")} title={pageOptions.home.toUpperCase()} class={cn(
          "transition-all duration-300 ease-out hover:text-primary active:text-primary/80 font-light hover:underline underline-offset-2",
          page.url.pathname === "/"
            ? "text-primary font-semibold"
            : "text-muted-foreground"
        )}>
          {pageOptions.home.toUpperCase()}
        </a>
      </li>
  
      <li>
        <a href={resolve("/projects")} title={pageOptions.projects.toUpperCase()} class={cn(
          "transition-all duration-300 ease-out hover:text-primary active:text-primary/80 font-light hover:underline underline-offset-2",
          page.url.pathname.includes("projects")
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
          "transition-all duration-300 ease-out hover:text-primary active:text-primary/80 font-light hover:underline underline-offset-2",
          "text-muted-foreground"
        )}>
          {pageOptions.resume.toUpperCase()}
        </a>
      </li>



      <li>
        <a href={resolve("/blog")} title="BLOG" class={cn(
          "transition-all duration-300 ease-out hover:text-primary active:text-primary/80 font-light hover:underline underline-offset-2",
          page.url.pathname.includes("blog")
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
          class="transition-all duration-300 ease-out hover:text-primary active:text-primary/80 font-light hover:underline underline-offset-2 text-muted-foreground cursor-pointer"
        >
          {mode.current === "light" ? "DARK" : "LIGHT"}
        </button>
      </li>

    </ol>

    <Separator class="flex sm:hidden w-72"/>

    <span class="text-xs text-muted-foreground">© {currentYear} <a href={resolve("/")} class="text-primary hover:text-primary active:text-primary/80 underline-offset-2 hover:underline">Marcus Adair.</a> All rights reserved.</span>
  </footer>
  