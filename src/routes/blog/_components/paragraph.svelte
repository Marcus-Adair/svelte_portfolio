<script lang="ts">
	import type { Snippet } from "svelte";
    
    interface Props {
        children: Snippet
    }
    const { children } : Props = $props()
</script>

<!-- Tabbed first line -->
<p style="display: inline-block; text-indent: 2em;">{@render children()}</p>