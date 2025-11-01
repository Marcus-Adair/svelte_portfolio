<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
	import CheckIcon from "@lucide/svelte/icons/check";
	import MinusIcon from "@lucide/svelte/icons/minus";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
	import type { Snippet } from "svelte";

	let {
		ref = $bindable(null),
		checked = $bindable(false),
		indeterminate = $bindable(false),
		class: className,
		children: childrenProp,
		navMenuItem = false,
		href,
		...restProps
	}: WithoutChildrenOrChild<DropdownMenuPrimitive.CheckboxItemProps> & {
		children?: Snippet;
		navMenuItem?: boolean;
		href?: string;
	} = $props();
</script>

<DropdownMenuPrimitive.CheckboxItem
	bind:ref
	bind:checked
	bind:indeterminate
	data-slot="dropdown-menu-checkbox-item"
	class={cn(
		"focus:bg-accent focus:text-accent-foreground outline-hidden relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-2 text-sm data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
		navMenuItem ? "pl-4 pt-2 text-lg" : "pl-8" ,
		className
	)}
	{...restProps}
>
	{#snippet children({ checked, indeterminate })}

		{#if !navMenuItem}
			<a href={href}>
				<span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
					{#if indeterminate}
						<MinusIcon class="size-4" />
					{:else}
						<CheckIcon class={cn("size-4", !checked && "text-transparent")} />
					{/if}
				</span>
				{@render childrenProp?.()}
			</a>

		{:else}
			{@render childrenProp?.()}
		{/if}
		
	{/snippet}
</DropdownMenuPrimitive.CheckboxItem>
