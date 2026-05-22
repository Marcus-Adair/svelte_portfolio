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

    let copyIcon: HTMLElement;
    let checkIcon: HTMLElement;
    let heroTextDiv: HTMLDivElement;
    let heroWrapper: HTMLDivElement;
    let fixedHeroContainer: HTMLDivElement;

    // Email copy animation -------------------------------------- //
    const EASE = "power2.out";
    const DURATION = 0.22;
    function copyEmail() {
        navigator.clipboard.writeText("marcus.a.adair@gmail.com");
        gsap.fromTo(copyIcon, { y: 0 }, { y: 20, duration: DURATION, ease: EASE });
        gsap.fromTo(checkIcon, { y: -20 }, { y: 0, duration: DURATION, ease: EASE });

        setTimeout(() => {
            gsap.fromTo(copyIcon, { y: 2 }, { y: 0, duration: DURATION, ease: EASE });
            gsap.fromTo(checkIcon, { y: 0 }, { y: -20, duration: DURATION, ease: EASE });
        }, 1800);
    }

    // Grid invert effect config & animation -------------------------------------- // 
    let gridWidth = $state(1400); // updated to heroWrapper.clientWidth on mount
    let gridHeight = $state(600); // updated to heroWrapper.clientHeight on mount
    let scrollY = $state(0); // track scroll for viewport positioning
    let heroWrapperTop = $state(0); // heroWrapper's offset from document top

    const GRID_COLS = 18;
    const GRID_ROWS = 12;
    const GRID_SIZE = GRID_COLS * GRID_ROWS;
    const HERO_MAX_WIDTH = 800;
    const HERO_PADDING = 32; // horizontal padding on small screens
    let heroWidth = $derived(Math.min(HERO_MAX_WIDTH, gridWidth - HERO_PADDING));
    let heroOffsetX = $derived((gridWidth - heroWidth) / 2);

    const HERO_OFFSET_Y = 120; // top-5 (20px) + mt-16 (64px) - fixed position from viewport top
    const FADE_DELAY = 500; // ms before cell fades

    let activeCells = $state<Set<number>>(new Set());
    let triggeredCells = new SvelteSet<number>(); // tracks cells that already fired

    function onCellEnter(i: number) {
        if (triggeredCells.has(i)) return; // already triggered, wait for leave
        triggeredCells.add(i);
        activeCells = new Set([...activeCells, i]);
        setTimeout(() => {
            activeCells = new Set([...activeCells].filter(c => c !== i));
        }, FADE_DELAY);
    }
    function onCellLeave(i: number) {
        triggeredCells.delete(i); // reset so it can trigger again on re-enter
    }

    // Hero text opacity based on scroll (fades both original and inverted text, but not grid cells)
    let heroOpacity = $derived.by(() => {
        const scrollStart = heroWrapperTop;
        const scrollEnd = heroWrapperTop + (gridHeight * 0.3);
        const progress = Math.max(0, Math.min(1, (scrollY - scrollStart) / (scrollEnd - scrollStart)));
        // Ease-out cubic for smoother fade
        const eased = 1 - Math.pow(progress, 3);
        return eased;
    });

    // Disable social links when fully faded out
    let socialLinksDisabled = $derived(heroOpacity === 0);

    // Get cell position in viewport space (for fixed inverted cells)
    function getCellViewportStyle(i: number) {
        const col = i % GRID_COLS;
        const row = Math.floor(i / GRID_COLS);
        const cellWidth = gridWidth / GRID_COLS;
        const cellHeight = gridHeight / GRID_ROWS;
        // Cell position in document space (relative to heroWrapper)
        const cellX = col * cellWidth;
        const cellY = row * cellHeight;
        // Convert to viewport space: add heroWrapper offset, subtract scroll
        const viewportX = cellX;
        const viewportY = heroWrapperTop + cellY - scrollY;
        return `left: ${viewportX}px; top: ${viewportY}px; width: ${cellWidth}px; height: ${cellHeight}px;`;
    }

    // Offset inverted text within viewport cell to align with fixed hero text
    function getInvertedTextStyle(i: number) {
        const col = i % GRID_COLS;
        const row = Math.floor(i / GRID_COLS);
        const cellWidth = gridWidth / GRID_COLS;
        const cellHeight = gridHeight / GRID_ROWS;
        // Cell's viewport position (must match getCellViewportStyle)
        const cellViewportX = col * cellWidth;
        const cellViewportY = heroWrapperTop + (row * cellHeight) - scrollY;
        // Hero text is fixed at (heroOffsetX, HERO_OFFSET_Y)
        // Offset inverted text so it aligns with fixed hero
        const xOffset = heroOffsetX - cellViewportX;
        const yOffset = HERO_OFFSET_Y - cellViewportY;
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
        };
    });
