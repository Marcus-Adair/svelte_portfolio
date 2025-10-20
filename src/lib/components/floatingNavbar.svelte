<script lang="ts">
    import { page } from "$app/state";
	import { pageOptions } from "$lib/types/pageOptions";
	import { cn } from "$lib/utils";
	import {  Blocks, BookOpen, Code, House } from "lucide-svelte";
</script> 


<nav  class="flex flex-row justify-center items-center">
    <ol class="flex flex-row items-center gap-8 md:gap-12 border rounded-4xl justify-center  py-2 px-4 transition-all bg-card shadow-sm">
        <li>
            <a href="/" class={cn(
                "transition-all duration-300 ease-out hover:text-primary/80 font-light",
                page.url.pathname === "/"
                ? "text-primary font-semibold scale-105"
                : "text-muted-foreground"
            )}
            >
                <div class="flex flex-row gap-2 items-center"><House size={18}/>
                    <span>{pageOptions.home}</span>
                </div>
            </a>
        </li>
        <li>
            <a href="/about" class={cn(
                    "transition-all duration-300 ease-out hover:text-primary/80 font-light",
                    page.url.pathname.includes("about")
                    ? "text-primary font-semibold scale-105"
                    : "text-muted-foreground"
                )}            
            >
                <div class="flex flex-row gap-2 items-center"><BookOpen size={18}/>
                    <span>{pageOptions.about}</span>
                </div>
            </a>
        </li>

        <li>
            <a href="/skills" class={cn(
                "transition-all duration-300 ease-out hover:text-primary/80 font-light",
                page.url.pathname.includes("skills")
                ? "text-primary font-semibold scale-105"
                : "text-muted-foreground"
            )}            
            >               
                <div class="flex flex-row gap-2 items-center"><Code size={18}/>
                    <span>{pageOptions.skills}</span>
                </div>
            </a>
        </li>

        <li>
            <a href="/projects" class={cn(
                "transition-all duration-300 ease-out hover:text-primary/80 font-light",
                page.url.pathname.includes("projects")
                ? "text-primary font-semibold scale-105"
                : "text-muted-foreground"
            )}            
            >                  
                
                <div class="flex flex-row gap-2 items-center"><Blocks size={18}/>
                    <span>{pageOptions.projects}</span>
                </div>
            </a>
        </li>
    </ol>
</nav>