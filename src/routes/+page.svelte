<script lang="ts">
	import { CalendarDays, Check, Copy, Mail } from 'lucide-svelte';
	import Github from '$lib/components/icons/Github.svelte';
	import LinkedIn from '$lib/components/icons/LinkedIn.svelte';
	import { cn } from '$lib/utils';
	import { HOVER_EXPAND_TAILWIND_ANIMATION } from '$lib/consts/style';
    import gsap from "gsap";
	import { onMount } from 'svelte';
	import { isBootComplete } from '$lib/stores/boot.svelte';
	import { SvelteSet } from 'svelte/reactivity';
	import { mode } from 'mode-watcher';

    let heroTextDiv: HTMLDivElement;
    let heroWrapper: HTMLDivElement;

    // Email copy-paste helper logic -------------------------------------- //
    let isCopied = $state(false);
    function copyEmail() {
        navigator.clipboard.writeText("marcus.a.adair@gmail.com");
        isCopied = true;
        setTimeout(() => { isCopied = false; }, 1800);
    }

    // Grid invert effect config & animation -------------------------------------- // 
    let gridWidth = $state(1400); // updated to heroWrapper.clientWidth on mount
    let gridHeight = $state(600); // updated to heroWrapper.clientHeight on mount
    let scrollY = $state(0); 
    let heroWrapperTop = $state(0); // offset from document top

    const GRID_COLS = 18;
    const GRID_ROWS = 12;
    const GRID_SIZE = GRID_COLS * GRID_ROWS;
    const HERO_MAX_WIDTH = 800;
    const HERO_PADDING = 32; // horizontal padding on sm screens
    const FADE_DELAY = 500; // ms before cell fades

    let heroWidth = $derived(Math.min(HERO_MAX_WIDTH, gridWidth - HERO_PADDING));
    let heroOffsetX = $derived((gridWidth - heroWidth) / 2);

    let isSmOrLarger = $state(false);
    let heroOffsetY = $derived(isSmOrLarger ? 120 : 80);

    let activeCells = $state<Set<number>>(new Set());

    let triggeredCells = new SvelteSet<number>();
    function onCellEnter(i: number) {
        if (triggeredCells.has(i)) return; // already affected, wait for leave

        triggeredCells.add(i);
        activeCells = new Set([...activeCells, i]);
        setTimeout(() => {
            activeCells = new Set([...activeCells].filter(c => c !== i));
        }, FADE_DELAY);
    }
    function onCellLeave(i: number) {
        triggeredCells.delete(i); // reset so it can trigger again on re-enter
    }

    // Fade-out on Scroll Animation ---------------- ///
    // let heroOpacity = $derived.by(() => {
    //     const scrollStart = heroWrapperTop;
    //     const scrollEnd = heroWrapperTop + (gridHeight * 0.3);
    //     const progress = Math.max(0, Math.min(1, (scrollY - scrollStart) / (scrollEnd - scrollStart)));
    //     const eased = 1 - Math.pow(progress, 2.5); // ease-out between quadratic and cubic
    //     return eased;
    // });
    const heroOpacity = 1; // Use 1 for no opacity change .... TODO: Put opacity animation back in when I move Projects here

    // Disable social links when fully faded out
    let socialLinksDisabled = $derived(heroOpacity === 0);

    // Primitive helpers for getting correct grid clip to show
    function getColAndRow(i: number) {
        const col = i % GRID_COLS;
        const row = Math.floor(i / GRID_COLS);
        return [col, row];
    }
    function getCellWidthHeight() {
        const cellWidth = gridWidth / GRID_COLS;
        const cellHeight = gridHeight / GRID_ROWS;
        return [cellWidth, cellHeight];
    }
    function getCellViewportXY(i: number) {
        const [col, row] = getColAndRow(i);
        const [cellWidth, cellHeight] = getCellWidthHeight();

        // Cell's viewport position (must match getGridCellStyle)
        const cellViewportX = col * cellWidth;
        const cellViewportY = heroWrapperTop + (row * cellHeight) - scrollY;
        return [cellViewportX, cellViewportY];
    }

    // Get cell position in viewport space (for fixed inverted cells)
    function getGridCellStyle(i: number) {
        const [col, row] = getColAndRow(i);
        const [cellWidth, cellHeight] = getCellWidthHeight();

        // Cell position in document space (relative to heroWrapper)
        const cellX = col * cellWidth;
        const cellY = row * cellHeight;
        // Convert to viewport space: add heroWrapper offset, subtract scroll
        const viewportX = cellX;
        const viewportY = heroWrapperTop + cellY - scrollY;
        return `left: ${viewportX}px; top: ${viewportY}px; width: ${cellWidth}px; height: ${cellHeight}px;`;
    }

    // Offset text within viewport cell to align with fixed hero text
    function getInvertedTextStyle(i: number) {
        const [cellViewportX, cellViewportY] = getCellViewportXY(i);

        // Hero text is fixed at (heroOffsetX, heroOffsetY)
        // Offset inverted text so it aligns with fixed hero
        const xOffset = heroOffsetX - cellViewportX;
        const yOffset = heroOffsetY - cellViewportY;
        return `left: ${xOffset}px; top: ${yOffset}px;`;
    }

    // Offset content below hero text
    let CONTENT_OFFSET_Y = $derived(isSmOrLarger ? 370 : 300);
    function getInvertedContentStyle(i: number) {
        const [cellViewportX, cellViewportY] = getCellViewportXY(i);

        const xOffset = (gridWidth / 2) - cellViewportX;
        const yOffset = (heroOffsetY + CONTENT_OFFSET_Y) - cellViewportY;
        return `left: ${xOffset}px; top: ${yOffset}px;`;
    }
    
    onMount(() => {
        // Set grid dimensions from actual DOM
        gridWidth = heroWrapper.clientWidth;
        gridHeight = heroWrapper.clientHeight;
        heroWrapperTop = heroWrapper.offsetTop;
        const handleResize = () => {
            gridWidth = heroWrapper.clientWidth;
            gridHeight = heroWrapper.clientHeight;
            heroWrapperTop = heroWrapper.offsetTop;
        };
        window.addEventListener('resize', handleResize);

        const handleScroll = () => { scrollY = window.scrollY; };
        window.addEventListener('scroll', handleScroll); // Track scroll for viewport positioning

        // Responsive breakpoint detection (sm = 640px)
        const smQuery = window.matchMedia('(min-width: 640px)');
        isSmOrLarger = smQuery.matches;
        const handleBreakpoint = (e: MediaQueryListEvent) => { isSmOrLarger = e.matches; };
        smQuery.addEventListener('change', handleBreakpoint);

        // Hero text onMount enter animation - each line is already a div, no SplitText needed ----------- //
        const heroDelay = isBootComplete() ? 0 : 0.5;
        const heroLines = heroTextDiv.querySelectorAll('div');
        gsap.from(heroLines, {
            delay: heroDelay,
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out"
        });

        return () => {
            // Clean up
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
            smQuery.removeEventListener('change', handleBreakpoint);
        };
    });
