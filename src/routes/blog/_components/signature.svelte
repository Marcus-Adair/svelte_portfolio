<script lang="ts">
    let { name, date }: { name: string, date: string } = $props();
</script>

<span class="text-right text-4xl lg:mr-14 mt-2">{name}</span>
<span class="text-right text-lg lg:mr-14">{date}</span>