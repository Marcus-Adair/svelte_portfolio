<script lang="ts">
    let { name, date }: { name: string, date: string } = $props();

    const firstChar = name.charAt(0);
    const rest = name.slice(1);
</script>

<div class="text-right text-4xl lg:mr-14 mt-2 pointer-events-none font-[Stardom]"><p>
    - <span class="font-[Britney] text-6xl">{firstChar.toUpperCase()}</span><span>{rest.toUpperCase()}</span>,
</p></div>
<span class="text-right text-lg lg:mr-14 font-[Stardom]">{date}</span>