</script>

<svelte:head>
  <title>Home • Marcus Adair</title>
</svelte:head>

{#snippet heroText()}
    <div class="mb-1"><p>
        <span class="font-[Britney] text-5xl sm:text-7xl xl:text-8xl">M</span><span>ARCUS</span>&nbsp;
        <span><span class="font-[Britney] text-5xl sm:text-7xl xl:text-8xl mr-0.5 line">A</span><span>DAIR</span></span>
    </p></div>
    <div><p>SOFTWARE ENGINEER,</p></div>
    <div><p class="font-[Array] text-4xl sm:text-6xl xl:text-7xl">COMPUTER SCIENTIST,</p></div>
    <div><p class="font-[Britney]">AND CREATIVE.</p></div>
    <div><p class="text-base sm:text-xl xl:text-2xl mt-4">- BASED IN SANDY, UTAH -</p></div>
{/snippet}

{#snippet socialIcons()}
    <CalendarDays class="size-7 pointer-events-none"/>
    <Mail class="size-7 pointer-events-none"/>
    <Github class="size-7 pointer-events-none"/>
    <LinkedIn class="size-7 pointer-events-none"/>
{/snippet}

{#snippet separatorDiv(inverted: boolean = false)}
    <div class={cn("shrink-0 h-px w-72 lg:w-96 pointer-events-none", inverted ? "bg-background" : "bg-muted-foreground/75")}></div>
{/snippet}

{#snippet emailDisplay()}
    <span class="tracking-widest font-light text-base pointer-events-none">marcus.a.adair@gmail.com</span>
{/snippet}
{#snippet copyPasteIcons(inverted: boolean = false)}
    <div class="relative w-fit h-fit overflow-clip">
        <div class="transition-transform duration-200 ease-out" class:translate-y-5={isCopied}>
            <Copy class={cn("size-4", inverted ? "pointer-events-none" : "hover:text-ring")}/>
        </div>
        <div class="absolute top-0 left-0 transition-transform duration-200 ease-out" class:-translate-y-5={!isCopied}>
            <Check class={cn("size-4", inverted ? mode.current === "light" ? "pointer-events-none text-background" :  "pointer-events-none text-foreground" : "text-green-500")}/>
        </div>
    </div>
{/snippet}
{#snippet emailCopyPaste()}
    {@render emailDisplay()}
    {@render copyPasteIcons(true)}
{/snippet}



<!-- Fixed hero text and inverted cells (viewport-positioned) -->
<div class="fixed inset-0 pointer-events-none z-40">
    <!-- Normal hero text -->
    <div
        bind:this={heroTextDiv}
        class="absolute h-[320px] text-3xl sm:text-5xl xl:text-6xl left-1/2 -translate-x-1/2 font-[Stardom] tracking-wider text-center text-foreground flex flex-col justify-center"
        style="width: {heroWidth}px; top: {heroOffsetY}px; opacity: {heroOpacity};"
    >
        {@render heroText()}
    </div>

    <!-- Content below hero text: social links, separator, email -->
    <div
        class="absolute left-1/2 -translate-x-1/2 flex flex-col gap-5 items-center text-muted-foreground z-50"
        style="top: {heroOffsetY + CONTENT_OFFSET_Y}px; opacity: {heroOpacity};"
    >
        <!-- Social links -->
        <div class="flex flex-row gap-6 items-center">
            <a
                class={cn("hover:text-ring transition-colors pointer-events-auto", HOVER_EXPAND_TAILWIND_ANIMATION, socialLinksDisabled && "pointer-events-none")}
                href="https://cal.com/marcus-adair"
                title="Calendar"
                target="_blank"
                rel="external"
                aria-disabled={socialLinksDisabled}
                tabindex={socialLinksDisabled ? -1 : 0}
            >
                <CalendarDays class="size-7"/>
            </a>
            <a
                class={cn("hover:text-ring transition-colors pointer-events-auto", HOVER_EXPAND_TAILWIND_ANIMATION, socialLinksDisabled && "pointer-events-none")}
                href="mailto:marcus.a.adair@gmail.com"
                title="Email"
                target="_blank"
                rel="external"
                aria-disabled={socialLinksDisabled}
                tabindex={socialLinksDisabled ? -1 : 0}
            >
                <Mail class="size-7"/>
            </a>
            <a
                class={cn("hover:text-ring transition-colors pointer-events-auto", HOVER_EXPAND_TAILWIND_ANIMATION, socialLinksDisabled && "pointer-events-none")}
                href="https://github.com/Marcus-Adair"
                title="GitHub"
                target="_blank"
                rel="external"
                aria-disabled={socialLinksDisabled}
                tabindex={socialLinksDisabled ? -1 : 0}
            >
                <Github class="size-7"/>
            </a>
            <a
                class={cn("hover:text-ring transition-colors pointer-events-auto", HOVER_EXPAND_TAILWIND_ANIMATION, socialLinksDisabled && "pointer-events-none")}
                href="https://www.linkedin.com/in/marcus-adair/"
                title="LinkedIn"
                target="_blank"
                rel="external"
                aria-disabled={socialLinksDisabled}
                tabindex={socialLinksDisabled ? -1 : 0}
            >
                <LinkedIn class="size-7"/>
            </a>
        </div>

        <!-- Separator -->
        {@render separatorDiv()}

        <!-- Email with copy button -->
        <div class="flex flex-row gap-4 items-center">
            {@render emailDisplay()}
            <button
                class={cn("relative w-fit h-fit overflow-clip cursor-pointer pointer-events-auto", socialLinksDisabled && "pointer-events-none")}
                title="Copy"
                onclick={copyEmail}
                disabled={socialLinksDisabled}
            >
                {@render copyPasteIcons()}
            </button>
        </div>
    </div>

    <!-- Inverted cells (viewport positioned) -->
    <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
    {#each Array(GRID_SIZE) as _, i (i)}
        {#if activeCells.has(i)}
            <div
                class="absolute overflow-hidden bg-primary z-[60]"
                style={getGridCellStyle(i)}
            >
                <div
                    class={cn(
                        "absolute h-[320px] flex flex-col justify-center",
                        "text-3xl sm:text-5xl xl:text-6xl font-[Stardom] tracking-wider text-center text-background"
                    )}
                    style="width: {heroWidth}px; {getInvertedTextStyle(i)} opacity: {heroOpacity};"
                >
                    {@render heroText()}
                </div>

                <!-- Inverted content: social icons, separator, email -->
                <div
                    class="absolute flex flex-col gap-5 items-center text-background -translate-x-1/2"
                    style="{getInvertedContentStyle(i)} opacity: {heroOpacity};"
                >
                    <div class="flex flex-row gap-6 items-center">
                        {@render socialIcons()}
                    </div>
                    {@render separatorDiv(true)}
                    <div class="flex flex-row gap-4 items-center">
                        {@render emailCopyPaste()}
                    </div>
                </div>
            </div>
        {/if}
    {/each}
</div>

<div class="flex flex-col items-center gap-3">
    <!-- Trigger Grid-->
    <div bind:this={heroWrapper} class="relative h-[600px] w-screen">
        <!-- Invisible grid for pointer events -->
        <div class="absolute inset-0 w-full h-full grid grid-cols-[repeat(18,1fr)] grid-rows-[repeat(12,1fr)] z-20">
            <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
            {#each Array(GRID_SIZE) as _, i (i)}
                <div
                    onmouseenter={() => onCellEnter(i)}
                    onmouseleave={() => onCellLeave(i)}
                    role="gridcell"
                    tabindex={-1}
                ></div>
            {/each}
        </div>
    </div>

    <!-- <span class="py-64">TODO: add projects section</span> -->
</div>