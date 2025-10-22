<script lang="ts">
	import { Popover } from "bits-ui";
    let { children } = $props();

</script>

<Popover.Root>
    {@render children?.()}
</Popover.Root>