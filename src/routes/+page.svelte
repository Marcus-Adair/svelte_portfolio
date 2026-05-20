<script lang="ts">
    import AccordionContent from '$lib/components/ui/accordion/accordion-content.svelte';
	import AccordionItem from '$lib/components/ui/accordion/accordion-item.svelte';
	import AccordionTrigger from '$lib/components/ui/accordion/accordion-trigger.svelte';
	import Accordion from '$lib/components/ui/accordion/accordion.svelte';
	import Button from '$lib/components/ui/button.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import { CalendarDays,  Check,  Copy,  FileText, Mail } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import { HOVER_EXPAND_TAILWIND_ANIMATION } from '$lib/consts/style';
    import  resume  from "$lib/assets/Marcus_Adair_Portfolio_Resume.pdf"
    import gsap from "gsap";
    import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
    import SplitText from "gsap/SplitText";
    import ScrollTrigger from "gsap/ScrollTrigger";
	import { onMount } from 'svelte';
	import AnimatedSeparator from '$lib/components/animatedSeparator.svelte';
	import Link from '$lib/components/link.svelte';
	import Github from '$lib/components/icons/Github.svelte';
	import LinkedIn from '$lib/components/icons/LinkedIn.svelte';
	import { isBootComplete } from '$lib/stores/boot.svelte';
	import { SvelteSet } from 'svelte/reactivity';

    let copyIcon: HTMLElement;
    let checkIcon: HTMLElement;
    const EASE = "power2.out";
    const DURATION = 0.22;
    function copyEmail() {
        navigator.clipboard.writeText("marcus.a.adair@gmail.com");
        gsap.fromTo(copyIcon, { y: 0 }, { y: 20, duration: DURATION, ease: EASE });
        gsap.fromTo(checkIcon, { y: -20 }, { y: 0, duration: DURATION, ease: EASE });

        setTimeout(() => {
            gsap.fromTo(copyIcon, { y: 20 }, { y: 0, duration: DURATION, ease: EASE });
            gsap.fromTo(checkIcon, { y: 0 }, { y: -20, duration: DURATION, ease: EASE });
        }, 1800);
    }
    function animateHelloWord() {
        gsap.timeline({ repeat: -1, delay: 1.3, repeatDelay: 2.7 })
            .to(helloWorld, {
                duration: 1.3,
                scrambleText: {text: "Hello world!", chars: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY12343.567890!@#$%^&*", tweenLength: false},
                ease: "elastic.inOut",
            })
            .to(helloWorld, {
                duration: 1.1,
                scrambleText: { text: "Welcome to my website!", chars: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY1234567890!@#$%^&*", tweenLength: false},
                ease: "elastic.inOut",
                delay: 3
            });
    }    

    let helloWorld: HTMLSpanElement;
    let resumeTl: gsap.core.Timeline;
    let heroTextDiv: HTMLDivElement;
    let heroWrapper: HTMLDivElement;

    // Grid invert effect
    const GRID_WIDTH = 1400;
    const GRID_HEIGHT = 600; // matches heroWrapper h-150
    const GRID_COLS = 20;
    const GRID_ROWS = 12;
    const GRID_SIZE = GRID_COLS * GRID_ROWS;
    const HERO_WIDTH = 800;
    const HERO_OFFSET_X = (GRID_WIDTH - HERO_WIDTH) / 2; // 300px
    const HERO_OFFSET_Y = 20; // top-5 = 20px, offset from heroWrapper top
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

    // Get cell position as percentages
    function getCellStyle(i: number) {
        const col = i % GRID_COLS;
        const row = Math.floor(i / GRID_COLS);
        const cellWidth = 100 / GRID_COLS;
        const cellHeight = 100 / GRID_ROWS;
        return `left: ${col * cellWidth}%; top: ${row * cellHeight}%; width: ${cellWidth}%; height: ${cellHeight}%;`;
    }

    // Offset inverted text so it aligns through the cell's clip window
    function getInvertedTextStyle(i: number) {
        const col = i % GRID_COLS;
        const row = Math.floor(i / GRID_COLS);
        const cellWidth = GRID_WIDTH / GRID_COLS;
        const cellHeight = GRID_HEIGHT / GRID_ROWS;
        const xOffset = HERO_OFFSET_X - (col * cellWidth);
        const yOffset = HERO_OFFSET_Y - (row * cellHeight);
        return `left: ${xOffset}px; top: ${yOffset}px;`;
    }

    onMount(() => {
        gsap.registerPlugin(ScrambleTextPlugin, SplitText, ScrollTrigger);

        // Resume button SplitText animation
        const SPLIT_ANIM = { y: -25, duration: 0.15, stagger: 0.03, ease: "power1.out" };
        
        const resumeSplit1 = SplitText.create(".split-text-resume", { type: "chars" });
        const resumeSplit2 = SplitText.create(".split-text-resume-2", { type: "chars" });
        resumeTl = gsap.timeline({ paused: true })
            .to(resumeSplit1.chars, SPLIT_ANIM)
            .to(resumeSplit2.chars, SPLIT_ANIM, 0);

        // Hero text animation - each line is already a div, no SplitText needed
        const heroDelay = isBootComplete() ? 0 : 0.325;
        const heroLines = heroTextDiv.querySelectorAll('div');
        gsap.from(heroLines, {
            delay: heroDelay,
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out"
        });

        // Hero scroll fade animation
        gsap.to(heroTextDiv, {
            opacity: 0,
            scrollTrigger: {
                trigger: heroWrapper,
                start: "top top",
                end: "30% top",
                scrub: true
            }
        });

        // Page load animations
        animateHelloWord();
    });
</script>

<svelte:head>
  <title>Home • Marcus Adair</title>
</svelte:head>

{#snippet heroText()}
            <div class="mb-1"><p>
                <span class="font-[Britney] text-5xl sm:text-7xl">M</span><span>ARCUS</span>&nbsp;
                <span><span class="font-[Britney] text-5xl sm:text-7xl mr-1 line">A</span><span>DAIR</span></span>
            </p></div>
            <div><p>SOFTWARE ENGINEER,</p></div>
            <div><p class="font-[Array] text-4xl sm:text-6xl">COMPUTER SCIENTIST,</p></div>
            <div><p class="font-[Britney]">AND CREATIVE.</p></div>
            <div><p class="text-base sm:text-xl mt-4">- BASED IN SANDY, UTAH -</p></div>
{/snippet}

<div class="flex flex-col gap-3">
    <div bind:this={heroWrapper} class="relative h-150 flex justify-center">
        <!-- Normal hero text -->
        <div bind:this={heroTextDiv} class="absolute w-[800px] h-[320px] text-3xl sm:text-5xl top-5 left-1/2 -translate-x-1/2 font-[Stardom] tracking-wider text-center text-foreground pointer-events-none flex flex-col justify-center z-0">
            {@render heroText()}
        </div>

        <!-- Inverted cells container -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-full pointer-events-none z-10">
            <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
            {#each Array(GRID_SIZE) as _, i (i)}
                {#if activeCells.has(i)}
                    <div
                        class="absolute overflow-hidden bg-primary"
                        style={getCellStyle(i)}
                    >
                        <!-- Inverted text positioned to align with normal text -->
                        <div
                            class="absolute w-[800px] h-[320px] text-3xl sm:text-5xl font-[Stardom] tracking-wider text-center text-primary-foreground flex flex-col justify-center"
                            style={getInvertedTextStyle(i)}
                        >
                            {@render heroText()}
                        </div>
                    </div>
                {/if}
            {/each}
        </div>

        <!-- Invisible grid for pointer events (scrolls with page) -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-full grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(12,1fr)] z-20">
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

    <div class="flex flex-col gap-3 pb-46">
        <div class="flex flex-col gap-3 relative">
            <div class="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between items-center mt-1">
                <Button
                    variant="outline"
                    size="lg"
                    title="My Resume"
                    onclick={() => window.open(resume, "_blank")}
                    onmouseenter={() => resumeTl.play()}
                    onmouseleave={() => resumeTl.reverse()}
                    class="w-full sm:w-fit"
                >
                    <div class="relative overflow-clip">
                        <span class="split-text-resume">My Resume</span>
                        <span class="absolute inset-0 translate-y-[25px] split-text-resume-2">My Resume</span>
                    </div>
                    <FileText/>
                </Button>
                
                <div class="flex flex-row gap-6 text-muted-foreground items-center">
                    <a
                        class={cn("hover:text-ring transition-colors", HOVER_EXPAND_TAILWIND_ANIMATION)}
                        href="https://cal.com/marcus-adair"
                        title="Calendar"
                        target="_blank"
                        rel="external"
                    >
                        <CalendarDays class="size-7"/>
                    </a>
                    <a
                        class={cn("hover:text-ring transition-colors", HOVER_EXPAND_TAILWIND_ANIMATION)}
                        href="mailto:marcus.a.adair@gmail.com"
                        title="Email"
                        target="_blank"
                        rel="external"
                    >
                        <Mail class="size-7"/>
                    </a>
                    <a
                        class={cn("hover:text-ring transition-colors", HOVER_EXPAND_TAILWIND_ANIMATION)}
                        href="https://github.com/Marcus-Adair"
                        title="GitHub"
                        target="_blank"
                        rel="external"
                    >
                        <Github class="size-7"/>
                    </a>
                    <a
                        class={cn("hover:text-ring transition-colors", HOVER_EXPAND_TAILWIND_ANIMATION)}
                        href="https://www.linkedin.com/in/marcus-adair/"
                        title="LinkedIn"
                        target="_blank"
                        rel="external"
                    >
                        <LinkedIn class="size-7"/>
                    </a>
                </div>
            </div>

            <AnimatedSeparator slow/>
        </div>

        <Accordion type="single" class="w-full flex flex-row justify-end" value="intro">
            <Card class="text-card-foreground px-6 py-2 w-full">
                <AccordionItem value="intro">
                    <AccordionTrigger>
                        <span bind:this={helloWorld} class="text-lg text-primary tracking-wider">Hello world!</span>
                    </AccordionTrigger>

                    <AccordionContent class="flex flex-col gap-6">
                        <div>
                            <span>I am Marcus Adair, a software engineer based in Lehi, Utah. I work at  </span>
                            <Link href="https://www.safestreets.com/">SafeStreets</Link>
                            <span>- a nationwide ADT equipment installation/sales company, building TypeScript-based web and mobile applications to support internal business operations.</span>
                        </div>

                        <div>
                            <span>I earned my BS in Computer Science from the </span>
                            <Link href="https://www.utah.edu/">University of Utah</Link>
                            <span>(U of U) in Spring 2023, and my MS in Computer Science in Spring 2025.</span>
                        </div>

                        <div>
                            <span>For 3 years (including 2 years of grad. school) I worked as a research scientist at the </span>
                            <Link href="https://sci.utah.edu/">Scientific Computing and Imaging Institute</Link>
                            <span> at the U of U, focusing on full-stack software engineering, cloud infrastructure, and scientific software development</span>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Card>
        </Accordion>

        <AnimatedSeparator slow/>

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