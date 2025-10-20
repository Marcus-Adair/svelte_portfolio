<script lang="ts">
	import { page } from "$app/state";
	import { pageOptions } from "$lib/types/pageOptions";
	import { cn } from "$lib/utils";

    const currentYear: number = new Date().getFullYear();

</script>

<footer class="flex flex-row justify-between items-center px-6">
    <ol class="flex flex-row gap-4 justify-start text-sm">
      <li>
        <a href="/" class={cn(
          "transition-all duration-300 ease-out hover:text-primary/80 font-light",
          page.url.pathname === "/"
            ? "text-primary font-semibold"
            : "text-muted-foreground"
        )}>
          {pageOptions.home}
        </a>
      </li>
  
      <li>
        <a href="/about" class={cn(
          "transition-all duration-300 ease-out hover:text-primary/80 font-light",
          page.url.pathname.includes("about")
            ? "text-primary font-semibold"
            : "text-muted-foreground"
        )}>
          {pageOptions.about}
        </a>
      </li>
  
      <li>
        <a href="/skills" class={cn(
          "transition-all duration-300 ease-out hover:text-primary/80 font-light",
          page.url.pathname.includes("skills")
            ? "text-primary font-semibold"
            : "text-muted-foreground"
        )}>
          {pageOptions.skills}
        </a>
      </li>
  
      <li>
        <a href="/projects" class={cn(
          "transition-all duration-300 ease-out hover:text-primary/80 font-light",
          page.url.pathname.includes("projects")
            ? "text-primary font-semibold"
            : "text-muted-foreground"
        )}>
          {pageOptions.projects}
        </a>
      </li>
    </ol>

    <span class="text-xs text-muted-foreground">© {currentYear} Marcus Adair. All rights reserved.</span>
  </footer>
  