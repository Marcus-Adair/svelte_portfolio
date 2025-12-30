<script lang="ts">
    let { name, date }: { name: string, date: string } = $props();
</script>

<span class="text-right text-4xl font-[Space_Grotesk] lg:mr-14 mt-2">{name}</span>
<span class="text-right text-lg font-[Space_Grotesk] lg:mr-14">{date}</span>