</script>

<svelte:head>
  <title>Home • Marcus Adair</title>
</svelte:head>

{#snippet heroText()}
    <div class="mb-1"><p>
        <span class="font-[Britney] text-5xl sm:text-7xl xl:text-8xl">M</span><span>ARCUS</span>&nbsp;
        <span><span class="font-[Britney] text-5xl sm:text-7xl xl:text-8xl mr-1 line">A</span><span>DAIR</span></span>
    </p></div>
    <div><p>SOFTWARE ENGINEER,</p></div>
    <div><p class="font-[Array] text-4xl sm:text-6xl xl:text-7xl">COMPUTER SCIENTIST,</p></div>
    <div><p class="font-[Britney]">AND CREATIVE.</p></div>
    <div><p class="text-base sm:text-xl xl:text-2xl mt-4">- BASED IN SANDY, UTAH -</p></div>
{/snippet}


<!-- Fixed hero text and inverted cells (viewport-positioned) -->
<div bind:this={fixedHeroContainer} class="fixed inset-0 pointer-events-none z-40">
    <!-- Normal hero text -->
    <div
        bind:this={heroTextDiv}
        class="absolute h-[320px] text-3xl sm:text-5xl xl:text-6xl left-1/2 -translate-x-1/2 font-[Stardom] tracking-wider text-center text-foreground flex flex-col justify-center"
        style="width: {heroWidth}px; top: {HERO_OFFSET_Y}px; opacity: {heroOpacity};"
    >
        {@render heroText()}
    </div>

    <!-- Social links below hero text -->
    <div
        class="absolute left-1/2 -translate-x-1/2 flex flex-row gap-6 text-muted-foreground items-center pointer-events-auto z-50"
        style="top: {HERO_OFFSET_Y + 340}px; opacity: {heroOpacity};"
    >
        <a
            class={cn("hover:text-ring transition-colors", HOVER_EXPAND_TAILWIND_ANIMATION, socialLinksDisabled && "pointer-events-none")}
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
            class={cn("hover:text-ring transition-colors", HOVER_EXPAND_TAILWIND_ANIMATION, socialLinksDisabled && "pointer-events-none")}
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
            class={cn("hover:text-ring transition-colors", HOVER_EXPAND_TAILWIND_ANIMATION, socialLinksDisabled && "pointer-events-none")}
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
            class={cn("hover:text-ring transition-colors", HOVER_EXPAND_TAILWIND_ANIMATION, socialLinksDisabled && "pointer-events-none")}
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

    <!-- Inverted cells (viewport positioned) -->
    <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
    {#each Array(GRID_SIZE) as _, i (i)}
        {#if activeCells.has(i)}
            <div
                class="absolute overflow-hidden bg-primary"
                style={getCellViewportStyle(i)}
            >
                <!-- Inverted text positioned to align with fixed hero text -->
                <div
                    class="absolute h-[320px] text-3xl sm:text-5xl xl:text-6xl font-[Stardom] tracking-wider text-center text-background flex flex-col justify-center"
                    style="width: {heroWidth}px; {getInvertedTextStyle(i)} opacity: {heroOpacity};"
                >
                    {@render heroText()}
                </div>
            </div>
        {/if}
    {/each}
</div>

<div class="flex flex-col items-center gap-3">

    <!-- ANIMATED GRID -->
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

    <!-- Content below animated grid -->
    <div class="flex flex-col gap-3 mt-64 mb-46">
        <div class="flex justify-center sm:justify-end -mt-0.5">
            <div class="flex flex-row gap-3 items-center text-muted-foreground">
                <span class="tracking-wider font-light text-sm">marcus.a.adair@gmail.com</span>
                <button class="relative w-fit h-fit overflow-clip cursor-pointer" title="Copy" onclick={copyEmail}>
                    <div bind:this={copyIcon}>
                        <Copy class="size-3.5 hover:text-ring" />
                    </div>
                    <div bind:this={checkIcon} class="absolute top-0 left-0 -translate-y-[20px]">
                        <Check class="size-3.5 text-green-600" />
                    </div>
                </button>
            </div>
        </div>
    </div>
</div>