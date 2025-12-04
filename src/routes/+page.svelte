<script lang="ts">
    import headshot from '$lib/assets/marcus_headshot_small.jpeg';
    import coffee_gif from '$lib/assets/hot-coffee.gif';
    import AccordionContent from '$lib/components/ui/accordion/accordion-content.svelte';
	import AccordionItem from '$lib/components/ui/accordion/accordion-item.svelte';
	import AccordionTrigger from '$lib/components/ui/accordion/accordion-trigger.svelte';
	import Accordion from '$lib/components/ui/accordion/accordion.svelte';
	import Button from '$lib/components/ui/button.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import { CAL_EMAIL, EMAIL, EMAIL_URL, GITHUB_URL, LINKED_IN_URL } from '$lib/consts/config';
	import { CalendarDays,  Check,  Copy,  Download, Github, LinkedinIcon, Mail } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import { HOVER_EXPAND_TAILWIND_ANIMATION } from '$lib/consts/style';
    import  resume  from "$lib/assets/Marcus_Adair_Portfolio_Resume.pdf"
    import gsap from "gsap";
	import { onMount } from 'svelte';
	import AnimatedSeparator from '$lib/components/animatedSeparator.svelte';
	import Link from '$lib/components/link.svelte';
	import Separator from '$lib/components/ui/separator.svelte';

    let changingIcon = $state(false);
    function copyEmail() {
        navigator.clipboard.writeText(EMAIL)
        changingIcon = true;
        setTimeout(() => { changingIcon = false; }, 1800);
    }

    let coffee: HTMLImageElement;
    let h1: HTMLHeadingElement;
    let helloWorld: HTMLSpanElement;
    onMount(() => {
        gsap.fromTo(coffee,
            { y: -325 }, 
            { y: 0, duration: 1.1, ease: "bounce.out" }
        );
        gsap.fromTo(h1,
            { x: -300},
            { x: 0, duration: 0.3, ease: "power1.out" }
        );

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

        animateHelloWord();
    });

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
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<div class="flex flex-col gap-6">
    <div class="flex flex-col gap-2.5 relative">
        <button onclick={animateCoffee} class="flex-none cursor-pointer -translate-x-4">
            <img bind:this={coffee} src={coffee_gif} alt="coffee_image" class="w-24 h-24" />
        </button>

        <h1 bind:this={h1} class="text-4xl md:text-5xl mr-44 md:mr-54">Software Engineer, Computer Scientist, and Creative.</h1>

        <div class="flex flex-row gap-3 items-center text-muted-foreground">
            <span class="text-sm tracking-wider font-light">marcus.a.adair@gmail.com</span>
            <div class="transition-all hover:text-ring" title="Copy" onclick={copyEmail} onkeydown={copyEmail} role="button" tabindex={1}>
                {#if changingIcon}
                    <Check class="size-3.5" />
                {:else}
                    <Copy class="size-3.5 cursor-pointer" />
                {/if}
            </div>
        </div>

        <Separator/>

        <img src={headshot} alt="coffee_gif" class="w-auto h-32 md:h-40 rounded-full border border-border object-cover absolute top-8 right-0" />
    </div>


    
    <Accordion type="single" class="w-full flex flex-row justify-end sm:mt-2 " value="intro">
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

    <div class="flex flex-row justify-between items-end mb-8">
        <div class="flex flex-row gap-6 text-muted-foreground ">
            <a
                class={cn("hover:text-ring transition-colors", HOVER_EXPAND_TAILWIND_ANIMATION)}
                href={LINKED_IN_URL}
                title="LinkedIn"
                target="_blank"
                rel="noreferrer"
            >
            <LinkedinIcon class="size-7"/>
            </a>

                <a
                    class={cn("hover:text-ring transition-colors", HOVER_EXPAND_TAILWIND_ANIMATION)}
                    href={GITHUB_URL}
                    title="GitHub"
                    target="_blank"
                    rel="noreferrer"
                >
                <Github class="size-7"/>
            </a>
            <a
                class={cn("hover:text-ring transition-colors", HOVER_EXPAND_TAILWIND_ANIMATION)}
                href={CAL_EMAIL}
                title="Calendar"
                target="_blank"
                rel="noreferrer"
            >
                <CalendarDays class="size-7"/>
            </a>
            <a
                class={cn("hover:text-ring transition-colors", HOVER_EXPAND_TAILWIND_ANIMATION)}
                href={EMAIL_URL}
                title="Email"
                target="_blank"
                rel="noreferrer"
            >
                <Mail class="size-7"/>
            </a>
        </div>

        <Button variant="outline" size="lg" title="My Resume" href={resume} download="Marcus_Adair_Resume.pdf">
            <span class="hidden sm:flex">Download Resume</span>
            <Download/>
        </Button>    
    </div>
</div>