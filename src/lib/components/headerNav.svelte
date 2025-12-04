<script lang="ts">
    import { page } from "$app/state";
	import { HOVER_EXPAND_TAILWIND_ANIMATION } from "$lib/consts/style";
	import { pageOptions } from "$lib/types/pageOptions";
	import { cn } from "$lib/utils";
	import {  BookOpen, CodeXml, Laptop } from "lucide-svelte";
	import Coffee from "./icons/Coffee.svelte";

    interface Props {
        navClass?: string;
    }
    let { navClass }:Props = $props();
</script> 

<nav  class={cn("flex flex-row justify-center", navClass)}>
    <ol class="flex flex-row items-center gap-8 transition-all font-[Space_Grotesk] text-xl font-bold">
        <li>
            <a href="/" title="Home" class={cn(
                "transition-all duration-300 ease-out hover:text-primary/80",
                page.url.pathname === "/"
                ? "text-primary"
                : "text-header-foreground"
            )}
            >
                <div class={cn("flex flex-row gap-2 items-center", HOVER_EXPAND_TAILWIND_ANIMATION)}>
                    <Coffee className="h-[24px]  w-auto -translate-y-[1px]"/>
                    <span  class="whitespace-nowrap  relative overflow-hidden"><span>{pageOptions.home} </span><span class="absolute -bottom-[28px] left-0">{pageOptions.home} </span></span>
                </div>
            </a>
        </li>
        
        <li>
            <a href="/about" title="About" class={cn(
                    "transition-all duration-300 ease-out hover:text-primary/80",
                    page.url.pathname.includes("about")
                    ? "text-primary"
                    : "text-header-foreground"
                )}            
            >
                <div class={cn("flex flex-row gap-2 items-center", HOVER_EXPAND_TAILWIND_ANIMATION)}>
                    <BookOpen size={19}/>
                    <span>{pageOptions.about}</span>
                </div>
            </a>
        </li>

        <li>
            <a href="/projects" title="Projects" class={cn(
                "transition-all duration-300 ease-out hover:text-primary/80",
                page.url.pathname.includes("projects")
                ? "text-primary"
                : "text-header-foreground"
            )}            
            >                  
                <div class={cn("flex flex-row gap-2 items-center", HOVER_EXPAND_TAILWIND_ANIMATION)}>
                    <CodeXml size={21}/>
                    <span>{pageOptions.projects}</span>
                </div>
            </a>
        </li>

        <li>
            <a href="/blog" title="Blog" class={cn(
                "transition-all duration-300 ease-out hover:text-primary/80",
                page.url.pathname.includes("blog")
                ? "text-primary"
                : "text-header-foreground"
            )}            
            >                  
                <div class={cn("flex flex-row gap-2 items-center", HOVER_EXPAND_TAILWIND_ANIMATION)}>
                    <Laptop size={21}/>
                    <span>{pageOptions.blog}</span>
                </div>
            </a>
        </li>
    </ol>
</nav>