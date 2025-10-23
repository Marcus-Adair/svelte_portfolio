<script lang="ts">
	import { goto } from "$app/navigation";
	import Button from "$lib/components/ui/button.svelte";
	import Separator from "$lib/components/ui/separator.svelte";
	import { formatDate } from "$lib/utils/dates";
	import { ChevronLeft } from "lucide-svelte";

    interface Props {
        date: Date,
        postNum: number,
        title: string,
    }
    const { date, postNum, title}: Props = $props();

</script>

<div class="flex flex-row gap-6 items-center">
    <Button variant="ghost" size="icon-lg" onclick={() => goto("/blog")}>
        <ChevronLeft class="size-8"/>
    </Button>
    <div class="flex flex-col gap-2 flex-1">
        <h1 class="text-4xl font-[Space_Grotesk]">{title}</h1>

        <div class="flex flex-row justify-between items-center">
            <div class="flex flex-row items-center gap-2 h-4">
                <Separator orientation="vertical" class="data-[orientation=vertical]:w-[3px]"/>
                <span class="text-sm text-muted-foreground">{formatDate(date)}</span>
            </div>
            <span class="text-sm text-muted-foreground">#{postNum}</span>
        </div>
    </div>
</div>
<Separator/>