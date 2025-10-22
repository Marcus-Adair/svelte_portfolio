<script lang="ts">
	import { goto } from "$app/navigation";
	import CardContent from "$lib/components/ui/card/card-content.svelte";
	import Card from "$lib/components/ui/card/card.svelte";
	import Separator from "$lib/components/ui/separator.svelte";
	import { formatDate } from "$lib/utils/dates";
	import { ChevronRight } from "lucide-svelte";


    interface Props {
        title: string;
        date: Date;
        about: string;
        href: string;
    }
    let { title, date, about, href }: Props = $props();
</script>

<Card class="max-w-[600px] cursor-pointer hover:bg-accent dark:hover:bg-accent/50" title="See post" onclick={() => goto(href)}>
	<CardContent class="flex flex-row items-center gap-10">
        <div class="flex-1 flex flex-col gap-2">
            <div class="flex flex-row items-center gap-4 h-4">
                <Separator orientation="vertical" class="data-[orientation=vertical]:w-[3px]"/>
                <span class="text-sm text-muted-foreground">{formatDate(date)}</span>

            </div>

            <span class="text-lg">{title}</span>

            <Separator />

            <span class="font-light">{about}</span>
        </div>

        <div class="flex items-center justify-center">
            <ChevronRight  />
        </div>
	</CardContent>
</Card>
