<script lang="ts">
	import type { Snippet } from "svelte";

    interface Props {
        href: string;
        children: Snippet
    }
    let { href, children}: Props = $props();
</script>

<a
    {href}
    class="text-primary"
    target={href.startsWith("/") ? "" : "_blank"}
    rel={href.startsWith("/") ? "" : "noreferrer"}
>
    {@render children()}
</a>