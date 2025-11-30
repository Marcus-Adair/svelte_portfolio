<script lang="ts">
    import headshot from '$lib/assets/marcus_headshot_small.jpeg';
    import coffee_gif from '$lib/assets/hot-coffee.gif';
    import AccordionContent from '$lib/components/ui/accordion/accordion-content.svelte';
	import AccordionItem from '$lib/components/ui/accordion/accordion-item.svelte';
	import AccordionTrigger from '$lib/components/ui/accordion/accordion-trigger.svelte';
	import Accordion from '$lib/components/ui/accordion/accordion.svelte';
	import Button from '$lib/components/ui/button.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import Separator from '$lib/components/ui/separator.svelte';
	import { CAL_EMAIL, EMAIL, EMAIL_URL, GITHUB_URL, LINKED_IN_URL } from '$lib/consts/config';
	import { CalendarDays,  Check,  Copy,  Download, Github, LinkedinIcon, Mail } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import { HOVER_EXPAND_TAILWIND_ANIMATION } from '$lib/consts/style';
    import  resume  from "$lib/assets/Marcus_Adair_Portfolio_Resume.pdf"
    import gsap from "gsap";
	import { onMount } from 'svelte';

    let changingIcon = $state(false);
    function copyEmail() {
        navigator.clipboard.writeText(EMAIL)
        changingIcon = true;
        setTimeout(() => { changingIcon = false; }, 1800);
    }

    let coffee: HTMLImageElement;
    let h1: HTMLHeadingElement;
    onMount(() => {
        gsap.fromTo(
            coffee,
            { y: -325 }, 
            { y: 0, duration: 1.1, ease: "bounce.out" }
        );
        gsap.fromTo(
            h1,
            { x: -300},
            { x: 0, duration: 0.3, ease: "power1.out" }
        );
    });

    function animateCoffee(){
        if (Math.random() < 0.7) {
            // Bounce
            const tl = gsap.timeline();
            tl.fromTo(
                coffee,
                { y: 0 },
                { y: -200, duration: 0.3, ease: "power2.out" }
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
    <img src={headshot} alt="coffee_gif" class="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover" />

    <div class="flex flex-col gap-3">
        <div class="flex flex-row">
            <h1 bind:this={h1} class="text-4xl md:text-5xl xl:mr-44">Software Engineer, Computer Scientist, and Creative.</h1>
            <button onclick={animateCoffee} class="flex-none cursor-pointer">
                <img bind:this={coffee} src={coffee_gif} alt="coffee_image" class="w-24 h-24" />
            </button>
        </div>


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
    </div>
    
    <Accordion type="single" class="w-full flex flex-row justify-end sm:mt-2 " value="intro">
        <Card class="text-card-foreground px-6 py-2 w-full">
            <AccordionItem value="intro">
                <AccordionTrigger>
                    <span class="text-lg text-primary tracking-wide">Hello world!</span>
                </AccordionTrigger>

                <AccordionContent class="flex flex-col gap-6">
                    <div>
                        <span>I am Marcus Adair, a software engineer based in Lehi, Utah. I work at  </span>
                        <span class="font-semibold cursor-pointer text-primary" role="button" tabindex={1} onclick={() => window.open("https://www.safestreets.com/")} onkeydown={() => window.open("https://www.safestreets.com/")}>Safestreets</span>
                        <span>- a nationwide ADT equipment installation/sales company, building TypeScript-based web and mobile applications to support internal business operations.</span>
                    </div>

                    <div>
                        <span>I earned my BS in Computer Science from the </span>
                        <span class="font-semibold cursor-pointer text-primary" role="button" tabindex={1} onclick={() => window.open("https://www.utah.edu/")} onkeydown={() => window.open("https://www.utah.edu/")}>University of Utah</span>
                        <span>(U of U) in Spring 2023, and my MS in Computer Science in Spring 2025.</span>
                    </div>
                
                    <div>
                        <span>During the last year of my BS and throughout grad. school, I worked as a research scientist at the </span>
                        <span class="font-semibold cursor-pointer text-primary" role="button" tabindex={1} onclick={() => window.open("https://sci.utah.edu/")} onkeydown={() => window.open("https://sci.utah.edu/")}>Scientific Computing and Imaging Institute</span>
                        <span> at the U of U, focusing on scientific workflows and full-stack applications.</span>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Card>
    </Accordion>
        
    <Separator class="mt-2"/>

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