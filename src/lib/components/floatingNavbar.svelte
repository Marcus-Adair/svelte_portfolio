<script lang="ts">
    import { page } from "$app/state";
	import { HOVER_EXPAND_TAILWIND_ANIMATION } from "$lib/consts/style";
	import { pageOptions } from "$lib/types/pageOptions";
	import { cn } from "$lib/utils";
	import {  BookOpen, CodeXml, House, Newspaper } from "lucide-svelte";
</script> 

<nav  class="flex flex-row justify-center items-center">
    <ol class="flex flex-row items-center gap-12 border rounded-md justify-center  py-3 px-6 transition-all bg-card">
        <li>
            <a href="/" title="Home" class={cn(
                "transition-all duration-300 ease-out hover:text-primary/80",
                page.url.pathname === "/"
                ? "text-primary"
                : "text-muted-foreground"
            )}
            >
                <div class={cn("flex flex-row gap-2 items-center", HOVER_EXPAND_TAILWIND_ANIMATION)}>
                    <House size={18}/>
                    <span>{pageOptions.home}</span>
                </div>
            </a>
        </li>
        
        <li>
            <a href="/about" title="About" class={cn(
                    "transition-all duration-300 ease-out hover:text-primary/80",
                    page.url.pathname.includes("about")
                    ? "text-primary"
                    : "text-muted-foreground"
                )}            
            >
                <div class={cn("flex flex-row gap-2 items-center", HOVER_EXPAND_TAILWIND_ANIMATION)}>
                    <BookOpen size={18}/>
                    <span>{pageOptions.about}</span>
                </div>
            </a>
        </li>

        <li>
            <a href="/projects" title="Projects" class={cn(
                "transition-all duration-300 ease-out hover:text-primary/80",
                page.url.pathname.includes("projects")
                ? "text-primary"
                : "text-muted-foreground"
            )}            
            >                  
                <div class={cn("flex flex-row gap-2 items-center", HOVER_EXPAND_TAILWIND_ANIMATION)}>
                    <CodeXml size={18}/>
                    <span>{pageOptions.projects}</span>
                </div>
            </a>
        </li>

        <li>
            <a href="/blog" title="Blog" class={cn(
                "transition-all duration-300 ease-out hover:text-primary/80",
                page.url.pathname.includes("blog")
                ? "text-primary"
                : "text-muted-foreground"
            )}            
            >                  
                <div class={cn("flex flex-row gap-2 items-center", HOVER_EXPAND_TAILWIND_ANIMATION)}>
                    <Newspaper size={18}/>
                    <span>{pageOptions.blog}</span>
                </div>
            </a>
        </li>
    </ol>
</nav>