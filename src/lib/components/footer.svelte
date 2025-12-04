<script lang="ts">
	import { page } from "$app/state";
	import { pageOptions } from "$lib/types/pageOptions";
	import { cn } from "$lib/utils";
	import Separator from "./ui/separator.svelte";

  const currentYear: number = new Date().getFullYear();
</script>

<footer class="flex flex-col sm:flex-row justify-between items-center px-14 gap-6 border-t border-t-border mt-20 pt-4 pb-4 bg-card/50">
    <ol class="flex flex-row gap-4 justify-start text-sm">
      <li>
        <a href="/" title="Home" class={cn(
          "transition-all duration-300 ease-out hover:text-primary/80 font-light",
          page.url.pathname === "/"
            ? "text-primary font-semibold"
            : "text-muted-foreground"
        )}>
          {pageOptions.home}
        </a>
      </li>
  
      <li>
        <a href="/about" title="About" class={cn(
          "transition-all duration-300 ease-out hover:text-primary/80 font-light",
          page.url.pathname.includes("about")
            ? "text-primary font-semibold"
            : "text-muted-foreground"
        )}>
          {pageOptions.about}
        </a>
      </li>
        
      <li>
        <a href="/projects" title="Projects" class={cn(
          "transition-all duration-300 ease-out hover:text-primary/80 font-light",
          page.url.pathname.includes("projects")
            ? "text-primary font-semibold"
            : "text-muted-foreground"
        )}>
          {pageOptions.projects}
        </a>
      </li>


      <li>
        <a href="/blog" title="Blog" class={cn(
          "transition-all duration-300 ease-out hover:text-primary/80 font-light",
          page.url.pathname.includes("blog")
            ? "text-primary font-semibold"
            : "text-muted-foreground"
        )}>
          {pageOptions.blog}
        </a>
      </li>

    </ol>

    <Separator class="flex sm:hidden w-72! -mt-3"/>

    <span class="text-xs text-muted-foreground">© {currentYear} <a href="/" class="text-primary hover:text-primary/80 underline-offset-2 hover:underline">Marcus Adair.</a> All rights reserved.</span>
  </footer>
  