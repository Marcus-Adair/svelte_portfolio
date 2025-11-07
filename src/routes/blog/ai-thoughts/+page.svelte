<script lang="ts">
	import Paragraph from "../_components/paragraph.svelte";
	import PostHeader from "../_components/postHeader.svelte";

    const DATE = new Date("2025-11-04T00:40:37.654Z")
</script>


<div class="flex flex-col gap-4">
    <PostHeader date={DATE} postNum={2} title="AI Thoughts"/>

    <Paragraph>
        TODO:
    </Paragraph>
</div>