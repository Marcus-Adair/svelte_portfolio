<script lang="ts">
	import { cn } from "$lib/utils";
	import type { Snippet } from "svelte";
	import type { HTMLAnchorAttributes } from "svelte/elements";

    type Props = {
        href: string;
        children: Snippet
    } & HTMLAnchorAttributes
    let { href, children, ...props}: Props = $props();
</script>

<a
    {...props}
    {href}
    class={cn("text-primary hover:underline underline-offset-2", props.class)}
    target={href.startsWith("/") ? "" : "_blank"}
    rel={href.startsWith("/") ? "" : "noreferrer"}
>
    {@render children()}
</a>