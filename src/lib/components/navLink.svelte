<script lang="ts">
	import ChevronRight from "@lucide/svelte/icons/chevron-right";
	import DialogClose from "./ui/dialog/dialog-close.svelte";
    import { page } from '$app/state';
	import { cn } from "$lib/utils";

    interface Props {
        title: String;
        href: string;
    }
    let { title, href } : Props = $props();

    const url = String(page.url)

    console.log("url:", url)
    const onPage = url.includes(title.toLowerCase()) || (url.endsWith("/") && title == "Home")
</script>



<DialogClose>
    <a 
        {href}
        class={cn("cursor-pointer flex flex-row justify-between items-center text-xl rounded-sm py-3 hover:bg-accent hover:text-accent-foreground transition-all", onPage && "bg-primary text-primary-foreground")}
    >
        <span class="ml-4">{title}</span>
        <span class="mr-4"><ChevronRight/></span>
    </a>
</DialogClose>