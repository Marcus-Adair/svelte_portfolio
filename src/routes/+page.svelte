<script lang="ts">
    import headshot from '$lib/assets/marcus_headshot_small.jpeg';
    import coffee_gif from '$lib/assets/hot-coffee.gif';
    import AccordionContent from '$lib/components/ui/accordion/accordion-content.svelte';
	import AccordionItem from '$lib/components/ui/accordion/accordion-item.svelte';
	import AccordionTrigger from '$lib/components/ui/accordion/accordion-trigger.svelte';
	import Accordion from '$lib/components/ui/accordion/accordion.svelte';
	import Button from '$lib/components/ui/button.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import { CalendarDays,  Check,  Copy,  FileText, Github, LinkedinIcon, Mail } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import { HOVER_EXPAND_TAILWIND_ANIMATION } from '$lib/consts/style';
    import  resume  from "$lib/assets/Marcus_Adair_Portfolio_Resume.pdf"
    import gsap from "gsap";
    import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
    import SplitText from "gsap/SplitText";
	import { onMount } from 'svelte';
	import AnimatedSeparator from '$lib/components/animatedSeparator.svelte';
	import Link from '$lib/components/link.svelte';
	import { showingBootAnimation } from '$lib/stores/boot.svelte';

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
                scrambleText: {text: "Hello world!", chars: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY12343.567890!@#$%^&*"},
                ease: "elastic.inOut", 
            })
            .to(helloWorld, {
                duration: 1.1, 
                scrambleText: { text: "Welcome to my website!", chars: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY1234567890!@#$%^&*"}, 
                ease: "elastic.inOut", 
                delay: 3
            });
    }    
    function animateCoffee(){
        if (Math.random() < 0.7) {
            // Bounce
            const tl = gsap.timeline();
            tl.fromTo(
                coffee,
                { y: 0 },
                { y: -90, duration: 0.3, ease: "power2.out" }
            );
            tl.to(coffee, { y: 0, duration: 0.75, ease: "bounce.out" });
        } else {
            // Spin
            gsap.fromTo(
            coffee,
            { rotate: 0 },
            {
                rotate: 360,
                duration: 0.42,
            }
        );
        }
    }

    let coffee: HTMLImageElement;
    let h1: HTMLHeadingElement;
    let helloWorld: HTMLSpanElement;
    let resumeTl: gsap.core.Timeline;

    onMount(() => {
        gsap.registerPlugin(ScrambleTextPlugin, SplitText);
        animateHelloWord();
    });

    $effect(() => {
        if (!showingBootAnimation()) {
            // Resume button split text animation (must wait for DOM to exist)
            const SPLIT_ANIM = { y: -25, duration: 0.15, stagger: 0.03, ease: "power1.out" };
            const resumeSplit1 = SplitText.create(".split-text-resume", { type: "chars" });
            const resumeSplit2 = SplitText.create(".split-text-resume-2", { type: "chars" });
            resumeTl = gsap.timeline({ paused: true })
                .to(resumeSplit1.chars, SPLIT_ANIM)
                .to(resumeSplit2.chars, SPLIT_ANIM, 0);
        }
    });
    // Do page animations after boot sequence is over
    $effect(() => {
        if (!showingBootAnimation()) {  
            gsap.fromTo(coffee,
                { y: -325 }, 
                { y: 0, duration: 1.1, ease: "bounce.out" }
            );
            gsap.fromTo(h1,
                { x: -300},
                { x: 0, duration: 0.3, ease: "power1.out" }
            );
        }
    });
</script>

<svelte:head>
  <title>Home • Marcus Adair</title>
</svelte:head>

{#if !showingBootAnimation()}
    <div class="flex flex-col gap-3">
        <div class="flex flex-col gap-2.5 relative">
            <button onclick={animateCoffee} class="flex-none cursor-pointer -translate-x-4">
                <img bind:this={coffee} src={coffee_gif} alt="coffee_image" class="w-24 h-24" />
            </button>

            <h1 bind:this={h1} class="text-4xl md:text-5xl mr-44 md:mr-54">Software Engineer, Computer Scientist, and Creative.</h1>

            <div class="flex flex-col-reverse gap-4 sm:flex-row sm:gap-2 sm:justify-between items-center mt-1">
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
                        <LinkedinIcon class="size-7"/>
                    </a>
                </div>
            </div>

            <AnimatedSeparator slow/>

            <enhanced:img src={headshot} alt="coffee_gif" class="w-auto h-32 md:h-40 rounded-full border border-border object-cover absolute top-8 right-0" />
        </div>

        <Accordion type="single" class="w-full flex flex-row justify-end" value="intro">
            <Card class="text-card-foreground px-6 py-2 w-full">
                <AccordionItem value="intro">
                    <AccordionTrigger>
                        <span bind:this={helloWorld} class="text-lg text-primary tracking-wide">Hello world!</span>
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

        <div class="flex justify-center sm:justify-end -mt-1.5">
            <div class="flex flex-row gap-3 items-center text-muted-foreground">
                <span class="tracking-wider font-light">marcus.a.adair@gmail.com</span>
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
{/if}