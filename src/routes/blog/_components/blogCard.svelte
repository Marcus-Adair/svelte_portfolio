<script lang="ts">
	import Separator from "$lib/components/ui/separator.svelte";
	import { HOVER_EXPAND_TAILWIND_ANIMATION } from "$lib/consts/style";
	import { cn } from "$lib/utils";
	import { formatDate } from "$lib/utils/dates";
	import { ChevronRight } from "lucide-svelte";
    
    interface Props {
        title: string;
        date: Date;
        about: string;
        href: string;
        imgSrc: any;
    }
    let { title, date, about, href, imgSrc }: Props = $props();
</script>

<a {href} class={cn("flex flex-row gap-4 cursor-pointer", HOVER_EXPAND_TAILWIND_ANIMATION)} title="See post">
    <img
        src={imgSrc}
        alt={title}
        class="w-36 sm:w-72 lg:w-96 h-auto rounded-md"
    />

    <div class="flex-1 flex flex-col gap-2 mt-4 ml-2">
        <span class="text-lg font-[Space_Grotesk]">{title}</span>
        <span class="font-light text-sm">{about}</span>
        <span class="text-xs text-muted-foreground">{formatDate(date)}</span>
    </div>

    <div class="flex items-center justify-center">
        <ChevronRight  />
    </div>
</a>

<Separator/>   
