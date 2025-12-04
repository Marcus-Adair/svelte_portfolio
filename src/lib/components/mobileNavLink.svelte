<script lang="ts">
	import ChevronRight from "@lucide/svelte/icons/chevron-right";
	import DialogClose from "./ui/dialog/dialog-close.svelte";
    import { page } from '$app/state';
	import { cn } from "$lib/utils";
	import Coffee from "./icons/Coffee.svelte";
	import { BookOpen, CodeXml, Laptop } from "lucide-svelte";

    interface Props {
        title: String;
        href: string;
    }
    let { title, href } : Props = $props();

    const url = String(page.url)
    const onPage = url.includes(title.toLowerCase()) || (url.endsWith("/") && title === "Home")
</script>



<DialogClose>
    <a 
        {href}
        class={cn(
            "cursor-pointer flex flex-row justify-between items-center text-xl rounded-sm py-3",
            "hover:bg-accent hover:text-accent-foreground transition-all",
            onPage && "bg-primary text-primary-foreground hover:text-accent-foreground"
        )}
    >
        <div class="flex gap-4 items-center">
            {#if title === "Home"}
                <Coffee className="h-[24px]  w-auto -translate-y-[1px] ml-4"/>
            {:else if title === "About"}
                <BookOpen size={19} class="ml-4"/>
            {:else if title === "Projects"}
                <CodeXml size={21} class="ml-4"/>
            {:else if title === "Blog"}
                <Laptop size={21} class="ml-4"/>
            {/if}
        <span>{title}</span>
        </div>
        <span class="mr-4"><ChevronRight/></span>
    </a>
</DialogClose>